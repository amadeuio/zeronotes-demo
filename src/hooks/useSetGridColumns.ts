import { selectActions, useStore } from '@/store';
import { getGridColumnsFromWidth } from '@/utils';
import { useLayoutEffect, useRef } from 'react';

export const useSetGridColumns = () => {
  const { ui } = useStore(selectActions);
  const containerRef = useRef<HTMLDivElement>(null);
  const currentColumnsRef = useRef<number | null>(null);

  useLayoutEffect(() => {
    const updateColumns = () => {
      if (!containerRef.current) return;

      const containerWidth = containerRef.current.offsetWidth;
      const newColumns = getGridColumnsFromWidth(containerWidth);

      if (currentColumnsRef.current !== newColumns) {
        currentColumnsRef.current = newColumns;
        ui.setGridColumns(newColumns);
      }
    };

    updateColumns();

    const resizeObserver = new ResizeObserver(updateColumns);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, [ui]);

  return containerRef;
};
