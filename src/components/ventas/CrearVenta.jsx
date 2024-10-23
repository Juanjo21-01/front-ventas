import { useState } from 'react';

const styleInput =
  'input input-bordered w-full bg-theme bg-theme-hover secondary-theme placeholder:primary-theme';

const styleLabel = 'label label-text text-theme';

const styleBtn = 'btn primary-theme w-full mt-4';

const CrearVenta = ({ agregarVenta }) => {
  
  const [nuevaVenta, setNuevaVenta] = useState({
    fecha_venta: '',
    observaciones: '',
    usuario_id: '',
    cantidad: '',
    precio: '',
    producto_id: ''
  });

  // Función para manejar cambios en los inputs del formulario
  const manejarCambio = (e) => {
    setNuevaVenta({
      ...nuevaVenta,
      [e.target.name]: e.target.value
    });
  };

  // Función para manejar el envío del formulario
  const manejarEnvio = (e) => {
    e.preventDefault();
    agregarVenta(nuevaVenta);
    setNuevaVenta({
      fecha_venta: '',
      observaciones: '',
      usuario_id: '',
      cantidad: '',
      precio: '',
      producto_id: ''
    });
  };

  return (
    <div className="p-4">
      <h1 className="text-center text-2xl font-bold mb-4">Crear nueva venta</h1>
      
      {/* Formulario para crear una nueva venta */}
      <form onSubmit={manejarEnvio} className="max-w-lg mx-auto">
        <div className="form-control mb-4">
          <label className={styleLabel}>Fecha de venta</label>
          <input
            type="date"
            name="fecha_venta"
            value={nuevaVenta.fecha_venta}
            onChange={manejarCambio}
            className={styleInput}
            placeholder='28/05/2024'
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
            placeholder='Ninguna'
          />
        </div>

        <div className="form-control mb-4">
          <label className={styleLabel}>Usuario ID</label>
          <input
            type="number"
            name="usuario_id"
            value={nuevaVenta.usuario_id}
            onChange={manejarCambio}
            className={styleInput}
            placeholder='1'
            required
          />
        </div>
        {/* Botón para crear la venta */}
        <button type="submit" className={styleBtn}>
          Crear Venta
        </button>
        <br />
        <br />

        <h2 className="text-xl font-semibold mb-2">Detalles de ventas</h2>

        <div className="form-control mb-4">
          <label className={styleLabel}>Cantidad</label>
          <input
            type="number"
            name="cantidad"
            value={nuevaVenta.cantidad}
            onChange={manejarCambio}
            className={styleInput}
            placeholder='23'
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
            placeholder='22.99'
            required
          />
        </div>

        <div className="form-control mb-4">
          <label className={styleLabel}>Producto ID</label>
          <input
            type="number"
            name="producto_id"
            value={nuevaVenta.producto_id}
            onChange={manejarCambio}
            className={styleInput}
            placeholder='2'
            required
          />
        </div>

        
      </form>
    </div>
  );
};

export default CrearVenta;