import { useState } from 'react';
import { useRolesStore } from '../../../store/roles';
import TablaRoles from '../../../components/usuarios/TablaRoles';
import AlertModal from '../../../components/alert/AlertModal';

const Roles = () => {
  const { crear, actualizar, eliminar } = useRolesStore();

  const [nuevoRol, setNuevoRol] = useState({ nombre: '' });
  const [rolEnEdicion, setRolEnEdicion] = useState(null);
  const [notificacion, setNotificacion] = useState({ mensaje: '', tipo: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rolAEliminar, setRolAEliminar] = useState(null);

  const manejarCambio = (e) => {
    setNuevoRol({ ...nuevoRol, [e.target.name]: e.target.value });
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (rolEnEdicion) {
      actualizar(rolEnEdicion.id, nuevoRol);
      setNotificacion({ mensaje: 'Rol actualizado correctamente', tipo: 'success' });
      setRolEnEdicion(null);
    } else {
      crear(nuevoRol);
      setNotificacion({ mensaje: 'Rol agregado correctamente', tipo: 'success' });
    }
    setNuevoRol({ nombre: '' });
    
    // Limpiar la notificación después de 3 segundos
    setTimeout(() => setNotificacion({ mensaje: '', tipo: '' }), 3000);
  };

  const manejarEdicion = (rol) => {
    setRolEnEdicion(rol);
    setNuevoRol(rol);
  };

  const manejarConfirmacionEliminar = (id) => {
    eliminar(id);
    setNotificacion({ mensaje: 'Rol eliminado correctamente', tipo: 'success' });
    setRolAEliminar(null); // Limpiar el rol a eliminar

    // Limpiar la notificación después de 3 segundos
    setTimeout(() => setNotificacion({ mensaje: '', tipo: '' }), 3000);
  };

  const manejarEliminar = (rol) => {
    setRolAEliminar(rol);
    setIsModalOpen(true);
  };

  const cerrarModal = () => {
    setIsModalOpen(false);
    setRolAEliminar(null);
  };

  return (
    <div>
      <h1 className="title">Gestión de Roles</h1>

      {/* Notificación */}
      {notificacion.mensaje && (
        <div
          role="alert"
          className={`absolute top-15 right-5 mb-10 p-4 max-w-xs flex items-center text-white rounded ${notificacion.tipo === 'success' ? 'bg-green-500' : 'bg-red-500'}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="ml-2 text-black">{notificacion.mensaje}</span>
        </div>
      )}

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
        <button className="btn btn-success" type="submit">
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
        entity={rolAEliminar}
        message="¿Estás seguro de que deseas eliminar el rol"
      />
    </div>
  );
};

export default Roles;
