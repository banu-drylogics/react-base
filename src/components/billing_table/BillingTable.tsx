import React, { useEffect, useState } from "react";
import './styles.css'

const columnsArray = ["S.No", "Items", "Price", "Quantity", "Total"];

const HeaderRow = () => {
  return (
    <thead>
      <tr>
        {
          columnsArray.map((col, index) =>
            <td key={index} className="text-center">{col}</td>
          )
        }
      </tr>
    </thead>
  );
};

interface TableRowProps {
  rownumber: number;
};

type EditableField = "items" | "price" | "quantity";
type NonEditableField = "s_no" | "total";
type NonEditableColType = { label: string, id: NonEditableField, editable: false };
type EditableColType = { label: string, id: EditableField, editable: true };
type ColType = NonEditableColType | EditableColType;
type ColState = { items: string, price: number, quantity: number, total: number };
const columnConfig: ColType[] = [
  { label: "S.No", id: "s_no", editable: false },
  { label: "Items", id: "items", editable: true },
  { label: "Price", id: "price", editable: true },
  { label: "Quantity", id: "quantity", editable: true },
  { label: "Total", id: "total", editable: false }
]

const TableRow = ({ rownumber }: TableRowProps) => {
  const [values, setValues] = useState<ColState>({ items: '', price: 0, quantity: 0, total: 0 })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, id: EditableField) => {
    setValues({ ...values, [id]: e.target.value });
  }

  useEffect(() => {
    const total = values.price * values.quantity;
    setValues({ ...values, total })
  }, [values.price, values.quantity]);

  const getValue = (config: ColType) => {
    if (config.id === "s_no") {
      return rownumber;
    } else if (config.id === "total") {
      return values["total"];
    }
  }

  const getType = (config: ColType) => {
    if (config.id === "items") {
      return "text"
    }
    else {
      return "number"
    }
  }

  const updateValue = (e: React.KeyboardEvent<HTMLTableRowElement>) => {
    if (e.key === 'Enter') {
      setValues({ ...values, total: values.price * values.quantity })
    }
  }

  return (
    <tbody>
      <tr onKeyDown={updateValue}>
        {columnConfig.map((config) =>
          config.editable ? (
            <td key={config.id}>
              <input type={getType(config)} autoFocus={config.id === 'items'} onChange={(e) => handleChange(e, config.id)} ></input>
            </td>
          ) : (
            <td key={config.id}>
              {getValue(config)}
            </td>
          )
        )}
      </tr>
    </tbody>
  )
};

const BillingTable = () => {
  const [rownumber, setRowNumber] = useState<number>(1)

  return (
    <div className="table-container">
      <table id="myTable">
        <HeaderRow />
        <TableRow rownumber={rownumber} />
      </table>
    </div>
  )
};

export default BillingTable
