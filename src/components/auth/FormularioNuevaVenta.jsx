import React, { useState } from 'react';

const FormularioNuevaVenta = ({ agregarVenta }) => {
  
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
      <form onSubmit={manejarEnvio}>
        <div className="form-control mb-4">
          <label className="label">Fecha de venta</label>
          <input
            type="date"
            name="fecha_venta"
            value={nuevaVenta.fecha_venta}
            onChange={manejarCambio}
            className="input input-bordered w-full"
            style={{ width: '10%' }}
            required
          />
        </div>

        <div className="form-control mb-4">
          <label className="label">Observaciones</label>
          <input
            type="text"
            name="observaciones"
            value={nuevaVenta.observaciones}
            onChange={manejarCambio}
            className="input input-bordered w-full"
            style={{ width: '10%' }}
          />
        </div>

        <div className="form-control mb-4">
          <label className="label">Usuario ID</label>
          <input
            type="number"
            name="usuario_id"
            value={nuevaVenta.usuario_id}
            onChange={manejarCambio}
            className="input input-bordered w-full"
            style={{ width: '10%' }}
            required
          />
        </div>
        {/* Botón para crear la venta */}
        <button type="submit" className="btn btn-primary w-full" style={{ width: '10%' }}>
          Crear Venta
        </button>
        <br />
        <br />

        <h2 className="text-xl font-semibold mb-2">Detalles de ventas</h2>

        <div className="form-control mb-4">
          <label className="label">Cantidad</label>
          <input
            type="number"
            name="cantidad"
            value={nuevaVenta.cantidad}
            onChange={manejarCambio}
            className="input input-bordered w-full"
            style={{ width: '10%' }}
            required
          />
        </div>

        <div className="form-control mb-4">
          <label className="label">Precio</label>
          <input
            type="number"
            step="0.01"
            name="precio"
            value={nuevaVenta.precio}
            onChange={manejarCambio}
            className="input input-bordered w-full"
            style={{ width: '10%' }}
            required
          />
        </div>

        <div className="form-control mb-4">
          <label className="label">Producto ID</label>
          <input
            type="number"
            name="producto_id"
            value={nuevaVenta.producto_id}
            onChange={manejarCambio}
            className="input input-bordered w-full"
            style={{ width: '10%' }}
            required
          />
        </div>

        
      </form>
    </div>
  );
};

export default FormularioNuevaVenta;
