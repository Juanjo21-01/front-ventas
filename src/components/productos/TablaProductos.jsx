/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useProductosStore } from '../../store/productos';
import { useTiposProductosStore } from '../../store/tipoProductos';
import { useProveedoresStore } from '../../store/proveedores';
import { useAuthStore } from '../../store/auth';
import { Edit, Trash2 } from 'lucide-react';
import { MdMenu } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import { Loader } from '../Loader';

const TablaProductos = ({ editar, eliminar }) => {
  // Variables de estado
  const { obtener, productos, isLoading } = useProductosStore();
  const { obtener: obtenerTipoProductos, tiposProductos } =
    useTiposProductosStore();
  const { obtener: obtenerProveedor, proveedores } = useProveedoresStore();

  // Variables de paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5);

  useEffect(() => {
    obtener();
    obtenerProveedor();
    obtenerTipoProductos();
  }, [obtener, obtenerProveedor, obtenerTipoProductos]);

  // Paginación
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = productos.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(productos.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // rol de usuario
  const { rolId } = useAuthStore().profile;
  let admin = true;
  if (rolId === 2) admin = false;

  // Loading
  if (isLoading) {
    return (
      <Loader />
    );
  }

  return (
    <div className="bg-theme text-theme">
      <div className="container mx-auto px-4">
        {productos === undefined ? (
          <p>No hay productos</p>
        ) : (
          <div className="overflow-x-auto pb-24">
            <table className="table w-full">
              <thead>
                <tr className="text-center">
                  <th className="w-1/12">No.</th>
                  <th className="w-3/12">Nombre</th>
                  <th className="w-1/12">Precio Unitario</th>
                  <th className="w-1/12">Stock</th>
                  <th className="w-1/12">Estado</th>
                  <th className="w-2/12">Categoría</th>
                  <th className="w-2/12">Proveedor</th>
                  <th className="w-1/12">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {currentProducts.map((producto) => (
                  <tr key={producto.id} className="text-center">
                    <td className="w-1/12">{producto.id}</td>
                    <td className="w-3/12">{producto.nombre}</td>
                    <td className="w-1/12">{producto.precioUnitario}</td>
                    <td className="w-1/12">{producto.stock}</td>
                    <td className="w-1/12">
                      {producto.estado ? (
                        <span className="badge badge-success">Activo</span>
                      ) : (
                        <span className="badge badge-error">Inactivo</span>
                      )}
                    </td>
                    <td className="w-2/12">
                      {tiposProductos.map((tipo) =>
                        tipo.id === producto.tipoProductoId ? tipo.nombre : ''
                      )}
                    </td>
                    <td className="w-2/12">
                      {proveedores.map((proveedor) =>
                        proveedor.id === producto.proveedorId
                          ? proveedor.nombre
                          : ''
                      )}
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
                              to={`/productos/${producto.id}`}
                              className="btn primary-theme w-full"
                            >
                              <Edit size={20} />
                              Ver
                            </NavLink>
                          </li>
                          <li>
                            <button
                              className="btn primary-theme w-full"
                              onClick={() => editar(producto)}
                            >
                              <Edit size={20} /> Editar
                            </button>
                          </li>
                          {admin && (
                            <li>
                              <button
                                className="btn error-theme w-full"
                                onClick={() => eliminar(producto.id)}
                              >
                                <Trash2 size={20} /> Eliminar
                              </button>
                            </li>
                          )}
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

export default TablaProductos;
