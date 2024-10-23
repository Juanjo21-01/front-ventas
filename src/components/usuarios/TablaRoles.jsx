/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { useRolesStore } from '../../store/roles';

const TablaRoles = ({ eliminar, editar }) => {
  const { roles, obtener } = useRolesStore();

  console.log(roles);
  useEffect(() => {
    obtener(); // Obtener roles al montar el componente
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
                      className="btn btn-warning mr-2"
                      onClick={() => editar(rol)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-error"
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
