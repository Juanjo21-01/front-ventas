import api from '../../libs/axios';

// PETICIONES DE LOS PROVEEDORES

// GET - obtener todos los proveedores
export const getProveedores = async () => {
    try {
      const proveedores = await api.get('proveedores');
      return proveedores.data;
    } catch (error) {
      console.error('Error al obtener los proveedores', error);
    }
  };

  // GET - obtener un proveedor por id
export const getProveedorById = async (id) => {
    try {
      const proveedorId = await api.get(`proveedores/${id}`);
      return proveedorId.data;
    } catch (error) {
      console.error('Error al obtener el proveedor por id', error);
    }
  };

  // GET - obtener un proveedor por nombre
export const getProveedorByNombre = async (nombre) => {
    try {
      const proveedorNombre = await api.get(`proveedores/nombre/${nombre}`);
      return proveedorNombre.data;
    } catch (error) {
      console.error('Error al obtener el proveedor por nombre', error);
    }
  };

    // GET - obtener un proveedor por nit
export const getProveedorByNit = async (nit) => {
    try {
      const proveedorNit = await api.get(`proveedores/nit/${nit}`);
      return proveedorNit.data;
    } catch (error) {
      console.error('Error al obtener el proveedor por nit', error);
    }
  };

        // GET - obtener un proveedor por estado
export const getProveedorByEstado = async (estado) => {
    try {
      const proveedorEstado = await api.get(`proveedores/estado/${estado}`);
      return proveedorEstado.data;
    } catch (error) {
      console.error('Error al obtener el proveedor por estado', error);
    }
  };

  // POST - crear un proveedor
export const saveProveedor = async (proveedor) => {
    try {
      const proveedorNuevo = await api.post('proveedores', proveedor);
      return proveedorNuevo.data;
    } catch (error) {
      console.error('Error al crear el proveedor', error);
    }
  };

  // PUT - actualizar un proveedor
export const updateProveedor = async (id, proveedor) => {
    try {
      const proveedorActualizado = await api.put(`proveedores/${id}`, proveedor);
      return proveedorActualizado.data;
    } catch (error) {
      console.error('Error al actualizar el proveedor', error);
    }
  };

  // DELETE - eliminar un proveedor
export const deleteProveedor = async (id) => {
    try {
      const proveedorEliminado = await api.delete(`proveedores/${id}`);
      return proveedorEliminado.data;
    } catch (error) {
      console.error('Error al eliminar el proveedor', error);
    }
  };