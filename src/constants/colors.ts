export const NOTE_COLORS = {
  DEFAULT: {
    value: null,
    label: 'Default',
  },
  CORAL: {
    value: '#77172e',
    label: 'Coral',
  },
  PEACH: {
    value: '#692b17',
    label: 'Peach',
  },
  SAND: {
    value: '#7c4a03',
    label: 'Sand',
  },
  MINT: {
    value: '#264d3b',
    label: 'Mint',
  },
  SAGE: {
    value: '#0c625d',
    label: 'Sage',
  },
  FOG: {
    value: '#256377',
    label: 'Fog',
  },
  STORM: {
    value: '#284255',
    label: 'Storm',
  },
  DUSK: {
    value: '#472e5b',
    label: 'Dusk',
  },
  BLOSSOM: {
    value: '#6c394f',
    label: 'Blossom',
  },
  CLAY: {
    value: '#4b443a',
    label: 'Clay',
  },
  CHALK: {
    value: '#232427',
    label: 'Chalk',
  },
} as const;

export type NoteColor = (typeof NOTE_COLORS)[keyof typeof NOTE_COLORS];
