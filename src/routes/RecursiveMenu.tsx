
import React, { useState } from 'react';
import { Link, Outlet } from "react-router-dom";
import _ from "lodash";
import "./styles.scss";
import '@fortawesome/fontawesome-free/css/all.css';
import { getMenuData, getUpdateIcon } from './MenuData';
import { DataProps } from './types';

interface MenuItemProps {
  label: string;
  options: string[] | [];
};


export async function loader() {
  const data = await getMenuData();
  return { data };
}

const MenuItem = ({ label, options }: MenuItemProps) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const getUrl = (option: string) => {
    return _.kebabCase(option);
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
            <div className={getUpdateIcon(isHovered)}></div>
          )}
        </div>
        {
          isHovered && options.length > 0 && (
            <div className='navigation-menu-dropdown' >
              <ol className='navigation-menu-dropdown__options'>
                {_.map(options, (option, index) => (
                  <li className='navigation-menu-dropdown__option' key={index}>
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

interface RecursiveMenuProps {
  data: DataProps[];
};

const RecursiveMenu = ({ data }: RecursiveMenuProps) => {

  return (
    <>
      <nav className='navigation-container'>
        {_.map(data, (item, index) => (
          <div key={index} className='navigation-container__menus'>
            {_.map(item, (options, key) => (
              <MenuItem key={key} label={key} options={options} />
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
