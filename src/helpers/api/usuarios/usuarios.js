import api from '../../libs/axios';

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
    console.error('Error al obtener el usuario por id', error);
  }
};

// GET - obtener un usuario por nombre
export const getUsuarioByNombre = async (nombre) => {
  try {
    const usuarioNombre = await api.get(`usuarios/nombres/${nombre}`);
    return usuarioNombre.data;
  } catch (error) {
    console.error('Error al obtener el usuario por nombre', error);
  }
};

// GET - obtener un usuario por email
export const getUsuarioByEmail = async (email) => {
  try {
    const usuarioEmail = await api.get(`usuarios/email/${email}`);
    return usuarioEmail.data;
  } catch (error) {
    console.error('Error al obtener el usuario por email', error);
  }
};

// GET - obtener un usuario por estado
export const getUsuarioByEstado = async (estado) => {
  try {
    const usuarioEstado = await api.get(`usuarios/estado/${estado}`);
    return usuarioEstado.data;
  } catch (error) {
    console.error('Error al obtener el usuario por estado', error);
  }
};

// POST - crear un usuario
export const saveUsuario = async (usuario) => {
  try {
    const usuarioNuevo = await api.post('usuarios/register', usuario);
    return usuarioNuevo.data;
  } catch (error) {
    console.error('Error al crear el usuario', error);
  }
};

// PUT - actualizar un usuario
export const updateUsuario = async (id, usuario) => {
  try {
    const usuarioActualizado = await api.put(`usuarios/${id}`, usuario);
    return usuarioActualizado.data;
  } catch (error) {
    console.error('Error al actualizar el usuario', error);
  }
};

// DELETE - eliminar un usuario
export const deleteUsuario = async (id) => {
  try {
    const usuarioEliminado = await api.delete(`usuarios/${id}`);
    return usuarioEliminado.data;
  } catch (error) {
    console.error('Error al eliminar el usuario', error);
  }
};
