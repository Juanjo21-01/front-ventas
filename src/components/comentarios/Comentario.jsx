/* eslint-disable react/prop-types */
export const Comentario = ({ comentario }) => {
  const obtenerIniciales = (nombre) => {
    return nombre
      .split(' ')
      .map((parte) => parte.charAt(0))
      .join('')
      .toUpperCase();
  };

  return (
    <div className="comentario p-4 mb-3 border rounded-lg shadow-md bg-theme transition duration-300 primary-theme">
      <div className="flex items-center pb-2">
        <div className="flex-shrink-0 w-12 h-12 rounded-full secondary-theme font-bold flex items-center justify-center mr-3 border-2 bg-theme-secondary">
          {obtenerIniciales(comentario.nombre_cliente)}
        </div>
        <div className="flex-1">
          <p className="text-xl font-semibold secondary-theme">{comentario.nombre_cliente}</p>
          <p className="text-sm text-theme">
            {new Date(comentario.fecha_publicacion).toLocaleDateString()}
          </p>
        </div>
      </div>
      <p className="mt-3 text-theme leading-relaxed">{comentario.comentario}</p>
    </div>
  );
};
