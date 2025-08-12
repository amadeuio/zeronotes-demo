import type { Filters } from '@/store';
import type { DisplayNote, LabelsById, Note } from '@/types';

export const filterNote = (note: Note, filters: Filters): boolean => {
  if (filters.search) {
    const searchTerm = filters.search.toLowerCase();
    const titleMatch = note.title.toLowerCase().includes(searchTerm);
    const contentMatch = note.content.toLowerCase().includes(searchTerm);

    if (!titleMatch && !contentMatch) return false;
  }

  if (filters.labelId) {
    if (!note.labelIds.includes(filters.labelId)) return false;
  }

  return true;
};

export const mapNoteToDisplay = (note: Note, labelsById: LabelsById): DisplayNote => {
  const { labelIds, ...rest } = note;
  const labels = labelIds.map((id) => labelsById[id]).filter(Boolean);

  return {
    ...rest,
    labels,
  };
};
