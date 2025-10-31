import logo from '@/assets/logo.png';
import { IconButton } from '@/components';
import { useActions } from '@/store';
import Search from './Search';
import User from './User';

const Navbar = () => {
  const { ui } = useActions();

  return (
    <nav className="flex h-16 justify-between border-b px-3 py-2">
      <div className="flex flex-1 items-center">
        <IconButton
          iconName="menu"
          label="Main menu"
          size={24}
          onClick={() => ui.toggleSidebar()}
        />
        <div className="mr-22 ml-2 flex items-center gap-x-2">
          <img src={logo} alt="Keep logo" className="size-10" />
          <div className="text-[20px]">Keep</div>
        </div>
        <Search />
      </div>
      <div className="flex items-center gap-x-2">
        <IconButton iconName="settings" label="Settings" size={24} />
        <User />
      </div>
    </nav>
  );
};

export default Navbar;
