import { EditLabelsModal, Main, Navbar, NoteActive, Sidebar } from '@/components';
import { useStore } from '@/store';
import { selectActions, selectActiveNoteId, selectUi } from '@/store/selectors';
import { cn } from './utils';

const App = () => {
  const { isEditLabelsMenuOpen, isSidebarCollapsed } = useStore(selectUi);
  const activeNoteId = useStore(selectActiveNoteId);
  const { ui } = useStore(selectActions);

  return (
    <div className="flex h-screen flex-col">
      <Navbar />
      <div className={cn('flex flex-1', isSidebarCollapsed ? 'pl-18' : 'pl-70')}>
        <Sidebar />
        <Main />
      </div>
      {isEditLabelsMenuOpen && <EditLabelsModal onClose={() => ui.setEditLabelsMenuOpen(false)} />}
      {activeNoteId && <NoteActive />}
    </div>
  );
};

export default App;
