import { useEffect, useState } from "react";
import SearchInput from "./SearchInput";
import './styles.scss';
import '@fortawesome/fontawesome-free/css/all.css';

interface DropDownListProps {
  data: string[];
}

const DropDownList = ({ data }: DropDownListProps) => {
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>('')

  const toggleOption = (option: string) => {
    setSelectedOption(prevSelectedOption =>
      prevSelectedOption === option
        ? '' : option
    );
  };

  return (
    <div className="dropdown-menu-container">
      <SearchInput data={data} setFilteredOptions={setFilteredOptions} />
      <div className="dropdown-menu-container__list">
        {filteredOptions.map((item, idx) => (
          <div
            className={`dropdown-menu-container__list__row ${selectedOption === item ? 'selected' : ''}`}
            key={idx}>
            <i
              className={
                selectedOption === item
                  ? "far fa-check-square"
                  : "far fa-square"
              }
              onClick={() => toggleOption(item)}
            ></i>
            <span className="">{item}</span>
          </div>
        ))}
      </div>
    </div>
  )

};

export default DropDownList;
