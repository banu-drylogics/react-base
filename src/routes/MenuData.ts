import { DataProps } from "./types";

export const MenuData: DataProps[] = [{
  Table: ['Virtualized Table', 'Mock Table', 'Billing Table'],
  Donut: ['Donut View'],
  Counter: [],
  DropDown: ['Search Dropdown', 'TextBox View'],
  DatePicker: []
}];

export const getMenuData = async () => {
  return new Promise<DataProps[]>((resolve) =>
    setTimeout(() => {
      resolve(MenuData);
    }, 2000
    )
  );
};

export const getUpdateIcon = (isHovered: boolean) => {
  return isHovered ? 'fas fa-chevron-up' : 'fas fa-angle-down icon';
};