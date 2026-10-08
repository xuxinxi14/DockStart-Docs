import test from 'node:test';
import assert from 'node:assert/strict';
import {ligandAtoms, ligandBonds, transformLigand, projectPoint, boxBounds, boxCorners, boxVolume,
  boxCoversRegion, exampleCandidates, filterPoseCandidates, createSearchRuns} from '../src/components/interactive/teachingModels.mjs';

const distance = (a, b) => Math.hypot(...a.map((value, axis) => value - b[axis]));
const near = (a, b) => assert.ok(Math.abs(a - b) < 1e-9, `${a} ≠ ${b}`);

test('whole-ligand translation and rotation preserve internal distances', () => {
  for (const parameters of [{translation: 2}, {orientation: 73}, {translation: -1, orientation: -47}]) {
    const transformed = transformLigand(parameters);
    for (let i = 0; i < ligandAtoms.length; i++) for (let j = i + 1; j < ligandAtoms.length; j++) {
      near(distance(transformed[i], transformed[j]), distance(ligandAtoms[i], ligandAtoms[j]));
    }
  }
});

test('bond torsion moves one side, preserving bond lengths and the axis', () => {
  const transformed = transformLigand({torsion: 95});
  assert.deepEqual(transformed.slice(0, 4), ligandAtoms.slice(0, 4));
  assert.ok(distance(transformed[5], ligandAtoms[5]) > 1);
  for (const [a, b] of ligandBonds) near(distance(transformed[a], transformed[b]), distance(ligandAtoms[a], ligandAtoms[b]));
  for (const index of [4, 5]) near(Math.hypot(...transformed[index].slice(1)), Math.hypot(...ligandAtoms[index].slice(1)));
});

test('view projection changes presentation without changing coordinates', () => {
  const point = [2, 3, 4];
  const original = [...point];
  assert.notDeepEqual(projectPoint(point, 'front'), projectPoint(point, 'oblique'));
  assert.deepEqual(point, original);
});

test('box sizes are full lengths; volume and region coverage follow the bounds', () => {
  const center = [2, -1, 3];
  const size = [16, 14, 12];
  assert.deepEqual(boxBounds(center, size), [[-6, 10], [-8, 6], [-3, 9]]);
  assert.equal(boxCorners(center, size).length, 8);
  assert.equal(boxVolume(size), 2688);
  assert.equal(boxCoversRegion([0, 0, 0], size), true);
  assert.equal(boxCoversRegion([0, 0, 0], [8, 6, 6]), true);
  assert.equal(boxCoversRegion([0, 0, 0], [6, 4, 4]), false);
  assert.equal(boxCoversRegion([8, 4, 0], [12, 10, 10]), false);
});

test('pose output includes the energy-window boundary and respects the count cap', () => {
  assert.equal(filterPoseCandidates(exampleCandidates, 9, 1).saved.length, 5);
  assert.equal(filterPoseCandidates(exampleCandidates, 3, 1).saved.length, 3);
  assert.equal(filterPoseCandidates(exampleCandidates, 12, 3).saved.length, 9);
  assert.equal(filterPoseCandidates(exampleCandidates, 9, 0).saved.length, 1);
  assert.equal(filterPoseCandidates(exampleCandidates, 9, 0.2).saved.length, 2);
  assert.deepEqual(filterPoseCandidates([], 9, 1).saved, []);
});

test('pose filtering sorts stably without changing its input or scores', () => {
  const candidates = [{id: 3, score: -6}, {id: 2, score: -8}, {id: 1, score: -8}];
  const original = structuredClone(candidates);
  const result = filterPoseCandidates(candidates, 9, 2);
  assert.deepEqual(result.saved.map(({id}) => id), [2, 1, 3]);
  assert.deepEqual(candidates, original);
  assert.throws(() => filterPoseCandidates(candidates, 0, 1), RangeError);
  assert.throws(() => filterPoseCandidates(candidates, 9, -1), RangeError);
});

test('search seeds are reproducible and expanding the run count preserves existing paths', () => {
  const runs = createSearchRuns({seed: 42, count: 8});
  assert.deepEqual(runs, createSearchRuns({seed: 42, count: 8}));
  assert.deepEqual(runs, createSearchRuns({seed: 42, count: 16}).slice(0, 8));
  assert.notDeepEqual(runs[0].frames[0].current, createSearchRuns({seed: 43, count: 8})[0].frames[0].current);
  assert.notDeepEqual(runs[0].frames[0].current, runs[1].frames[0].current);
});

test('search coordinates stay finite and bounded, and retained best scores never increase', () => {
  for (const run of createSearchRuns({seed: 12345, count: 32})) {
    let best = Infinity;
    for (const frame of run.frames) {
      assert.ok(frame.bestScore <= best + 1e-9);
      best = frame.bestScore;
      for (const point of [frame.candidate, frame.current, frame.best]) for (const value of point) {
        assert.ok(Number.isFinite(value) && Math.abs(value) <= 3.1);
      }
      assert.ok(Number.isFinite(frame.score));
    }
  }
});
