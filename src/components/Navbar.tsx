import { Icon, Search } from '@/components';

const Navbar = () => (
  <nav className="flex items-center justify-between p-4">
    <div className="flex items-center gap-x-2">
      <Icon name="menu" />
      <div className="font-semibold">Keep</div>
      <Search />
    </div>
    <div className="flex items-center gap-x-2">
      <Icon name="settings" />
    </div>
  </nav>
);

export default Navbar;
