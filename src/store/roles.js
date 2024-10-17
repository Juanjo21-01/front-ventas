import { create } from 'zustand';
import {
  getRoles,
  saveRol,
  updateRol,
  deleteRol,
} from '../helpers/api/usuarios/roles';

export const useRolesStore = create((set) => ({
  roles: [],
  isLoading: false,
  error: null,

  // Obtener todos los roles
  obtener: async () => {
    set({ isLoading: true });
    try {
      const roles = await getRoles();
      set({ roles, isLoading: false });
    } catch (error) {
      console.error('Error al obtener los roles', error);
      set({ isLoading: false });
    }
  },

  // Crear un nuevo rol
  crear: async (nuevoRol) => {
    try {
      const rol = await saveRol(nuevoRol);
      set((state) => ({
        roles: [...state.roles, rol],
      }));
    } catch (error) {
      console.error('Error al crear el rol', error);
    }
  },

  // Actualizar un rol
  actualizar: async (id, actualizarRol) => {
    try {
      const rol = await updateRol(id, actualizarRol);
      set((state) => ({
        roles: state.roles.map((r) => (r.id === id ? rol : r)),
      }));
    } catch (error) {
      console.error('Error al actualizar el rol', error);
    }
  },

  // Eliminar un rol
  eliminar: async (id) => {
    try {
      await deleteRol(id);
      set((state) => ({
        roles: state.roles.filter((rol) => rol.id !== id),
      }));
    } catch (error) {
      console.error('Error al eliminar el rol', error);
    }
  },
}));
