import { updatedData } from "./chartdata";
import { Data } from "./types";

const Legend = () => {

  return (
    <div className="legend-container">
      {updatedData.map((data: Data, index: number) => (
        <span key={index}>
          {` ${data.channelName}`}
        </span>
      ))}
    </div>
  )

}

export default Legend;