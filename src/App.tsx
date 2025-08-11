import { EditLabelsMenu, Navbar, NotesGrid, Sidebar } from '@/components';
import { useActions, useUi } from '@/store';

const App = () => {
  const { isEditLabelsMenuOpen } = useUi();
  const { ui } = useActions();

  return (
    <div className="flex h-screen flex-col">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <NotesGrid />
      </div>
      {isEditLabelsMenuOpen && <EditLabelsMenu onClose={() => ui.setEditLabelsMenuOpen(false)} />}
    </div>
  );
};

export default App;
