/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useComentariosStore } from '../../store/comentarios';
import { useAuthStore } from '../../store/auth';

export const CrearComentario = ({ productId }) => {
  // VARIABLES DE ESTADO
  const [comentario, setComentario] = useState('');
  const { logged, profile } = useAuthStore();
  const { crear, obtener } = useComentariosStore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar que el comentario no esté vacío
    if (comentario.trim() === '') {
      alert('El comentario no puede estar vacío.');
      return;
    }

    // Validar que el usuario esté logueado
    if (!logged) {
      alert('Debes iniciar sesión para dejar un comentario.');
      return;
    }

    try {
      // Crear el comentario
      await crear(profile.id, productId, {
        comentario,
      });
      await obtener();
    } catch (error) {
      console.error(error);
      alert('Error al crear el comentario');
    }

    handleReset();
  };

  const handleReset = () => {
    setComentario('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex justify-evenly items-center">
        <div className="flex flex-col space-y-4 w-9/12">
          <label htmlFor="comentario" className="text-lg">
            Comentario:
          </label>
          <textarea
            id="comentario"
            className="textarea textarea-bordered"
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
          ></textarea>
        </div>

        <div className="flex justify-center items-center w-3/12 space-x-4">
          <button
            type="reset"
            className="btn secondary-theme "
            onClick={handleReset}
          >
            Limpiar
          </button>
          <button type="submit" className="btn primary-theme">
            Enviar
          </button>
        </div>
      </div>
    </form>
  );
};
