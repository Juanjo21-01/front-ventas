import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import ProductModal from '../Dashboard/DatosProductos';
import { NavLink } from 'react-router-dom';
import { useProductosStore } from '../../store/productos';

export default function InicioProductos() {
  const { productos, obtener } = useProductosStore();

  useEffect(() => {
    obtener();
  }, [obtener]);

  const products = productos.map((product) => ({
    ...product,
    image: `https://picsum.photos/200`,
  }));

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filteredProducts = products.filter((product) =>
    product.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const closeModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="container mx-auto px-4 pb-8 bg-theme text-theme">
      <h1 className="title">Catálogo De Productos</h1>
      <div className="form-control mb-8">
        <div className=" flex flex-row input-group justify-center gap-3">
          <input
            type="text"
            placeholder="Buscando Productos..."
            className="input input-bordered w-full bg-theme bg-theme-hover primary-theme placeholder: primary-theme max-w-xs"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="btn btn-square">
            <Search className="h-6 w-6 primary-theme primary-theme-hover " />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="card shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-theme-secondary bg-theme-hover border primary-theme gap-3 rounded-lg overflow-hidden"
          >
            <figure>
              <img
                src={product.image}
                alt={product.nombre}
                className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
              />
            </figure>
            <div className="card-body gap-3 p-4">
              <h2 className="card-title text-lg font-bold primary-theme">
                {product.nombre}
              </h2>
              <p className="font-semibold text-xl secondary-theme">
                Q. {product.precioUnitario.toFixed(2)}
              </p>
              <div className="card-actions flex flex-col sm:flex-row gap-2 mt-4 justify-around">
                <button
                  className="btn primary-theme w-full sm:w-auto transition-all duration-300 hover:bg-opacity-80 focus:ring-2 focus:ring-primary-theme focus:outline-none"
                  onClick={() => setSelectedProduct(product)}
                >
                  Detalles
                </button>
                <NavLink
                  to={`/productos/${product.id}`}
                  className="btn secondary-theme w-full sm:w-auto transition-all duration-300 hover:bg-opacity-80 focus:ring-2 focus:ring-secondary-theme focus:outline-none"
                >
                  Comprar
                </NavLink>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <p className="text-center text-lg mt-8">Producto no encontrado.</p>
      )}

      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={closeModal} />
      )}
    </div>
  );
}
