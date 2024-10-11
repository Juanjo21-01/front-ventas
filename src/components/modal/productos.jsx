import PropTypes from "prop-types";
import { MdClose } from "react-icons/md";

const span = "font-bold secondary-theme flex-1";

const ProductModal = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 modal-open">
      <div className="card bg-theme w-96 shadow-xl p-6 relative border-2 primary-theme">
        <button
          onClick={onClose}
          className="btn btn-sm absolute top-4 right-5 w-10 h-10 error-theme"
        >
          <MdClose></MdClose>
        </button>
        <h2 className="text-2xl primary-theme font-bold text-center mb-4 border-b-2 pb-2">
          {product.nombre}
        </h2>
        <div className="space-y-4 text-theme">
          <p className="flex">
            <span className={span}>Precio Unitario: </span>
            <p className="flex-1">Q. {product.precio_unitario}</p>
          </p>
          <p className="flex">
            <span className={span}>Stock Disponible: </span>
            <p className="flex-1">{product.stock}</p>
          </p>
          <p className="flex">
            <span className={span}>Estado: </span>
            <p className="flex-1">{product.estado ? "Activo" : "Inactivo"}</p>
          </p>
          <p className="flex">
            <span className={span}>Tipo de Producto: </span>
            <p className="flex-1">{product.tipo_producto}</p>
          </p>
          <p className="flex">
            <span className={span}>Proveedor ID: </span>
            <p className="flex-1">{product.proveedor_id}</p>
          </p>
        </div>
      </div>
    </div>
  );
};

ProductModal.propTypes = {
  product: PropTypes.shape({
    nombre: PropTypes.string.isRequired,
    precio_unitario: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired,
    estado: PropTypes.bool.isRequired,
    tipo_producto: PropTypes.string.isRequired,
    proveedor_id: PropTypes.number.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ProductModal;