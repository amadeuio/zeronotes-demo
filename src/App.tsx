import { EditLabelsModal, Main, Navbar, NoteActive, Sidebar } from '@/components';
import { useActions, useActiveNoteId, useUi } from '@/store';

const App = () => {
  const { isEditLabelsMenuOpen } = useUi();
  const activeNoteId = useActiveNoteId();
  const { ui } = useActions();

  return (
    <div className="flex h-screen flex-col">
      <Navbar />
      <div className="flex gap-x-8">
        <Sidebar />
        <Main />
      </div>
      {isEditLabelsMenuOpen && <EditLabelsModal onClose={() => ui.setEditLabelsMenuOpen(false)} />}
      {activeNoteId && <NoteActive />}
    </div>
  );
};

export default App;
