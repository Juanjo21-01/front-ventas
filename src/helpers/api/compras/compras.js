import { toast } from 'sonner';
import api from '../../libs/axios';

// PETICIONES DE LOS COMPRAS

// GET - obtener todas los compras
export const getCompras = async () => {
  try {
    const compras = await api.get('compras');
    return compras.data;
  } catch (error) {
    toast.error('Compras', {
      className: 'bg-theme-secondary error-theme',
      description: "Error al obtener las compras: " + error,
      duration: 3000,
    });
  }
};

// GET - obtener un compras por id
export const getCompraById = async (id) => {
  try {
    const compraId = await api.get(`compras/${id}`);
    return compraId.data;
  } catch (error) {
    toast.error('Compras', {
      className: 'bg-theme-secondary error-theme',
      description: "Error al obtener la compra por ID: " + error,
      duration: 3000,
    });
  }
};

// GET - obtener un compras por fecha
export const getComprasByFecha = async (fecha) => {
  try {
    const comprasFecha = await api.get(`compras/fecha/${fecha}`);
    return comprasFecha.data;
  } catch (error) {
    toast.error('Compras', {
      className: 'bg-theme-secondary error-theme',
      description: "Error al obtener las compras por fecha: " + error,
      duration: 3000,
    });
  }
};

// GET - obtener  compra por estado
export const getComprasByEstado = async (estado) => {
  try {
    const compraEstado = await api.get(`compras/estado/${estado}`);
    return compraEstado.data;
  } catch (error) {
    toast.error('Compras', {
      className: 'bg-theme-secondary error-theme',
      description: "Error al obtener las compras por estado: " + error,
      duration: 3000,
    });
  }
};

// GET - obtener  compra por proveedor
export const getComprasByProveedor = async (proveedor) => {
  try {
    const compraProveedor = await api.get(`compras/proveedor/${proveedor}`);
    return compraProveedor.data;
  } catch (error) {
    toast.error('Compras', {
      className: 'bg-theme-secondary error-theme',
      description: "Error al obtener las compras por proveedor: " + error,
      duration: 3000,
    });
  }
};

// GET - obtener  compra por usuario
export const getComprasByUsuario = async (usuario) => {
  try {
    const compraUsuario = await api.get(`compras/usuario/${usuario}`);
    return compraUsuario.data;
  } catch (error) {
    toast.error('Compras', {
      className: 'bg-theme-secondary error-theme',
      description: "Error al obtener las compras por usuario: " + error,
      duration: 3000,
    });
  }
};

// PATCH - Actualizar estado de compra
export const cambiarEstadoCompra = async (id, estado) => {
  try {
    const compraCambiarEstado = await api.patch(
      `compras/cambiarEstado/${id}`,
      estado
    );
    toast.info('Compras', {
      className: 'bg-theme-secondary secondary-theme',
      description: `Estado de la compra actualizado con éxito`,
      duration: 3000,
    });
    return compraCambiarEstado.data;
  } catch (error) {
    toast.error('Compras', {
      className: 'bg-theme-secondary error-theme',
      description: "Error al cambiar el estado de la compra: " + error,
      duration: 3000,
    });
  }
};

// POST - crear una compra
export const saveCompra = async (compra) => {
  try {
    const compraNueva = await api.post('compras', compra);
    toast.success('Compras', {
      className: 'bg-theme-secondary secondary-theme',
      description: `Compra creada con éxito`,
      duration: 3000,
    });
    return compraNueva.data;
  } catch (error) {
    toast.error('Compras', {
      className: 'bg-theme-secondary error-theme',
      description: "Error al crear la compra: " + error,
      duration: 3000,
    });
  }
};