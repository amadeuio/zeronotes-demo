import { describe, expect, it } from 'vitest';
import { getNoteIdFromPosition, getPositionFromNoteId, getSectionHeight } from './grid';

describe('getSectionHeight', () => {
  it('should calculate height for single column', () => {
    const notesOrder = ['1', '2'];
    const noteHeights = { '1': 100, '2': 150 };
    // col 0: 100 + 16 + 150 = 266
    expect(getSectionHeight(notesOrder, noteHeights, 1)).toBe(266);
  });

  it('should calculate height for multiple columns', () => {
    const notesOrder = ['1', '2', '3', '4', '5', '6', '7'];
    const noteHeights = { '1': 100, '2': 150, '3': 200, '4': 120, '5': 180, '6': 160, '7': 140 };
    // col 0: 100 + 16 + 120 + 16 + 140 = 392
    // col 1: 150 + 16 + 180 = 346
    // col 2: 200 + 16 + 160 = 376
    expect(getSectionHeight(notesOrder, noteHeights, 3)).toBe(392);
  });
});

describe('getPositionFromNoteId', () => {
  it('should calculate position for first note', () => {
    const notesOrder = ['1', '2', '3'];
    const noteHeights = { '1': 100, '2': 150, '3': 200 };

    expect(getPositionFromNoteId('1', notesOrder, noteHeights, 2)).toEqual({
      x: 0,
      y: 0,
    });
  });

  it('should calculate position for note in second column', () => {
    const notesOrder = ['1', '2'];
    const noteHeights = { '1': 100, '2': 150 };

    expect(getPositionFromNoteId('2', notesOrder, noteHeights, 2)).toEqual({
      x: 254, // col 1: 238 + 16
      y: 0,
    });
  });

  it('should calculate y position for notes in second row', () => {
    const notesOrder = ['1', '2', '3'];
    const noteHeights = { '1': 100, '2': 150, '3': 200 };

    expect(getPositionFromNoteId('3', notesOrder, noteHeights, 2)).toEqual({
      x: 0,
      y: 116, // row 1: 100 + 16
    });
  });

  it('should calculate position for non-linear notes order', () => {
    const notesOrder = ['1', '3', '2'];
    const noteHeights = { '1': 100, '2': 150, '3': 200 };

    expect(getPositionFromNoteId('3', notesOrder, noteHeights, 2)).toEqual({
      x: 254, // col 1: 238 + 16
      y: 0,
    });
  });
});

describe('getNoteIdFromPosition', () => {
  it('should find note at position', () => {
    const notesOrder = ['1', '2', '3', '4'];
    const noteHeights = { '1': 100, '2': 150, '3': 200, '4': 120 };

    expect(getNoteIdFromPosition(50, 45, notesOrder, noteHeights, 2)).toBe('1');
    expect(getNoteIdFromPosition(50, 254, notesOrder, noteHeights, 2)).toBe('2');
    expect(getNoteIdFromPosition(160, 45, notesOrder, noteHeights, 2)).toBe('3');
    expect(getNoteIdFromPosition(170, 300, notesOrder, noteHeights, 2)).toBe('4');
  });

  it('should return undefined for positions that do not match any note', () => {
    const notesOrder = ['1', '2', '3'];
    const noteHeights = { '1': 120, '2': 180, '3': 150 };

    expect(getNoteIdFromPosition(200, 260, notesOrder, noteHeights, 2)).toBeUndefined();
    expect(getNoteIdFromPosition(50, -100, notesOrder, noteHeights, 2)).toBeUndefined();
    expect(getNoteIdFromPosition(5000, 10000, notesOrder, noteHeights, 2)).toBeUndefined();
  });

  it('should find note at position in non-linear notes order', () => {
    const notesOrder = ['1', '3', '2', '4'];
    const noteHeights = { '1': 100, '2': 150, '3': 200, '4': 120 };

    expect(getNoteIdFromPosition(50, 45, notesOrder, noteHeights, 2)).toBe('1');
    expect(getNoteIdFromPosition(50, 254, notesOrder, noteHeights, 2)).toBe('3');
    expect(getNoteIdFromPosition(160, 45, notesOrder, noteHeights, 2)).toBe('2');
    expect(getNoteIdFromPosition(220, 300, notesOrder, noteHeights, 2)).toBe('4');
  });
});
