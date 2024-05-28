import React, { useEffect, useRef } from "react";
import './styles.css'
import { ColType, EditableColType } from "./types";
import { columnConfig } from "./data";


interface RowProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>, id: string) => void;
  addRow: (e: React.KeyboardEvent<HTMLDivElement>, itemInputRef: React.RefObject<HTMLInputElement>) => void;
  record: any;
  setRecord: React.Dispatch<React.SetStateAction<any>>;
}

const InputRow = ({ handleChange, addRow, record, setRecord }: RowProps) => {

  const itemInputRef = React.useRef<HTMLInputElement>(null);

  const getType = (config: ColType) => {
    if (config.id === "items") {
      return "text"
    }
    else {
      return "number"
    }
  }

  useEffect(() => {
    const total = record.price * record.quantity;
    setRecord({ ...record, total })
  }, [record.price, record.quantity]);

  const getRecord = (config: ColType) => {
    if (config.id === "s_no") {
      return '#';
    } else if (config.id === "total") {
      return record["total"];
    }
  }

  return (
    <>
      {columnConfig.map((config) =>
        config.editable ? (
          <td key={config.id} className="table__cell">
            <input type={getType(config)}
              ref={config.id === 'items' ? itemInputRef : undefined}
              value={record[config.id]}
              autoFocus={config.id === 'items'} onChange={(e) => handleChange(e, config.id)}
              onKeyDown={(e) => addRow(e, itemInputRef)}
              required></input>
          </td>
        ) : (
          <td key={config.id}>
            {getRecord(config)}
          </td>
        )
      )}
    </>
  )
}

export default InputRow;