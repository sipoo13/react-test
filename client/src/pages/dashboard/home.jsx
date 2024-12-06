import '@ag-grid-community/styles/ag-grid.css';
import '@ag-grid-community/styles/ag-theme-quartz.css';
import ProductsTable from '@/widgets/tables/ProductsTable';
import OrdersTable from '@/widgets/tables/OrdersTable';

const Home = () => {

  return (
    <div className="flex flex-col">
      <div className="w-[100%] mt-4">
        <ProductsTable/>
      </div>
      <div className="w-[100%] mt-12">
        <OrdersTable/>
      </div>
    </div>
  );
};

export default Home;