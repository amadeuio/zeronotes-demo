import { describe, expect, it } from 'vitest';
import { getNoteIdFromPosition, getPositionFromNoteId, getSectionHeight } from './grid';

describe('getSectionHeight', () => {
  it('should calculate height for single column', () => {
    const notesOrder = ['1', '2'];
    const noteHeights = { '1': 100, '2': 150 };
    const gridColumns = 1;
    expect(getSectionHeight(notesOrder, noteHeights, gridColumns)).toBe(266);
  });

  it('should calculate height for multiple gridColumns', () => {
    const notesOrder = ['1', '2', '3', '4', '5', '6', '7'];
    const noteHeights = { '1': 100, '2': 150, '3': 200, '4': 120, '5': 180, '6': 160, '7': 140 };
    const gridColumns = 3;
    expect(getSectionHeight(notesOrder, noteHeights, gridColumns)).toBe(392);
  });
});

describe('getPositionFromNoteId', () => {
  it('should calculate position correctly', () => {
    const notesOrder = ['1', '2', '3'];
    const noteHeights = { '1': 100, '2': 150, '3': 200 };
    const gridColumns = 2;

    expect(getPositionFromNoteId('1', notesOrder, noteHeights, gridColumns)).toEqual({
      x: 0,
      y: 0,
    });
    expect(getPositionFromNoteId('2', notesOrder, noteHeights, gridColumns)).toEqual({
      x: 254,
      y: 0,
    });
    expect(getPositionFromNoteId('3', notesOrder, noteHeights, gridColumns)).toEqual({
      x: 0,
      y: 116,
    });
  });

  it('should calculate position for non-linear notes order', () => {
    const notesOrder = ['1', '3', '2'];
    const noteHeights = { '1': 100, '2': 150, '3': 200 };
    const gridColumns = 2;

    expect(getPositionFromNoteId('3', notesOrder, noteHeights, gridColumns)).toEqual({
      x: 254,
      y: 0,
    });
  });
});

describe('getNoteIdFromPosition', () => {
  it('should find note at position', () => {
    const notesOrder = ['1', '2', '3', '4'];
    const noteHeights = { '1': 100, '2': 150, '3': 200, '4': 120 };
    const gridColumns = 2;

    expect(getNoteIdFromPosition(50, 45, notesOrder, noteHeights, gridColumns)).toBe('1');
    expect(getNoteIdFromPosition(50, 254, notesOrder, noteHeights, gridColumns)).toBe('2');
    expect(getNoteIdFromPosition(160, 45, notesOrder, noteHeights, gridColumns)).toBe('3');
    expect(getNoteIdFromPosition(170, 300, notesOrder, noteHeights, gridColumns)).toBe('4');
  });

  it('should return undefined for positions that do not match any note', () => {
    const notesOrder = ['1', '2', '3'];
    const noteHeights = { '1': 120, '2': 180, '3': 150 };
    const gridColumns = 2;

    expect(getNoteIdFromPosition(200, 260, notesOrder, noteHeights, gridColumns)).toBeUndefined();
    expect(getNoteIdFromPosition(50, -100, notesOrder, noteHeights, gridColumns)).toBeUndefined();
    expect(
      getNoteIdFromPosition(5000, 10000, notesOrder, noteHeights, gridColumns),
    ).toBeUndefined();
  });

  it('should find note at position in non-linear notes order', () => {
    const notesOrder = ['1', '3', '2', '4'];
    const noteHeights = { '1': 100, '2': 150, '3': 200, '4': 120 };
    const gridColumns = 2;

    expect(getNoteIdFromPosition(50, 45, notesOrder, noteHeights, gridColumns)).toBe('1');
    expect(getNoteIdFromPosition(50, 254, notesOrder, noteHeights, gridColumns)).toBe('3');
    expect(getNoteIdFromPosition(160, 45, notesOrder, noteHeights, gridColumns)).toBe('2');
    expect(getNoteIdFromPosition(220, 300, notesOrder, noteHeights, gridColumns)).toBe('4');
  });
});
