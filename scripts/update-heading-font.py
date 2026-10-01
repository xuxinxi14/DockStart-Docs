"""Refresh the self-hosted Noto Serif SC subset used by website headings.

Run from any directory: python scripts/update-heading-font.py
Requires only Python's standard library. Network is needed only for this refresh,
never for visitors reading the deployed website.
"""
from pathlib import Path
import hashlib
import json
import re
import urllib.parse
import urllib.request

ROOT = Path(__file__).resolve().parents[1]
DEST = ROOT / "static" / "fonts"
INTERFACE = "DockStart 帮助文档分子对接入门实操与排错文档目录基础原理实战案例使用与推荐常用参考检索没有找到匹配的文章官方三维结构文件术语解释参数速查错误信息索引版本复现"
headings = []
for path in (ROOT / "docs").rglob("*.md"):
    fenced = False
    for line in path.read_text(encoding="utf-8").splitlines():
        if line.startswith("```"):
            fenced = not fenced
        if not fenced and re.match(r"^#{1,6} ", line):
            headings.append(line)
for path in (ROOT / "docs").rglob("_category_.json"):
    headings.append(json.loads(path.read_text(encoding="utf-8"))["label"])
text = "".join(sorted(set(INTERFACE + "".join(headings) + "".join(chr(n) for n in range(32, 127)))))
css_url = "https://fonts.googleapis.com/css2?" + urllib.parse.urlencode({
    "family": "Noto Serif SC:wght@700",
    "text": text,
    "display": "swap",
})
request = urllib.request.Request(css_url, headers={
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36"
})
css = urllib.request.urlopen(request, timeout=60).read().decode("utf-8")
match = re.search(r"url\((https://[^)]+)\)", css)
if not match:
    raise RuntimeError("Google Fonts did not return a font URL")
font_url = match.group(1)
font = urllib.request.urlopen(font_url, timeout=60).read()
if font[:4] != b"wOF2":
    raise RuntimeError("Expected WOFF2 font data")
license_url = "https://raw.githubusercontent.com/google/fonts/main/ofl/notoserifsc/OFL.txt"
license_data = urllib.request.urlopen(license_url, timeout=60).read()
if b"SIL OPEN FONT LICENSE" not in license_data:
    raise RuntimeError("Missing OFL license")
DEST.mkdir(parents=True, exist_ok=True)
(DEST / "dockstart-serif-headings.woff2").write_bytes(font)
(DEST / "OFL-NotoSerifSC.txt").write_bytes(license_data)
metadata = {
    "family": "Noto Serif SC",
    "weight": 700,
    "license": "SIL Open Font License 1.1",
    "license_source": license_url,
    "upstream": "https://github.com/google/fonts/tree/main/ofl/notoserifsc",
    "font_source": font_url,
    "characters": text,
    "sha256": hashlib.sha256(font).hexdigest(),
    "bytes": len(font),
}
(DEST / "heading-font-source.json").write_text(json.dumps(metadata, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(f"Saved heading font: {len(text)} characters, {len(font):,} bytes, SHA256 {metadata['sha256']}")
