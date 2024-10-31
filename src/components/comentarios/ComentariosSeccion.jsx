import { useEffect } from 'react';
import { useComentariosStore } from '../../store/comentarios';
import { Comentario } from './Comentario';
import { Loader } from '../Loader';

// eslint-disable-next-line react/prop-types
export const ComentariosSeccion = ({ productId }) => {
  // VARIABLES DE ESTADO
  const { error, isLoading, obtener, comentarios } = useComentariosStore();

  useEffect(() => {
    obtener();
  }, [obtener]);

  const comentariosFiltrados = [];

  if (comentarios == undefined) {
    return;
  } else {
    comentarios.forEach((comentario) => {
      if (comentario == undefined) {
        return;
      }
      if (comentario.productoId === productId) {
        comentariosFiltrados.push(comentario);
        return comentario;
      }
    });
  }

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="p-4 rounded-lg shadow-md">
        <p className='error-theme text-xl'>Error al cargar los comentarios</p>
      </div>
    );
  }

  if (!Array.isArray(comentariosFiltrados) || comentariosFiltrados.length === 0) {
    return (
      <div className="p-4 bg-theme text-center">
        <p className="primary-theme">No hay comentarios disponibles.</p>
        <p className="secondary-theme mt-4 text-xl">¡Sé el primero en dejar un comentario!</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-theme space-y-4">
      {comentariosFiltrados.map((comentario) => (
        <Comentario key={comentario.id} comentario={comentario} />
      ))}
    </div>
  );
};
