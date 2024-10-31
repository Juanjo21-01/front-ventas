/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useRolesStore } from '../../store/roles';

const TablaRoles = ({ eliminar, editar }) => {
  const { roles, obtener } = useRolesStore();
  
  // Variables de estado para paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [rolesPerPage] = useState(5); // Puedes cambiar esto según tus necesidades

  useEffect(() => {
    obtener();
  }, [obtener]);

  // Paginación
  const indexOfLastRole = currentPage * rolesPerPage;
  const indexOfFirstRole = indexOfLastRole - rolesPerPage;
  const currentRoles = roles.slice(indexOfFirstRole, indexOfLastRole);

  const totalPages = Math.ceil(roles.length / rolesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
              {currentRoles.map((rol) => (
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

          {/* Paginación */}
          <div className="flex justify-around mt-6">
            <div className="btn-group">
              <button
                className="btn btn-outline"
                onClick={() =>
                  paginate(currentPage > 1 ? currentPage - 1 : 1)
                }
                disabled={currentPage === 1}
              >
                Anterior
              </button>
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  className={`btn mx-1 w-14 ${
                    currentPage === index + 1 ? 'btn-active' : 'btn-outline'
                  }`}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
              <button
                className="btn btn-outline"
                onClick={() =>
                  paginate(
                    currentPage < totalPages ? currentPage + 1 : totalPages
                  )
                }
                disabled={currentPage === totalPages}
              >
                Siguiente
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TablaRoles;
