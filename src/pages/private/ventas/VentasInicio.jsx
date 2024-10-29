import { useEffect } from 'react';
import { useVentasStore } from '../../../store/ventas';
import { NavLink } from 'react-router-dom';

const Ventas = () => {
  const { ventas, isLoading, obtener, cambiarEstado } = useVentasStore();

  useEffect(() => {
    obtener();
  }, [obtener]);

  const handleCambiarEstado = async (id, nuevoEstado) => {
    await cambiarEstado(id, nuevoEstado);
  };

  return (
    <div className="bg-theme text-theme">
      <h2 className="title">Lista de Ventas</h2>
      <div className="container mx-auto px-4">
      <NavLink to="/ventas/crear" className="btn">
        Crear Venta
      </NavLink>
      <br />

      {isLoading ? (
        <div className='h-full flex flex-col justify-center items-center primary-theme'>
          <span className="loading loading-infinity loading-lg"></span>
          <span className='text-2xl'>Cargando...</span>
        </div>
      ) : ventas === undefined ? (
        <p>No hay ventas</p>
      ) : (
        <table className="table w-full table-fixed">
          <thead>
            <tr>
              <th>ID</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th>Observaciones</th>
              <th>Usuario ID</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {ventas.map((venta) => (
              <tr key={venta.id}>
                <td>{venta.id}</td>
                <td>{venta.fechaVenta}</td>
                <td>{venta.estado ? 'Activa' : 'Anulada'}</td>
                <td>{venta.observaciones}</td>
                <td>{venta.usuarioId}</td>
                <td>
                  <button
                    className="btn"
                    onClick={() => handleCambiarEstado(venta.id, !venta.estado)}
                  >
                    {venta.estado ? 'Anular' : 'Activar'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      </div>
    </div>
    
  );
};

export default Ventas;
