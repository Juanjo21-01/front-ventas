/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useComentariosStore } from '../../store/comentarios';
import { useAuthStore } from '../../store/auth';
import { AiOutlineClose, AiOutlineSend } from 'react-icons/ai';
import { toast } from 'sonner';

export const CrearComentario = ({ productId }) => {
  // VARIABLES DE ESTADO
  const [comentario, setComentario] = useState('');
  const { logged, profile } = useAuthStore();
  const { crear, obtener } = useComentariosStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comentario.trim() === '') {
      toast.error('Mensaje Vacío', {
        className: 'bg-theme-secondary error-theme',
        description: 'No puede dejar el campo vacío.',

        duration: 3000,
      });
      return;
    }
    if (!logged) {
      toast.error('Iniciar Sesión', {
        className: 'bg-theme-secondary error-theme',
        description: 'Debes Iniciar Sesión para Comentar.',
        duration: 3000,
      });
      return;
    }
    try {
      await crear(profile.id, productId, { comentario });
      await obtener();
    } catch (error) {
      console.error(error);
      toast.error('Error Comentario', {
        className: 'bg-theme-secondary error-theme',
        description: 'Error al crear el Comentario.',
        duration: 3000,
      });
    }
    handleReset();
  };

  const handleReset = () => {
    setComentario('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-2 p-3 rounded-lg shadow-sm bg-transparent">
      <input
        type="text"
        id="comentario"
        className="input input-bordered w-full p-2 primary-theme rounded-lg"
        value={comentario}
        onChange={(e) => setComentario(e.target.value)}
        placeholder="Escribe un comentario..."
      />
      <button
        type="reset"
        className="btn btn-circle error-theme"
        onClick={handleReset}
      >
        <AiOutlineClose className="text-lg" />
      </button>
      <button type="submit" className="btn btn-circle secondary-theme">
        <AiOutlineSend className="text-lg" />
      </button>
    </form>
  );
};