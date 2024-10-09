import PropTypes from "prop-types";

const ProductModal = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 modal-open">
      <div className="card bg-theme-secondary w-96 shadow-xl p-6 relative">
        <button
          onClick={onClose}
          className="btn btn-sm absolute top-4 right-4 w-10 h-10 primary-theme"
        >
          ✖
        </button>
        <h2 className="text-2xl text-theme font-bold text-center mb-4 border-b-2 pb-2">
          {product.nombre}
        </h2>
        <div className="space-y-4 text-theme">
          <p>
            <span className="font-bold">Precio Unitario: </span> Q
            {product.precio_unitario}
          </p>
          <p>
            <span className="font-bold">Stock Disponible: </span>
            {product.stock}
          </p>
          <p>
            <span className="font-bold">Estado: </span>
            {product.estado ? "Activo" : "Inactivo"}
          </p>
          <p>
            <span className="font-bold">Tipo de Producto: </span>
            {product.tipo_producto}
          </p>
          <p>
            <span className="font-bold">Proveedor ID: </span>
            {product.proveedor_id}
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