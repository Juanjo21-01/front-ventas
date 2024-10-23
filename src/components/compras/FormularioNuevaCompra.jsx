import React, { useState } from 'react';

const FormularioNuevaCompra = ({ agregarCompra }) => {
  // Estado para almacenar los valores del formulario
  const [nuevaCompra, setNuevaCompra] = useState({
    fecha_compra: '',
    observaciones: '',
    proveedor_id: '',
    usuario_id: '',
    cantidad: '',
    precio: '',
    producto_id: ''
  });

  // Función para manejar cambios en los inputs del formulario
  const manejarCambio = (e) => {
    setNuevaCompra({
      ...nuevaCompra,
      [e.target.name]: e.target.value
    });
  };

  // Función para manejar el envío del formulario
  const manejarEnvio = (e) => {
    e.preventDefault();
    agregarCompra(nuevaCompra);
    setNuevaCompra({
      fecha_compra: '',
      observaciones: '',
      proveedor_id: '',
      usuario_id: '',
      cantidad: '',
      precio: '',
      producto_id: ''
    });
  };

  return (
    <div className="p-4">
      <h1 className="text-center text-2xl font-bold mb-4">Crear nueva Compra</h1>
      
      {/* Formulario para crear una nueva venta */}
      <form onSubmit={manejarEnvio}>
        <div className="form-control mb-4">
          <label className="label">Fecha de Compra</label>
          <input
            type="date"
            name="fecha_compra"
            value={nuevaCompra.fecha_compra}
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
            value={nuevaCompra.observaciones}
            onChange={manejarCambio}
            className="input input-bordered w-full"
            style={{ width: '10%' }}
          />
        </div>

        <div className="form-control mb-4">
          <label className="label">Proveedor ID</label>
          <input
            type="number"
            name="proveedor_id"
            value={nuevaCompra.proveedor_id}
            onChange={manejarCambio}
            className="input input-bordered w-full"
            style={{ width: '10%' }}
            required
          />
        </div>

        <div className="form-control mb-4">
          <label className="label">Usuario ID</label>
          <input
            type="number"
            name="usuario_id"
            value={nuevaCompra.usuario_id}
            onChange={manejarCambio}
            className="input input-bordered w-full"
            style={{ width: '10%' }}
            required
          />
        </div>

        {/* Botón para crear la compra */}
        <button type="submit" className="btn btn-primary w-full" style={{ width: '10%' }}>Crear Compra</button>
        <br /><br /><br />

        <h2 className="text-xl font-semibold mb-2">Detalles de Compras</h2>

        <div className="form-control mb-4">
          <label className="label">Cantidad</label>
          <input
            type="number"
            name="cantidad"
            value={nuevaCompra.cantidad}
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
            value={nuevaCompra.precio}
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
            value={nuevaCompra.producto_id}
            onChange={manejarCambio}
            className="input input-bordered w-full"
            style={{ width: '10%' }}
            required
          />
        </div>
      </form>
      <br /><br />
    </div>
  );
};

export default FormularioNuevaCompra;
