import { toast } from 'sonner';
import api from '../../libs/axios';

// GET - obtener detalle ventas  por id
export const getDetalleVenta = async (id) => {
  try {
    const detalleVentasId = await api.get(`detalle-ventas/${id}`);
    return detalleVentasId.data;
  } catch (error) {
    toast.error('Detalle de Ventas', {
      className: 'bg-theme-secondary error-theme',
      description: "Error al obtener el detalle de venta: " + error,
      duration: 3000,
    });
  }
};

// POST - crear un detalle de venta
export const saveDetalleVenta = async (detalleVenta) => {
  try {
    const detalleVentaNuevo = await api.post('detalle-ventas', detalleVenta);
    toast.success('Detalle de Ventas', {
      className: 'bg-theme-secondary secondary-theme',
      description: `Detalle de venta creado con éxito`,
      duration: 3000,
    });
    return detalleVentaNuevo.data;
  } catch (error) {
    toast.error('Detalle de Ventas', {
      className: 'bg-theme-secondary error-theme',
      description: "Error al crear el detalle de venta: " + error,
      duration: 3000,
    });
  }
};