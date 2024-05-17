import '@fortawesome/fontawesome-free/css/all.css';
import './styles.scss';
import { useEffect, useRef, useState } from 'react';

interface SearchInputProps {
  data: string[];
  setFilteredOptions: React.Dispatch<React.SetStateAction<string[]>>;
}

const SearchInput = ({ data, setFilteredOptions }: SearchInputProps) => {
  const [searchText, setSearchText] = useState('');

  const handleSearchKeyEnter = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
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

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSearchText(event.target.value);
  };

  useEffect(() => {
    updateFilteredOptions();
  }, [data]);

  return (
    <div className="input-container">
      <i className="search-icon fas fa-search icon"></i>
      <textarea typeof="text" className='input-container__textarea'
        placeholder='search' onChange={handleInputChange}
        onKeyDown={handleSearchKeyEnter}
        autoFocus >
      </textarea>
    </div>
  )
};

export default SearchInput;
