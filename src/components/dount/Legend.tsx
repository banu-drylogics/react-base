import { colors, legendNames } from "./chartdata";
import _ from 'lodash';

const Legend = () => {
  return (
    <div className="legend-container">
      <div className="legend-container_header">Legend:</div>
      <div className="legend-container_content">
        {_.map(legendNames, (name: string, idx: number) => (
          <div className="legend-container_content_name" key={idx}>
            <i className="legend-container_content_name_box" style={{ backgroundColor: `${colors[idx]}` }}></i>
            {name}</div>
        ))}
      </div>
    </div >
  );
}

export default Legend;