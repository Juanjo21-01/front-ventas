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
        console.error('Error de conexión con el servidor');
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
    return register.data;
  } catch (error) {
    console.error('Error al registrar usuario', error);
  }
};
