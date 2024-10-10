import api from '../../libs/axios';

// PETICIONES DE LOS VENTAS

// GET - obtener todas los ventas
export const getCompras = async () => {
    try {
      const ventas = await api.get('ventas');
      return ventas.data;
    } catch (error) {
      console.error('Error al obtener las ventas', error);
    }
  };

  
     // GET - obtener una venta por id
export const getVentaById = async (id) => {
    try {
      const ventaId = await api.get(`ventas/${id}`);
      return ventaId.data;
    } catch (error) {
      console.error('Error al obtener la venta por id', error);
    }
  };

         // GET - obtener un venta por fecha
export const getVentasByFecha = async (fecha) => {
    try {
      const ventasFecha = await api.get(`ventas/fecha/${fecha}`);
      return ventasFecha.data;
    } catch (error) {
      console.error('Error al obtener las ventas por fecha', error);
    }
  };

        // GET - obtener  ventas por estado
export const getVentasByEstado = async (estado) => {
    try {
      const ventasEstado = await api.get(`ventas/estado/${estado}`);
      return ventasEstado.data;
    } catch (error) {
      console.error('Error al obtener la ventas por estado', error);
    }
  };    
  
  // GET - obtener  ventas por usuario
export const getVentasByUsuario = async (usuario) => {
    try {
    const ventasUsuario = await api.get(`ventas/usuario/${usuario}`);
    return ventasUsuario.data;
    } catch (error) {
    console.error('Error al obtener la ventas por usuario', error);
    }
};

      // PATCH - Actualizar estado de venta
      export const patchCambiarEstadoVenta = async (id, estado) => {
        try {
          const ventaCambiarEstado = await api.patch(`ventas/cambiarEstado/${id}`, estado);
          return ventaCambiarEstado.data;
        } catch (error) {
          console.error('Error al crear la venta', error);
        }
      };

      // POST - crear una venta
      export const saveVenta = async (venta) => {
        try {
          const ventaNueva = await api.post('ventas', venta);
          return ventaNueva.data;
        } catch (error) {
          console.error('Error al crear la venta', error);
        }
      };