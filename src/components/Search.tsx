import { MdSearch } from 'react-icons/md';

const Search = () => (
  <div className="flex items-center gap-x-2">
    <MdSearch className="h-5 w-5" />
    <input type="text" placeholder="Search" className="bg-transparent" />
  </div>
);

export default Search;
