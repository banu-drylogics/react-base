import { useEffect, useRef, useState } from "react";
import './styles.scss';
import { Data, ModifiedData } from "./types";
import DrawDonut from "./utils";
import Legend from "./Legend";

interface DonutChartProps {
  data: ModifiedData[];
}

const DonutChart = ({ data }: DonutChartProps) => {

  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      DrawDonut(ref.current, data);
    }
  }, [ref]);

  return (
    <>
      <div className="dount" ref={ref}>
        <Legend />
      </div>
    </>
  );
};

export default DonutChart;