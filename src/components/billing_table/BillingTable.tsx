import React, { useState } from "react";
import InputRow from "./InputRow";
import Row from "./Row";
import { columnConfig, useFetchData } from "./data";
import './styles.css';
import { ColState, ColType, } from "./types";
var _ = require('lodash');

const columnsArray = ["S.No", "Items", "Price", "Quantity", "Total"];
interface HeaderRowProps {
  getCol: (col: string) => void;
}

const HeaderRow = ({ getCol }: HeaderRowProps) => {

  return (
    <thead>
      <tr className="table__row">
        {
          _.map(columnsArray, (col: string, index: number) =>
            <td key={index} className="table__cell" onClick={() => getCol(col)}>{col}
            </td>
          )
        }
      </tr>
    </thead>
  );
};

const INITIAL_STATE: ColState = { items: '', price: 0, quantity: '0', total: 0 }

interface TableRowsProps {
  sortedRecords: ColState[];
  setCollectedRecords: React.Dispatch<React.SetStateAction<ColState[]>>;
}

const TableRows = ({ setCollectedRecords, sortedRecords }: TableRowsProps) => {
  const [record, setRecord] = useState<ColState>(INITIAL_STATE);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    setRecord({ ...record, [id]: e.target.value });
  }

  const addRow = (e: React.KeyboardEvent<HTMLDivElement>, itemInputRef: React.RefObject<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const isDataValid = (Object.values(record).every((ele) => ele !== 0 && ele !== ''))
      if (isDataValid) {
        setCollectedRecords([{ ...record }, ...sortedRecords]);
        setRecord(INITIAL_STATE);
        itemInputRef.current?.focus();
      }
    }
  }

  return (
    <tbody>
      {_.map(sortedRecords, (rec: ColState, index: number) =>
        <tr key={index} className="table__row" >
          <Row index={index} record={rec} />
        </tr>
      )}
      <tr className="table__row">
        <InputRow handleChange={(e, id) => handleChange(e, id)} record={record} addRow={(e, itemInputRef) => addRow(e, itemInputRef)} setRecord={setRecord} />
      </tr>
    </tbody>
  )
};

const BillingTable = () => {
  const [collectedRecords, setCollectedRecords] = React.useState<ColState[]>([]);
  const isFetching = useFetchData({ setCollectedRecords });
  const [defaultColumn, setColumn] = useState<string>('total');
  const [order, setOrder] = useState<string>('desc');

  const getTotal = () => {
    const totalValue = collectedRecords.reduce((n, { total }) => n + total, 0);
    return _.round(totalValue, 2);
  };

  const sortRecords = (col: string, order: string) => {
    const key = col.toLowerCase();
    const allRecords = _.orderBy(collectedRecords, (rec: ColState) => rec[key], order)
    return allRecords;
  }

  const getQuantity = () => {
    const totalQuantity = collectedRecords.reduce((n, { quantity }) => n + parseInt(quantity), 0);
    return totalQuantity;
  };

  const getItems = () => {
    const uniqItems = _.uniq(_.map(collectedRecords, (rec: ColState) => rec.items));
    return uniqItems.length;
  };

  const getCol = (col: string) => {
    const isSortable = _.find(columnConfig, (config: ColType) => config.label === col).sortable;
    if (isSortable) {
      setColumn(col);
      (order === 'asc') ? setOrder('desc') : setOrder('asc');
      sortRecords(col, order);
    };
  };

  if (isFetching) {
    return <div className="loader">Loading ...</div>
  }

  return (
    <div className="table">
      <table className="table__table">
        <HeaderRow getCol={(col) => getCol(col)} />
        <TableRows sortedRecords={sortRecords(defaultColumn, order)} setCollectedRecords={setCollectedRecords} />
      </table>
      <div>Quantity: {getQuantity()}</div>
      <div>Items: {getItems()}</div>
      <div>Total: {getTotal()}</div>
    </div>
  )
};


export default BillingTable
