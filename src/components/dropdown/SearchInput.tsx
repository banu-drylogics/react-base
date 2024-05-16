import '@fortawesome/fontawesome-free/css/all.css';
import './styles.scss';
import { useEffect, useRef, useState } from 'react';

interface SearchInputProps {
  setFilteredOptions: React.Dispatch<React.SetStateAction<string[]>>;
  data: string[];
  // handleSearchKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>, searchText: string) => void;
}

const SearchInput = ({ data, setFilteredOptions }: SearchInputProps) => {
  const [searchText, setSearchText] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSearchKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      updateFilteredOptions();
    }
  };

  const updateFilteredOptions = () => {
    const filtered = data.filter(option =>
      option.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredOptions(filtered);
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSearchText(event.target.value);
  };

  useEffect(() => {
    updateFilteredOptions();
  }, [data]);

  return (
    <div className="input-container" ref={searchInputRef}>
      <i className="search-icon fas fa-search icon"></i>
      <textarea typeof="text" className='input-container__textarea'
        placeholder='search' onChange={handleSearchChange}
        onKeyDown={handleSearchKeyDown}
        autoFocus >
      </textarea>
    </div>
  )
};

export default SearchInput;
