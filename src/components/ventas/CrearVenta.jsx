import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useVentasStore } from '../../store/ventas';
import { useUsuariosStore } from '../../store/usuarios';
import { useProductosStore } from '../../store/productos';
import { useAuthStore } from '../../store/auth';

const styleInput = 'input input-bordered w-full bg-theme bg-theme-hover secondary-theme placeholder: primary-theme';
const styleLabel = 'label label-text text-theme label';
const styleBtn = 'btn primary-theme w-full mt-4';

const initialForm = {
  fechaVenta: '',
  observaciones: '',
  usuarioId: '',
  detalles: [],
  productoId: '',
  cantidad: 0,
  precio: 0,
};

const CrearVenta = () => {
  const navigate = useNavigate();
  const { crear } = useVentasStore();
  const { usuarios, obtener: obtenerUsuarios } = useUsuariosStore();
  const { productos, obtener: obtenerProductos } = useProductosStore();
  const { profile } = useAuthStore();

  useEffect(() => {
    obtenerUsuarios();
    obtenerProductos();
  }, [obtenerUsuarios, obtenerProductos]);

  const [form, setForm] = useState(initialForm);
  const [detallesVenta, setDetallesVenta] = useState([]);

  const manejarCambio = (e) => {
    const { name, value } = e.target;

    if (name === 'productoId') {
      const productoSeleccionado = productos.find((producto) => producto.id === parseInt(value));
      setForm({
        ...form,
        [name]: value,
        precio: productoSeleccionado ? productoSeleccionado.precioUnitario * 1.3 : 0,
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const agregarProducto = () => {
    if (form.productoId == '' || form.cantidad == 0 || form.precio == 0) {
      alert('Debe seleccionar un producto, cantidad y precio');
      return;
    }

    const nuevoDetalle = {
      productoId: form.productoId,
      cantidad: form.cantidad,
      precio: form.precio,
    };

    setDetallesVenta([...detallesVenta, nuevoDetalle]);

    setForm({
      ...form,
      detalles: [...detallesVenta, nuevoDetalle],
      productoId: '',
      cantidad: 0,
      precio: 0,
    });
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    const venta = {
      fechaVenta: form.fechaVenta,
      observaciones: form.observaciones,
      usuarioId: profile.id,
      detalles: detallesVenta,
    };
    await crear(venta);
    navigate('/ventas');
    resetForm();
  };

  const resetForm = () => {
    setForm(initialForm);
    setDetallesVenta([]);
  };

  const eliminarDetalle = (detalle) => {
    const detallesFiltrados = detallesVenta.filter((item) => item !== detalle);
    setDetallesVenta(detallesFiltrados);
    setForm({ ...form, detalles: detallesFiltrados });
  };

  return (
    <div className="px-4 pb-4 md:px-6 bg-base-200">
      <h1 className="title">Registrar Venta</h1>

      <form onSubmit={manejarEnvio}>
        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <label className={styleLabel}>Fecha de venta</label>
            <input
              type="date"
              name="fechaVenta"
              value={form.fechaVenta || ''}
              onChange={manejarCambio}
              className={styleInput}
              required
            />
          </div>

          <select
            name="usuarioId"
            value={form.usuarioId || ''}
            onChange={manejarCambio}
            required
            className={`${styleInput} w-100 my-9`}
          >
            <option value="">Seleccione un Usuario</option>
            {usuarios.map((usuario) => (
              <option key={usuario.id} value={usuario.id}>
                {usuario.nombres} {usuario.apellidos}
              </option>
            ))}
          </select>

          <div className="col-span-1 md:col-span-2 lg:col-span-3">
            <label className={styleLabel}>Observaciones</label>
            <textarea
              className={`${styleInput} textarea textarea-bordered`}
              name="observaciones"
              maxLength={100}
              value={form.observaciones || ''}
              placeholder="Sin Observaciones"
              onChange={manejarCambio}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <select
            name="productoId"
            value={form.productoId}
            onChange={manejarCambio}
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
            ))}
          </select>

          <div>
            <label className={styleLabel}>Cantidad</label>
            <input
              type="number"
              name="cantidad"
              value={form.cantidad}
              onChange={manejarCambio}
              className={styleInput}
              required
              placeholder="0"
            />
          </div>

          <div>
            <label className={styleLabel}>Precio</label>
            <input
              type="number"
              step="0.01"
              name="precio"
              value={form.precio || 0}
              onChange={manejarCambio}
              className={styleInput}
              placeholder="Q 00.00"
              required
              readOnly
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

        <div className="mt-6">
          <h2 className="title">Detalles de venta</h2>
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
              {detallesVenta.map((detalle, index) => (
                <tr key={index}>
                  <td>
                    <button
                      className="btn btn-error"
                      type="button"
                      onClick={() => eliminarDetalle(detalle)}
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
          <NavLink className={`${styleBtn} md:max-w-[48%]`} to="/ventas">
            Cancelar
          </NavLink>
          <button type="submit" className={`${styleBtn} md:max-w-[48%]`}>
            Registrar Venta
          </button>
        </div>
      </form>
    </div>
  );
};

export default CrearVenta;
