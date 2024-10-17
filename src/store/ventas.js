import { create } from 'zustand';
import {
  getVentas,
  saveVenta,
  cambiarEstadoVenta,
} from '../helpers/api/ventas/ventas';
import {
  getDetalleVenta,
  saveDetalleVenta,
} from '../helpers/api/ventas/detalleVentas';

export const useVentasStore = create((set) => ({
  ventas: [],
  isLoading: false,
  error: null,

  // Obtener todas las ventas
  obtener: async () => {
    set({ isLoading: true });
    try {
      const ventas = await getVentas();
      set({ ventas, isLoading: false });
    } catch (error) {
      console.error('Error al obtener las ventas', error);
      set({ error, isLoading: false });
    }
  },

  // Obtener un detalle de venta
  obtenerDetalleVenta: async (ventaId) => {
    set({ isLoading: true });
    try {
      const detalleVenta = await getDetalleVenta(ventaId);
      set({ detalleVenta, isLoading: false });
    } catch (error) {
      console.error('Error al obtener el detalle de la venta', error);
      set({ error, isLoading: false });
    }
  },

  // Crear una nueva venta junto con sus detalles
  crear: async (ventaData) => {
    set({ isLoading: true });

    // Crear la venta
    try {
      await saveVenta({
        fechaVenta: ventaData.fechaVenta,
        estado: true,
        observaciones: ventaData.observaciones,
        usuarioId: ventaData.usuarioId,
      });

      const ventas = await getVentas();
      const ultimaVenta = ventas[ventas.length - 1];
      const ventaId = ultimaVenta.id;

      // Crear los detalles de la venta
      const detalles = ventaData.detalles;
      for (const detalle of detalles) {
        await saveDetalleVenta({
          cantidad: detalle.cantidad,
          precio: detalle.precio,
          productoId: detalle.productoId,
          ventaId: ventaId,
        });
      }

      set((state) => ({
        ventas: [...state.ventas, ultimaVenta],
        isLoading: false,
      }));
    } catch (error) {
      console.error('Error al crear la venta y los detalles', error);
      set({ error, isLoading: false });
    }
  },

  // Cambiar el estado de una venta (anularla)
  cambiarEstado: async (id, estado) => {
    set({ isLoading: true });
    try {
      await cambiarEstadoVenta(id, { estado });

      set((state) => ({
        ventas: state.ventas.map((venta) =>
          venta.id === id ? { ...venta, estado } : venta
        ),
        isLoading: false,
      }));
    } catch (error) {
      console.error('Error al cambiar el estado de la venta', error);
      set({ error, isLoading: false });
    }
  },
}));
