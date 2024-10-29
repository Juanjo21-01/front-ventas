/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { useRolesStore } from '../../store/roles';

const TablaRoles = ({ eliminar, editar }) => {
  const { roles, obtener } = useRolesStore();

  useEffect(() => {
    obtener();
  }, [obtener]);

  return (
    <>
      {roles === undefined ? (
        <p>No hay roles</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>No.</th>
                <th>Nombres</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {roles.map((rol) => (
                <tr key={rol.id}>
                  <td>{rol.id}</td>
                  <td>{rol.nombre}</td>
                  <td>
                    <button
                      className="btn secondary-theme mr-2"
                      onClick={() => editar(rol)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn error-theme"
                      onClick={() => eliminar(rol.id)}
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

export default TablaRoles;
