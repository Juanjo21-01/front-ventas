import api from '../../libs/axios';

// PETICIONES DE LOS COMPRAS

// GET - obtener todas los compras
export const getCompras = async () => {
  try {
    const compras = await api.get('compras');
    return compras.data;
  } catch (error) {
    console.error('Error al obtener las compras', error);
  }
};

// GET - obtener un compras por id
export const getCompraById = async (id) => {
  try {
    const compraId = await api.get(`compras/${id}`);
    return compraId.data;
  } catch (error) {
    console.error('Error al obtener la compra por id', error);
  }
};

// GET - obtener un compras por fecha
export const getComprasByFecha = async (fecha) => {
  try {
    const comprasFecha = await api.get(`compras/fecha/${fecha}`);
    return comprasFecha.data;
  } catch (error) {
    console.error('Error al obtener la compra por fecha', error);
  }
};

// GET - obtener  compra por estado
export const getComprasByEstado = async (estado) => {
  try {
    const compraEstado = await api.get(`compras/estado/${estado}`);
    return compraEstado.data;
  } catch (error) {
    console.error('Error al obtener la compra por estado', error);
  }
};

// GET - obtener  compra por proveedor
export const getComprasByProveedor = async (proveedor) => {
  try {
    const compraProveedor = await api.get(`compras/proveedor/${proveedor}`);
    return compraProveedor.data;
  } catch (error) {
    console.error('Error al obtener la compra por proveedor', error);
  }
};

// GET - obtener  compra por usuario
export const getComprasByUsuario = async (usuario) => {
  try {
    const compraUsuario = await api.get(`compras/usuario/${usuario}`);
    return compraUsuario.data;
  } catch (error) {
    console.error('Error al obtener la compra por usuario', error);
  }
};

// PATCH - Actualizar estado de compra
export const cambiarEstadoCompra = async (id, estado) => {
  try {
    const compraCambiarEstado = await api.patch(
      `compras/cambiarEstado/${id}`,
      estado
    );
    return compraCambiarEstado.data;
  } catch (error) {
    console.error('Error al cambiar el estado de la compra', error);
  }
};

// POST - crear una compra
export const saveCompra = async (compra) => {
  try {
    const compraNueva = await api.post('compras', compra);
    return compraNueva.data;
  } catch (error) {
    console.error('Error al crear la compra', error);
  }
};
