import api from '../../libs/axios';
import { toast } from 'sonner';
// PETICIONES DE LOS ROLES

// GET - obtener todos los roles
export const getRoles = async () => {
  try {
    const roles = await api.get('roles');
    return roles.data;
  } catch (error) {
    console.error('Error al obtener los roles', error);
  }
};

// GET - obtener un rol por id
export const getRolById = async (id) => {
  try {
    const rolId = await api.get(`roles/${id}`);
    return rolId.data;
  } catch (error) {
    console.error('Error al obtener el rol por id', error);
  }
};

// GET - obtener un rol por nombre
export const getRolByNombre = async (nombre) => {
  try {
    const rolNombre = await api.get(`roles/nombre/${nombre}`);
    return rolNombre.data;
  } catch (error) {
    console.error('Error al obtener el rol por nombre', error);
  }
};

// POST - crear un rol
export const saveRol = async (rol) => {
  try {
    const rolNuevo = await api.post('roles', rol);
    // Mostrar notificación de éxito
    toast.success(`Rol: ${rolNuevo.data.nombre}, creado con éxito`);
    return rolNuevo.data;
  } catch (error) {
    toast.error('Error al crear el rol: ', error);
  }
};

// PUT - actualizar un rol
export const updateRol = async (id, rol) => {
  try {
    const rolActualizado = await api.put(`roles/${id}`, rol);
    // Mostrar notificación de éxito
    toast.info(`Rol: ${rolActualizado.data.nombre}, actualizado con éxito`);
    return rolActualizado.data;
  } catch (error) {
    toast.error('Error al actualizar el rol: ', error);
  }
};

// DELETE - eliminar un rol
export const deleteRol = async (id) => {
  try {
    const rolEliminado = await api.delete(`roles/${id}`);
    // Mostrar notificación de éxito
    toast.success(`Rol eliminado con éxito`);
    return rolEliminado.data;
  } catch (error) {
    toast.error('Error al eliminar el rol: ', error);
  }
};
