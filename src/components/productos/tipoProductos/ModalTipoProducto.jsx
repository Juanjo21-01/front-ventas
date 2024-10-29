/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useTiposProductosStore } from '../../../store/tipoProductos';

const initialForm = {
  id: null,
  nombre: '',
  estado: null,
};

const ModalTipoProductos = ({ abrir, cerrar, editar }) => {
  const { crear, actualizar } = useTiposProductosStore();
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (editar) {
      setForm(editar);
    } else {
      setForm(initialForm);
    }
  }, [editar]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);
    
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

  return (
    <div className="modal modal-open">
      <div className="modal-box relative">
        <button
          onClick={cerrar}
          className="btn btn-sm btn-circle absolute right-2 top-2"
        >
          ✕
        </button>
        <h3 className="text-lg font-bold ">
          {form.id ? 'Editar Tipo de Producto' : 'Agregar Tipo de Producto'}
        </h3>
        <form onSubmit={handleSubmit}>
          {/* nombres */}
          <input
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            placeholder="Nombre del Tipo de Producto"
            required
            className="input input-bordered w-full my-2"
          />

          {/* estado */}
          <select
            name="estado"
            value={form.estado}
            onChange={handleChange}
            required
            className="input input-bordered w-full my-2"
          >
            <option defaultValue="0" selected disabled>
              Seleccione un estado
            </option>
            <option value="true">Activo</option>
            <option value="false">Inactivo</option>
          </select>

          <div className="modal-action">
            <button type="submit" className="btn primary-theme">
              Guardar
            </button>
            <button
              type="button"
              className="btn error-theme"
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

export default ModalTipoProductos;
