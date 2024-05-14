import { colors, legendNames } from "./chartdata";
import _ from 'lodash';

const Legend = () => {
  return (
    <div className="legend">
      <div className="legend_header">Legend:</div>
      <div className="legend_content">
        {_.map(legendNames, (name: string, idx: number) => (
          <div className="legend_content_name" key={idx}>
            <i className="legend_content_name_box" style={{ backgroundColor: `${colors[idx]}` }}></i>
            {name}</div>
        ))}
      </div>
    </div >
  );
}

export default Legend;