import { toast } from 'sonner';
import api from '../../libs/axios';

// PETICIONES DE LOS PROVEEDORES

// GET - obtener todos los proveedores
export const getProveedores = async () => {
  try {
    const proveedores = await api.get('proveedores');
    return proveedores.data;
  } catch (error) {
    toast.error('Proveedores', {
      className: 'bg-theme-secondary error-theme',
      description: "Error al obtener los proveedores: " + error,
      duration: 3000,
    });
  }
};

// GET - obtener un proveedor por id
export const getProveedorById = async (id) => {
  try {
    const proveedorId = await api.get(`proveedores/${id}`);
    return proveedorId.data;
  } catch (error) {
    toast.error('Proveedor', {
      className: 'bg-theme-secondary error-theme',
      description: "Error al obtener el proveedor por id: " + error,
      duration: 3000,
    });
  }
};

// GET - obtener un proveedor por nombre
export const getProveedorByNombre = async (nombre) => {
  try {
    const proveedorNombre = await api.get(`proveedores/nombre/${nombre}`);
    return proveedorNombre.data;
  } catch (error) {
    toast.error('Proveedor', {
      className: 'bg-theme-secondary error-theme',
      description: "Error al obtener el proveedor por nombre: " + error,
      duration: 3000,
    });
  }
};

// GET - obtener un proveedor por nit
export const getProveedorByNit = async (nit) => {
  try {
    const proveedorNit = await api.get(`proveedores/nit/${nit}`);
    return proveedorNit.data;
  } catch (error) {
    toast.error('Proveedor', {
      className: 'bg-theme-secondary error-theme',
      description: "Error al obtener el proveedor por NIT: " + error,
      duration: 3000,
    });
  }
};

// GET - obtener un proveedor por estado
export const getProveedorByEstado = async (estado) => {
  try {
    const proveedorEstado = await api.get(`proveedores/estado/${estado}`);
    return proveedorEstado.data;
  } catch (error) {
    toast.error('Proveedor', {
      className: 'bg-theme-secondary error-theme',
      description: "Error al obtener el proveedor por estado: " + error,
      duration: 3000,
    });
  }
};

// POST - crear un proveedor
export const saveProveedor = async (proveedor) => {
  try {
    const proveedorNuevo = await api.post('proveedores', proveedor);
    toast.success('Proveedor', {
      className: 'bg-theme-secondary secondary-theme',
      description: 'Proveedor creado con éxito',
      duration: 3000,
    });
    return proveedorNuevo.data;
  } catch (error) {
    toast.error('Proveedor', {
      className: 'bg-theme-secondary error-theme',
      description: "Error al crear el proveedor: " + error,
      duration: 3000,
    });
  }
};

// PUT - actualizar un proveedor
export const updateProveedor = async (id, proveedor) => {
  try {
    const proveedorActualizado = await api.put(`proveedores/${id}`, proveedor);
    toast.success('Proveedor', {
      className: 'bg-theme-secondary secondary-theme',
      description: 'Proveedor actualizado con éxito',
      duration: 3000,
    });
    return proveedorActualizado.data;
  } catch (error) {
    toast.error('Proveedor', {
      className: 'bg-theme-secondary error-theme',
      description: "Error al actualizar el proveedor: " + error,
      duration: 3000,
    });
  }
};

// DELETE - eliminar un proveedor
export const deleteProveedor = async (id) => {
  try {
    const proveedorEliminado = await api.delete(`proveedores/${id}`);
    toast.success('Proveedor', {
      className: 'bg-theme-secondary secondary-theme',
      description: 'Proveedor eliminado con éxito',
      duration: 3000,
    });
    return proveedorEliminado.data;
  } catch (error) {
    toast.error('Proveedor', {
      className: 'bg-theme-secondary error-theme',
      description: "Error al eliminar el proveedor: " + error,
      duration: 3000,
    });
  }
};