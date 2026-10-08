export type Vec3 = [number, number, number];
export type Vec2 = [number, number];
export type View = 'front' | 'oblique';
export const ligandAtoms: Vec3[];
export const ligandBonds: [number, number][];
export function transformLigand(parameters?: {translation?: number; orientation?: number; torsion?: number}): Vec3[];
export function projectPoint(point: Vec3, view?: View): Vec2;
export const boxEdges: [number, number][];
export const teachingRegion: {center: Vec3; halfSize: Vec3};
export function boxBounds(center: Vec3, size: Vec3): Vec2[];
export function boxCorners(center: Vec3, size: Vec3): Vec3[];
export function boxVolume(size: Vec3): number;
export function boxCoversRegion(center: Vec3, size: Vec3, region?: {center: Vec3; halfSize: Vec3}): boolean;
export type PoseCandidate = {id: number; score: number};
export type FilterRow = PoseCandidate & {delta: number; status: 'range' | 'limit' | 'saved'};
export const exampleCandidates: PoseCandidate[];
export function filterPoseCandidates(candidates: PoseCandidate[], numModes: number, energyRange: number): {
  best: number | null; threshold: number | null; rows: FilterRow[]; saved: FilterRow[];
};
export type SearchFrame = {
  stage: 'start' | 'perturb' | 'optimize' | 'accept' | 'retain';
  cycle: number; candidate: Vec2; current: Vec2; best: Vec2;
  accepted: boolean | null; score: number; bestScore: number;
};
export type SearchRun = {id: number; frames: SearchFrame[]};
export const searchWells: {point: Vec2; depth: number; width: number}[];
export function toyScore(point: Vec2): number;
export function createSearchRuns(parameters?: {seed?: number; count?: number}): SearchRun[];
