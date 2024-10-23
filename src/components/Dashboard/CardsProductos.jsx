import { useEffect, useState } from 'react';
import ProductModal from './DatosProductos';
import { useProductosStore } from '../../store/productos';

export const ListaProductos = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { productos, obtener } = useProductosStore();

  useEffect(() => {
    obtener();
  }, [obtener]);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="container mx-auto p-5">
      <h1 className="title">Lista de Productos</h1>
      <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-5">
        {productos.map((product) => (
          <div
            key={product.id}
            className="card py-4 primary-theme border bg-theme-secondary text-theme shadow-xl hover:cursor-pointer hover:scale-105 bg-theme-hover grid grid-cols-2 gap-o items-center"
            onClick={() => handleProductClick(product)}
          >
            <div className="w-4/5 pl-4">
              <img src="https://picsum.photos/400" alt="IMG Random" />
            </div>
            <div className="pr-4">
              <h2 className="text-2xl font-bold text-center mb-3 primary-theme border-b pb-1">
                {product.nombre}
              </h2>
              <p className="text-theme">
                Precio:{' '}
                <span className="secondary-theme">
                  Q{product.precioUnitario}
                </span>
              </p>
              <p className="text-theme">
                Stock: <span className="secondary-theme">{product.stock}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={closeModal} />
      )}
    </div>
  );
};
