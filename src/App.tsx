import { Navbar, NotesGrid, Sidebar } from '@/components';

const App = () => {
  return (
    <div className="flex h-screen flex-col">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <NotesGrid />
      </div>
    </div>
  );
};

export default App;
