import api from '../../libs/axios';

// PETICIONES DE LOS PRODUCTOS

// GET - obtener todos los productos
export const getProductos = async () => {
    try {
      const productos = await api.get('productos');
      return productos.data;
    } catch (error) {
      console.error('Error al obtener los productos', error);
    }
  };

    // GET - obtener un productos por id
export const getProductoById = async (id) => {
    try {
      const productoId = await api.get(`productos/${id}`);
      return productoId.data;
    } catch (error) {
      console.error('Error al obtener el productos por id', error);
    }
  };

    // GET - obtener un productos por nombre
export const getProductoByNombre = async (nombre) => {
    try {
      const productoNombre = await api.get(`productos/nombre/${nombre}`);
      return productoNombre.data;
    } catch (error) {
      console.error('Error al obtener el producto por nombre', error);
    }
  };

        // GET - obtener un producto por estado
export const getProductoByEstado = async (estado) => {
    try {
      const productoEstado = await api.get(`productos/estado/${estado}`);
      return productoEstado.data;
    } catch (error) {
      console.error('Error al obtener el producto por estado', error);
    }
  };

          // GET - obtener un producto por tipo
export const getProductoByTipo = async (tipo) => {
    try {
      const productoTipo = await api.get(`productos/tipo/${tipo}`);
      return productoTipo.data;
    } catch (error) {
      console.error('Error al obtener el producto por tipo', error);
    }
  };
            // GET - obtener un producto por producto
export const getProductoByProveedor = async (id) => {
    try {
      const productoByProveedor = await api.get(`productos/proveedor/${id}`);
      return productoByProveedor.data;
    } catch (error) {
      console.error('Error al obtener el producto por proveedor', error);
    }
  };

    // POST - crear un producto
export const saveProducto = async (producto) => {
    try {
      const productoNuevo = await api.post('productos', producto);
      return productoNuevo.data;
    } catch (error) {
      console.error('Error al crear el productos', error);
    }
  };

    // PUT - Actualizar un producto
export const updateProducto = async (id, producto) => {
    try {
      const productoActualizado = await api.put(`productos/${id}`, producto);
      return productoActualizado.data;
    } catch (error) {
      console.error('Error al actualizar el producto', error);
    }
  };

  // DELETE - eliminar un producto
export const deleteProducto = async (id) => {
    try {
      const productoEliminado = await api.delete(`productos/${id}`);
      return productoEliminado.data;
    } catch (error) {
      console.error('Error al eliminar el producto', error);
    }
  };