/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useProveedoresStore } from '../../store/proveedores';

const initialForm = {
  id: null,
  nombre: '',
  nit: '',
  direccion: '',
  telefono: '',
  estado: '',
};

const ModalProveedores = ({ abrir, cerrar, editar, onGuardar }) => {
  const { crear, actualizar } = useProveedoresStore();
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (editar) {
      setForm(editar);
    } else {
      setForm(initialForm);
    }
  }, [editar]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: name === 'estado' ? value === 'true' : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita la recarga de la página

    try {
      if (form.id === null) {
        await crear(form);
      } else {
        await actualizar(form.id, form);
      }
      onGuardar(); // Notifica que se guardó el proveedor
      handleReset(); // Resetea el formulario
    } catch (error) {
      console.error("Error al guardar el proveedor:", error);
    }
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
        <h3 className="text-lg font-bold">
          {form.id ? 'Editar Proveedor' : 'Agregar Proveedor'}
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="flex gap-3">
            {/* Nombre */}
            <input
              type="text"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              placeholder="Nombre Proveedor"
              required
              className="input input-bordered w-full my-2"
            />

            {/* NIT */}
            <input
              type="text"
              name="nit"
              value={form.nit}
              onChange={handleChange}
              placeholder="Nit"
              required
              className="input input-bordered w-full my-2"
            />
          </div>

          <div className="flex gap-3">
            {/* Dirección */}
            <input
              type="text"
              name="direccion"
              value={form.direccion}
              onChange={handleChange}
              placeholder="Ingrese Dirección"
              required
              className="input input-bordered w-full my-2"
            />

            {/* Teléfono */}
            <input
              type="text"
              name="telefono"
              value={form.telefono}
              onChange={handleChange}
              placeholder="No. Teléfono"
              required
              className="input input-bordered w-full my-2"
            />
          </div>

          {/* Estado */}
          <select
            name="estado"
            value={form.estado}
            onChange={handleChange}
            required
            className="input input-bordered w-full my-2"
          >
            <option value="" disabled>
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

export default ModalProveedores;
