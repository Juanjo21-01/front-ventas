/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { useProductosStore } from '../../store/productos';
import { useProveedoresStore } from '../../store/proveedores';
import { useTiposProductosStore } from '../../store/tipoProductos';
import { MdClose } from 'react-icons/md';

const initialForm = {
  id: null,
  nombre: '',
  precioUnitario: '',
  stock: '',
  estado: null,
  tipoProductoId: '',
  proveedorId: '',
};
const ModalProductos = ({ abrir, cerrar, editar }) => {
  const { crear, actualizar } = useProductosStore();
  const [form, setForm] = useState(initialForm);
  const { obtener: obtenerTipoProductos, tiposProductos } =
    useTiposProductosStore();
  const { obtener: obtenerProveedor, proveedores } = useProveedoresStore();

  useEffect(() => {
    if (editar) {
      setForm(editar);
    } else {
      setForm(initialForm);
    }
    obtenerTipoProductos();
    obtenerProveedor();
  }, [editar, obtenerTipoProductos, obtenerProveedor]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.id === null) {
      await crear(form);
    } else {
      await actualizar(editar.id, form);
    }
    handleReset();
    cerrar();
  };

  const handleReset = () => {
    setForm(initialForm);
    cerrar();
  };

  if (!abrir) return null;

  const styleInput =
    'input input-bordered w-full bg-theme bg-theme-hover secondary-theme placeholder: primary-theme';
  const styleLabel =
    'label label-text text-theme flex flex-col items-start gap-2';
  const styleBtn = 'btn primary-theme w-full sm:w-6/12 mt-4';

  return (
    <div className="modal modal-open">
      <div
        className={`primary-theme bg-theme-secondary w-5/6 shadow-xl p-6 border modal-box relative text-center`}
      >
        <button
          onClick={cerrar}
          className="btn btn-sm btn-circle bg-theme absolute right-4 top-4"
        >
          <MdClose className="text-xl secondary-theme" />
        </button>
        <h3 className="text-lg font-bold border-b-2 primary-theme inline pb-1 px-2 rounded">
          Agregar Producto
        </h3>
        <form onSubmit={handleSubmit} className="my-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="form-control">
              <label className={styleLabel}>
                <span>Nombre</span>
                <input
                  type="text"
                  name="nombre"
                  placeholder=". . ."
                  value={form.nombre}
                  onChange={handleChange}
                  className={styleInput}
                />
              </label>
            </div>

            <div className="form-control">
              <label className={styleLabel}>
                <span>Precio Unitario</span>
                <input
                  type="number"
                  name="precioUnitario"
                  placeholder=". . ."
                  value={form.precioUnitario}
                  onChange={handleChange}
                  className={styleInput}
                />
              </label>
            </div>

            <div className="form-control">
              <label className={styleLabel}>
                <span>Stock</span>
                <input
                  type="number"
                  name="stock"
                  placeholder=". . ."
                  value={form.stock}
                  onChange={handleChange}
                  className={styleInput}
                />
              </label>
            </div>

            <div className="form-control">
              <label className={styleLabel}>
                <span>Estado</span>
                <select
                  name="estado"
                  value={form.estado}
                  onChange={handleChange}
                  className={styleInput}
                >
                  <option value="">Selecciona el estado</option>
                  <option value="true">Activo</option>
                  <option value="false">Inactivo</option>
                </select>
              </label>
            </div>

            <div className="form-control">
              <label className={styleLabel}>
                <span>Tipo Producto</span>
                <select
                  name="tipoProductoId"
                  value={form.tipoProductoId}
                  onChange={handleChange}
                  className={styleInput}
                >
                  <option value="">Selecciona un tipo</option>
                  {tiposProductos.map((tipo) => (
                    <option key={tipo.id} value={tipo.id}>
                      {tipo.nombre}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="form-control">
              <label className={styleLabel}>
                <span>Proveedor</span>
                <select
                  name="proveedorId"
                  value={form.proveedorId}
                  onChange={handleChange}
                  className={styleInput}
                >
                  <option value="">Selecciona un proveedor</option>
                  {proveedores.map((proveedor) => (
                    <option key={proveedor.id} value={proveedor.id}>
                      {proveedor.nombre}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 mt-4 justify-center items-center">
            <button type="submit" className={styleBtn}>
              Guardar
            </button>
            <button
              type="button"
              className={styleBtn + ' error-theme'}
              onClick={handleReset}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalProductos;
