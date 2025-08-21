import type { NoteColor } from '@/constants';
import type { Label } from './label.types';

export interface Note {
  id: string;
  title: string;
  content: string;
  color: NoteColor | null;
  labelIds: string[];
  isPinned: boolean;
  isArchived: boolean;
}

export interface DisplayNote extends Omit<Note, 'labelIds'> {
  labels: Label[];
}

export type DraftNote = Omit<DisplayNote, 'id'>;
