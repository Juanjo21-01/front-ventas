import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useComprasStore } from '../../store/compras';
import { useProductosStore } from '../../store/productos';
import { useProveedoresStore } from '../../store/proveedores';
import { useAuthStore } from '../../store/auth';
const styleInput =
  'input input-bordered w-full bg-theme bg-theme-hover secondary-theme placeholder: primary-theme';
const styleLabel = 'label label-text text-theme label';
const styleBtn = 'btn primary-theme w-full mt-4';

const initialForm = {
  fechaCompra: '',
  observaciones: '',
  usuarioId: '',
  proveedorId: '',
  detalles: [],
  productoId: '',
  cantidad: 0,
  precio: 0,
};
const CreateCompra = () => {
  const navigate = useNavigate();
  const { crear } = useComprasStore();
  const { productos, obtener: obtenerProductos } = useProductosStore();
  const { proveedores, obtener: obtenerProveedores } = useProveedoresStore();
  const { profile } = useAuthStore();

  useEffect(() => {
    obtenerProductos();
    obtenerProveedores();
  }, [obtenerProductos, obtenerProveedores]);

  const [form, setForm] = useState(initialForm);

  const [detallesCompra, setDetallesCompra] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const agregarProducto = () => {
    console.log('Agregar al detalle de compra');

    if (form.productoId == '' || form.cantidad == 0 || form.precio == 0) {
      alert('Debe seleccionar un producto, cantidad y precio');
      return;
    }

    const detalle = {
      productoId: form.productoId,
      cantidad: form.cantidad,
      precio: form.precio,
    };

    setDetallesCompra([...detallesCompra, detalle]);

    setForm({
      ...form,
      detalles: [...detallesCompra, detalle],
      productoId: 0,
      cantidad: 0,
      precio: 0,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const compra = {
      fechaCompra: form.fechaCompra,
      observaciones: form.observaciones,
      usuarioId: profile.id,
      proveedorId: form.proveedorId,
      detalles: detallesCompra,
    };
    await crear(compra);
    navigate('/compras');

    resetForm();
  };

  const resetForm = () => {
    setForm(initialForm);
    setDetallesCompra([]);
  };

  const quitarElemento = (detalle) => {
    const detallesFiltrados = detallesCompra.filter((item) => item !== detalle);

    setDetallesCompra(detallesFiltrados);

    setForm({
      ...form,
      detalles: detallesFiltrados,
    });
  };

  return (
    <div className="px-4 pb-4 md:px-6 bg-base-200">
      <h1 className="title">Registrar Compra</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Fecha */}
          <div>
            <label className={styleLabel}>Fecha de compra</label>
            <input
              type="date"
              name="fechaCompra"
              value={form.fechaCompra}
              onChange={handleChange}
              className={styleInput}
              required
            />
          </div>

          {/* Proveedor ID */}
          <select
            name="proveedorId"
            value={form.proveedorId}
            onChange={handleChange}
            required
            className={`${styleInput} w-100 my-9`}
          >
            <option value="0">Seleccione un Proveedor</option>
            {proveedores.map(
              (proveedor) =>
                proveedor.rolId !== 1 && (
                  <option key={proveedor.id} value={proveedor.id}>
                    {proveedor.nombre}
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
              value={form.observaciones}
              placeholder="Sin Observaciones"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {/* Producto ID */}
          <select
            name="productoId"
            value={form.productoId}
            onChange={handleChange}
            required
            className={`${styleInput} w-100 my-9`}
          >
            <option value="0">Seleccione un producto</option>
            {productos.map(
              (producto) =>
                producto.rolId !== 2 && (
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
              value={form.cantidad}
              onChange={handleChange}
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
              value={form.precio}
              onChange={handleChange}
              className={styleInput}
              placeholder="Q 00.00"
              required
            />
          </div>

          <button
            type="button"
            onClick={agregarProducto}
            className={`${styleBtn} md:max-w-[48%] text-center mx-auto`}
          >
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
                      onClick={() => quitarElemento(detalle)}
                    >
                      Eliminar
                    </button>
                  </td>
                  <td>
                    {productos.map((producto) => {
                      if (detalle.productoId == producto.id) {
                        return producto.nombre;
                      }
                    })}
                  </td>
                  <td>{detalle.cantidad}</td>
                  <td>{detalle.precio}</td>
                  <td>{(detalle.cantidad * detalle.precio).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col md:flex-row justify-around mt-6 gap-4">
          <NavLink className={`${styleBtn} md:max-w-[48%]`} to="/compras">
            Cancelar
          </NavLink>
          <button type="submit" className={`${styleBtn} md:max-w-[48%]`}>
            Registrar compra
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCompra;
