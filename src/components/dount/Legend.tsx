import { updatedData } from "./chartdata";
import _ from 'lodash';

const Legend = () => {

  return (
    <div className="legend-container">
      <div className="legend-container__header">Legend:</div>
      <div className="legend-container__content">
        {_.map(updatedData, (config, idx: number) => (
          <div className="legend-container__content__name" key={idx}>
            <i className="legend-container__content__name__box" style={{ backgroundColor: `${config.color}` }}></i>
            {config.channelName}</div>
        ))}
      </div>
    </div >
  );
}

export default Legend;