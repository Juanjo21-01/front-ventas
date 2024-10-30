import { useEffect } from 'react';
import { useComentariosStore } from '../../store/comentarios';
import { Comentario } from './Comentario';

export const ComentariosSeccion = ({ productId }) => {
  // VARIABLES DE ESTADO
  const { obtener, comentarios } = useComentariosStore();

  useEffect(() => {
    obtener();
  }, [obtener]);

  console.log(comentarios);

  // FUNCIONES

  return (
    <div className="p-4 rounded-lg shadow-lg">
      {comentarios.map((comentario) => (
        <Comentario key={comentario.id} comentario={comentario} />
      ))}
    </div>
  );
};
