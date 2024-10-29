import { useState } from 'react';
import ModalTipoProducto from '../../../components/productos/tipoProductos/ModalTipoProducto';
import TablaTipoProducto from '../../../components/productos/tipoProductos/TablaTipoProducto';
import { useTiposProductosStore } from '../../../store/tipoProductos';

const TipoProductos = () => {
  const [abrirModal, setAbrirModal] = useState(null);
  const [editarTipoProducto, setEditarTipoProducto] = useState(null);
  const { eliminar } = useTiposProductosStore();

  const closeModal = () => {
    setAbrirModal(false);
    setEditarTipoProducto(null); // Resetear el usuario a editar
  };

  const editar = (tipoProducto) => {
    setAbrirModal(true);
    setEditarTipoProducto(tipoProducto);
  };

  const eliminarTipo = async (id) => {
    await eliminar(id);
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
      <TablaTipoProducto editar={editar} eliminar={eliminarTipo} />

      {/* Modal */}
      {abrirModal && (
        <ModalTipoProducto
          abrir={abrirModal}
          cerrar={closeModal}
          editar={editarTipoProducto}
        />
      )}
    </>
  );
};

export default TipoProductos;
