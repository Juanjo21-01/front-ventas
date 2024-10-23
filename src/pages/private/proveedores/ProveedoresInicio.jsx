import { useState } from 'react';
import ModalProveedores from '../../../components/proveedores/ModalProveedores';
import TablaProveedores from '../../../components/proveedores/TablaProveedores';
import { useProveedoresStore } from '../../../store/proveedores';

const Proveedores = () => {
  const [abrirModal, setAbrirModal] = useState(null);
  const [editarProveedor, setEditarProveedor] = useState(null);
  const { eliminar } = useProveedoresStore();


  const closeModal = () => {
    setAbrirModal(false);
    setEditarProveedor(null); // Resetear el usuario a editar
  };

  const editar = (proveedor) => {
    setAbrirModal(true);
    setEditarProveedor(proveedor);
  };

  const eliminarProveedor = async (id) => {
    await eliminar(id);
  };

  return (
    <div>
      <h1 className="title">Proveedores</h1>

      <button
        className="btn btn-success m-5"
        onClick={() => setAbrirModal(true)}
      >
        Agregar Proveedor
      </button>

      {/* Tabla de proveedores */}

      <TablaProveedores editar={editar} eliminar={eliminarProveedor} />
      {abrirModal && (
        <ModalProveedores
          abrir={abrirModal}
          cerrar={closeModal}
          editar={editarProveedor}
        />
      )}
    </div>
  );
};

export default Proveedores;
