import { create } from 'zustand';
import {
  getProductos,
  saveProducto,
  updateProducto,
  deleteProducto,
} from '../helpers/api/productos/productos';

export const useProductosStore = create((set) => ({
  productos: [],
  isLoading: false,
  error: null,

  // Obtener todos los productos
  obtener: async () => {
    set({ isLoading: true });
    try {
      const productos = await getProductos();
      set({ productos, isLoading: false });
    } catch (error) {
      console.error('Error al obtener los productos', error);
      set({ isLoading: false });
    }
  },

  // Crear un nuevo producto
  crear: async (nuevoProducto) => {
    try {
      const producto = await saveProducto(nuevoProducto);
      set((state) => ({
        productos: [...state.productos, producto],
      }));
    } catch (error) {
      console.error('Error al crear el producto', error);
    }
  },

  // Actualizar un producto
  actualizar: async (id, actualizarProducto) => {
    try {
      const producto = await updateProducto(id, actualizarProducto);
      set((state) => ({
        productos: state.productos.map((p) => (p.id === id ? producto : p)),
      }));
    } catch (error) {
      console.error('Error al actualizar el producto', error);
    }
  },

  // Eliminar un producto
  eliminar: async (id) => {
    try {
      await deleteProducto(id);
      set((state) => ({
        productos: state.productos.filter((producto) => producto.id !== id),
      }));
    } catch (error) {
      console.error('Error al eliminar el producto', error);
    }
  },
}));
