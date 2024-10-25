import { useEffect } from 'react';
import {useUsuariosStore} from '../../store/usuarios';

// eslint-disable-next-line react/prop-types
const TablaUsuarios = ({editar, eliminar}) => {
  const {obtener, usuarios} = useUsuariosStore();


  useEffect(() => {
    obtener();
  }, [obtener]);

  return (
    <>
    {usuarios === undefined ? (
      <p>No hay Usuarios</p>
    ): (
      <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>id</th>
            <th>nombres</th>
            <th>apellidos</th>
            <th>email</th>
            <th>password</th>
            <th>dirección</th>
            <th>teléfono</th>
            <th>estado</th>
            <th>rol_id</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.id}</td>
              <td>{usuario.nombres}</td>
              <td>{usuario.apellidos}</td>
              <td>{usuario.email}</td>
              <td>{usuario.password}</td>
              <td>{usuario.direccion}</td>
              <td>{usuario.telefono}</td>
              <td>{usuario.estado}</td>
              <td>{usuario.rol_id}</td>
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