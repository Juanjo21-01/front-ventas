import { create } from 'zustand';
import {
  getTipoProducto,
  saveTipoProducto,
  updateTipoProducto,
  deleteTipoProducto,
} from '../helpers/api/productos/tipoProductos';

export const useTiposProductosStore = create((set) => ({
  tiposProductos: [],
  isLoading: false,
  error: null,

  // Obtener todos los tipos de productos
  obtener: async () => {
    set({ isLoading: true });
    try {
      const tiposProductos = await getTipoProducto();
      set({ tiposProductos, isLoading: false });
    } catch (error) {
      console.error('Error al obtener los tipos de productos', error);
      set({ isLoading: false });
    }
  },

  // Crear un nuevo tipo de producto
  crear: async (nuevoTipoProducto) => {
    try {
      const tipoProducto = await saveTipoProducto(nuevoTipoProducto);
      set((state) => ({
        tiposProductos: [...state.tiposProductos, tipoProducto],
      }));
    } catch (error) {
      console.error('Error al crear el tipo de producto', error);
    }
  },

  // Actualizar un tipo de producto
  actualizar: async (id, actualizarTipoProducto) => {
    try {
      const tipoProducto = await updateTipoProducto(id, actualizarTipoProducto);
      set((state) => ({
        tiposProductos: state.tiposProductos.map((tp) =>
          tp.id === id ? tipoProducto : tp
        ),
      }));
    } catch (error) {
      console.error('Error al actualizar el tipo de producto', error);
    }
  },

  // Eliminar un tipo de producto
  eliminar: async (id) => {
    try {
      await deleteTipoProducto(id);
      set((state) => ({
        tiposProductos: state.tiposProductos.filter(
          (tipoProducto) => tipoProducto.id !== id
        ),
      }));
    } catch (error) {
      console.error('Error al eliminar el tipo de producto', error);
    }
  },
}));
