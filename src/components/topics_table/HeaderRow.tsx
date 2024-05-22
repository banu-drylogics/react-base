import './styles.scss';
import * as _ from 'lodash';

interface HeaderProps {
  headers: string[];
}

export const HeaderRow = ({ headers }: HeaderProps) => {
  return (
    <thead>
      <tr>
        {
          _.map(headers, (col: string, index: number) =>
            <th key={index} className="text-center">{col}
            </th>
          )
        }
      </tr>
    </thead>
  )
};
