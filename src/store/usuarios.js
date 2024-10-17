import { create } from 'zustand';
import {
  getUsuarios,
  saveUsuario,
  updateUsuario,
  deleteUsuario,
} from '../helpers/api/usuarios/usuarios';

export const useUsuariosStore = create((set) => ({
  usuarios: [],
  isLoading: false,
  error: null,

  // Obtener todos los usuarios
  obtener: async () => {
    set({ isLoading: true });
    try {
      const usuarios = await getUsuarios();
      set({ usuarios, isLoading: false });
    } catch (error) {
      console.error('Error al obtener los usuarios', error);
      set({ isLoading: false });
    }
  },

  // Crear un nuevo usuario
  crear: async (nuevoUsuario) => {
    try {
      const usuario = await saveUsuario(nuevoUsuario);
      set((state) => ({
        usuarios: [...state.usuarios, usuario],
      }));
    } catch (error) {
      console.error('Error al crear el usuario', error);
    }
  },

  // Actualizar un usuario
  actualizar: async (id, actualizarUsuario) => {
    try {
      const usuario = await updateUsuario(id, actualizarUsuario);
      set((state) => ({
        usuarios: state.usuarios.map((u) => (u.id === id ? usuario : u)),
      }));
    } catch (error) {
      console.error('Error al actualizar el usuario', error);
    }
  },

  // Eliminar un usuario
  eliminar: async (id) => {
    try {
      await deleteUsuario(id);
      set((state) => ({
        usuarios: state.usuarios.filter((usuario) => usuario.id !== id),
      }));
    } catch (error) {
      console.error('Error al eliminar el usuario', error);
    }
  },
}));
