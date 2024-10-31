import { toast } from 'sonner';
import api from '../../libs/axios';

// PETICIONES DE LOS VENTAS

// GET - obtener todas los ventas
export const getVentas = async () => {
  try {
    const ventas = await api.get('ventas');
    return ventas.data;
  } catch (error) {
    toast.error('Ventas', {
      className: 'bg-theme-secondary error-theme',
      description: "Error al obtener las ventas: " + error,
      duration: 3000,
    });
  }
};

// GET - obtener una venta por id
export const getVentaById = async (id) => {
  try {
    const ventaId = await api.get(`ventas/${id}`);
    return ventaId.data;
  } catch (error) {
    toast.error('Ventas', {
      className: 'bg-theme-secondary error-theme',
      description: "Error al obtener la venta por ID: " + error,
      duration: 3000,
    });
  }
};

// GET - obtener un venta por fecha
export const getVentasByFecha = async (fecha) => {
  try {
    const ventasFecha = await api.get(`ventas/fecha/${fecha}`);
    return ventasFecha.data;
  } catch (error) {
    toast.error('Ventas', {
      className: 'bg-theme-secondary error-theme',
      description: "Error al obtener las ventas por fecha: " + error,
      duration: 3000,
    });
  }
};

// GET - obtener  ventas por estado
export const getVentasByEstado = async (estado) => {
  try {
    const ventasEstado = await api.get(`ventas/estado/${estado}`);
    return ventasEstado.data;
  } catch (error) {
    toast.error('Ventas', {
      className: 'bg-theme-secondary error-theme',
      description: "Error al obtener las ventas por estado: " + error,
      duration: 3000,
    });
  }
};

// GET - obtener  ventas por usuario
export const getVentasByUsuario = async (usuario) => {
  try {
    const ventasUsuario = await api.get(`ventas/usuario/${usuario}`);
    return ventasUsuario.data;
  } catch (error) {
    toast.error('Ventas', {
      className: 'bg-theme-secondary error-theme',
      description: "Error al obtener las ventas por usuario: " + error,
      duration: 3000,
    });
  }
};

// PATCH - Actualizar estado de venta
export const cambiarEstadoVenta = async (id, estado) => {
  try {
    const ventaCambiarEstado = await api.patch(
      `ventas/cambiarEstado/${id}`,
      estado
    );
    toast.info('Ventas', {
      className: 'bg-theme-secondary secondary-theme',
      description: `Estado de la venta actualizado con éxito`,
      duration: 3000,
    });
    return ventaCambiarEstado.data;
  } catch (error) {
    toast.error('Ventas', {
      className: 'bg-theme-secondary error-theme',
      description: "Error al cambiar el estado de la venta: " + error,
      duration: 3000,
    });
  }
};

// POST - crear una venta
export const saveVenta = async (venta) => {
  try {
    const ventaNueva = await api.post('ventas', venta);
    toast.success('Ventas', {
      className: 'bg-theme-secondary secondary-theme',
      description: `Venta creada con éxito`,
      duration: 3000,
    });
    return ventaNueva.data;
  } catch (error) {
    toast.error('Ventas', {
      className: 'bg-theme-secondary error-theme',
      description: "Error al crear la venta: " + error,
      duration: 3000,
    });
  }
};