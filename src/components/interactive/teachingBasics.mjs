// Constructed teaching geometry. These helpers do not run molecular simulations.
const radians = (degrees) => degrees * Math.PI / 180;
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const dot = (a, b) => a.reduce((sum, value, axis) => sum + value * b[axis], 0);
const subtract = (a, b) => a.map((value, axis) => value - b[axis]);
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];

function finite(value) {
  if (!Number.isFinite(value)) throw new RangeError('Teaching coordinates must be finite.');
  return value;
}

export function rotateAroundAxis(point, origin, axis, degrees) {
  const length = Math.hypot(...axis);
  if (!(length > 0) || !Number.isFinite(length)) throw new RangeError('The rotation axis must have a finite, nonzero length.');
  const unit = axis.map((value) => value / length);
  const relative = subtract(point, origin);
  const perpendicular = cross(unit, relative);
  const angle = radians(finite(degrees));
  return relative.map((value, index) => origin[index] + value * Math.cos(angle)
    + perpendicular[index] * Math.sin(angle) + unit[index] * dot(unit, relative) * (1 - Math.cos(angle)));
}

export function contactGeometry(distance = 3, rotation = 0, donor = true) {
  if (!(finite(distance) > 1)) throw new RangeError('The illustrated donor distance must exceed the unit bond length.');
  const angle = radians(finite(rotation));
  const hydrogen = [distance - Math.cos(angle), Math.sin(angle)];
  const toDonor = [distance - hydrogen[0], -hydrogen[1]];
  const toAcceptor = [-hydrogen[0], -hydrogen[1]];
  const dhaAngle = Math.acos(clamp(dot(toDonor, toAcceptor) / (Math.hypot(...toDonor) * Math.hypot(...toAcceptor)), -1, 1)) * 180 / Math.PI;
  const clash = distance < 2.4;
  const possibleHydrogenBond = donor && !clash && distance >= 2.6 && distance <= 3.5 && dhaAngle >= 140;
  const status = clash ? 'clash' : distance > 3.5 ? 'far' : !donor ? 'incompatible'
    : distance < 2.6 ? 'short' : possibleHydrogenBond ? 'possible' : 'misaligned';
  return {hydrogen, dhaAngle, clash, possibleHydrogenBond, status};
}

// A tetrahedral center with four distinguishable groups A–D, plus a tail on D.
export const stereoAtoms = [[0, 0, 0], [1.15, 1.15, 1.15], [1.15, -1.15, -1.15],
  [-1.15, 1.15, -1.15], [-1.15, -1.15, 1.15], [-2.15, -1.05, 1.4], [-2.85, -0.15, 1.3]];
export const stereoBonds = [[0, 1], [0, 2], [0, 3], [0, 4], [4, 5], [5, 6]];

export function transformStereochemistry({torsion = 0, mirror = false, rotation = 0} = {}) {
  const axis = subtract(stereoAtoms[4], stereoAtoms[0]);
  return stereoAtoms.map((point, index) => {
    const twisted = index > 4 ? rotateAroundAxis(point, stereoAtoms[4], axis, torsion) : [...point];
    const reflected = [mirror ? -twisted[0] : twisted[0], twisted[1], twisted[2]];
    return rotateAroundAxis(reflected, [0, 0, 0], [0, 0, 1], rotation);
  });
}

export function chiralityVolume(atoms) {
  const [a, b, c, d] = atoms.slice(1, 5);
  return dot(subtract(a, d), cross(subtract(b, d), subtract(c, d)));
}

export const receptorBackbone = [[-3.4, 1.6, 0], [-2, 2.3, 0.2], [-0.5, 2.1, 0.4],
  [1, 1.9, 0.2], [1.8, 0.7, 0], [3.3, 1.2, -0.3], [4, 2.2, 0]];
export const sidechainAtoms = [[1.8, 0.7, 0], [2.7, 0.2, 0], [2.9, -1, 0.4], [2.4, -1.8, 0.9]];

export function transformSidechain(angle = 0, flexible = true) {
  if (!flexible) return sidechainAtoms.map((point) => [...point]);
  const axis = subtract(sidechainAtoms[1], sidechainAtoms[0]);
  return sidechainAtoms.map((point, index) => index < 2 ? [...point]
    : rotateAroundAxis(point, sidechainAtoms[1], axis, flexible ? angle : 0));
}

export function teachingMapValue(x, y, atomType = 'C') {
  if (!['C', 'O'].includes(atomType)) throw new RangeError('Unknown illustrative atom type.');
  finite(x); finite(y);
  const [cx, cy] = atomType === 'C' ? [-2, 1] : [2, -1];
  return 3 * Math.exp(-(x * x + y * y) / 3)
    - 2.8 * Math.exp(-((x - cx) ** 2 + (y - cy) ** 2) / 4);
}

export function createTeachingGrid({size = 12, spacing = 2, atomType = 'C'} = {}) {
  if (!(finite(size) > 0) || !(finite(spacing) > 0) || size / spacing > 100) throw new RangeError('Invalid illustrative grid dimensions.');
  if (!['C', 'O'].includes(atomType)) throw new RangeError('Unknown illustrative atom type.');
  const count = Math.floor(size / spacing + 1e-9) + 1;
  const samples = [];
  for (let row = 0; row < count; row++) for (let column = 0; column < count; column++) {
    const x = -size / 2 + column * spacing;
    const y = -size / 2 + row * spacing;
    samples.push({x, y, row, column, value: teachingMapValue(x, y, atomType)});
  }
  return {count, samples};
}

// Dimensionless qualitative curve, deliberately distinct from Vina's equations.
export function pairScoreIllustration(distance, kind = 'steric') {
  if (!(finite(distance) > 0)) throw new RangeError('Atom separation must be positive.');
  if (!['steric', 'nonpolar', 'hbond'].includes(kind)) throw new RangeError('Unknown illustrative pair type.');
  const gap = distance - 3.4;
  const repulsion = 3 * Math.max(-gap, 0) ** 2;
  const contact = -Math.exp(-((gap / 0.7) ** 2)) - 0.2 * Math.exp(-(((gap - 2.5) / 2) ** 2));
  const extra = kind === 'nonpolar' ? -0.65 * clamp(1.5 - gap, 0, 1)
    : kind === 'hbond' ? -0.85 * clamp(-gap / 0.7, 0, 1) : 0;
  return {gap, repulsion, attraction: contact + extra, total: repulsion + contact + extra};
}

export function fixedFrameRmsd(reference, candidate) {
  if (!Array.isArray(reference) || !Array.isArray(candidate) || reference.length === 0 || reference.length !== candidate.length) {
    throw new RangeError('RMSD needs equally sized, nonempty atom lists.');
  }
  for (const atoms of [reference, candidate]) for (const point of atoms) {
    if (!Array.isArray(point) || point.length !== 3 || !point.every(Number.isFinite)) throw new RangeError('RMSD needs finite 3D coordinates.');
  }
  const distances = reference.map((point, index) => Math.hypot(...subtract(point, candidate[index])));
  const sumSquared = distances.reduce((sum, distance) => sum + distance * distance, 0);
  return {distances, sumSquared, rmsd: Math.sqrt(sumSquared / reference.length)};
}
