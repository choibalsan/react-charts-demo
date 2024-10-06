import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import {ViewBy} from "./SwitchControl.tsx";

type PositionsTableProps = {
  data?: Map<string, number>;
  viewBy: string;
};

const PositionsTable: React.FC<PositionsTableProps> = ({data,viewBy}) => {
  const columnDefs = [
    {headerName: (viewBy === ViewBy.assetClass ? 'Type' : 'Asset'), field: 'label'},
    {headerName: 'Balance', field: 'value'}
  ];

  return (
      <div className="ag-theme-alpine" style={{height: 400, width: '100%'}}>
        <AgGridReact rowData={data ? Array.from(data, ([label, value]) => ({label, value})) : []}
                     columnDefs={columnDefs}/>
      </div>
  );
};

export default PositionsTable;
