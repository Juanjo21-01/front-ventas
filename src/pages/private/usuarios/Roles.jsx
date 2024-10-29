import { useState } from 'react';
import { useRolesStore } from '../../../store/roles';
import TablaRoles from '../../../components/usuarios/TablaRoles';

const Roles = () => {
  // Obtener los roles y las funciones del store
  const { crear, actualizar, eliminar } = useRolesStore();

  // Estado local para el formulario
  const [newRole, setNewRole] = useState({ nombre: '' });
  const [editingRole, setEditingRole] = useState(null);

  // Manejar cambios del formulario
  const handleChange = (e) => {
    setNewRole({ ...newRole, [e.target.name]: e.target.value });
  };

  // Crear un nuevo rol
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingRole) {
      actualizar(editingRole.id, newRole);
      setEditingRole(null);
    } else {
      crear(newRole);
    }
    setNewRole({ nombre: '' });
  };

  // Editar un rol
  const handleEdit = (role) => {
    setEditingRole(role);
    setNewRole(role);
  };

  // Eliminar un rol
  const handleDelete = (id) => {
    eliminar(id);
  };

  return (
    <div>
      <h1 className="title">Gestión de Roles</h1>

      {/* FORMULARIO */}
      <form onSubmit={handleSubmit} className="flex justify-center gap-5 mb-4">
        <label className="input input-bordered flex items-center gap-2">
          Nombre:
          <input
            type="text"
            className="grow"
            name="nombre"
            placeholder="ingrese su nombre..."
            value={newRole.nombre}
            onChange={handleChange}
            required
          />
        </label>
        <button className="btn btn-success" type="submit">
          {editingRole ? 'Actualizar Rol' : 'Agregar Rol'}
        </button>
      </form>

      {/* TABLA */}
      <TablaRoles eliminar={handleDelete} editar={handleEdit} />
    </div>
  );
};

export default Roles;
