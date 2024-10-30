import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { MdClose } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import { useProveedoresStore } from '../../store/proveedores';
import { useTiposProductosStore } from '../../store/tipoProductos';
import { useAuthStore } from '../../store/auth';
const span = 'font-bold secondary-theme flex-1';

const ProductModal = ({ product, onClose }) => {
  const { proveedores = [], obtener: obtenerProveedores } =
    useProveedoresStore();
  const { tiposProductos = [], obtener: obtenerTipoProductos } =
    useTiposProductosStore();
  const { logged } = useAuthStore();

  useEffect(() => {
    if (logged === true) {
      obtenerProveedores();
      obtenerTipoProductos();
    }
  }, [obtenerProveedores, obtenerTipoProductos, logged]);

  if (!product) return null;

  const proveedorNombre =
    proveedores.find((proveedor) => proveedor.id === product.proveedorId)
      ?.nombre || 'No disponible';

  const tipoProductoNombre =
    tiposProductos.find((tipo) => tipo.id === product.tipoProductoId)?.nombre ||
    'No disponible';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-20 flex justify-center items-center z-20 modal-open m-auto">
      <div className="card bg-theme w-96 shadow-xl p-6 relative border-2 primary-theme mx-2">
        <button
          onClick={onClose}
          className="btn btn-sm absolute top-4 right-5 w-10 h-10 error-theme"
        >
          <MdClose />
        </button>
        <h2 className="text-2xl primary-theme font-bold text-center mb-4 border-b-2 pb-2">
          {product.nombre}
        </h2>
        <div className="space-y-4 text-theme">
          <p className="flex">
            <span className={span}>Precio Unitario: </span>
            <span className="flex-1 overflow-auto">
              {product.precioUnitario !== undefined &&
              !isNaN(product.precioUnitario)
                ? `Q. ${(product.precioUnitario * 1.3).toFixed(2)}`
                : 'No disponible'}
            </span>
          </p>
          <p className="flex">
            <span className={span}>Stock Disponible: </span>
            <span className="flex-1 overflow-auto">{product.stock}</span>
          </p>
          <p className="flex">
            <span className={span}>Estado: </span>
            <span className="flex-1 overflow-auto">
              {product.estado ? 'Activo' : 'Inactivo'}
            </span>
          </p>
          {logged === true && (
            <>
              <p className="flex">
                <span className={span}>Tipo de Producto: </span>
                <span className="flex-1 overflow-auto">
                  {tipoProductoNombre}
                </span>
              </p>
              <p className="flex">
                <span className={span}>Proveedor: </span>
                <span className="flex-1 overflow-auto">{proveedorNombre}</span>
              </p>
            </>
          )}
        </div>
        <NavLink
          to={`/productos/${product.id}`}
          className="btn btn-block primary-theme mt-4"
        >
          Comprar
        </NavLink>
      </div>
    </div>
  );
};

ProductModal.propTypes = {
  product: PropTypes.shape({
    nombre: PropTypes.string,
    precioUnitario: PropTypes.number,
    stock: PropTypes.number,
    estado: PropTypes.bool,
    tipoProductoId: PropTypes.number,
    proveedorId: PropTypes.number,
    id: PropTypes.number,
  }),
  onClose: PropTypes.func.isRequired,
};

export default ProductModal;
