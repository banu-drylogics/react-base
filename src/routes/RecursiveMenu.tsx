
import React, { useState } from 'react';
import { Link, Outlet } from "react-router-dom";
import _ from "lodash";
import "./styles.scss";
import '@fortawesome/fontawesome-free/css/all.css';

interface MenuItemProps {
  label: string;
  options: string[];
};

const MenuItem = ({ label, options }: MenuItemProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const getUrl = (option: string) => {
    return option.toLowerCase().replace(' ', "-");

  }


  return (
    <>
      <div className={`navigation-container__menu ${isHovered ? 'active' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}>
        <div className='navigation-container__menu__header' >
          <div className='navigation-container__menu__header__label'>
            {options.length === 0 ? <Link to={getUrl(label)}>{label}</Link> : label}
          </div>
          {options.length > 0 && (
            <div className={isHovered ? 'fas fa-chevron-up icon' : 'fas fa-angle-down icon'}></div>
          )}
        </div>
        {
          isHovered && options && options.length > 0 && (
            <div className='navigation-menu-dropdown-container' >
              <ol className='navigation-menu-dropdown-container__options'>
                {_.map(options, (option, index) => (
                  <li className='navigation-menu-dropdown-container__option' key={index}>
                    <Link to={getUrl(option)}>{option}</Link>
                  </li>
                ))}
              </ol>
            </div>
          )
        }
      </div >
    </>
  );
};

const RecursiveMenu = ({ data }: any) => {
  return (
    <>
      <nav className='navigation-container'>
        {_.map(data, (item, index) => (
          <div key={index} className='navigation-container__menus'>
            {Object.keys(item).map((key, i) => (
              <MenuItem key={i} label={key} options={item[key]} />
            ))}
          </div>
        ))}
      </nav>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
};

export default RecursiveMenu;
