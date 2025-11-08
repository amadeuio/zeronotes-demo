import { useStore } from '@/store';
import { selectActions, selectFiltersView, selectLabels, selectUi } from '@/store/selectors';
import { cn } from '@/utils';
import SidebarItem from './SidebarItem';

const Sidebar = () => {
  const labels = useStore(selectLabels);
  const view = useStore(selectFiltersView);
  const { filters, ui } = useStore(selectActions);
  const { isSidebarCollapsed } = useStore(selectUi);

  return (
    <aside
      className={cn(
        'group bg-base fixed left-0 z-10 flex h-full flex-col py-2',
        isSidebarCollapsed && 'hover:shadow-[2px_0_6px_-2px_rgba(0,0,0,0.6)]',
      )}
    >
      <SidebarItem
        title="Notes"
        url="#"
        iconName="lightbulb_2"
        onClick={() => filters.set({ view: { type: 'notes' } })}
        isActive={view.type === 'notes'}
        isCollapsed={isSidebarCollapsed}
      />
      {labels.map((label) => (
        <SidebarItem
          key={label.id}
          title={label.name}
          url="#"
          iconName="label"
          onClick={() => filters.set({ view: { type: 'label', id: label.id } })}
          isActive={view.type === 'label' && view.id === label.id}
          isCollapsed={isSidebarCollapsed}
        />
      ))}
      <SidebarItem
        title="Edit labels"
        url="#"
        iconName="edit"
        onClick={() => ui.setEditLabelsMenuOpen(true)}
        isCollapsed={isSidebarCollapsed}
      />
      <SidebarItem
        title="Archive"
        url="#"
        iconName="archive"
        onClick={() => filters.set({ view: { type: 'archive' } })}
        isActive={view.type === 'archive'}
        isCollapsed={isSidebarCollapsed}
      />
      <SidebarItem
        title="Trash"
        url="#"
        iconName="delete"
        onClick={() => filters.set({ view: { type: 'trash' } })}
        isActive={view.type === 'trash'}
        isCollapsed={isSidebarCollapsed}
      />
    </aside>
  );
};

export default Sidebar;
