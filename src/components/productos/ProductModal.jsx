import React, { useState } from 'react';

const ProductModal = ({ abrir, cerrar }) => {
  const [Producto, ActualizarProducto] = useState({
    id: '',
    nombre: '',
    precio_unitario: '',
    stock: '',
    estado: '',
    tipo_producto_id: '',
    proveedor_id: ''
  });

  const Ingreso = (e) => {
    const { name, value } = e.target;
    ActualizarProducto({ ...Producto, [name]: value });
  };

  const Agregar = (e) => {
    e.preventDefault();
    console.log(Producto);
    cerrar();
  };

  if (!abrir) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box relative">
        <button onClick={cerrar} className="btn btn-sm btn-circle absolute right-2 top-2">✕</button>
        <h3 className="text-lg font-bold ">Agregar Producto</h3>
        <form onSubmit={Agregar}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">ID</span>
            </label>
            <input type="text" name="id" value={Producto.id} onChange={Ingreso} className="input input-bordered" />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Nombre</span>
            </label>
            <input type="text" name="nombre" value={Producto.nombre} onChange={Ingreso} className="input input-bordered" />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Precio Unitario</span>
            </label>
            <input type="number" name="precio_unitario" value={Producto.precio_unitario} onChange={Ingreso} className="input input-bordered" />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Stock</span>
            </label>
            <input type="number" name="stock" value={Producto.stock} onChange={Ingreso} className="input input-bordered" />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Estado</span>
            </label>
            <input type="text" name="estado" value={Producto.estado} onChange={Ingreso} className="input input-bordered" />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Tipo Producto ID</span>
            </label>
            <input type="text" name="tipo_producto_id" value={Producto.tipo_producto_id} onChange={Ingreso} className="input input-bordered" />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Proveedor ID</span>
            </label>
            <input type="text" name="proveedor_id" value={Producto.proveedor_id} onChange={Ingreso} className="input input-bordered" />
          </div>

          <div className="modal-action">
            <button type="submit" className="btn primary-theme">Guardar</button>
            <button type="button" onClick={cerrar} className="btn">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
