/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { useProveedoresStore } from '../../store/proveedores';

const TablaProveedores = ({ editar, eliminar }) => {
  const { obtener, proveedores } = useProveedoresStore();

  useEffect(() => {
    obtener();
  }, [obtener]);

  return (
    <div className="container mx-auto p-4">
      {proveedores === undefined ? (
        <p>No hay proveedores</p>
      ) : (
        <div className="overflow-x-auto pb-24">
          <table className="table w-full">
            <thead>
              <tr>
                <th>No.</th>
                <th>Nombre</th>
                <th>NIT</th>
                <th>Dirección</th>
                <th>Telefono</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {proveedores.map((proveedor) => (
                <tr key={proveedor.id}>
                  <td>{proveedor.id}</td>
                  <td>{proveedor.nombre}</td>
                  <td>{proveedor.nit}</td>
                  <td>{proveedor.direccion}</td>
                  <td>{proveedor.telefono}</td>
                  <td>
                    {proveedor.estado ? (
                      <span className="badge badge-success">Activo</span>
                    ) : (
                      <span className="badge badge-error">Inactivo</span>
                    )}
                  </td>
                  <td className='min-w-32'>
                    <div className="dropdown dropdown-left">
                      <label tabIndex={0} className="btn secondary-theme m-1">Acciones</label>
                      <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 gap-4 bg-theme border primary-theme">
                        <li>
                          <button 
                            className="btn primary-theme w-full" 
                            onClick={() => editar(proveedor)}
                          >
                            Editar
                          </button>
                        </li>
                        <li>
                          <button 
                            className="btn error-theme w-full" 
                            onClick={() => eliminar(proveedor.id)}
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

export default TablaProveedores;
