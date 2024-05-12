import React, { useEffect, useRef, useState } from "react";
import DrawDonut from "./DrawDonut";
import { Data } from "./types";
import './styles.scss';
import Legend from "./Legend";
import LegendTooltip from "./LegendTooltip";

interface DonutChartProps {
  data: Data[];
}

const DonutChart = ({ data }: DonutChartProps) => {
  const [tooltipContent, setTooltipContent] = useState(null);

  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      debugger
      DrawDonut(ref.current, data, setTooltipContent);
    }
  }, [ref]);

  return (
    <>
      <div className="dount" ref={ref}>
        <Legend />
        {tooltipContent && <LegendTooltip tooltipContent={tooltipContent} />}
      </div>
    </>
  );
};

export default DonutChart;