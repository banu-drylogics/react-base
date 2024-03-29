import React from "react";
import { columnConfig } from "./data";
import { ColType } from "./types";


interface NonEditableRowProps {
  index: number;
  record: any;
}

const NonEditableRow = ({ index, record }: NonEditableRowProps) => {

  const getRecord = (config: ColType, index: number) => {
    if (config.id === "s_no") {
      return index + 1;
    } else {
      return record[config.id];
    }
  };

  return (
    <>
      {columnConfig.map((config) =>
        <td key={config.id}>
          {getRecord(config, index)}
        </td>
      )}
    </>
  )

};

export default NonEditableRow