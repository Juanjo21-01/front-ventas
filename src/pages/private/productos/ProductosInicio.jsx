import { useState } from 'react';
import ModalProductos from '../../../components/productos/ModalProductos';
import TablaProductos from '../../../components/productos/TablaProductos';
import { useProductosStore } from '../../../store/productos';

const Productos = () => {
  const [abrirModal, setAbrirModal] = useState(null);
  const [editarProducto, setEditarProducto] = useState(null);
  const { eliminar } = useProductosStore();

  const closeModal = () => {
    setAbrirModal(false);
    setEditarProducto(null); // Resetear el usuario a editar
  };

  const editar = (producto) => {
    setAbrirModal(true);
    setEditarProducto(producto);
  };

  const eliminarProducto = async (id) => {
    await eliminar(id);
  };

  return (
    <>
      <h1 className="title">Catálogo de los Productos</h1>

      <button
        className="btn btn-success m-5"
        onClick={() => setAbrirModal(true)}
      >
        Agregar Producto
      </button>

      {/* Tabla de Productos */}
      <TablaProductos editar={editar} eliminar={eliminarProducto} />

      {/* Modal de Productos */}
      {abrirModal && (
        <ModalProductos
          abrir={abrirModal}
          cerrar={closeModal}
          editar={editarProducto}
        />
      )}
    </>
  );
};

export default Productos;
