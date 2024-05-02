import { FixedSizeList as List } from 'react-window';
import { headerConfig, jsonData } from './mockdata';
import './styles.css';

const HeaderRow = () => {
  return (
    <thead>
      <tr>
        {headerConfig.map((config, idx) => (
          <th key={idx} id={config.id}>{config.label}</th>
        ))}
      </tr>
    </thead>
  )
}

const Rows = ({ index }: RowProps) => {
  const rowData = jsonData[index];
  return (
    <tbody>
      <tr>
        {
          headerConfig.map((config, idx) =>
            <td id={config.id} key={idx}>{rowData[config.label]}</td>
          )
        }
      </tr>
    </tbody>

  )
}

interface RowProps {
  index: number;
  style?: React.CSSProperties;
}

const Row = ({ index, style }: RowProps) => (
  <div className={index % 2 ? 'ListItemOdd' : 'ListItemEven'} style={style}>
    {
      index === 0 ? <HeaderRow /> : <Rows index={index} />
    }
  </div>
);


const VirtualizedTable = () => {
  return (
    <List
      className="List"
      height={1000}
      itemCount={50}
      itemSize={130}
      width="80%"
      
    >
      {Row}
    </List>
  )

}

export default VirtualizedTable;
