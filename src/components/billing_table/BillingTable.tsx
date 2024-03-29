import React, { useEffect, useState } from "react";
import './styles.css'
import Row from "./Row";
import { EditableColType } from "./types";
import NonEditableRow from "./NonEditableRow";


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

type ColState = { items: string, price: number, quantity: number, total: number };
const INITIAL_STATE: ColState = { items: '', price: 0, quantity: 0, total: 0 }

const TableRows = () => {
  const [record, setRecord] = useState<ColState>(INITIAL_STATE);
  const [collectedRecords, setCollectedRecords] = React.useState<ColState[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    setRecord({ ...record, [id]: e.target.value });
  }

  const addRow = (e: React.KeyboardEvent<HTMLDivElement>, itemInputRef: React.RefObject<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const isDataValid = (Object.values(record).every((ele) => ele !== 0 && ele !== ''))
      if (isDataValid) {
        setCollectedRecords([{ ...record }, ...collectedRecords]);
        setRecord(INITIAL_STATE);
        itemInputRef.current?.focus();
      }
    }
  }
  return (
    <tbody>
      {collectedRecords.map((rec, index) =>
        <tr key={index} >
          <NonEditableRow index={index} record={rec} />
        </tr>
      )}
      <tr>
        <Row handleChange={(e, id) => handleChange(e, id)} record={record} addRow={(e, itemInputRef) => addRow(e, itemInputRef)} setRecord={setRecord} />
      </tr>
    </tbody>
  )
};

const BillingTable = () => {

  return (
    <div className="table-container">
      <table id="myTable">
        <HeaderRow />
        <TableRows />
      </table>
    </div>
  )
};


export default BillingTable
