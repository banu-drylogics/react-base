import { transformedData } from "./chartData";
import * as _ from 'lodash';

const Legend = () => {

  return (
    <div className="legend">
      <div className="legend__header">Legend:</div>
      <div className="legend__content">
        {_.map(transformedData, (config, idx: number) => (
          <div className="legend__content__name" key={idx}>
            <i className="legend__content__name__box" style={{ backgroundColor: `${config.color}` }}></i>
            {config.channelName}</div>
        ))}
      </div>
    </div >
  );
}

export default Legend;
