// Small, deterministic teaching models. These do not run AutoDock Vina.
export const ligandAtoms = [
  [-2.6, -0.4, 0.3], [-1.35, 0, 0], [0, 0, 0],
  [1.45, 0, 0], [2.15, 1.2, 0.35], [3.25, 1.05, 0.85],
];
export const ligandBonds = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5]];
const radians = (degrees) => degrees * Math.PI / 180;

export function transformLigand({translation = 0, orientation = 0, torsion = 0} = {}) {
  const a = radians(orientation);
  const b = radians(torsion);
  return ligandAtoms.map(([x, y, z], index) => {
    if (index > 3) [y, z] = [y * Math.cos(b) - z * Math.sin(b), y * Math.sin(b) + z * Math.cos(b)];
    return [x * Math.cos(a) - y * Math.sin(a) + translation, x * Math.sin(a) + y * Math.cos(a), z];
  });
}

export function projectPoint([x, y, z], view = 'oblique') {
  const yaw = radians(view === 'front' ? 0 : -30);
  const pitch = radians(view === 'front' ? 0 : 22);
  const horizontal = x * Math.cos(yaw) + z * Math.sin(yaw);
  const depth = -x * Math.sin(yaw) + z * Math.cos(yaw);
  return [horizontal, y * Math.cos(pitch) - depth * Math.sin(pitch)];
}

export const boxEdges = [[0, 1], [0, 2], [0, 4], [1, 3], [1, 5], [2, 3], [2, 6], [3, 7], [4, 5], [4, 6], [5, 7], [6, 7]];
export const teachingRegion = {center: [0, 0, 0], halfSize: [4, 3, 3]};

export function boxBounds(center, size) {
  return center.map((value, axis) => [value - size[axis] / 2, value + size[axis] / 2]);
}

export function boxCorners(center, size) {
  const bounds = boxBounds(center, size);
  return Array.from({length: 8}, (_, corner) => bounds.map((range, axis) => range[(corner >> axis) & 1]));
}

export function boxVolume(size) {
  return size.reduce((volume, length) => volume * length, 1);
}

export function boxCoversRegion(center, size, region = teachingRegion) {
  return boxBounds(center, size).every(([low, high], axis) =>
    low <= region.center[axis] - region.halfSize[axis] && high >= region.center[axis] + region.halfSize[axis]);
}

export const exampleCandidates = [-8, -7.8, -7.4, -7.2, -7, -6, -5.8, -5.5, -5].map((score, index) => ({id: index + 1, score}));

export function filterPoseCandidates(candidates, numModes, energyRange) {
  if (!Number.isInteger(numModes) || numModes < 1 || !Number.isFinite(energyRange) || energyRange < 0 ||
      candidates.some(({score}) => !Number.isFinite(score))) throw new RangeError('Invalid pose-filter inputs');
  const sorted = candidates.map((candidate) => ({...candidate})).sort((a, b) => a.score - b.score);
  const best = sorted[0]?.score ?? null;
  const threshold = best === null ? null : best + energyRange;
  const rows = sorted.map((candidate, index) => ({
    ...candidate,
    delta: candidate.score - best,
    status: candidate.score > threshold + 1e-9 ? 'range' : index >= numModes ? 'limit' : 'saved',
  }));
  return {best, threshold, rows, saved: rows.filter(({status}) => status === 'saved')};
}

export const searchWells = [
  {point: [-1.8, -0.7], depth: 3.8, width: 0.7},
  {point: [1.8, -0.9], depth: 4.6, width: 0.65},
  {point: [0.8, 1.75], depth: 3.2, width: 0.75},
  {point: [-1.7, 1.8], depth: 2.5, width: 0.6},
];

export function toyScore([x, y]) {
  return searchWells.reduce((score, {point, depth, width}) =>
    score - depth * Math.exp(-((x - point[0]) ** 2 + (y - point[1]) ** 2) / (2 * width ** 2)), 0.055 * (x * x + y * y));
}

function gradient([x, y]) {
  return searchWells.reduce(([gx, gy], {point, depth, width}) => {
    const term = depth * Math.exp(-((x - point[0]) ** 2 + (y - point[1]) ** 2) / (2 * width ** 2)) / width ** 2;
    return [gx + term * (x - point[0]), gy + term * (y - point[1])];
  }, [0.11 * x, 0.11 * y]);
}

function randomGenerator(seed) {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6D2B79F5) >>> 0;
    let value = Math.imul(state ^ (state >>> 15), 1 | state);
    value ^= value + Math.imul(value ^ (value >>> 7), 61 | value);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

const clamp = (value) => Math.max(-3.1, Math.min(3.1, value));
function optimize(point) {
  let candidate = [...point];
  for (let step = 0; step < 12; step++) {
    const slope = gradient(candidate);
    candidate = candidate.map((value, axis) => clamp(value - 0.16 * slope[axis]));
  }
  return candidate;
}

export function createSearchRuns({seed = 42, count = 8} = {}) {
  if (!Number.isInteger(seed) || !Number.isInteger(count) || count < 1 || count > 32) throw new RangeError('Invalid search inputs');
  return Array.from({length: count}, (_, index) => {
    const random = randomGenerator((seed ^ Math.imul(index + 1, 0x9E3779B9)) >>> 0);
    let current = [random() * 6 - 3, random() * 6 - 3];
    let best = [...current];
    const frames = [];
    const record = (stage, candidate, cycle, accepted = null) => frames.push({
      stage, cycle, candidate: [...candidate], current: [...current], best: [...best], accepted,
      score: toyScore(candidate), bestScore: toyScore(best),
    });
    record('start', current, 0);
    for (let cycle = 1; cycle <= 6; cycle++) {
      const proposal = current.map((value) => clamp(value + (random() - 0.5) * 3.6));
      record('perturb', proposal, cycle);
      const candidate = optimize(proposal);
      record('optimize', candidate, cycle);
      const difference = toyScore(candidate) - toyScore(current);
      const accepted = random() < Math.exp(-Math.max(0, difference) / 0.6);
      if (accepted) current = [...candidate];
      record('accept', candidate, cycle, accepted);
      if (toyScore(current) < toyScore(best)) best = [...current];
      record('retain', current, cycle, accepted);
    }
    return {id: index + 1, frames};
  });
}
