import { Icon } from '@/components';

const Search = () => (
  <div className="flex items-center gap-x-2">
    <Icon name="search" />
    <input type="text" placeholder="Search" className="bg-transparent" />
  </div>
);

export default Search;
