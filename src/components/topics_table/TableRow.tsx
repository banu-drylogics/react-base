import { columnConfig } from "./data";
import { ColState } from "./types";
import _ from "lodash";

interface TableRowProps {
  records: ColState[];
}

export const TableRow = ({ records }: TableRowProps) => {
  return (
    <tbody>
      {_.map(records, (rec: ColState, index: number) =>
        <tr key={index} className='topics-table__row'>
          {columnConfig.map((config) =>
            <td key={config.id} className="topics-table__header-cell">
              {rec[config.id]}
            </td>
          )}
        </tr>
      )}
    </tbody>
  )
};
