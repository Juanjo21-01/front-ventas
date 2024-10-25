import { useEffect } from 'react';
import { useUsuariosStore } from '../../store/usuarios';
import { useRolesStore } from '../../store/roles';

// eslint-disable-next-line react/prop-types
const TablaUsuarios = ({ editar, eliminar }) => {
  const { obtener, usuarios } = useUsuariosStore();
  const { obtener: obtenerRoles, roles } = useRolesStore();

  useEffect(() => {
    obtenerRoles();
    obtener();
  }, [obtener, obtenerRoles]);

  return (
    <>
      {usuarios === undefined ? (
        <p>No hay Usuarios</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>No.</th>
                <th>Nombres</th>
                <th>Email</th>
                <th>Dirección</th>
                <th>Teléfono</th>
                <th>Rol</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario) => (
                <tr key={usuario.id}>
                  <td>{usuario.id}</td>
                  <td>
                    {usuario.nombres} {usuario.apellidos}
                  </td>
                  <td>{usuario.email}</td>
                  <td>{usuario.direccion}</td>
                  <td>{usuario.telefono}</td>
                  <td>
                    {roles.map((rol) => {
                      if (rol.id === usuario.rolId) {
                        return rol.nombre;
                      }
                      return '';
                    })}
                  </td>
                  <td>
                    {usuario.estado ? (
                      <span className="badge badge-success">Activo</span>
                    ) : (
                      <span className="badge badge-error">Inactivo</span>
                    )}
                  </td>
                  <td>
                    <button
                      className="btn secondary-theme mr-2"
                      onClick={() => editar(usuario)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn error-theme"
                      onClick={() => eliminar(usuario.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default TablaUsuarios;
