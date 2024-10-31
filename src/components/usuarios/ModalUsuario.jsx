/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useUsuariosStore } from '../../store/usuarios';
import { useRolesStore } from '../../store/roles';
const initialForm = {
  id: null,
  nombres: '',
  apellidos: '',
  email: '',
  password: '',
  direccion: '',
  telefono: '',
  estado: null,
  rolId: null,
};

const ModalUsuario = ({ abrir, cerrar, editar }) => {
  const { crear, actualizar } = useUsuariosStore();
  const { roles, obtener } = useRolesStore();
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    obtener();

    if (editar) {
      setForm(editar);
    } else {
      setForm(initialForm);
    }
  }, [editar, obtener]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.id === null) {
      // quitar el id del form
      delete form.id;

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
      <div className="modal-box bg-theme-secondary border primary-theme text-center">
        <h3 className="font-bold text-2xl border-b-2 primary-theme pb-2 mb-2">
          {form.id ? 'Editar Usuario' : 'Agregar Usuario'}
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="flex gap-3">
            {/* nombres */}
            <input
              type="text"
              name="nombres"
              value={form.nombres}
              onChange={handleChange}
              placeholder="Nombres"
              required
              className="input primary-theme input-bordered w-full my-2"
            />
            {/* apellidos */}
            <input
              type="text"
              name="apellidos"
              value={form.apellidos}
              onChange={handleChange}
              placeholder="Apellidos"
              required
              className="input primary-theme input-bordered w-full my-2"
            />
          </div>
          <div className="flex gap-3">
            {/* email */}
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="input primary-theme input-bordered w-full my-2"
            />
            {/* password */}
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="input primary-theme input-bordered w-full my-2"
            />
          </div>
          <div className="flex gap-3">
            {/* direccion */}
            <input
              type="text"
              name="direccion"
              value={form.direccion}
              onChange={handleChange}
              placeholder="Dirección"
              required
              className="input primary-theme input-bordered w-full my-2"
            />
            {/* telefono */}
            <input
              type="text"
              name="telefono"
              value={form.telefono}
              onChange={handleChange}
              placeholder="Teléfono"
              required
              className="input primary-theme input-bordered w-full my-2"
            />
          </div>
          {/* rolId */}
          {form.id !== 1 && (
            <select
              name="rolId"
              value={form.rolId || ''}
              onChange={handleChange}
              placeholder="..."
              required
              className="input primary-theme input-bordered w-full my-2"
            >
              <option value="" disabled>
                Seleccione un rol
              </option>
              {roles.map(
                (rol) =>
                  // quitar el rol de administrador
                  rol.id !== 1 && (
                    <option key={rol.id} value={rol.id}>
                      {rol.nombre}
                    </option>
                  )
              )}
            </select>
          )}

          {/* estado */}
          <select
            name="estado"
            value={form.estado || ''}
            onChange={handleChange}
            placeholder="..."
            required
            className="input primary-theme input-bordered w-full my-2"
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

export default ModalUsuario;
