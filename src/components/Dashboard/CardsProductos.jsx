import { useState } from 'react';
import ProductModal from './DatosProductos';

export const ListaProductos = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const products = [
    {
      id: 1,
      nombre: 'Manzanita Dorada',
      precio_unitario: 25.9,
      stock: 2,
      estado: true,
      tipo_producto: 'Fruta',
      proveedor_id: 2,
    },
    {
      id: 2,
      nombre: 'PC Chetada',
      precio_unitario: 105.99,
      stock: 5,
      estado: true,
      tipo_producto: 'Hogar',
      proveedor_id: 3,
    },
    {
      id: 2,
      nombre: 'Dignidad',
      precio_unitario: 9999999.75,
      stock: 0,
      estado: false,
      tipo_producto: 'Vida',
      proveedor_id: 4,
    },
    {
      id: 2,
      nombre: 'PC Chetada',
      precio_unitario: 105.99,
      stock: 5,
      estado: true,
      tipo_producto: 'Hogar',
      proveedor_id: 3,
    },
    {
      id: 2,
      nombre: 'Dignidad',
      precio_unitario: 9999999.75,
      stock: 0,
      estado: false,
      tipo_producto: 'Vida',
      proveedor_id: 4,
    },
  ];

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl primary-theme mb-6 text-center font-bold border-b-2 pb-2">
        Lista de Productos
      </h1>
      <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-5">
        {products.map((product) => (
          <div
            key={product.id}
            className="card py-4 primary-theme border bg-theme-secondary text-theme shadow-xl hover:cursor-pointer hover:scale-105 bg-theme-hover grid grid-cols-2 gap-o"
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
                  Q{product.precio_unitario}
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
