import { MenuProvider } from '../../components/context/MenuContext';
import DetallesProducto from '../../components/productos/DetallesProductos';
import Header from '../../components/Header';

const ProductoComentario = () => {
  return (
    <div className="flex flex-col h-screen">
      <MenuProvider>
        <Header />
        <div className="mt-16 sm:mt-0 pb-10 overflow-auto flex-grow sm:w-auto w-screen primary-theme">
          <DetallesProducto />
        </div>
      </MenuProvider>
    </div>
  );
};

export default ProductoComentario;
