import { useState } from 'react';
import ModalTipoProducto from '../../../components/productos/tipoProductos/ModalTipoProducto';
import TablaTipoProducto from '../../../components/productos/tipoProductos/TablatipoProducto';
import AlertModal from '../../../components/alert/AlertModal'; // Asegúrate de que la ruta sea correcta
import { useTiposProductosStore } from '../../../store/tipoProductos';

const TipoProductos = () => {
  const [abrirModal, setAbrirModal] = useState(false);
  const [editarTipoProducto, setEditarTipoProducto] = useState(null);
  const [abrirAlerta, setAbrirAlerta] = useState(false);
  const [tipoProductoAEliminar, setTipoProductoAEliminar] = useState(null);
  const { eliminar, tiposProductos } = useTiposProductosStore();

  const closeModal = () => {
    setAbrirModal(false);
    setEditarTipoProducto(null); // Resetear el tipo de producto a editar
  };

  const editar = (tipoProducto) => {
    setAbrirModal(true);
    setEditarTipoProducto(tipoProducto);
  };

  const handleEliminar = (tipoProducto) => {
    setTipoProductoAEliminar(tipoProducto);
    setAbrirAlerta(true);
  };

  const eliminarTipo = async (id) => {
    await eliminar(id);
    setAbrirAlerta(false);
    setTipoProductoAEliminar(null);
  };

  return (
    <>
      <h1 className="title">Categorías de Productos</h1>

      <button
        className="btn btn-success m-5"
        onClick={() => setAbrirModal(true)}
      >
        Agregar Tipo de Producto
      </button>

      {/* Tabla de tipo de productos */}
      <TablaTipoProducto editar={editar} eliminar={handleEliminar} />

      {/* Modal de Tipo de Producto */}
      {abrirModal && (
        <ModalTipoProducto
          abrir={abrirModal}
          cerrar={closeModal}
          editar={editarTipoProducto}
        />
      )}

      {/* Alert Modal para Confirmar Eliminación */}
      {tipoProductoAEliminar && (
        <AlertModal
          isOpen={abrirAlerta}
          onClose={() => setAbrirAlerta(false)}
          onConfirm={() => eliminarTipo(tipoProductoAEliminar.id)}
          entity={tipoProductoAEliminar} // Asegúrate de que el tipo de producto tenga la propiedad 'nombre'
          message="¿Estás seguro de que quieres eliminar este Tipo Producto"
        />
      )}
    </>
  );
};

export default TipoProductos;
