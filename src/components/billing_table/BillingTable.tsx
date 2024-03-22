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
};

type ColType = { label: string, id: string, editable: boolean };
type ColState = { price: number, quantity: number, total: number };
const columnConfig: ColType[] = [
  { label: "S.No", id: "s_no", editable: false },
  { label: "Items", id: "items", editable: true },
  { label: "Price", id: "price", editable: true },
  { label: "Quantity", id: "quantity", editable: true },
  { label: "Total", id: "total", editable: false }
]

const TableRow = ({ rownumber }: TableRowProps) => {
  const [values, setValues] = useState<ColState>({ price: 0, quantity: 0, total: 0 })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> , id: string) =>{
    setValues({...values, [id]: e.target.value})
  }
  const getValue = (config: ColType) => {
    if (config.id === "s_no") {
      return rownumber;
    } else if (config.id === "total") {
      return values["total"];
    }
  }

  const getType = (config: ColType) => {
    if (config.id === "items"){
      return "text"
    }
    else{
      return "number"
    }
  }

  const updateValue = (e: React.KeyboardEvent<HTMLTableRowElement>) => {
    if (e.key === 'Enter') {
      setValues({...values, total: values.price * values.quantity})
    }
  }

  return (
    <tbody>
      <tr onKeyDown={ (e) => updateValue(e)  }>
      {columnConfig.map((config) =>
        config.editable ? (

          <td>
            <input type={getType(config)} autoFocus={config.id === 'items'} onChange={(e) => handleChange(e, config.id) } ></input>
          </td>
        ) : (
          <td>
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