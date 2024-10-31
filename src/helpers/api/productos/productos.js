import { toast } from 'sonner';
import api from '../../libs/axios';

// PETICIONES DE LOS PRODUCTOS

// GET - obtener todos los productos
export const getProductos = async () => {
  try {
    const productos = await api.get('productos');
    return productos.data;
  } catch (error) {
    toast.error('Productos', {
      className: 'bg-theme-secondary error-theme',
      description: "Error al obtener los productos: " + error,
      duration: 3000,
    });
  }
};

// GET - obtener un productos por id
export const getProductoById = async (id) => {
  try {
    const productoId = await api.get(`productos/${id}`);
    return productoId.data;
  } catch (error) {
    toast.error('Producto', {
      className: 'bg-theme-secondary error-theme',
      description: "Error al obtener el producto por id: " + error,
      duration: 3000,
    });
  }
};

// GET - obtener un productos por nombre
export const getProductoByNombre = async (nombre) => {
  try {
    const productoNombre = await api.get(`productos/nombre/${nombre}`);
    return productoNombre.data;
  } catch (error) {
    toast.error('Producto', {
      className: 'bg-theme-secondary error-theme',
      description: "Error al obtener el producto por nombre: " + error,
      duration: 3000,
    });
  }
};

// GET - obtener un producto por estado
export const getProductoByEstado = async (estado) => {
  try {
    const productoEstado = await api.get(`productos/estado/${estado}`);
    return productoEstado.data;
  } catch (error) {
    toast.error('Producto', {
      className: 'bg-theme-secondary error-theme',
      description: "Error al obtener el producto por estado: " + error,
      duration: 3000,
    });
  }
};

// GET - obtener un producto por tipo
export const getProductoByTipo = async (tipo) => {
  try {
    const productoTipo = await api.get(`productos/tipo/${tipo}`);
    return productoTipo.data;
  } catch (error) {
    toast.error('Producto', {
      className: 'bg-theme-secondary error-theme',
      description: "Error al obtener el producto por tipo: " + error,
      duration: 3000,
    });
  }
};

// GET - obtener un producto por producto
export const getProductoByProveedor = async (id) => {
  try {
    const productoByProveedor = await api.get(`productos/proveedor/${id}`);
    return productoByProveedor.data;
  } catch (error) {
    toast.error('Producto', {
      className: 'bg-theme-secondary error-theme',
      description: "Error al obtener el producto por proveedor: " + error,
      duration: 3000,
    });
  }
};

// POST - crear un producto
export const saveProducto = async (producto) => {
  try {
    const productoNuevo = await api.post('productos/guardar', producto);
    toast.success('Producto', {
      className: 'bg-theme-secondary secondary-theme',
      description: 'Producto creado con éxito',
      duration: 3000,
    });
    return productoNuevo.data;
  } catch (error) {
    toast.error('Producto', {
      className: 'bg-theme-secondary error-theme',
      description: "Error al crear el producto: " + error,
      duration: 3000,
    });
  }
};

// PUT - Actualizar un producto
export const updateProducto = async (id, producto) => {
  try {
    const productoActualizado = await api.put(`productos/${id}`, producto);
    toast.success('Producto', {
      className: 'bg-theme-secondary secondary-theme',
      description: 'Producto actualizado con éxito',
      duration: 3000,
    });
    return productoActualizado.data;
  } catch (error) {
    toast.error('Producto', {
      className: 'bg-theme-secondary error-theme',
      description: "Error al actualizar el producto: " + error,
      duration: 3000,
    });
  }
};

// DELETE - eliminar un producto
export const deleteProducto = async (id) => {
  try {
    const productoEliminado = await api.delete(`productos/${id}`);
    toast.success('Producto', {
      className: 'bg-theme-secondary secondary-theme',
      description: 'Producto eliminado con éxito',
      duration: 3000,
    });
    return productoEliminado.data;
  } catch (error) {
    toast.error('Producto', {
      className: 'bg-theme-secondary error-theme',
      description: "Error al eliminar el producto: " + error,
      duration: 3000,
    });
  }
};