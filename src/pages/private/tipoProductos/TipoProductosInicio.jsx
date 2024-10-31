import { useState } from 'react';
import ModalTipoProducto from '../../../components/productos/tipoProductos/ModalTipoProducto';
import AlertModal from '../../../components/alert/AlertModal'; 
import { useTiposProductosStore } from '../../../store/tipoProductos';
import TablaTipoProducto from '../../../components/productos/tipoProductos/TablatipoProducto';

const TipoProductos = () => {
  const [abrirModal, setAbrirModal] = useState(false);
  const [editarTipoProducto, setEditarTipoProducto] = useState(null);
  const [abrirAlerta, setAbrirAlerta] = useState(false);
  const [tipoProductoAEliminar, setTipoProductoAEliminar] = useState(null); // Este ahora es el ID
  const { eliminar, tiposProductos } = useTiposProductosStore();

  const closeModal = () => {
    setAbrirModal(false);
    setEditarTipoProducto(null);
  };

  const editar = (tipoProducto) => {
    setAbrirModal(true);
    setEditarTipoProducto(tipoProducto);
  };

  const handleEliminar = (tipoProductoId) => {
    setTipoProductoAEliminar(tipoProductoId); // Guardamos el ID del producto a eliminar
    setAbrirAlerta(true); // Abrimos el modal de alerta
  };

  const eliminarTipo = () => {
    if (tipoProductoAEliminar && tiposProductos.some(tp => tp.id === tipoProductoAEliminar)) {
      eliminar(tipoProductoAEliminar); // Eliminamos por ID
    }
    setAbrirAlerta(false);
    setTipoProductoAEliminar(null);
  };

  const tipoProductoNombre = tiposProductos.find(tp => tp.id === tipoProductoAEliminar)?.nombre || '';

  return (
    <>
      <h1 className="title">Categorías de Productos</h1>

      <button
        className="btn primary-theme m-5"
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
      {abrirAlerta && (
        <AlertModal
          isOpen={abrirAlerta}
          onClose={() => setAbrirAlerta(false)}
          onConfirm={eliminarTipo}
          entityDisplayName={tipoProductoNombre}
          message="¿Estás seguro de que quieres eliminar este Tipo Producto "
        />
      )}
    </>
  );
};

export default TipoProductos;
