import { useEffect } from 'react';
import { useTiposProductosStore } from '../../../store/tipoProductos';

// Componente que muestra la tabla de tipo de productos
const TablatipoProducto = () => {
  const { obtener, tiposProductos } = useTiposProductosStore();

  useEffect(() => {
    obtener(); // Llamamos a la API cuando el componente se monta
  }, [obtener]);

  return (
    <div className="container mx-auto p-4">
      <h2 className='title'>Categorías de Productos</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {tiposProductos.map((producto) => (
              <tr key={producto.id}>
                <td>{producto.id}</td>
                <td>{producto.nombre}</td>
                <td>{producto.estado ? 'Activo' : 'Inactivo'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TablatipoProducto;
