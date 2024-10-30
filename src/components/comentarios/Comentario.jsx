/* eslint-disable react/prop-types */
export const Comentario = ({ comentario }) => {
  return (
    <div className="comentario p-2 mb-2 border rounded">
      <p>
        <strong>{comentario.nombre_cliente}</strong> (
        {new Date(comentario.fecha_publicacion).toLocaleDateString()})
      </p>
      <p>{comentario.comentario}</p>
    </div>
  );
};
