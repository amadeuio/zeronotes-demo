import { COLORS } from '@/constants';
import type { DisplayNote, LabelsById, Note } from '@/types';

export const mapNoteToDisplay = (note: Note, labelsById: LabelsById): DisplayNote => {
  const { labelIds, colorId, ...rest } = note;
  const labels = labelIds.map((id) => labelsById[id]).filter(Boolean);
  const colorValue = COLORS.find((color) => color.id === colorId)?.value ?? null;

  return {
    ...rest,
    colorId,
    labels,
    colorValue,
  };
};
