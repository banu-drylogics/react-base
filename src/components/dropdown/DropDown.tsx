import { useEffect, useRef, useState } from 'react';
import './styles.scss';
import '@fortawesome/fontawesome-free/css/all.css';
import { brandData } from './brandsData';
import DropDownMenu from './DropDownMenu';
import { getUpdateIcon } from '../../routes/MenuData';

const DropDown = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const DropdpownButton = () => {
    return (
      <button className="dropdown__button" onClick={() => setIsOpen(!isOpen)}>Dropdown
        <i className={getUpdateIcon(isOpen)}></i>
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
    <div className="dropdown" ref={dropdownRef}>
      <DropdpownButton />
      {isOpen && <DropDownMenu data={brandData} />}
    </div>
  )
};

export default DropDown;
