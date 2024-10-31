import { create } from 'zustand';
import {
  getComentarios,
  postComentario,
} from '../helpers/api/comentarios/comentarios';

export const useComentariosStore = create((set) => ({
  comentarios: [],
  isLoading: false,
  error: null,

  // Obtener todos los comentarios
  obtener: async () => {
    set({ isLoading: true, error: null });
    try {
      const comentarios = await getComentarios();
      set({ comentarios, isLoading: false });
    } catch (error) {
      console.error('Error al obtener los comentarios', error);
      set({ error, isLoading: false });
    }
  },

  //
  crear: async (usuarioId, productoId, comentario) => {
    try {
      const comentarioNumero = await postComentario(
        usuarioId,
        productoId,
        comentario
      );
      set((state) => ({
        comentarios: [...state.comentarios, comentarioNumero],
      }));
    } catch (error) {
      console.error('Error al crear el comentario', error);
    }
  },
}));
