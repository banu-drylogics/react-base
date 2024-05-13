import './styles.scss';
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Data } from './types';

interface LegendTooltipProps {
  tooltipContent: {
    content: Data;
    position: { x: number, y: number };
  };
};

const LegendTooltip = ({ tooltipContent }: LegendTooltipProps) => {
  // const [style, setStyle] = useState({});

  // useEffect(() => {
  //   setStyle({
  //     position: "absolute",
  //     left: tooltipContent.position.x,
  //     top: tooltipContent.position.y - 50
  //   });
  // }, [tooltipContent.position]);

  return (
    <></>
    // <div className="tooltip" >
    /* <div className='tooltip_header'>Channel Name: <b>{tooltipContent.content.channelName}</b></div>
    <div className='tooltip_value'>Total Value: <b>{tooltipContent.content.value}</b></div> */
    // </div>
  );
}
export default LegendTooltip;