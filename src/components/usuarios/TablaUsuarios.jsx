/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { MdMenu } from 'react-icons/md';
import { Edit, Trash2 } from 'lucide-react';
import { useUsuariosStore } from '../../store/usuarios';
import { useRolesStore } from '../../store/roles';
import AlertModal from '../alert/AlertModal';

const TablaUsuarios = ({ eliminar, editar }) => {
  const { obtener, usuarios } = useUsuariosStore();
  const { obtener: obtenerRoles, roles } = useRolesStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [usuarioAEliminar, setUsuarioAEliminar] = useState(null);

  // Variables de estado para paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [usuariosPerPage] = useState(5); // Puedes cambiar esto según tus necesidades

  useEffect(() => {
    obtenerRoles();
    obtener();
  }, [obtener, obtenerRoles]);

  const handleEliminar = (usuario) => {
    setUsuarioAEliminar(usuario);
    setIsModalOpen(true);
  };

  const confirmarEliminacion = () => {
    if( usuarioAEliminar && usuarioAEliminar.id){
      eliminar(usuarioAEliminar.id);
    }
    setIsModalOpen(false);
    setUsuarioAEliminar(null);
  }

  // Paginación
  const indexOfLastUsuario = currentPage * usuariosPerPage;
  const indexOfFirstUsuario = indexOfLastUsuario - usuariosPerPage;
  const currentUsuarios = usuarios.slice(indexOfFirstUsuario, indexOfLastUsuario);

  const totalPages = Math.ceil(usuarios.length / usuariosPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="bg-theme text-theme">
      {usuarios === undefined ? (
        <p>No hay Usuarios</p>
      ) : (
        <div className="container mx-auto px-4 my-5">
          <table className="table w-full table-fixed">
            <thead>
              <tr>
                <th className="w-1/12">No.</th>
                <th className="w-2/12">Nombres</th>
                <th className="w-2/12">Email</th>
                <th className="w-1/12">Dirección</th>
                <th className="w-1/12">Teléfono</th>
                <th className="w-1/12">Rol</th>
                <th className="w-2/12 sm:w-1/12">Estado</th>
                <th className="w-2/12 sm:w-1/12">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {currentUsuarios.map((usuario) => (
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
                  <td className="min-w-32 w-full md:w-auto">
                    <div className="dropdown dropdown-left">
                      <label
                        tabIndex={0}
                        className="btn btn-square btn-sm secondary-theme m-1"
                      >
                        <MdMenu size={20} />
                      </label>
                      <ul
                        tabIndex={0}
                        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 gap-4 bg-theme border primary-theme"
                      >
                        <li>
                          <button
                            onClick={() => editar(usuario)}
                            className="btn primary-theme w-full btn-sm"
                          >
                            <Edit size={18} />
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => handleEliminar(usuario)}
                            className="btn error-theme w-full btn-sm"
                            disabled={usuario.rolId === 1}
                          >
                            <Trash2 size={18} />
                          </button>
                        </li>
                      </ul>
                    </div>
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
                onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
                disabled={currentPage === 1}
              >
                Anterior
              </button>
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  className={`btn mx-1 w-14 ${currentPage === index + 1 ? 'btn-active' : 'btn-outline'}`}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
              <button
                className="btn btn-outline"
                onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)}
                disabled={currentPage === totalPages}
              >
                Siguiente
              </button>
            </div>
          </div>
        </div>
      )}
      <AlertModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onConfirm={confirmarEliminacion} 
        entityDisplayName={usuarioAEliminar?.nombres || " este Usuario"} 
        message="¿Estás seguro de que quieres eliminar a"
      />
    </div>
  );
};

export default TablaUsuarios;
