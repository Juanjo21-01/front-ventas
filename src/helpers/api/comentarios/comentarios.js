import api from '../../libs/axios';
import { toast } from 'sonner';

// PETICIONES DE COMENTARIOS

// GET - obtener todos los comentarios
export const getComentarios = async () => {
  try {
    const comentarios = await api.get('comentarios');
    console.log(comentarios.data);
    return comentarios.data;
  } catch (error) {
    toast.error('Comentarios', {
      className: 'bg-theme-secondary error-theme',
      description: "Error al obtener los comentarios: " + error,
      duration: 3000,
    });
  }
};

// POST - crear un comentario
export const postComentario = async (usuarioId, productoId, comentario) => {
  try {
    const comentarioCreado = await api.post(
      `comentarios/guardar?usuarioId=${usuarioId}&productoId=${productoId}`,
      comentario
    );
    toast.success('Comentarios', {
      className: 'bg-theme-secondary secondary-theme',
      description: 'Comentario enviado con éxito',

      duration: 3000,
    });
    return comentarioCreado.data;
  } catch (error) {
    toast.error('Comentarios', {
      className: 'bg-theme-secondary error-theme',
      description: "Error al crear el comentario: " + error,
      duration: 3000,
    });
  }
};