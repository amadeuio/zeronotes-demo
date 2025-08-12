import type { Label, LabelsById } from '@/types';

export const buildLabelsById = (labels: Label[]): LabelsById =>
  Object.fromEntries(labels.map((l) => [l.id, l] as const));
