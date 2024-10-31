import { useState } from 'react';
import { useRolesStore } from '../../../store/roles';
import TablaRoles from '../../../components/usuarios/TablaRoles';
import AlertModal from '../../../components/alert/AlertModal';

const Roles = () => {
  const { roles, crear, actualizar, eliminar } = useRolesStore();

  const [nuevoRol, setNuevoRol] = useState({ nombre: '' });
  const [rolEnEdicion, setRolEnEdicion] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rolAEliminar, setRolAEliminar] = useState(null);

  const manejarCambio = (e) => {
    setNuevoRol({ ...nuevoRol, [e.target.name]: e.target.value });
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (rolEnEdicion) {
      actualizar(rolEnEdicion.id, nuevoRol);
      setRolEnEdicion(null);
    } else {
      crear(nuevoRol);
    }
    setNuevoRol({ nombre: '' });
  };

  const manejarEdicion = (rol) => {
    setRolEnEdicion(rol);
    setNuevoRol(rol);
  };

  const manejarConfirmacionEliminar = () => {
    if (rolAEliminar && rolAEliminar.id) {
      eliminar(rolAEliminar.id);
    }
    setRolAEliminar(null);
    setIsModalOpen(false);
  };

  const manejarEliminar = (id) => {
    const rolEncontrado = roles.find((rol) => rol.id === id);
    if (rolEncontrado) {
      setRolAEliminar(rolEncontrado);
      setIsModalOpen(true);
    }
  };

  const cerrarModal = () => {
    setIsModalOpen(false);
    setRolAEliminar(null);
  };

  return (
    <div>
      <h1 className="title">Gestión de Roles</h1>

      {/* FORMULARIO */}
      <form onSubmit={manejarEnvio} className="flex justify-center gap-5 mb-4">
        <label className="input input-bordered flex items-center gap-2">
          Nombre:
          <input
            type="text"
            className="grow"
            name="nombre"
            placeholder="ingrese su nombre..."
            value={nuevoRol.nombre}
            onChange={manejarCambio}
            required
          />
        </label>
        <button className="btn primary-theme" type="submit">
          {rolEnEdicion ? 'Actualizar Rol' : 'Agregar Rol'}
        </button>
      </form>

      {/* TABLA */}
      <TablaRoles eliminar={manejarEliminar} editar={manejarEdicion} />

      {/* AlertModal */}
      <AlertModal
        isOpen={isModalOpen}
        onClose={cerrarModal}
        onConfirm={manejarConfirmacionEliminar}
        entityDisplayName={rolAEliminar?.nombre || "este rol?"} // Mostrar nombre o un mensaje por defecto
        message="¿Estás seguro de que deseas eliminar"
      />
    </div>
  );
};

export default Roles;
