/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';

const initialForm = {
  nombre: '',
  nit: '',
  direccion: '',
  telefono: '',
  estado: '',
};

const ModalProveedores = ({ abrir, cerrar, editar, onGuardar }) => {
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    setForm(editar || initialForm);
  }, [editar]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onGuardar(form);
    cerrar();
    handleReset();
  };

  const handleReset = () => {
    setForm(initialForm);

    cerrar();
  };

  if (!abrir) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box relative bg-theme border primary-theme">
        <button
          onClick={cerrar}
          className="btn btn-sm btn-circle absolute right-2 top-2"
        >
          ✕
        </button>
        <h3 className="text-lg font-bold mb-4">
          {form.id ? 'Editar Proveedor' : 'Agregar Proveedor'}
        </h3>
        <form onSubmit={handleSubmit}>
          {/* Usamos grid para disposición en dos columnas en pantallas más grandes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Nombre */}
            <input
              type="text"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              placeholder="Nombre Proveedor"
              required
              className="input input-bordered w-full secondary-theme"
            />

            {/* NIT */}
            <input
              type="text"
              name="nit"
              value={form.nit}
              onChange={handleChange}
              placeholder="NIT"
              required
              className="input input-bordered w-full secondary-theme"
            />

            {/* Dirección */}
            <input
              type="text"
              name="direccion"
              value={form.direccion}
              onChange={handleChange}
              placeholder="Ingrese Dirección"
              required
              className="input input-bordered w-full secondary-theme"
            />

            {/* Teléfono */}
            <input
              type="text"
              name="telefono"
              value={form.telefono}
              onChange={handleChange}
              placeholder="No. Teléfono"
              required
              className="input input-bordered w-full secondary-theme"
            />
          </div>

          {/* Estado */}
          <div className="mt-4">
            <select
              name="estado"
              value={form.estado || ''}
              onChange={handleChange}
              required
              placeholder="..."
              className="select select-bordered w-full secondary-theme"
            >
              <option value="" disabled>
                Seleccione un estado
              </option>
              <option value="true">Activo</option>
              <option value="false">Inactivo</option>
            </select>
          </div>

          {/* Acciones */}
          <div className="modal-action flex justify-end gap-2 mt-4">
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

export default ModalProveedores;
