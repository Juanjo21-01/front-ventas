import { TablaCompras } from '../../../components/compras/TablaCompras';
import { NavLink } from 'react-router-dom';

const Compras = () => {
  return (
    <>
      <h2 className="title">Lista de Compras</h2>

      <NavLink to="/compras/crear" className="btn btn-success m-5">
        Crear Compra
      </NavLink>
      <br />

      {/* Tabla de Compras */}
      <TablaCompras />
    </>
  );
};

export default Compras;
