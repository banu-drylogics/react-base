import './TopicsTable.scss';
import * as _ from 'lodash';

interface HeaderProps {
  headers: string[];
}

export const HeaderRow = ({ headers }: HeaderProps) => {
  return (
    <thead>
      <tr className='topics-table__row'>
        {
          _.map(headers, (col: string, index: number) =>
            <th key={index} className="topics-table__header-cell">{col}
            </th>
          )
        }
      </tr>
    </thead>
  )
};
