import type { Filters, Note } from '@/types';
import { describe, expect, it } from 'vitest';
import { filterNote, sortNotesByPinned } from './notes';

describe('filterNote', () => {
  const createNote = (overrides?: Partial<Note>): Note => ({
    id: '1',
    title: 'Test Note',
    content: 'Test content',
    colorId: 'default',
    labelIds: [],
    isPinned: false,
    isArchived: false,
    isTrashed: false,
    ...overrides,
  });

  const createFilters = (overrides?: Partial<Filters>): Filters => ({
    search: '',
    view: { type: 'notes' },
    ...overrides,
  });

  it('should filter notes view', () => {
    expect(filterNote(createNote(), createFilters())).toBe(true);
    expect(filterNote(createNote({ isArchived: true }), createFilters())).toBe(false);
    expect(filterNote(createNote({ isTrashed: true }), createFilters())).toBe(false);
  });

  it('should filter archive view', () => {
    expect(
      filterNote(createNote({ isArchived: true }), createFilters({ view: { type: 'archive' } })),
    ).toBe(true);
    expect(filterNote(createNote(), createFilters({ view: { type: 'archive' } }))).toBe(false);
  });

  it('should filter trash view', () => {
    expect(
      filterNote(createNote({ isTrashed: true }), createFilters({ view: { type: 'trash' } })),
    ).toBe(true);
    expect(filterNote(createNote(), createFilters({ view: { type: 'trash' } }))).toBe(false);
  });

  it('should filter label view', () => {
    expect(
      filterNote(
        createNote({ labelIds: ['label-1'] }),
        createFilters({ view: { type: 'label', id: 'label-1' } }),
      ),
    ).toBe(true);
    expect(
      filterNote(
        createNote({ labelIds: ['label-1'] }),
        createFilters({ view: { type: 'label', id: 'label-2' } }),
      ),
    ).toBe(false);
    expect(
      filterNote(
        createNote({ labelIds: ['label-1'], isTrashed: true }),
        createFilters({ view: { type: 'label', id: 'label-1' } }),
      ),
    ).toBe(false);
  });

  it('should filter by search query', () => {
    const note = createNote({ title: 'My Note', content: 'Important content' });
    expect(filterNote(note, createFilters({ search: 'note' }))).toBe(true);
    expect(filterNote(note, createFilters({ search: 'important' }))).toBe(true);
    expect(filterNote(note, createFilters({ search: 'xyz' }))).toBe(false);
    expect(filterNote(note, createFilters({ search: '  NOTE  ' }))).toBe(true);
  });
});

describe('sortNotesByPinned', () => {
  const createNote = (id: string, isPinned: boolean): Note => ({
    id,
    title: 'Test Note',
    content: 'Content',
    colorId: 'default',
    labelIds: [],
    isPinned,
    isArchived: false,
    isTrashed: false,
  });

  it('should sort pinned notes before unpinned', () => {
    const noteIds = ['1', '2', '3'];
    const notes = [createNote('1', false), createNote('2', true), createNote('3', false)];
    expect(sortNotesByPinned(noteIds, notes)).toEqual(['2', '1', '3']);
  });

  it('should handle mixed pinned/unpinned notes', () => {
    const noteIds = ['1', '2', '3', '4'];
    const notes = [
      createNote('1', true),
      createNote('2', false),
      createNote('3', true),
      createNote('4', false),
    ];
    expect(sortNotesByPinned(noteIds, notes)).toEqual(['1', '3', '2', '4']);
  });
});
