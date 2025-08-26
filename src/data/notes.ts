import { NOTE_COLORS } from '@/constants';
import type { Note } from '@/types';

export const notes: Note[] = [
  {
    id: '1',
    title: 'Welcome',
    content: 'First Note',
    color: NOTE_COLORS.YELLOW,
    labelIds: ['1', '2', '3'],
    isArchived: false,
    isPinned: true,
    isTrashed: false,
  },
  {
    id: '2',
    title: 'Shopping List',
    content: 'Shopping List',
    color: NOTE_COLORS.GREEN,
    labelIds: ['3'],
    isArchived: false,
    isPinned: false,
    isTrashed: false,
  },
  {
    id: '3',
    title: 'Meeting Notes',
    content: 'Meeting Notes',
    color: NOTE_COLORS.BLUE,
    labelIds: ['1'],
    isArchived: false,
    isPinned: true,
    isTrashed: false,
  },
  {
    id: '4',
    title: 'Note 4',
    content: 'Note 4',
    color: NOTE_COLORS.RED,
    labelIds: ['1'],
    isArchived: false,
    isPinned: true,
    isTrashed: false,
  },
];
