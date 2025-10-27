import { useActions, useLabels, useUi, useView } from '@/store';
import { useState } from 'react';
import SidebarItem from './SidebarItem';

const Sidebar = () => {
  const [isHovered, setIsHovered] = useState(false);
  const labels = useLabels();
  const view = useView();
  const { filters, ui } = useActions();
  const { isSidebarCollapsed } = useUi();

  return (
    <aside
      className="flex h-full flex-col py-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <SidebarItem
        title="Notes"
        url="#"
        iconName="lightbulb_2"
        onClick={() => filters.set({ view: { type: 'notes' } })}
        isActive={view.type === 'notes'}
        isCollapsed={isSidebarCollapsed && !isHovered}
      />
      {labels.map((label) => (
        <SidebarItem
          key={label.id}
          title={label.name}
          url="#"
          iconName="label"
          onClick={() => filters.set({ view: { type: 'label', id: label.id } })}
          isActive={view.type === 'label' && view.id === label.id}
          isCollapsed={isSidebarCollapsed && !isHovered}
        />
      ))}
      <SidebarItem
        title="Edit labels"
        url="#"
        iconName="edit"
        onClick={() => ui.setEditLabelsMenuOpen(true)}
        isCollapsed={isSidebarCollapsed && !isHovered}
      />
      <SidebarItem
        title="Archive"
        url="#"
        iconName="archive"
        onClick={() => filters.set({ view: { type: 'archive' } })}
        isActive={view.type === 'archive'}
        isCollapsed={isSidebarCollapsed && !isHovered}
      />
      <SidebarItem
        title="Trash"
        url="#"
        iconName="delete"
        onClick={() => filters.set({ view: { type: 'trash' } })}
        isActive={view.type === 'trash'}
        isCollapsed={isSidebarCollapsed && !isHovered}
      />
    </aside>
  );
};

export default Sidebar;
