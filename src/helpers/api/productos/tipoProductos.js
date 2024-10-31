import { toast } from 'sonner';
import api from '../../libs/axios';

// PETICIONES DE LOS TIPO PRODUCTO

// GET - obtener todos los tipos de productos
export const getTipoProducto = async () => {
  try {
    const tipoProducto = await api.get('tipo-productos');
    return tipoProducto.data;
  } catch (error) {
    toast.error('Tipos de Productos', {
      className: 'bg-theme-secondary error-theme',
      description: "Error al obtener los tipos de productos: " + error,
      duration: 3000,
    });
  }
};

// GET - obtener un tipo de producto por id
export const getTipoProductoById = async (id) => {
  try {
    const tipoProductoId = await api.get(`tipo-productos/${id}`);
    return tipoProductoId.data;
  } catch (error) {
    toast.error('Tipos de Productos', {
      className: 'bg-theme-secondary error-theme',
      description: "Error al obtener el tipo de producto por ID: " + error,
      duration: 3000,
    });
  }
};

// GET - obtener un  tipo de producto  por nombre
export const getTipoProductoByNombre = async (nombre) => {
  try {
    const tipoProductoNombre = await api.get(`tipo-productos/nombre/${nombre}`);
    return tipoProductoNombre.data;
  } catch (error) {
    toast.error('Tipos de Productos', {
      className: 'bg-theme-secondary error-theme',
      description: "Error al obtener el tipo de producto por nombre: " + error,
      duration: 3000,
    });
  }
};

// GET - obtener un  tipo de producto por estado
export const getTipoProductoByEstado = async (estado) => {
  try {
    const tipoProductoEstado = await api.get(`tipo-productos/estado/${estado}`);
    return tipoProductoEstado.data;
  } catch (error) {
    toast.error('Tipos de Productos', {
      className: 'bg-theme-secondary error-theme',
      description: "Error al obtener el tipo de producto por estado: " + error,
      duration: 3000,
    });
  }
};

// POST - crear un tipo de producto
export const saveTipoProducto = async (tipoProducto) => {
  try {
    const tipoProductoNuevo = await api.post('tipo-productos', tipoProducto);
    toast.success('Tipos de Productos', {
      className: 'bg-theme-secondary secondary-theme',
      description: `Tipo de producto creado con éxito`,
      duration: 3000,
    });
    return tipoProductoNuevo.data;
  } catch (error) {
    toast.error('Tipos de Productos', {
      className: 'bg-theme-secondary error-theme',
      description: "Error al crear el tipo de producto: " + error,
      duration: 3000,
    });
  }
};

// PUT - actualizar un tipo de producto
export const updateTipoProducto = async (id, tipoProducto) => {
  try {
    const tipoProductoActualizado = await api.put(`tipo-productos/${id}`, tipoProducto);
    toast.info('Tipos de Productos', {
      className: 'bg-theme-secondary secondary-theme',
      description: `Tipo de producto actualizado con éxito`,
      duration: 3000,
    });
    return tipoProductoActualizado.data;
  } catch (error) {
    toast.error('Tipos de Productos', {
      className: 'bg-theme-secondary error-theme',
      description: "Error al actualizar el tipo de producto: " + error,
      duration: 3000,
    });
  }
};

// DELETE - eliminar un tipo de producto
export const deleteTipoProducto = async (id) => {
  try {
    const tipoProductoEliminado = await api.delete(`tipo-productos/${id}`);
    toast.success('Tipos de Productos', {
      className: 'bg-theme-secondary secondary-theme',
      description: `Tipo de producto eliminado con éxito`,
      duration: 3000,
    });
    return tipoProductoEliminado.data;
  } catch (error) {
    toast.error('Tipos de Productos', {
      className: 'bg-theme-secondary error-theme',
      description: "Error al eliminar el tipo de producto: " + error,
      duration: 3000,
    });
  }
};