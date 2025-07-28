import type { Filters } from '@/store';
import type { Note } from '@/types';

export const filterNote = (note: Note, filters: Filters): boolean => {
  if (filters.search) {
    const searchTerm = filters.search.toLowerCase();
    const titleMatch = note.title.toLowerCase().includes(searchTerm);
    const contentMatch = note.content.toLowerCase().includes(searchTerm);

    if (!titleMatch && !contentMatch) {
      return false;
    }
  }

  if (filters.label) {
    if (!note.labels.includes(filters.label)) {
      return false;
    }
  }

  return true;
};
