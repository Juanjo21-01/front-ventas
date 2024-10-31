import { toast } from 'sonner';
import api from '../libs/axios';

// PETICIONES DE AUTENTICACIÓN

// POST - iniciar sesión
export const login = async (data) => {
  try {
    const login = await api.post('usuarios/login', data);
    return login.data;
  } catch (error) {
    if (typeof error === 'object' && error !== null && 'message' in error) {
      const e = error;
      if (e.message === 'Network Error') {
        toast.error('Iniciar Sesión', {
          className: 'bg-theme-secondary error-theme',
          description: 'Error de conexión con el servidor',
          duration: 3000,
        });
      } else {
        toast.error('Iniciar Sesión', {
          className: 'bg-theme-secondary error-theme',
          description: `Error al iniciar sesión: ${e.message}`,
          duration: 3000,
        });
      }
    }
  }
};

// POST - registrar usuario
export const register = async (data) => {
  const nuevoUsuario = {
    nombres: data.nombres,
    apellidos: data.apellidos,
    email: data.email,
    password: data.password,
    direccion: data.direccion,
    telefono: data.telefono,
    estado: true,
    rolId: 2,
  };

  try {
    const register = await api.post('usuarios/register', nuevoUsuario);
    toast.success('Registro', {
      className: 'bg-theme-secondary secondary-theme',
      description: 'Usuario registrado con éxito',
      duration: 3000,
    });
    return register.data;
  } catch (error) {
    toast.error('Registro', {
      className: 'bg-theme-secondary error-theme',
      description: "Error al registrar usuario: " + error,
      duration: 3000,
    });
  }
};