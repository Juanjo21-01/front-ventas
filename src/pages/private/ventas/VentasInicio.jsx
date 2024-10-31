import { TablaVentas } from '../../../components/ventas/TablaVentas';
import { NavLink } from 'react-router-dom';

const Ventas = () => {
  return (
    <>
      <h2 className="title">Lista de Ventas</h2>

      <NavLink to="/ventas/crear" className="btn primary-theme m-5">
        Crear Ventas
      </NavLink>
      <br />

      {/* Tabla de Ventas */}
      <TablaVentas />
    </>
  );
};

export default Ventas;
