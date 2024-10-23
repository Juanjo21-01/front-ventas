/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useUsuariosStore } from '../../store/usuarios';

const initialForm = {
  id: null,
  nombres: '',
  apellidos: '',
  email: '',
  password: '',
  direccion: '',
  telefono: '',
  estado: true,
  rol_id: true,
};

const ModalUsuario = ({ abrir, cerrar, editar }) => {
  const { crear, actualizar } = useUsuariosStore();
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


    if (form.id === null) {
      await crear(form);
    } else {
      await actualizar(editar.id, form);
    }
    handleReset();
    cerrar();
  };

  const handleReset = () => {
    console.log(form);

    setForm(initialForm);

    console.log(form);

    cerrar();
  };

  if (!abrir) return null;


  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">{form.id ? 'Editar Usuario' : 'Agregar Usuario'}</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="nombres"
            value={form.nombres}
            onChange={handleChange}
            placeholder="Nombres"
            className="input input-bordered w-full my-2"
          />
          <input
            type="text"
            name="apellidos"
            value={form.apellidos}
            onChange={handleChange}
            placeholder="Apellidos"
            className="input input-bordered w-full my-2"
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="input input-bordered w-full my-2"
          />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="input input-bordered w-full my-2"
          />
          <input
            type="text"
            name="direccion"
            value={form.direccion}
            onChange={handleChange}
            placeholder="Dirección"
            className="input input-bordered w-full my-2"
          />
          <input
            type="text"
            name="telefono"
            value={form.telefono}
            onChange={handleChange}
            placeholder="Teléfono"
            className="input input-bordered w-full my-2"
          />
          <input
            type="text"
            name="estado"
            value={form.estado}
            onChange={handleChange}
            placeholder="Estado"
            className="input input-bordered w-full my-2"
          />
          <input
            type="select"
            name="rol_id"
            value={form.rol_id}
            onChange={handleChange}
            placeholder="Rol ID"
            className="input input-bordered w-full my-2"
          />
          <div className="modal-action">
            <button type="submit" className="btn btn-primary">
              Guardar
            </button>
            <button type="button" className="btn" onClick={handleReset}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalUsuario;
