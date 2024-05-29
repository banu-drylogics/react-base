import { useEffect, useRef, useState } from "react";
import SearchInput from "./SearchInput";
import './styles.scss';
import '@fortawesome/fontawesome-free/css/all.css';
import _ from 'lodash';

interface DropDownMenuProps {
  data: string[];
}

const DropDownMenu = ({ data }: DropDownMenuProps) => {
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>('')
  const searchInputRef = useRef<HTMLTextAreaElement>(null);
  const optionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggleOption = (option: string) => {
    setSelectedOption(prevSelectedOption =>
      prevSelectedOption === option
        ? '' : option
    );
  };

  const getCheckboxStatus = (item: string) => {
    return selectedOption === item ? "far fa-check-square" : "far fa-square"
  };

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.addEventListener('keydown', handleSearchInputKeyDown);
    }

    return () => {
      if (searchInputRef.current) {
        searchInputRef.current.removeEventListener('keydown', handleSearchInputKeyDown);
      }
    };
  }, [filteredOptions]);

  const handleSearchInputKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      if (optionRefs.current.length > 0) {
        optionRefs.current[0]?.focus();
      }
    }
  };

  const handleOptionKeyDown = (event: React.KeyboardEvent<HTMLDivElement>, index: number) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      if (event.shiftKey) {
        if (index === 0) {
          searchInputRef.current?.focus();
        } else {
          optionRefs.current[index - 1]?.focus();
        }
      } else {
        const nextIndex = (index + 1) % optionRefs.current.length;
        optionRefs.current[nextIndex]?.focus();
      }
    } else if (event.key === 'Enter') {
      event.preventDefault();
      toggleOption(filteredOptions[index]);
    }
  };

  return (
    <div className="dropdown-menu">
      <SearchInput data={data} setFilteredOptions={setFilteredOptions} ref={searchInputRef} />
      <div className="dropdown-menu__list">
        {_.map(filteredOptions, (item, idx) => (
          <div
            className="dropdown-menu__list__row"
            key={idx}
            tabIndex={0}
            ref={el => optionRefs.current[idx] = el}
            onKeyDown={(e) => handleOptionKeyDown(e, idx)}
          >
            <i
              className={getCheckboxStatus(item)}
              onClick={() => toggleOption(item)}
            ></i>
            <span className="dropdown-menu__list__row__label">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DropDownMenu;

