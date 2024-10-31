import { useState } from 'react';
import ModalProductos from '../../../components/productos/ModalProductos';
import TablaProductos from '../../../components/productos/TablaProductos';
import AlertModal from '../../../components/alert/AlertModal';
import { useProductosStore } from '../../../store/productos';

const Productos = () => {
  const [abrirModal, setAbrirModal] = useState(false);
  const [editarProducto, setEditarProducto] = useState(null);
  const [abrirAlerta, setAbrirAlerta] = useState(false);
  const [productoAEliminar, setProductoAEliminar] = useState(null); // Este ahora es el ID
  const { eliminar, productos } = useProductosStore();

  const closeModal = () => {
    setAbrirModal(false);
    setEditarProducto(null);
  };

  const editar = (producto) => {
    setAbrirModal(true);
    setEditarProducto(producto);
  };

  const handleEliminar = (productoId) => {
    setProductoAEliminar(productoId); // Guardamos el ID del producto a eliminar
    setAbrirAlerta(true);
  };

  const eliminarProducto = async () => {
    if (productoAEliminar) {
      await eliminar(productoAEliminar); // Eliminamos el producto por su ID
    }
    setAbrirAlerta(false);
    setProductoAEliminar(null);
  };

  const productoNombre = productos.find(p => p.id === productoAEliminar)?.nombre || '';

  return (
    <>
      <h1 className="title">Catálogo de los Productos</h1>

      <button
        className="btn primary-theme m-5"
        onClick={() => setAbrirModal(true)}
      >
        Agregar Producto
      </button>

      {/* Tabla de Productos */}
      <TablaProductos editar={editar} eliminar={handleEliminar} />

      {/* Modal de Productos */}
      {abrirModal && (
        <ModalProductos
          abrir={abrirModal}
          cerrar={closeModal}
          editar={editarProducto}
        />
      )}

      {/* Alert Modal para Confirmar Eliminación */}
      {abrirAlerta && (
        <AlertModal
          isOpen={abrirAlerta}
          onClose={() => setAbrirAlerta(false)}
          onConfirm={eliminarProducto}
          entityDisplayName={productoNombre}
          message="¿Estás seguro de que quieres eliminar este producto"
        />
      )}
    </>
  );
};

export default Productos;
