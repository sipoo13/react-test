import { ModuleRegistry } from '@ag-grid-community/core';
import { InfiniteRowModelModule } from '@ag-grid-community/infinite-row-model';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/styles/ag-grid.css';
import '@ag-grid-community/styles/ag-theme-quartz.css';
import { Typography } from '@material-tailwind/react';
import React, { useCallback, useMemo, useState } from 'react';

ModuleRegistry.registerModules([InfiniteRowModelModule]);

const ProductsTable = () => {
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '400px', width: '100%' }), []);

  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: 'ID',
      field: 'id_product',
      maxWidth: 100,
      cellRenderer: (props) => {
        if (props.value !== undefined) {
          return props.value;
        } else {
          return <img src="https://www.ag-grid.com/example-assets/loading.gif" />;
        }
      },
    },
    {
      headerName: 'Название продукта',
      field: 'product_name'
    },
    {
      headerName: 'Цена',
      field: 'price'
    },
    {
      headerName: 'Дата создания',
      field: 'created_at',
      cellRenderer: (params) => {
        const date = new Date(params.value);
        return date.toLocaleDateString();
      }
    },
    {
      headerName: 'Количество',
      field: 'quantity'
    }
  ]);

  const defaultColDef = useMemo(() => ({
    flex: 1,
    minWidth: 100,
    sortable: false,
  }), []);

  const onGridReady = useCallback((params) => {
    const dataSource = {
      rowCount: undefined,
      getRows: (params) => {
        console.log('asking for ' + params.startRow + ' to ' + params.endRow);
        const limit = params.endRow - params.startRow;
        const offset = params.startRow; fetch(`http://localhost:3001/products_limit?limit=${limit}&offset=${offset}`)
          .then((resp) => resp.json())
          .then((data) => {
            const rowsThisPage = data.slice(0, limit); let lastRow = -1;
            if (data.length < limit) {
              lastRow = offset + data.length;
            }
            params.successCallback(rowsThisPage, lastRow);
          }).catch((error) => {
            console.error('Error fetching product options:', error);
            params.failCallback();
          });
      },
    };
    params.api.setGridOption('datasource', dataSource);
  }, []);

  return (
    <div>
      <Typography variant="h5" color="blue-gray" className="mb-3">
        Продукты
      </Typography>
      <div style={containerStyle}>
        <div style={gridStyle} className="ag-theme-quartz-dark">
          <AgGridReact
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            rowBuffer={0}
            rowModelType={'infinite'}
            cacheBlockSize={100}
            cacheOverflowSize={2}
            maxConcurrentDatasourceRequests={1}
            infiniteInitialRowCount={1000}
            maxBlocksInCache={10}
            onGridReady={onGridReady}
          />
        </div>
      </div>
    </div>
  )
}

export default ProductsTable;