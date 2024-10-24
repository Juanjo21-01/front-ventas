import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVentasStore } from '../../store/ventas';

const styleInput = 'input input-bordered w-full bg-theme bg-theme-hover secondary-theme placeholder:primary-theme';
const styleLabel = 'label label-text text-theme';
const styleBtn = 'btn primary-theme w-full mt-4';

const CrearVenta = () => {
  const navigate = useNavigate();
  const { crear } = useVentasStore();
  

  const [nuevaVenta, setNuevaVenta] = useState({
    fechaVenta: '',
    observaciones: '',
    usuarioId: '',
    cantidad: '',
    precio: '',
    productoId: ''
  });

  const manejarCambio = (e) => {
    setNuevaVenta({
      ...nuevaVenta,
      [e.target.name]: e.target.value
    });
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    console.log(nuevaVenta);
    await crear(nuevaVenta);
    setNuevaVenta({
      fechaVenta: '',
      observaciones: '',
      usuarioId: '',
      cantidad: '',
      precio: '',
      productoId: ''
    });
    navigate('/ventas'); 
  };

  return (
    <div className="p-4">
      <h1 className="text-center text-2xl font-bold mb-4">Crear nueva venta</h1>
      <form onSubmit={manejarEnvio} className="max-w-lg mx-auto">
        <div className="form-control mb-4">
          <label className={styleLabel}>Fecha de venta</label>
          <input
            type="date"
            name="fechaVenta"
            value={nuevaVenta.fechaVenta}
            onChange={manejarCambio}
            className={styleInput}
            required
          />
        </div>
        <div className="form-control mb-4">
          <label className={styleLabel}>Observaciones</label>
          <input
            type="text"
            name="observaciones"
            value={nuevaVenta.observaciones}
            onChange={manejarCambio}
            className={styleInput}
          />
        </div>
        <div className="form-control mb-4">
          <label className={styleLabel}>Usuario ID</label>
          <input
            type="number"
            name="usuarioId"
            value={nuevaVenta.usuarioId}
            onChange={manejarCambio}
            className={styleInput}
            required
          />
        </div>
        <div className="form-control mb-4">
          <label className={styleLabel}>Cantidad</label>
          <input
            type="number"
            name="cantidad"
            value={nuevaVenta.cantidad}
            onChange={manejarCambio}
            className={styleInput}
            required
          />
        </div>
        <div className="form-control mb-4">
          <label className={styleLabel}>Precio</label>
          <input
            type="number"
            step="0.01"
            name="precio"
            value={nuevaVenta.precio}
            onChange={manejarCambio}
            className={styleInput}
            required
          />
        </div>
        <div className="form-control mb-4">
          <label className={styleLabel}>Producto ID</label>
          <input
            type="number"
            name="productoId"
            value={nuevaVenta.productoId}
            onChange={manejarCambio}
            className={styleInput}
            required
          />
        </div>
        <button type="submit" className={styleBtn}>
          Crear Venta
        </button>
      </form>
    </div>
  );
};

export default CrearVenta;
