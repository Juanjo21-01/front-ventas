import { useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import CommentsSection from '../comentarios/ComentsSection';

import { getProductoById } from '../../helpers/api/productos/productos';

const obtenerProductoId = async (id) => {
  return await getProductoById(id);
};

const DetallesProductos = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  obtenerProductoId(id).then((data) => setProduct(data));

  console.log(product);
  

  const productId = parseInt(id, 10);

  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState('');

  if (!product) {
    return <p>Producto no encontrado.</p>;
  }

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value > product.stock) {
      setError(`Solo hay ${product.stock} unidades disponibles.`);
    } else if (value < 1) {
      setError('La cantidad debe ser al menos 1.');
    } else {
      setError('');
    }
    setQuantity(value);
  };

  const handleSubmit = () => {
    if (!error && quantity <= product.stock) {
      console.log(
        `Solicitando \nCantidad:${quantity}\nID:${product.id}\nNombre:${product.name}`
      );
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-96 h-96 object-cover rounded shadow-lg"
          />
        </div>

        <div className="flex flex-col justify-center space-y-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-lg text-gray-500">{product.description}</p>
          <p className="text-2xl font-semibold">
            Q. {product.price.toFixed(2)}
          </p>
          <p className="text-sm text-gray-400">
            Stock disponible: {product.stock}
          </p>

          <div className="flex items-center gap-3">
            <label htmlFor="quantity" className="text-lg">
              Cantidad:
            </label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={handleQuantityChange}
              min={1}
              max={product.stock}
              className="input input-bordered w-20"
            />
          </div>
          {error && <p className="error-theme text-sm">{error}</p>}

          <div className="flex gap-4">
            <button
              onClick={handleSubmit}
              disabled={error}
              className="btn primary-theme"
            >
              Solicitar
            </button>
            <NavLink to="/productos" className="btn secondary-theme">
              Comprar
            </NavLink>
          </div>
        </div>
      </div>

      {/* Sección de comentarios */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Comentarios</h2>
        <CommentsSection productId={product.id} />
      </div>
    </div>
  );
};

export default DetallesProductos;
