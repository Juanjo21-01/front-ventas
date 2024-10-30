import { useEffect, useState } from 'react';
import { useProveedoresStore } from '../../store/proveedores';
import { useUsuariosStore } from '../../store/usuarios';
import { MdMenu } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import { useComprasStore } from '../../store/compras';
import { Edit } from 'lucide-react';

export const TablaCompras = () => {
  // Variables de estado
  const { obtener, compras, isLoading, cambiarEstado } = useComprasStore();
  const { obtener: obtenerProveedores, proveedores } = useProveedoresStore();
  const { obtener: obtenerUsuarios, usuarios } = useUsuariosStore();

  // Variables de paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5);

  useEffect(() => {
    obtenerProveedores();
    obtenerUsuarios();
    obtener();
  }, [obtener, obtenerProveedores, obtenerUsuarios]);

  // Paginación
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = compras.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(compras.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // cambiar estado
  const handleCambiar = async (id, estado) => {
    await cambiarEstado(id, estado);
  };

  // Loading
  if (isLoading) {
    return (
      <div className="h-screen w-full absolute top-0 left-0 flex flex-col justify-center items-center">
        <span className="loading loading-infinity loading-lg"></span>
        <span className="text-2xl">Cargando...</span>
      </div>
    );
  }

  return (
    <div className="bg-theme text-theme">
      <div className="container mx-auto px-4">
        {compras === undefined ? (
          <p>No hay compras</p>
        ) : (
          <div className="overflow-x-auto pb-24">
            <table className="table w-full">
              <thead>
                <tr className="text-center">
                  <th className="w-1/12">No.</th>
                  <th className="w-3/12">Fecha</th>
                  <th className="w-3/12">Proveedor</th>
                  <th className="w-3/12">Usuario</th>
                  <th className="w-1/12">Estado</th>
                  <th className="w-1/12">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {currentProducts.map((compra) => (
                  <tr key={compra.id} className="text-center">
                    <td className="w-1/12">{compra.id}</td>
                    <td className="w-3/12">{compra.fechaCompra}</td>
                    <td className="w-3/12">
                      {proveedores.find(
                        (proveedor) => proveedor.id === compra.proveedorId
                      )?.nombre || 'Proveedor no encontrado'}
                    </td>
                    <td className="w-3/12">
                      {usuarios.find(
                        (usuario) => usuario.id === compra.usuarioId
                      )?.nombres || 'Usuario no encontrado'}
                    </td>
                    <td className="w-1/12">
                      <button
                        onClick={() => handleCambiar(compra.id, !compra.estado)}
                        className={`btn ${
                          compra.estado ? 'btn-success' : 'btn-error'
                        }`}
                      >
                        {compra.estado ? 'Activa' : 'Inactiva'}
                      </button>
                    </td>
                    <td className="w-1/12">
                      <div className="dropdown dropdown-left">
                        <label tabIndex={0} className="btn secondary-theme m-1">
                          <MdMenu />
                        </label>
                        <ul
                          tabIndex={0}
                          className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 gap-4 bg-theme border primary-theme"
                        >
                          <li>
                            <NavLink
                              to={`/compras/${compra.id}`}
                              className="btn primary-theme w-full"
                            >
                              <Edit size={20} />
                              Ver
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
      </div>
    </div>
  );
};
