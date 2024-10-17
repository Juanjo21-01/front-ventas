import { useEffect, useState } from 'react';
import { useRolesStore } from '../../../store/roles';

const Roles = () => {
  // Obtener los roles y las funciones del store
  const { roles, obtener, crear, actualizar, eliminar, isLoading } =
    useRolesStore();
  console.log(roles);

  // Estado local para el formulario
  const [newRole, setNewRole] = useState({ nombre: '' });
  const [editingRole, setEditingRole] = useState(null);

  useEffect(() => {
    obtener(); // Obtener roles al montar el componente
  }, [obtener]);

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
      <h1>Gestión de Roles</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          value={newRole.nombre}
          onChange={handleChange}
          placeholder="Nombre del rol"
          required
        />
        <button type="submit">
          {editingRole ? 'Actualizar Rol' : 'Agregar Rol'}
        </button>
      </form>

      {isLoading ? (
        <p>Cargando...</p>
      ) : roles === undefined ? (
        <p>No hay roles</p>
      ) : (
        <ul>
          {roles.map((role) => (
            <li key={role.id}>
              {role.nombre}
              <button className='btn' onClick={() => handleEdit(role)}>Editar</button>
              <button className='btn' onClick={() => handleDelete(role.id)}>Eliminar</button>
            </li> 
          ))}
        </ul>
      )}
    </div>
  );
};

export default Roles;
