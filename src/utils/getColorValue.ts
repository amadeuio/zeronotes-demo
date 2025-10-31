import { COLORS } from '@/constants';

export const getColorValue = (colorId: string) =>
  COLORS.find((item) => item.id === colorId)?.value ?? null;
