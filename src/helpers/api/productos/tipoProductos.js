import api from '../../libs/axios';

// PETICIONES DE LOS TIPOPRODUCTO

// GET - obtener todos los tipos de productos
export const getTipoProducto = async () => {
    try {
      const tipoProducto = await api.get('tipo-productos');
      return tipoProducto.data;
    } catch (error) {
      console.error('Error al obtener los tipos de productos', error);
    }
  };

  // GET - obtener un tipo de producto por id
export const getTipoProductoById = async (id) => {
    try {
      const tipoProductoId = await api.get(`tipo-productos/${id}`);
      return tipoProductoId.data;
    } catch (error) {
      console.error('Error al obtener el tipo de producto por id', error);
    }
  };

  // GET - obtener un  tipo de producto  por nombre
export const getTipoProductoByNombre = async (nombre) => {
    try {
      const  tipoProductoNombre = await api.get(`tipo-productos/nombre/${nombre}`);
      return  tipoProductoNombre.data;
    } catch (error) {
      console.error('Error al obtener el tipo de producto por nombre', error);
    }
  };

          // GET - obtener un  tipo de producto por estado
export const getTipoProductoByEstado = async (estado) => {
    try {
      const tipoProductoEstado = await api.get(`tipo-productos/estado/${estado}`);
      return tipoProductoEstado.data;
    } catch (error) {
      console.error('Error al obtener el tipo de producto por nit', error);
    }
  };

    // POST - crear un tipo de producto
export const saveTipoProducto = async (tipoProducto) => {
    try {
      const tipoProductoNuevo = await api.post('tipo-productos', tipoProducto);
      return tipoProductoNuevo.data;
    } catch (error) {
      console.error('Error al crear el tipo de producto', error);
    }
  };

    // PUT - actualizar un tipo de producto
export const updateTipoProducto = async (id, tipoProducto) => {
    try {
      const tipoProductoActualizado = await api.put(`tipo-productos/${id}`, tipoProducto);
      return tipoProductoActualizado.data;
    } catch (error) {
      console.error('Error al actualizar el tipo de producto', error);
    }
  };

   // DELETE - eliminar un tipo de producto
export const deleteTipoProductp = async (id) => {
    try {
      const tipoProductoEliminado = await api.delete(`tipo-productos/${id}`);
      return tipoProductoEliminado.data;
    } catch (error) {
      console.error('Error al eliminar el tipo de producto', error);
    }
  };

