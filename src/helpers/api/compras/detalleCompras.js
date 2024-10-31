import { toast } from 'sonner';
import api from '../../libs/axios';

// GET - obtener detalle compras  por id
export const getDetalleCompra = async (id) => {
  try {
    const detalleCompraId = await api.get(`detalle-compras/${id}`);
    return detalleCompraId.data;
  } catch (error) {
    toast.error('Detalle de Compras', {
      className: 'bg-theme-secondary error-theme',
      description: "Error al obtener el detalle de compra: " + error,
      duration: 3000,
    });
  }
};

// POST - crear un detalle de compra
export const saveDetalleCompra = async (detalleCompra) => {
  try {
    const detalleCompraNuevo = await api.post('detalle-compras', detalleCompra);
    toast.success('Detalle de Compras', {
      className: 'bg-theme-secondary secondary-theme',
      description: `Detalle de compra creado con éxito`,
      duration: 3000,
    });
    return detalleCompraNuevo.data;
  } catch (error) {
    toast.error('Detalle de Compras', {
      className: 'bg-theme-secondary error-theme',
      description: "Error al crear el detalle de compra: " + error,
      duration: 3000,
    });
  }
};