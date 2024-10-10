import api from '../../libs/axios';

  // GET - obtener detalle ventas  por id
  export const getDetalleVentasId = async (id) => {
    try {
      const  detalleVentasId = await api.get(`detalle-ventas/${id}`);
      return  detalleVentasId.data;
    } catch (error) {
      console.error('Error al obtener el detalle de ventas por id', error);
    }
  };

      // POST - crear un detalle de venta
export const saveDetalleVenta = async (detalleVenta) => {
    try {
      const detalleVentaNuevo = await api.post('detalle-ventas', detalleVenta);
      return detalleVentaNuevo.data;
    } catch (error) {
      console.error('Error al crear detalle de venta', error);
    }
  };