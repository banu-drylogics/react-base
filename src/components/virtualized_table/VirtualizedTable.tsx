import { headerConfig, jsonData } from './mockdata';
import { Column, Table, AutoSizer } from 'react-virtualized';
import './styles.css';

const VirtualizedTable = () => {
  return (
    <div className='table' style={{ height: '80vh', width: '90%' }}>
      <AutoSizer>
        {({ height, width }) => (
          <Table
          className='table__body'
            width={width}
            height={height}
            headerHeight={50}
            rowHeight={30}
            rowCount={jsonData.length}
            rowGetter={({ index }) => jsonData[index]}
          >
            {headerConfig.map((config, index) => (
              <Column
              className='table__header'
                key={index}
                label={config.label}
                dataKey={config.label}
                width={200}
              />
            ))}
          </Table>
        )}
      </AutoSizer>
    </div>
  )

}

export default VirtualizedTable;
