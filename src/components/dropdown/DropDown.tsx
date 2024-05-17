import { useEffect, useRef, useState } from 'react';
import './styles.scss';
import '@fortawesome/fontawesome-free/css/all.css';
import { brandData } from './brandsData';
import DropDownMenu from './DropDownMenu';

const DropDown = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const Button = () => {
    return (
      <button className="dropdown-container__button" onClick={() => setIsOpen(!isOpen)}>Dropdown
        <i className={isOpen ? 'fas fa-chevron-up' : 'fas fa-angle-down icon'}></i>
      </button>
    )
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div className="dropdown-container" ref={dropdownRef}>
      <Button />
      {isOpen && <DropDownMenu data={brandData} />}
    </div>
  )
};

export default DropDown;
