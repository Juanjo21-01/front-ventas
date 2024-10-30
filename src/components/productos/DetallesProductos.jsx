import { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { getProductoById } from '../../helpers/api/productos/productos';
import { ComentariosSeccion } from '../comentarios/ComentariosSeccion';
import { useAuthStore } from '../../store/auth';

const image = `https://picsum.photos/200`;

const obtenerProductoId = async (id) => {
  return await getProductoById(id);
};

const DetallesProductos = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [error, setError] = useState('');

  const { logged } = useAuthStore();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await obtenerProductoId(id);
        setProduct(data);
      } catch (error) {
        console.error('Error al obtener el producto:', error);
      }
    };
    fetchProduct();
  }, [id]);

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
    setCantidad(value);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {!logged && (
        <NavLink to="/" className="btn secondary-theme">
          Regresar
        </NavLink>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex justify-center">
          <img
            src={image}
            alt={product.nombre}
            className="w-96 h-96 object-cover rounded shadow-lg"
          />
        </div>

        <div className="flex flex-col justify-center space-y-4">
          <h1 className="text-3xl font-bold">{product.nombre}</h1>
          <p className="text-lg text-gray-500">{product.descripcion}</p>
          <p className="text-2xl font-semibold">
            {product.precioUnitario !== undefined &&
            !isNaN(product.precioUnitario)
              ? `Q ${product.precioUnitario * (1.3).toFixed(2)}`
              : 'Precio no disponible'}
          </p>
          {logged && (
            <>
              <p className="text-sm text-gray-400">
                Stock disponible: {product.stock}
              </p>

              <div className="flex items-center gap-3">
                <label htmlFor="cantidad" className="text-lg">
                  Cantidad:
                </label>
                <input
                  type="number"
                  id="cantidad"
                  value={cantidad}
                  onChange={handleQuantityChange}
                  min={1}
                  max={product.stock}
                  className="input input-bordered w-20"
                />
              </div>
              {error && <p className="error-theme text-sm">{error}</p>}

              <div className="flex gap-4">
                <NavLink to="/compras/crear" className="btn secondary-theme">
                  Comprar
                </NavLink>
                <NavLink to="/ventas/crear" className="btn secondary-theme">
                  Vender
                </NavLink>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Sección de comentarios */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Comentarios</h2>
        <ComentariosSeccion productId={product.id} />
      </div>
    </div>
  );
};

export default DetallesProductos;
