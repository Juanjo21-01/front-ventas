import React, { useState } from 'react';

const ModalUsuario = ({ usuario, guardarCambios, cerrarModal }) => {
  // Estado para manejar los datos del usuario editado
  const [usuarioEditado, setUsuarioEditado] = useState(usuario);

  // Función para manejar los cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuarioEditado({ ...usuarioEditado, [name]: value });
  };

  // Función para guardar los cambios del usuario editado
  const handleSubmit = (e) => {
    e.preventDefault();
    guardarCambios(usuarioEditado);
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Editar Usuario</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="nombres"
            value={usuarioEditado.nombres}
            onChange={handleChange}
            placeholder="Nombres"
            className="input input-bordered w-full my-2"
          />
          <input
            type="text"
            name="apellidos"
            value={usuarioEditado.apellidos}
            onChange={handleChange}
            placeholder="Apellidos"
            className="input input-bordered w-full my-2"
          />
          <input
            type="email"
            name="email"
            value={usuarioEditado.email}
            onChange={handleChange}
            placeholder="Email"
            className="input input-bordered w-full my-2"
          />
          <input
            type="password"
            name="password"
            value={usuarioEditado.password}
            onChange={handleChange}
            placeholder="Password"
            className="input input-bordered w-full my-2"
          />
          <input
            type="text"
            name="direccion"
            value={usuarioEditado.direccion}
            onChange={handleChange}
            placeholder="Dirección"
            className="input input-bordered w-full my-2"
          />
          <input
            type="text"
            name="telefono"
            value={usuarioEditado.telefono}
            onChange={handleChange}
            placeholder="Teléfono"
            className="input input-bordered w-full my-2"
          />
          <input
            type="text"
            name="estado"
            value={usuarioEditado.estado}
            onChange={handleChange}
            placeholder="Estado"
            className="input input-bordered w-full my-2"
          />
          <input
            type="number"
            name="rol_id"
            value={usuarioEditado.rol_id}
            onChange={handleChange}
            placeholder="Rol ID"
            className="input input-bordered w-full my-2"
          />
          <div className="modal-action">
            <button type="submit" className="btn btn-primary">
              Guardar
            </button>
            <button type="button" className="btn" onClick={cerrarModal}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalUsuario;
