import test from 'node:test';
import assert from 'node:assert/strict';
import {ligandAtoms, ligandBonds, transformLigand, projectPoint, boxBounds, boxCorners, boxVolume,
  boxCoversRegion, exampleCandidates, filterPoseCandidates, createSearchRuns} from '../src/components/interactive/teachingModels.mjs';
import {contactGeometry, stereoAtoms, stereoBonds, transformStereochemistry, chiralityVolume,
  sidechainAtoms, transformSidechain, createTeachingGrid, teachingMapValue, pairScoreIllustration,
  fixedFrameRmsd} from '../src/components/interactive/teachingBasics.mjs';

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

test('illustrated contacts depend on distance, direction, and compatible groups', () => {
  near(contactGeometry(3, 0).dhaAngle, 180);
  assert.equal(contactGeometry(3, 0).possibleHydrogenBond, true);
  assert.equal(contactGeometry(3, 85).possibleHydrogenBond, false);
  assert.equal(contactGeometry(3, 0, false).possibleHydrogenBond, false);
  assert.equal(contactGeometry(1.8, 0).status, 'clash');
  assert.equal(contactGeometry(5, 0).status, 'far');
  assert.equal(contactGeometry(2.5, 0).status, 'short');
  assert.throws(() => contactGeometry(1), RangeError);
});

test('torsion preserves the tetrahedral center and bonds, while reflection reverses handedness', () => {
  const original = structuredClone(stereoAtoms);
  const twisted = transformStereochemistry({torsion: 95});
  assert.deepEqual(twisted.slice(0, 5), stereoAtoms.slice(0, 5));
  assert.ok(distance(twisted[6], stereoAtoms[6]) > 0.5);
  for (const [a, b] of stereoBonds) near(distance(twisted[a], twisted[b]), distance(stereoAtoms[a], stereoAtoms[b]));
  near(chiralityVolume(twisted), chiralityVolume(stereoAtoms));
  for (const rotation of [-180, -47, 0, 73, 180]) {
    near(chiralityVolume(transformStereochemistry({rotation})), chiralityVolume(stereoAtoms));
    near(chiralityVolume(transformStereochemistry({mirror: true, rotation})), -chiralityVolume(stereoAtoms));
  }
  assert.deepEqual(stereoAtoms, original);
});

test('limited flexibility moves only the selected sidechain tail and preserves bonds', () => {
  const flexible = transformSidechain(80);
  assert.deepEqual(flexible.slice(0, 2), sidechainAtoms.slice(0, 2));
  assert.notDeepEqual(flexible[3], sidechainAtoms[3]);
  for (let i = 0; i < 3; i++) near(distance(flexible[i], flexible[i + 1]), distance(sidechainAtoms[i], sidechainAtoms[i + 1]));
  assert.deepEqual(transformSidechain(80, false), sidechainAtoms);
});

test('grid spacing controls samples while atom type changes values at the same coordinates', () => {
  assert.equal(createTeachingGrid().samples.length, 49);
  assert.equal(createTeachingGrid({size: 16, spacing: 1}).samples.length, 289);
  const carbon = createTeachingGrid({size: 12, spacing: 3, atomType: 'C'});
  const oxygen = createTeachingGrid({size: 12, spacing: 3, atomType: 'O'});
  assert.deepEqual(carbon.samples.map(({x, y}) => [x, y]), oxygen.samples.map(({x, y}) => [x, y]));
  assert.notDeepEqual(carbon.samples.map(({value}) => value), oxygen.samples.map(({value}) => value));
  for (const spacing of [1, 2, 3, 4]) for (const {x, y, value} of createTeachingGrid({size: 16, spacing}).samples) {
    assert.ok(Math.abs(x) <= 8 && Math.abs(y) <= 8 && Number.isFinite(value));
  }
  assert.throws(() => createTeachingGrid({spacing: 0}), RangeError);
  assert.throws(() => teachingMapValue(0, 0, 'X'), RangeError);
});

test('qualitative pair curves penalize overlap and keep component totals consistent', () => {
  assert.ok(pairScoreIllustration(1.8).total > 0);
  assert.ok(pairScoreIllustration(3.8).total < 0);
  assert.ok(Math.abs(pairScoreIllustration(10).total) < 0.01);
  for (const kind of ['steric', 'nonpolar', 'hbond']) for (const separation of [1.8, 2.8, 3.8, 6, 7]) {
    const result = pairScoreIllustration(separation, kind);
    near(result.repulsion + result.attraction, result.total);
    near(result.repulsion, pairScoreIllustration(separation).repulsion);
  }
  assert.ok(pairScoreIllustration(3.8, 'nonpolar').attraction < pairScoreIllustration(3.8).attraction);
});

test('fixed-frame RMSD uses paired 3D coordinates without aligning away translation', () => {
  const original = structuredClone(ligandAtoms);
  near(fixedFrameRmsd(ligandAtoms, ligandAtoms).rmsd, 0);
  for (const translation of [-2, 1, 2]) near(fixedFrameRmsd(ligandAtoms, transformLigand({translation})).rmsd, Math.abs(translation));
  const moved = structuredClone(ligandAtoms);
  moved[0][2] += 3;
  near(fixedFrameRmsd(ligandAtoms, moved).rmsd, Math.sqrt(9 / 6));
  assert.ok(fixedFrameRmsd(ligandAtoms, transformLigand({orientation: 90})).rmsd > 1);
  assert.throws(() => fixedFrameRmsd([], []), RangeError);
  assert.throws(() => fixedFrameRmsd(ligandAtoms, ligandAtoms.slice(1)), RangeError);
  assert.throws(() => fixedFrameRmsd([[0, NaN, 0]], [[0, 0, 0]]), RangeError);
  assert.deepEqual(ligandAtoms, original);
});
