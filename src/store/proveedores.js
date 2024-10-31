import { create } from 'zustand';
import {
  getProveedores,
  saveProveedor,
  updateProveedor,
  deleteProveedor,
} from '../helpers/api/productos/proveedores';

export const useProveedoresStore = create((set) => ({
  proveedores: [],
  isLoading: false,
  error: null,

  // Obtener todos los proveedores
  obtener: async () => {
    set({ isLoading: true });
    try {
      const proveedores = await getProveedores();
      set({ proveedores, isLoading: false });
    } catch (error) {
      console.error('Error al obtener los proveedores', error);
      set({ isLoading: false });
    }
  },

  // Crear un nuevo proveedor
  crear: async (nuevoProveedor) => {
    try {
      const proveedor = await saveProveedor(nuevoProveedor);
      set((state) => ({
        proveedores: [...state.proveedores, proveedor],
      }));
    } catch (error) {
      console.error('Error al crear el proveedor', error);
      set({error});
    }
  },

  // Actualizar un proveedor
  actualizar: async (id, actualizarProveedor) => {
    try {
      const proveedor = await updateProveedor(id, actualizarProveedor);
      set((state) => ({
        proveedores: state.proveedores.map((p) =>
          p.id === id ? proveedor : p
        ),
      }));
    } catch (error) {
      console.error('Error al actualizar el proveedor', error);
    }
  },

  // Eliminar un proveedor
  eliminar: async (id) => {
    try {
      await deleteProveedor(id);
      set((state) => ({
        proveedores: state.proveedores.filter(
          (proveedor) => proveedor.id !== id
        ),
      }));
    } catch (error) {
      console.error('Error al eliminar el proveedor', error);
    }
  },
}));
