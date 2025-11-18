import type { Filters, Label, Note } from '@/types';
import { describe, expect, it } from 'vitest';
import { filterNote, mapNoteToDisplay, sortNotesByPinned } from './notes';

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

const createLabel = (id: string, name: string): Label => ({ id, name });

describe('filterNote', () => {
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

  it('should handle whitespace-only search query', () => {
    const note = createNote({ title: 'My Note', content: 'Content' });
    expect(filterNote(note, createFilters({ search: '   ' }))).toBe(true);
    expect(filterNote(note, createFilters({ search: '\t\n' }))).toBe(true);
  });

  it('should handle search with empty title or content', () => {
    expect(
      filterNote(
        createNote({ title: '', content: 'content' }),
        createFilters({ search: 'content' }),
      ),
    ).toBe(true);
    expect(
      filterNote(createNote({ title: 'title', content: '' }), createFilters({ search: 'title' })),
    ).toBe(true);
    expect(
      filterNote(createNote({ title: '', content: '' }), createFilters({ search: 'anything' })),
    ).toBe(false);
  });
});

describe('sortNotesByPinned', () => {
  it('should sort pinned notes before unpinned', () => {
    const noteIds = ['1', '2', '3'];
    const notes = [
      createNote({ id: '1', isPinned: false }),
      createNote({ id: '2', isPinned: true }),
      createNote({ id: '3', isPinned: false }),
    ];
    expect(sortNotesByPinned(noteIds, notes)).toEqual(['2', '1', '3']);
  });

  it('should handle mixed pinned/unpinned notes', () => {
    const noteIds = ['1', '2', '3', '4'];
    const notes = [
      createNote({ id: '1', isPinned: true }),
      createNote({ id: '2', isPinned: false }),
      createNote({ id: '3', isPinned: true }),
      createNote({ id: '4', isPinned: false }),
    ];
    expect(sortNotesByPinned(noteIds, notes)).toEqual(['1', '3', '2', '4']);
  });
});

describe('mapNoteToDisplay', () => {
  it('should map note with no labels', () => {
    const note = createNote();
    const labels: Label[] = [];
    const result = mapNoteToDisplay(note, labels);

    expect(result.labels).toEqual([]);
    expect(result.colorId).toBe('default');
    expect(result.colorValue).toBe(null);
    expect(result.id).toBe('1');
    expect(result.title).toBe('Test Note');
    expect(result.content).toBe('Test content');
    expect(result.isPinned).toBe(false);
    expect(result.isArchived).toBe(false);
    expect(result.isTrashed).toBe(false);
    expect(result).not.toHaveProperty('labelIds');
  });

  it('should map note with matching labels', () => {
    const note = createNote({ labelIds: ['label-1', 'label-2'] });
    const labels = [
      createLabel('label-1', 'Work'),
      createLabel('label-2', 'Personal'),
      createLabel('label-3', 'Other'),
    ];
    const result = mapNoteToDisplay(note, labels);

    expect(result.labels).toEqual([
      createLabel('label-1', 'Work'),
      createLabel('label-2', 'Personal'),
    ]);
    expect(result).not.toHaveProperty('labelIds');
  });

  it('should map note with non-matching labels', () => {
    const note = createNote({ labelIds: ['label-1'] });
    const labels = [createLabel('label-2', 'Other')];
    const result = mapNoteToDisplay(note, labels);

    expect(result.labels).toEqual([]);
  });

  it('should include colorValue based on colorId', () => {
    const note = createNote({ colorId: 'coral' });
    const labels: Label[] = [];
    const result = mapNoteToDisplay(note, labels);

    expect(result.colorId).toBe('coral');
    expect(result.colorValue).toBe('#77172e');
  });
});
