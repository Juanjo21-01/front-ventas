import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useComprasStore } from '../../store/compras';
import { useUsuariosStore } from '../../store/usuarios';
import { useProductosStore } from '../../store/productos';
import { useProveedoresStore } from "../../store/proveedores";

const styleInput = "input input-bordered w-full bg-theme bg-theme-hover secondary-theme placeholder: primary-theme";
const styleLabel = "label label-text text-theme label";
const styleBtn = "btn primary-theme w-full mt-4";

const CreateCompra = () => {
  const navigate = useNavigate();
  const { usuarios, obtener: obtenerUsuarios } = useUsuariosStore();
  const { crear } = useComprasStore();
  const { productos, obtener: obtenerProductos } = useProductosStore();
  const { proveedores, obtener: obtenerProveedores } = useProveedoresStore();

  useEffect(() => {
    obtenerUsuarios();
    obtenerProductos();
    obtenerProveedores();
  }, [obtenerUsuarios, obtenerProductos, obtenerProveedores]);

  const [nuevaCompra, setNuevaCompra] = useState({
    id: '',
    fechaCompra: '',
    observaciones: '',
    usuarioId: '',
    proveedorId: '',
    cantidad: '',
    precio: '',
    productoId: ''
  });

  const [detallesCompra, setDetallesCompra] = useState([]);

  const manejarCambio = (e) => {
    setNuevaCompra({
      ...nuevaCompra,
      [e.target.name]: e.target.value
    });
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    await crear(nuevaCompra);
    setNuevaCompra({
      fechaCompra: '',
      observaciones: '',
      usuarioId: '',
      proveedorId: '',
      cantidad: '',
      precio: '',
      productoId: ''
    });
    setDetallesCompra([]);
    navigate('/compras');
  };

  const agregarProducto = () => {
    const productoId = parseInt(nuevaCompra.productoId, 10);
    const productoSeleccionado = productos.find(producto => producto.id === productoId);

    if (productoSeleccionado && nuevaCompra.cantidad && nuevaCompra.precio) {
      const totalAPagar = nuevaCompra.cantidad * nuevaCompra.precio;
      const nuevoDetalle = {
        id: productoSeleccionado.id,
        nombre: productoSeleccionado.nombre,
        cantidad: nuevaCompra.cantidad,
        precio: nuevaCompra.precio,
        totalAPagar: totalAPagar.toFixed(2)
      };
      setDetallesCompra([...detallesCompra, nuevoDetalle]);

      setNuevaCompra({
        ...nuevaCompra,
        cantidad: '',
        precio: '',
        productoId: ''
      });
    } else {
      alert('Por favor selecciona un producto válido y asegúrate de ingresar cantidad y precio.');
    }
  };

  const eliminarDetalle = (index) => {
    setDetallesCompra(detallesCompra.filter((_, i) => i !== index));
  };

  return (
    <div className="px-4 pb-4 md:px-6 bg-base-200">
      <h1 className="title">Registrar Compra</h1>

      <form onSubmit={manejarEnvio}>
        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Fecha */}
          <div>
            <label className={styleLabel}>Fecha de compra</label>
            <input
              type="date"
              name="fechaCompra"
              value={nuevaCompra.fechaCompra}
              onChange={manejarCambio}
              className={styleInput}
              required
            />
          </div>

          {/* Proveedor ID */}
          <select
            name="proveedorId"
            value={nuevaCompra.proveedorId}
            onChange={manejarCambio}
            required
            className={`${styleInput} w-100 my-9`}
          >
            <option value="0">Seleccione un Proveedor</option>
            {proveedores.map(
              (proveedor) => proveedor.rolId !== 1 && (
                <option key={proveedor.id} value={proveedor.id}>
                  {proveedor.nombre}
                </option>
              )
            )}
          </select>

          {/* Usuario ID */}
          <select
            name="usuarioId"
            value={nuevaCompra.usuarioId}
            onChange={manejarCambio}
            required
            className={`${styleInput} w-100 my-9`}
          >
            <option value="0">Seleccione un Usuario</option>
            {usuarios.map(
              (usuario) => usuario.rolId === 2 && (
                <option key={usuario.id} value={usuario.id}>
                  {usuario.nombres} {usuario.apellidos}
                </option>
              )
            )}
          </select>

          {/* Observaciones */}
          <div className="col-span-1 md:col-span-2 lg:col-span-3">
            <label className={styleLabel}>Observaciones</label>
            <textarea
              className={`${styleInput} textarea textarea-bordered`}
              name="observaciones"
              maxLength={100}
              value={nuevaCompra.observaciones}
              placeholder="Sin Observaciones"
              onChange={manejarCambio}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {/* Producto ID */}
          <select
            name="productoId"
            value={nuevaCompra.productoId}
            onChange={manejarCambio}
            required
            className={`${styleInput} w-100 my-9`}
          >
            <option value="0">Seleccione un producto</option>
            {productos.map(
              (producto) => producto.rolId !== 2 && (
                <option key={producto.id} value={producto.id}>
                  {producto.nombre}
                </option>
              )
            )}
          </select>

          {/* Cantidad */}
          <div>
            <label className={styleLabel}>Cantidad</label>
            <input
              type="number"
              name="cantidad"
              value={nuevaCompra.cantidad}
              onChange={manejarCambio}
              className={styleInput}
              required
              placeholder="0"
            />
          </div>

          {/* Precio */}
          <div>
            <label className={styleLabel}>Precio</label>
            <input
              type="number"
              step="0.01"
              name="precio"
              value={nuevaCompra.precio}
              onChange={manejarCambio}
              className={styleInput}
              placeholder="Q 00.00"
              required
            />
          </div>

          <button 
            type="button" 
            onClick={agregarProducto} 
            className={`${styleBtn} md:max-w-[48%] text-center mx-auto`}>
            Agregar producto
          </button>
        </div>

        {/* Tabla de detalles de compra */}
        <div className="mt-6">
          <h2 className="title">Detalles de compra</h2>
          <table className="table w-full">
            <thead>
              <tr>
                <th>Eliminar</th>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Q. Precio</th>
                <th>Q. Total a pagar</th>
              </tr>
            </thead>
            <tbody>
              {detallesCompra.map((detalle, index) => (
                <tr key={index}>
                  <td>
                    <button 
                      className="btn btn-error" 
                      type="button" 
                      onClick={() => eliminarDetalle(index)}>
                      Eliminar
                    </button>
                  </td>
                  <td>{detalle.nombre}</td>
                  <td>{detalle.cantidad}</td>
                  <td>{detalle.precio}</td>
                  <td>{detalle.totalAPagar}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col md:flex-row justify-around mt-6 gap-4">
          <button className={`${styleBtn} md:max-w-[48%]`} type="button">
            Cancelar
          </button>
          <button type="submit" className={`${styleBtn} md:max-w-[48%]`}>
            Registrar compra
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCompra;
