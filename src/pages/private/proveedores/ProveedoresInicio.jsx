import { useState } from 'react';
import ModalProveedores from '../../../components/proveedores/ModalProveedores';
import TablaProveedores from '../../../components/proveedores/TablaProveedores';
import { useProveedoresStore } from '../../../store/proveedores';

const Proveedores = () => {
  const [abrirModal, setAbrirModal] = useState(null);
  const [editarProveedor, setEditarProveedor] = useState(null);
  const { crear, actualizar, eliminar } = useProveedoresStore();

  const closeModal = () => {
    setAbrirModal(false);
    setEditarProveedor(null);
  };

  const manejarEditar = (proveedor) => {
    setAbrirModal(true);
    setEditarProveedor(proveedor);
  };

  const manejarEliminar = async (id) => {
    await eliminar(id);
  };

  const manejarGuardar = async (proveedor) => {
    if (editarProveedor) {
      await actualizar(proveedor.id, proveedor);
    } else {
      await crear(proveedor);
    }
    closeModal();
  };

  return (
    <>
      <h1 className="title">Información de los Proveedores</h1>

      <button
        className="btn primary-theme m-5"
        onClick={() => setAbrirModal(true)}
      >
        Agregar Proveedor
      </button>

      {/* Tabla de proveedores */}
      <TablaProveedores editar={manejarEditar} eliminar={manejarEliminar} />

      {/* Modal de proveedores */}
      {abrirModal && (
        <ModalProveedores
          abrir={abrirModal}
          cerrar={closeModal}
          editar={editarProveedor}
          onGuardar={manejarGuardar}
        />
      )}
    </>
  );
};

export default Proveedores;
