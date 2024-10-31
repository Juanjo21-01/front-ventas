import api from '../../libs/axios';
import { toast } from 'sonner'; // Importar la biblioteca de toasts

// PETICIONES DE LOS USUARIOS

// GET - obtener todos los usuarios
export const getUsuarios = async () => {
  try {
    const usuarios = await api.get('usuarios');
    return usuarios.data;
  } catch (error) {
    console.error('Error al obtener los usuarios', error);
  }
};

// GET - obtener un usuarios por id
export const getUsuarioById = async (id) => {
  try {
    const usuarioId = await api.get(`usuarios/${id}`);
    return usuarioId.data;
  } catch (error) {
    toast.error('Usuarios', {
      className: 'bg-theme-secondary error-theme',
      description: "Error al obtener el usuario por ID: " + error,
      duration: 3000,
    });
  }
};

// GET - obtener un usuario por nombre
export const getUsuarioByNombre = async (nombre) => {
  try {
    const usuarioNombre = await api.get(`usuarios/nombres/${nombre}`);
    return usuarioNombre.data;
  } catch (error) {
    toast.error('Usuarios', {
      className: 'bg-theme-secondary error-theme',
      description: "Error al obtener el usuario por nombre: " + error,
      duration: 3000,
    });
  }
};

// GET - obtener un usuario por email
export const getUsuarioByEmail = async (email) => {
  try {
    const usuarioEmail = await api.get(`usuarios/email/${email}`);
    return usuarioEmail.data;
  } catch (error) {
    toast.error('Usuarios', {
      className: 'bg-theme-secondary error-theme',
      description: "Error al obtener el usuario por email: " + error,
      duration: 3000,
    });
  }
};

// GET - obtener un usuario por estado
export const getUsuarioByEstado = async (estado) => {
  try {
    const usuarioEstado = await api.get(`usuarios/estado/${estado}`);
    return usuarioEstado.data;
  } catch (error) {
    toast.error('Usuarios', {
      className: 'bg-theme-secondary error-theme',
      description: "Error al obtener el usuario por estado: " + error,
      duration: 3000,
    });
  }
};

// POST - crear un usuario
export const saveUsuario = async (usuario) => {
  try {
    const usuarioNuevo = await api.post('usuarios/register', usuario);
    toast.success('Usuarios', {
      className: 'bg-theme-secondary secondary-theme',
      description: `Usuario: ${usuarioNuevo.data.nombres} creado con éxito`,
      duration: 3000,
    });
    return usuarioNuevo.data;
  } catch (error) {
    toast.error('Usuarios', {
      className: 'bg-theme-secondary error-theme',
      description: "Error al crear el usuario: " + error,
      duration: 3000,
    });
  }
};

// PUT - actualizar un usuario
export const updateUsuario = async (id, usuario) => {
  try {
    const usuarioActualizado = await api.put(`usuarios/${id}`, usuario);
    toast.info('Usuarios', {
      className: 'bg-theme-secondary secondary-theme',
      description: `Usuario: ${usuarioActualizado.data.nombres} actualizado con éxito`,
      duration: 3000,
    });
    return usuarioActualizado.data;
  } catch (error) {
    toast.error('Usuarios', {
      className: 'bg-theme-secondary error-theme',
      description: "Error al actualizar el usuario: " + error,
      duration: 3000,
    });
  }
};

// DELETE - eliminar un usuario
export const deleteUsuario = async (id) => {
  try {
    const usuarioEliminado = await api.delete(`usuarios/${id}`);
    toast.success('Usuarios', {
      className: 'bg-theme-secondary secondary-theme',
      description: "Usuario eliminado con éxito",
      duration: 3000,
    });
    return usuarioEliminado.data;
  } catch (error) {
    toast.error('Usuarios', {
      className: 'bg-theme-secondary error-theme',
      description: "Error al eliminar el usuario: " + error,
      duration: 3000,
    });
  }
};