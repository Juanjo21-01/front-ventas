import { create } from 'zustand';
import {
  getCompras,
  saveCompra,
  cambiarEstadoCompra,
} from '../helpers/api/compras/compras';
import {
  getDetalleCompra,
  saveDetalleCompra,
} from '../helpers/api/compras/detalleCompras';

export const useComprasStore = create((set) => ({
  compras: [],
  isLoading: false,
  error: null,

  // Obtener todas las compras
  obtener: async () => {
    set({ isLoading: true });
    try {
      const compras = await getCompras();
      set({ compras, isLoading: false });
    } catch (error) {
      console.error('Error al obtener las compras', error);
      set({ error, isLoading: false });
    }
  },

  // Obtener un detalle de compra
  obtenerDetalleCompra: async (compraId) => {
    set({ isLoading: true });
    try {
      const detalleCompra = await getDetalleCompra(compraId);
      set({ detalleCompra, isLoading: false });
    } catch (error) {
      console.error('Error al obtener el detalle de la compra', error);
      set({ error, isLoading: false });
    }
  },

  // Crear una nueva compra junto con sus detalles
  crear: async (compraData) => {
    set({ isLoading: true });

    // Crear la compra
    try {
      await saveCompra({
        fechaCompra: compraData.fechaCompra,
        estado: true,
        observaciones: compraData.observaciones,
        proveedorId: compraData.proveedorId,
        usuarioId: compraData.usuarioId,
      });

      const compras = await getCompras();
      const ultimaCompra = compras[compras.length - 1];
      const compraId = ultimaCompra.id;

      // Crear los detalles de la compra
      const detalles = compraData.detalles;
      for (const detalle of detalles) {
        await saveDetalleCompra({
          cantidad: detalle.cantidad,
          precio: detalle.precio,
          productoId: detalle.productoId,
          compraId: compraId,
        });
      }

      set((state) => ({
        compras: [...state.compras, ultimaCompra],
        isLoading: false,
      }));
    } catch (error) {
      console.error('Error al crear la compra y los detalles', error);
      set({ error, isLoading: false });
    }
  },

  // Cambiar el estado de una compra (anularla)
  cambiarEstado: async (id, estado) => {
    set({ isLoading: true });
    try {
      await cambiarEstadoCompra(id, { estado });

      set((state) => ({
        compras: state.compras.map((compra) =>
          compra.id === id ? { ...compra, estado } : compra
        ),
        isLoading: false,
      }));
    } catch (error) {
      console.error('Error al cambiar el estado de la compra', error);
      set({ error, isLoading: false });
    }
  },
}));
