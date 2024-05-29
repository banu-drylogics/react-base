import '@fortawesome/fontawesome-free/css/all.css';
import './styles.scss';
import _ from 'lodash';
import { useEffect, useRef, useState } from 'react';

interface SearchInputProps {
  data: string[];
  setFilteredOptions: React.Dispatch<React.SetStateAction<string[]>>;
  ref: React.RefObject<HTMLTextAreaElement>
}

const SearchInput = ({ data, setFilteredOptions, ref }: SearchInputProps) => {
  const [searchText, setSearchText] = useState('');

  const handleSearchKeyEnter = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      updateFilteredOptions();
    }
  };

  const updateFilteredOptions = () => {
    const filtered = _.filter(data, (option =>
      option.toLowerCase().includes(searchText.toLowerCase())
    ));
    setFilteredOptions(filtered);
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSearchText(event.target.value);
  };

  useEffect(() => {
    updateFilteredOptions();
  }, [data]);

  return (
    <div className="search-input">
      <i className="search-icon fas fa-search icon"></i>
      <textarea
        typeof="text"
        className="search-input__textarea"
        onKeyDown={handleSearchKeyEnter}
        placeholder="Search..."
        ref={ref}
        onChange={handleInputChange}
        autoFocus
      />
    </div>
  )
};

export default SearchInput;
