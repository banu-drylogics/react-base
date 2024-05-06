import { columnConfig } from "./data";
import { ColState } from "./types";
var _ = require('lodash');


interface TableRowProps {
  records: ColState[];
}

export const TableRow = ({ records }: TableRowProps) => {
  return (
    <tbody>
      {_.map(records, (rec: ColState, index: number) =>
        <tr key={index} >
          {columnConfig.map((config) =>
            <td key={config.id}>
              {rec[config.id]}
            </td>
          )}
        </tr>
      )}
    </tbody>
  )

}