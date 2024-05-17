import { useEffect, useRef, useState } from "react";
import './styles.scss';
import { ModifiedData } from "./types";
import DrawDonut from "./utils";
import Legend from "./Legend";
import ChartTooltip from "./ChartTooltip";

interface DonutChartProps {
  data: ModifiedData[];
}

const DonutChart = ({ data }: DonutChartProps) => {
  const ref = useRef(null);
  const [tooltipContent, setTooltipContent] = useState<{
    content: ModifiedData[]; el: SVGPathElement;
    hoveredData: ModifiedData
  } | null>(null);

  useEffect(() => {
    if (ref.current) {
      DrawDonut(ref.current, data, setTooltipContent);
    }
  }, [ref]);

  return (
    <div className="dount" ref={ref}>
      <Legend />
      {tooltipContent && <ChartTooltip tooltipContent={tooltipContent} />}
    </div>
  );
};

export default DonutChart;
