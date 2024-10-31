import api from '../../libs/axios';
import { toast } from 'sonner';
// PETICIONES DE LOS ROLES

// GET - obtener todos los roles
export const getRoles = async () => {
  try {
    const roles = await api.get('roles');
    return roles.data;
  } catch (error) {
    toast.error('Roles', {
      className: 'bg-theme-secondary error-theme',
      description: "Error al obtener los roles: "+error,
      duration: 3000,
    });
  }
};

// GET - obtener un rol por id
export const getRolById = async (id) => {
  try {
    const rolId = await api.get(`roles/${id}`);
    return rolId.data;
  } catch (error) {
    toast.error('Roles', {
      className: 'bg-theme-secondary error-theme',
      description: "Error al obtener el rol por ID: "+error,
      duration: 3000,
    });
  }
};

// GET - obtener un rol por nombre
export const getRolByNombre = async (nombre) => {
  try {
    const rolNombre = await api.get(`roles/nombre/${nombre}`);
    return rolNombre.data;
  } catch (error) {
    toast.error('Roles', {
      className: 'bg-theme-secondary error-theme',
      description: "Error al obtener el rol: "+error,
      duration: 3000,
    });
  }
};

// POST - crear un rol
export const saveRol = async (rol) => {
  try {
    const rolNuevo = await api.post('roles', rol);
    // Mostrar notificación de éxito
    toast.success('Roles', {
      className: 'bg-theme-secondary secondary-theme',
      description: `Rol: ${rolNuevo.data.nombre}, creado con éxito`,
      duration: 3000,
    });
    return rolNuevo.data;
  } catch (error) {
    toast.error('Roles', {
      className: 'bg-theme-secondary error-theme',
      description: "Error al crear el rol: "+error,
      duration: 3000,
    });
  }
};

// PUT - actualizar un rol
export const updateRol = async (id, rol) => {
  try {
    const rolActualizado = await api.put(`roles/${id}`, rol);
    toast.info('Roles', {
      className: 'bg-theme-secondary secondary-theme',
      description: "Rol: "+rolActualizado.data.nombre+" Actualizado con éxito",
      duration: 3000,
    });
    return rolActualizado.data;
  } catch (error) {
    toast.error('Roles', {
      className: 'bg-theme-secondary error-theme',
      description: "Error al actualizar el rol: "+error,
      duration: 3000,
    });
  }
};

// DELETE - eliminar un rol
export const deleteRol = async (id) => {
  try {
    const rolEliminado = await api.delete(`roles/${id}`);
    toast.success('Roles', {
      className: 'bg-theme-secondary secondary-theme',
      description: "Rol eliminado con éxito",
      duration: 3000,
    });
    return rolEliminado.data;
  } catch (error) {
    toast.error('Roles', {
      className: 'bg-theme-secondary error-theme',
      description: "Error al eliminar el rol: "+error,
      duration: 3000,
    });
  }
};
