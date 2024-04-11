import React, { useEffect, useState } from "react";
import './styles.css'
import { ColState } from "./types";
import InputRow from "./InputRow";
import Row from "./Row";
import { allReports } from "./data";
var _ = require('lodash');


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

const INITIAL_STATE: ColState = { items: '', price: 0, quantity: '0', total: 0 }

interface TableRowsProps {
  collectedRecords: ColState[];
  setCollectedRecords: React.Dispatch<React.SetStateAction<ColState[]>>;
}

const TableRows = ({ collectedRecords, setCollectedRecords }: TableRowsProps) => {
  const [record, setRecord] = useState<ColState>(INITIAL_STATE);

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
          <Row index={index} record={rec} />
        </tr>
      )}
      <tr>
        <InputRow handleChange={(e, id) => handleChange(e, id)} record={record} addRow={(e, itemInputRef) => addRow(e, itemInputRef)} setRecord={setRecord} />
      </tr>
    </tbody>
  )
};

const fetchData = () => {
  return new Promise<ColState[]>((resolve) =>
    setTimeout(() => {
      resolve(allReports);
    }, 2000
    )
  );
}

const BillingTable = () => {
  const [collectedRecords, setCollectedRecords] = React.useState<ColState[]>([]);

  const updateTable = async () => {
    fetchData().then((data) => setCollectedRecords(data));
  }

  useEffect(() => {
    updateTable();
  }, []);

  const getTotal = () => {
    const totalValue = collectedRecords.reduce((n, { total }) => n + total, 0);
    return _.round(totalValue, 2);
  };

  const getQuantity = () => {
    const totalQuantity = collectedRecords.reduce((n, { quantity }) => n + parseInt(quantity), 0);
    return totalQuantity;

  };

  const getItems = () => {
    const uniqItems = _.uniq(_.map(collectedRecords, (rec: ColState) => rec.items));
    return uniqItems.length;
  }


  return (
    <div className="table-container">
      <table id="myTable">
        <HeaderRow />
        <TableRows collectedRecords={collectedRecords} setCollectedRecords={setCollectedRecords} />
      </table>
      <div>Quantity: {getQuantity()}</div>
      <div>Items: {getItems()}</div>
      <div>Total: {getTotal()}</div>
    </div>
  )
};


export default BillingTable
