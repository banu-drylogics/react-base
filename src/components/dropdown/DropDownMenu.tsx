import { useState } from "react";
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

  const toggleOption = (option: string) => {
    setSelectedOption(prevSelectedOption =>
      prevSelectedOption === option
        ? '' : option
    );
  };

  const getCheckboxStatus = (item: string) => {
    return selectedOption === item ? "far fa-check-square" : "far fa-square"
  }

  return (
    <div className="dropdown-menu-container">
      <SearchInput data={data} setFilteredOptions={setFilteredOptions} />
      <div className="dropdown-menu-container__list">
        {_.map(filteredOptions, (item, idx) => (
          <div
            className="dropdown-menu-container__list__row"
            key={idx}>
            <i
              className={getCheckboxStatus(item)}
              onClick={() => toggleOption(item)}
            ></i>
            <span className="dropdown-menu-container__list__row__label">{item}</span>
          </div>
        ))}
      </div>
    </div>
  )

};

export default DropDownMenu;
