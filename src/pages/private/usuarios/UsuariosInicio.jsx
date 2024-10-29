import { useState } from 'react';
import ModalUsuario from '../../../components/usuarios/ModalUsuario';
import TablaUsuarios from '../../../components/usuarios/TablaUsuarios';
import { useUsuariosStore } from '../../../store/usuarios';

const Usuarios = () => {
  const [abrirModal, setAbrirModal] = useState(false);
  const [editarUsuarios, setEditarUsuario] = useState(null);
  const { eliminar } = useUsuariosStore();

  const closeModal = () => {
    setAbrirModal(false);
    setEditarUsuario(null);
  };

  const editar = (usuario) => {
    setAbrirModal(true);
    setEditarUsuario(usuario);
  };

  const eliminarUsuario = async (id) => {
    await eliminar(id);
  };

  return (
    <div>
      <h2 className="title">Información Usuarios</h2>

      <button
        className="btn primary-theme m-5"
        onClick={() => setAbrirModal(true)}
      >
        Agregar Usuario
      </button>

      <TablaUsuarios editar={editar} eliminar={eliminarUsuario} />
      {abrirModal && (
        <ModalUsuario
          abrir={abrirModal}
          cerrar={closeModal}
          editar={editarUsuarios}
        />
      )}
    </div>
  );
};

export default Usuarios;
