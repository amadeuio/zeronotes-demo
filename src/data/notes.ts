import { NOTE_COLORS } from '@/constants';
import type { Note } from '@/types';

export const notes: Note[] = [
  {
    id: '1',
    title: 'Welcome to Google Keep Clone',
    content:
      'This is your first note! You can edit, delete, and create new notes. Try clicking on this note to edit it.',
    color: NOTE_COLORS.SAND,
    labelIds: ['1', '2', '3'],
    isArchived: false,
    isPinned: true,
    isTrashed: false,
  },
  {
    id: '2',
    title: 'Shopping List',
    content: '• Milk\n• Bread\n• Eggs\n• Bananas\n• Coffee\n• Toilet paper',
    color: NOTE_COLORS.MINT,
    labelIds: ['3'],
    isArchived: false,
    isPinned: false,
    isTrashed: false,
  },
  {
    id: '3',
    title: 'Meeting Notes - Project Kickoff',
    content:
      'Team meeting scheduled for Friday 2 PM\n\nAgenda:\n- Project timeline review\n- Resource allocation\n- Next steps\n\nAction items:\n- Send meeting invite\n- Prepare presentation slides',
    color: NOTE_COLORS.FOG,
    labelIds: ['1'],
    isArchived: false,
    isPinned: true,
    isTrashed: false,
  },
];
