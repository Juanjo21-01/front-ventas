import { useEffect } from 'react';
import { useTiposProductosStore } from '../../../store/tipoProductos';

// Componente que muestra la tabla de tipo de productos
const TablaTipoProducto = ({ editar, eliminar }) => {
  const { obtener, tiposProductos } = useTiposProductosStore();

  useEffect(() => {
    obtener(); // Llamamos a la API cuando el componente se monta
  }, [obtener]);

  return (
    <div className="container mx-auto p-4">
      {tiposProductos === undefined ? (
        <p>No hay tipos de productos</p>
      ) : (
        <div className="overflow-x-auto pb-24">
          <table className="table w-full">
            <thead>
              <tr className="text-center">
                <th className="w-2/12">No.</th>
                <th className="w-5/12">Nombre</th>
                <th className="w-3/12">Estado</th>
                <th className="w-2/12">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {tiposProductos.map((tipoProducto) => (
                <tr key={tipoProducto.id} className="text-center">
                  <td className="w-2/12">{tipoProducto.id}</td>
                  <td className="w-5/12">{tipoProducto.nombre}</td>
                  <td className="w-3/12">
                    {tipoProducto.estado ? (
                      <span className="badge badge-success">Activo</span>
                    ) : (
                      <span className="badge badge-error">Inactivo</span>
                    )}
                  </td>
                  <td className="w-2/12">
                    <div className="dropdown dropdown-left">
                      <label tabIndex={0} className="btn secondary-theme m-1">
                        Acciones
                      </label>
                      <ul
                        tabIndex={0}
                        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 gap-4 bg-theme border primary-theme"
                      >
                        <li>
                          <button
                            className="btn primary-theme w-full"
                            onClick={() => editar(tipoProducto)}
                          >
                            Editar
                          </button>
                        </li>
                        <li>
                          <button
                            className="btn error-theme w-full"
                            onClick={() => eliminar(tipoProducto.id)}
                          >
                            Eliminar
                          </button>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TablaTipoProducto;
