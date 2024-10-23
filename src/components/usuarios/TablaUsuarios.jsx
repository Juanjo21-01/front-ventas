import { useState } from 'react';
import ModalUsuario from './ModalUsuario';

const TablaUsuarios = () => {
  const [usuarios, setUsuarios] = useState([
    { id: 1, nombres: 'Mario', apellidos: 'Lopez', email: 'mariolopez@gmail.com', password: '123456', direccion: 'Ciudad Quetzal', telefono: '5586-9874', estado: 'Activo', rol_id: 1 },
    { id: 2, nombres: 'Vanner', apellidos: 'Pérez', email: 'vanner@gmail.com', password: 'abcdef', direccion: 'San Lucas Sacatepequez', telefono: '4178-2315', estado: 'Inactivo', rol_id: 2 },
  ]);

  // Estado para controlar qué usuario está siendo editado
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

  // Estado para controlar si el modal está abierto o cerrado
  const [modalAbierto, setModalAbierto] = useState(false);

  // Función para abrir el modal y seleccionar un usuario
  const abrirModal = (usuario) => {
    setUsuarioSeleccionado(usuario);
    setModalAbierto(true);
  };

  // Función para cerrar el modal
  const cerrarModal = () => {
    setModalAbierto(false);
    setUsuarioSeleccionado(null);
  };

  // Función para actualizar los datos de un usuario en la tabla
  const guardarCambios = (usuarioEditado) => {
    setUsuarios(
      usuarios.map((usuario) =>
        usuario.id === usuarioEditado.id ? usuarioEditado : usuario
      )
    );
    cerrarModal();
  };

  // Función para eliminar un usuario de la tabla
  const eliminarUsuario = (id) => {
    setUsuarios(usuarios.filter((usuario) => usuario.id !== id));
  };

  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>id</th>
            <th>nombres</th>
            <th>apellidos</th>
            <th>email</th>
            <th>password</th>
            <th>dirección</th>
            <th>teléfono</th>
            <th>estado</th>
            <th>rol_id</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.id}</td>
              <td>{usuario.nombres}</td>
              <td>{usuario.apellidos}</td>
              <td>{usuario.email}</td>
              <td>{usuario.password}</td>
              <td>{usuario.direccion}</td>
              <td>{usuario.telefono}</td>
              <td>{usuario.estado}</td>
              <td>{usuario.rol_id}</td>
              <td>
                <button className="btn btn-warning mr-2" onClick={() => abrirModal(usuario)}>
                  Editar
                </button>
                <button className="btn btn-error" onClick={() => eliminarUsuario(usuario.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal para editar el usuario */}
      {modalAbierto && (
        <ModalUsuario
          usuario={usuarioSeleccionado}
          guardarCambios={guardarCambios}
          cerrarModal={cerrarModal}
        />
      )}
    </div>
  );
};

export default TablaUsuarios;