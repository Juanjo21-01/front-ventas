import { useState } from 'react';
import ModalProductos from '../../../components/productos/ModalProductos';
import TablaProductos from '../../../components/productos/TablaProductos';
import AlertModal from '../../../components/alert/AlertModal';
import { useProductosStore } from '../../../store/productos';

const Productos = () => {
  const [abrirModal, setAbrirModal] = useState(false);
  const [editarProducto, setEditarProducto] = useState(null);
  const [abrirAlerta, setAbrirAlerta] = useState(false);
  const [productoAEliminar, setProductoAEliminar] = useState(null);
  const { eliminar } = useProductosStore();

  const closeModal = () => {
    setAbrirModal(false);
    setEditarProducto(null); // Resetear el producto a editar
  };

  const editar = (producto) => {
    setAbrirModal(true);
    setEditarProducto(producto);
  };

  const handleEliminar = (producto) => {
    setProductoAEliminar(producto);
    setAbrirAlerta(true);
  };

  const eliminarProducto = async (id) => {
    await eliminar(id);
    setAbrirAlerta(false);
    setProductoAEliminar(null);
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
      {productoAEliminar && (
        <AlertModal
          isOpen={abrirAlerta}
          onClose={() => setAbrirAlerta(false)}
          onConfirm={() => eliminarProducto(productoAEliminar.id)}
          entity={productoAEliminar}
          message="¿Estás seguro de que quieres eliminar este producto"/>
      )}
    </>
  );
};

export default Productos;
