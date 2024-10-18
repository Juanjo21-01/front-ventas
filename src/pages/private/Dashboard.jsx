import { ListaProductos } from '../../components/Dashboard/CardsProductos';
import DashboardProducts from '../../components/Dashboard/DashboardProductos';

const Dashboard = () => {
  return (
    <div>
      <DashboardProducts />
      <ListaProductos />
    </div>
  );
};

export default Dashboard;
