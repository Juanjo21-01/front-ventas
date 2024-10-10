import api from '../../libs/axios';

  // GET - obtener detalle compras  por id
  export const getDetalleCompra = async (id) => {
    try {
      const  detalleCompraId = await api.get(`detalle-compras/${id}`);
      return  detalleCompraId.data;
    } catch (error) {
      console.error('Error al obtener el detalle de compra por id', error);
    }
  };

      // POST - crear un detalle de compra
export const saveDetalleCompra = async (detalleCompra) => {
    try {
      const detalleCompraNuevo = await api.post('detalle-compras', detalleCompra);
      return detalleCompraNuevo.data;
    } catch (error) {
      console.error('Error al crear detalle de compra', error);
    }
  };