import React, { useState } from "react";
import './styles.css'

const columnsArray = ["S.No", "Items", "Price", "Quantity", "Total"];

const HeaderRow = () => {
  return (
    <thead>
      <tr>
        {
          columnsArray.map((col) =>
            <td className="text-center">{col}</td>
          )
        }
      </tr>
    </thead>
  );
};

interface TableRowProps {
  rownumber: number;
  // setRowNumber: React.Dispatch<React.SetStateAction<number>>;
  onChange: (e: any) => void;
  value: number
};

const columnConfig = [
  { label: "S.No", id: "s_no", editable: false },
  { label: "Items", id: "items", editable: true },
  { label: "Price", id: "price", editable: true },
  { label: "Quantity", id: "quantity", editable: true },
  { label: "Total", id: "total", editable: false }
]

const TableRow = ({ rownumber, onChange }: TableRowProps) => {
  return (
    <tbody>
      {columnConfig.map((config) =>
        config.editable ? (
          <td>
            <input autoFocus={config.id == "items"}
            ></input>
          </td>
        ) : (
          <td>
            {config.id == "s_no" ? rownumber : '0'}
          </td>
        )
      )}
    </tbody>
  )
};

interface BillingTableProps {
  price: number;
  setPrice: React.Dispatch<React.SetStateAction<number>>;
};

const BillingTable = ({ price, setPrice }: BillingTableProps) => {
  const [rownumber, setRowNumber] = useState<number>(1)

  return (
    <div className="table-container">
      <table id="myTable">
        <HeaderRow />
        <TableRow rownumber={rownumber} value={price}
          onChange={(e: any) => setPrice(e.target.value)} />
      </table>
    </div>
  )
};

export default BillingTable