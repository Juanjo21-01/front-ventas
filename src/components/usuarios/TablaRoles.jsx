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
        <div className="overflow-x-auto my-10">
          <table className="table w-9/12 mx-auto">
            <thead>
              <tr>
                <th className="w-3/12 text-center">No.</th>
                <th className="w-6/12 text-center">Nombres</th>
                <th className="w-3/12 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {roles.map((rol) => (
                <tr key={rol.id}>
                  <td className="w-3/12 text-center">{rol.id}</td>
                  <td className="w-6/12 text-center">{rol.nombre}</td>
                  <td className="w-3/12 text-center">
                    <button
                      className="btn secondary-theme mr-2"
                      onClick={() => editar(rol)}
                    >
                      Editar
                    </button>
                    <button
                      // concatena la clase disabled si el id del rol es 1
                      className="btn error-theme"
                      disabled={rol.id === 1}
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
