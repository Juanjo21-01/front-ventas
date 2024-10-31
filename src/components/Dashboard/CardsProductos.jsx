import { useEffect, useState } from 'react';
import ProductModal from './DatosProductos';
import { useProductosStore } from '../../store/productos';
import { Search } from 'lucide-react';
import { useAuthStore } from '../../store/auth';
import { NavLink } from 'react-router-dom';

export const CardsProductos = () => {
  const { productos, obtener, isLoading } = useProductosStore();
  const { logged, profile } = useAuthStore();

  let validar = false;
  if (logged && profile.rolId !== 2) validar = true;

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

  if (isLoading) {
    return (
      <div className="min-h-[80vh] flex flex-col justify-center items-center">
        <span className="loading loading-infinity loading-lg"></span>
        <span className="text-2xl">Cargando...</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pb-8 mb-12 bg-theme text-theme">
      <h1 className="title">Catálogo De Productos</h1>
      <div className="form-control mb-4">
        <div className=" flex flex-col sm:flex-row input-group justify-center items-center gap-3">
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

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
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
              <h2 className="card-title font-bold primary-theme border-b-2 pb-1 m-auto px-5 rounded">
                {product.nombre}
              </h2>
              <p className="font-semibold text-xl flex items-center justify-center secondary-theme pt-2">
                Q {(product.precioUnitario * 1.3).toFixed(2)}
              </p>
              <div className="card-actions flex flex-col sm:flex-row gap-2 mt-2 justify-around">
                {validar ? (
                  <button
                    className="btn primary-theme w-full sm:w-auto transition-all duration-300 hover:bg-opacity-80 focus:ring-2 focus:ring-primary-theme focus:outline-none"
                    onClick={() => setSelectedProduct(product)}
                  >
                    Detalles
                  </button>
                ) : (
                  <>
                    {logged && (
                      <NavLink
                        to={`/productos/${product.id}`}
                        className="btn primary-theme w-full sm:w-auto transition-all duration-300 hover:bg-opacity-80 focus:ring-2 focus:ring-primary-theme focus:outline-none"
                      >
                        Detalles
                      </NavLink>
                    )}

                    {!logged && (
                      <NavLink
                        to={`/producto-comentarios/${product.id}`}
                        className="btn primary-theme w-full sm:w-auto transition-all duration-300 hover:bg-opacity-80 focus:ring-2 focus:ring-primary-theme focus:outline-none"
                      >
                        Detalles
                      </NavLink>
                    )}
                  </>
                )}
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
};
