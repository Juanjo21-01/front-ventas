import { useEffect, useState } from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { MdMenu } from 'react-icons/md';
import { useProductosStore } from '../../store/productos';
import { useTiposProductosStore } from '../../store/tipoProductos';
import { useProveedoresStore } from '../../store/proveedores';
import CrearProducto from './ModalProductos';
import { useAuthStore } from '../../store/auth';

export default function InicioProductos() {
  const { productos, obtener, isLoading } = useProductosStore();
  const { obtener: obtenerTipoProductos, tiposProductos } =
    useTiposProductosStore();
  const { obtener: obtenerProveedor, proveedores } = useProveedoresStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5);

  useEffect(() => {
    obtener();
    obtenerTipoProductos();
    obtenerProveedor();
  }, [obtener, obtenerTipoProductos, obtenerProveedor]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = productos.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(productos.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const [ModalAbierto, ActualizarModal] = useState(false);

  const AbrirModal = () => ActualizarModal(true);
  const CerrarModal = () => ActualizarModal(false);

  const { rolId } = useAuthStore().profile;

  let admin = true;
  if (rolId === 2) admin = false;

  if (isLoading) {
    return (
      <div className="h-full flex flex-col justify-center items-center">
        <span className="loading loading-infinity loading-lg"></span>
        <span className="text-2xl">Cargando...</span>
      </div>
    );
  }

  return (
    <div className="bg-theme text-theme">
      <div className="container mx-auto px-4">
        <h1 className="title">Catalogo de Productos</h1>
        {admin && (
          <div className="flex justify-center mb-4">
            <button className="btn btn-sm primary-theme" onClick={AbrirModal}>
              Nuevo Producto
            </button>
            <CrearProducto abrir={ModalAbierto} cerrar={CerrarModal} />
          </div>
        )}

        <div>
          <table className="table w-full table-fixed">
            <thead>
              <tr>
                <th className="w-1/12">No.</th>
                <th className="w-2/12">Nombre</th>
                <th className="w-1/12">Precio</th>
                <th className="w-1/12">Stock</th>
                <th className="w-1/12">Estado</th>
                <th className="w-2/12">Categoría</th>
                <th className="w-1/12">Proveedor</th>
                <th className="w-2/12">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.nombre}</td>
                  <td>Q. {product.precioUnitario}</td>
                  <td>{product.stock}</td>
                  <td>
                    {product.estado ? (
                      <span className="primary-theme px-2 py-1 rounded">
                        Activo
                      </span>
                    ) : (
                      <span className="error-theme px-2 py-1 rounded">
                        Inactivo
                      </span>
                    )}
                  </td>
                  <td>
                    {tiposProductos.map((tipoProducto) => {
                      if (product.tipoProductoId === tipoProducto.id) {
                        return tipoProducto.nombre;
                      }
                      return '';
                    })}
                  </td>
                  <td>
                    {proveedores.map((proveedor) => {
                      if (product.proveedorId === proveedor.id) {
                        return proveedor.nombre;
                      }
                      return '';
                    })}
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
                          <button className="btn primary-theme w-full btn-sm">
                            <Edit size={18} />
                          </button>
                        </li>
                        <li>
                          <button className="btn error-theme w-full btn-sm">
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
        </div>

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
    </div>
  );
}
