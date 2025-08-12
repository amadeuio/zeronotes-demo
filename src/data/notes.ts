import { NOTE_COLORS } from '@/constants';
import type { Note } from '@/types';

export const notes: Note[] = [
  {
    id: '1',
    title: 'Welcome to Google Keep Clone',
    content:
      'This is your first note! You can edit, delete, and create new notes. Try clicking on this note to edit it.',
    createdAt: new Date('2024-01-15T10:00:00Z'),
    updatedAt: new Date('2024-01-15T10:00:00Z'),
    color: NOTE_COLORS.YELLOW,
    labelIds: ['1', '2', '3'],
    isArchived: false,
    isPinned: true,
  },
  {
    id: '2',
    title: 'Shopping List',
    content: '• Milk\n• Bread\n• Eggs\n• Bananas\n• Coffee\n• Toilet paper',
    createdAt: new Date('2024-01-14T15:30:00Z'),
    updatedAt: new Date('2024-01-14T16:45:00Z'),
    color: NOTE_COLORS.GREEN,
    labelIds: ['3'],
    isArchived: false,
    isPinned: false,
  },
  {
    id: '3',
    title: 'Meeting Notes - Project Kickoff',
    content:
      'Team meeting scheduled for Friday 2 PM\n\nAgenda:\n- Project timeline review\n- Resource allocation\n- Next steps\n\nAction items:\n- Send meeting invite\n- Prepare presentation slides',
    createdAt: new Date('2024-01-13T09:15:00Z'),
    updatedAt: new Date('2024-01-13T11:20:00Z'),
    color: NOTE_COLORS.BLUE,
    labelIds: ['1'],
    isArchived: false,
    isPinned: true,
  },
];
