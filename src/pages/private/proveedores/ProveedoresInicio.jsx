import { useState } from 'react';
import ModalProveedores from '../../../components/proveedores/ModalProveedores';
import TablaProveedores from '../../../components/proveedores/TablaProveedores';
import { useProveedoresStore } from '../../../store/proveedores';

const Proveedores = () => {
  const [abrirModal, setAbrirModal] = useState(null);
  const [editarProveedor, setEditarProveedor] = useState(null);
  const { crear, editar, eliminar } = useProveedoresStore();
  const [notificacion, setNotificacion] = useState({ mensaje: '', tipo: '' });

  const closeModal = () => {
    setAbrirModal(false);
    setEditarProveedor(null); // Resetear el proveedor a editar
  };

  const manejarEditar = (proveedor) => {
    setAbrirModal(true);
    setEditarProveedor(proveedor);
  };

  const manejarEliminar = async (id) => {
    await eliminar(id);
    setNotificacion({ mensaje: 'Proveedor eliminado correctamente', tipo: 'success' });
    
    // Limpiar la notificación después de 3 segundos
    setTimeout(() => setNotificacion({ mensaje: '', tipo: '' }), 3000);
  };

  const manejarGuardar = async (proveedor) => {
    if (editarProveedor) {
      await editar(proveedor.id, proveedor);
      setNotificacion({ mensaje: 'Proveedor editado correctamente', tipo: 'success' });
    } else {
      await crear(proveedor);
      setNotificacion({ mensaje: 'Proveedor agregado correctamente', tipo: 'success' });
    }
    closeModal();

    // Limpiar la notificación después de 3 segundos
    setTimeout(() => setNotificacion({ mensaje: '', tipo: '' }), 3000);
  };

  return (
    <>
      <h1 className="title">Información de los Proveedores</h1>

      <button
        className="btn btn-success m-5"
        onClick={() => setAbrirModal(true)}
      >
        Agregar Proveedor
      </button>

      {/* Notificación */}
      {notificacion.mensaje && (
        <div
          role="alert"
          className={`absolute right-5 mb-10 p-4 max-w-xs flex items-center text-white rounded ${notificacion.tipo === 'success' ? 'bg-green-500' : 'bg-red-500'}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="ml-2 text-black">{notificacion.mensaje}</span>
        </div>
      )}

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
