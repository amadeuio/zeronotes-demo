import { DndContext, type DragEndEvent } from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';

interface DropProps<T extends { id: string | number }> {
  children: React.ReactNode;
  items: T[];
  setItems: (items: T[]) => void;
}

const Drop = <T extends { id: string | number }>({ children, items, setItems }: DropProps<T>) => {
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over?.id);
      setItems(arrayMove(items, oldIndex, newIndex));
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <SortableContext items={items.map((item) => item.id)}>{children}</SortableContext>
    </DndContext>
  );
};

export default Drop;
