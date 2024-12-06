import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/styles/ag-grid.css';
import '@ag-grid-community/styles/ag-theme-quartz.css';
import { useEffect, useMemo, useState } from 'react';
import { Button, Input, Typography } from '@material-tailwind/react';
import ProductSelect from '../selects/ProductSelect';

ModuleRegistry.registerModules([ClientSideRowModelModule]);

const OrdersTable = () => {
  const [rowData, setRowData] = useState([]);
  const [productOptions, setProductOptions] = useState([]);
  const [customerName, setCustomerName] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const rowSelection = useMemo(() => {
    return {
      mode: 'singleRow',
    };
  }, []);

  const colDefs = useMemo(() => [
    { headerName: 'ID', field: 'id_order' },
    { headerName: 'Название продукта', field: 'product_name' },
    { headerName: 'Имя заказчика', field: 'customer_name' },
    {
      headerName: 'Дата заказа', field: 'order_date', cellRenderer: (params) => {
        const date = new Date(params.value);
        return date.toLocaleDateString();
      }
    },
    { headerName: 'Сумма заказа', field: 'total_amount' },
  ], []);

  const defaultColDef = useMemo(() => ({
    flex: 1,
    minWidth: 100,
    sortable: false,
  }), []);

  const handleRowSelected = (event) => {
    const selectedRow = event.api.getSelectedRows()[0];
    if (selectedRow) {
      setCustomerName(selectedRow.customer_name);
      const product = productOptions.find((p) => p.product_name === selectedRow.product_name);
      setSelectedProduct(product);
      setSelectedOrderId(selectedRow.id_order);
      console.log(selectedOrderId);
    }
  };

  const handleDeleteOrder = async () => {
    if (!selectedOrderId) {
      alert('Выберите заказ для удаления.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/orders/${selectedOrderId}`, {
        method: 'DELETE',
      });
      console.log('Response:', response);

      if (response.ok) {
        setRowData((prevData) => prevData.filter(order => order.id_order !== selectedOrderId));
        setCustomerName('');
        setSelectedProduct(null);
        setSelectedOrderId(null);
      } else {
        console.error('Ошибка удаления заказа:', response.statusText);
      }
    } catch (error) {
      console.error('Ошибка удаления заказа:', error);
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:3001/orders');
        const data = await response.json();
        setRowData(data);
      } catch (error) {
        console.error('Ошибка получения заказов:', error);
      }
    };

    const fetchProductOptions = async () => {
      try {
        const response = await fetch('http://localhost:3001/products');
        const data = await response.json();
        setProductOptions(data);
      } catch (error) {
        console.error('Ошибка получения продуктов:', error);
      }
    };

    fetchProductOptions();
    fetchOrders();
  }, []);

  const handleChange = (event) => {
    const value = event.target.value;
    const product = productOptions.find((p) => p.product_name === value);
    if (product) {
      setSelectedProduct(product);
    }
  };

  const handleUpdateOrder = async () => {
    if (!selectedOrderId || !customerName || !selectedProduct) {
      alert('Заполните все поля.');
      return;
    }

    const updatedOrder = {
      id_order: selectedOrderId,
      product_name: selectedProduct.product_name,
      product_id: selectedProduct.id_product,
      customer_name: customerName,
      order_date: new Date().toISOString(),
      total_amount: parseFloat(selectedProduct.price)
    };

    try {
      const response = await fetch(`http://localhost:3001/orders/${selectedOrderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedOrder)
      });

      if (response.ok) {
        setRowData((prevData) => prevData.map(order => order.id_order === selectedOrderId ? updatedOrder : order));
        setCustomerName('');
        setSelectedProduct(null);
        setSelectedOrderId(null);
      } else {
        console.error('Ошибка изменения заказа:', response.statusText);
      }
    } catch (error) {
      console.error('Ошибка изменения заказа:', error);
    }
  };

  const handleCreateOrder = async () => {
    if (!customerName || !selectedProduct) {
      alert('Заполните все поля.');
      return;
    }

    const newOrder = {
      product_id: selectedProduct.id_product,
      product_name: selectedProduct.product_name,
      customer_name: customerName,
      order_date: new Date().toISOString(),
      total_amount: parseFloat(selectedProduct.price)
    };

    try {
      const response = await fetch('http://localhost:3001/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newOrder)
      });

      if (response.ok) {
        const createdOrder = await response.json();
        newOrder.id_order = createdOrder.id_order;
        setRowData((prevData) => [...prevData, newOrder]);
        setCustomerName('');
        setSelectedProduct(null);
      } else {
        console.error('Ошибка при добавлении заказа:', response.statusText);
      }
    } catch (error) {
      console.error('Ошибка при добавлении заказа:', error);
    }
  };

  return (
    <div>
      <Typography variant="h5" color="blue-gray" className="mb-3">
        Заказы
      </Typography>
      <div className='mt-2 mb-2'>
        <div className='flex gap-4'>
          <div className='w-[100%]'>
            <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
              Имя заказчика
            </Typography>
            <Input
              size="lg"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          <div className='w-[100%]'>
            <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
              Название продукта
            </Typography>
            <ProductSelect
              productOptions={productOptions}
              selectedProduct={selectedProduct}
              setSelectedProduct={setSelectedProduct}
            />
          </div>
        </div>
        <div className='flex mt-4 mb-4 gap-4'>
          <Button style={{ backgroundColor: '#3ba55c', color: 'white' }} fullWidth onClick={handleCreateOrder}>Добавить</Button>
          <Button style={{ backgroundColor: '#4e5058', color: 'white' }} fullWidth onClick={handleUpdateOrder}>Изменить</Button>
          <Button style={{ backgroundColor: '#f23f43', color: 'white' }} fullWidth onClick={handleDeleteOrder}>Удалить</Button>
        </div>
      </div>
      <div style={{ width: '100%', height: '400px' }} className="ag-theme-quartz-dark">
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
          rowSelection={rowSelection}
          onRowSelected={handleRowSelected}
        />
      </div>
    </div>
  );
};

export default OrdersTable;