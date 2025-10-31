import type { DisplayNote, LabelsById, Note } from '@/types';
import { getColorValue } from './';

export const mapNoteToDisplay = (note: Note, labelsById: LabelsById): DisplayNote => {
  const { labelIds, colorId, ...rest } = note;
  const labels = labelIds.map((id) => labelsById[id]).filter(Boolean);
  const colorValue = getColorValue(colorId);

  return {
    ...rest,
    colorId,
    labels,
    colorValue,
  };
};
