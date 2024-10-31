import { useEffect } from 'react';
import { useComentariosStore } from '../../store/comentarios';
import { Comentario } from './Comentario';

// eslint-disable-next-line react/prop-types
export const ComentariosSeccion = ({ productId }) => {
  // VARIABLES DE ESTADO
  const { error, isLoading, obtener, comentarios } = useComentariosStore();

  useEffect(() => {
    obtener();
  }, [obtener]);

  console.log(productId);

  if (isLoading) {
    return (
      <div className="h-full flex flex-col justify-center items-center">
        <span className="loading loading-infinity loading-lg"></span>
        <span className="text-2xl">Cargando...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500">
        <p>Error al cargar los comentarios</p>
      </div>
    );
  }

  if (!Array.isArray(comentarios) || comentarios.length === 0) {
    return (
      <div className="p-4 rounded-lg shadow-lg">
        <p>No hay comentarios disponibles.</p>
      </div>
    );
  }

  return (
    <div className="p-4 rounded-lg shadow-lg">
      {comentarios.map((comentario) => (
        <Comentario key={comentario.id} comentario={comentario} />
      ))}
    </div>
  );
};
