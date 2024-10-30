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
    toast.error('Error al obtener los comentarios', error);
  }
};

// POST - crear un comentario
export const postComentario = async (usuarioId, productoId, comentario) => {
  try {
    const comentarioCreado = await api.post(
      `comentarios/guardar?usuarioId=${usuarioId}&productoId=${productoId}`,
      comentario
    );
    toast.success('Comentario creado correctamente');
    return comentarioCreado.data;
  } catch (error) {
    toast.error('Error al crear el comentario', error);
  }
};
