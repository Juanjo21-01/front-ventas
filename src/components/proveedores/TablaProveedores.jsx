/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { useProveedoresStore } from '../../store/proveedores';

const TablaProveedores = ({ editar, eliminar }) => {
  const { obtener, proveedores } = useProveedoresStore();

  useEffect(() => {
    obtener();
  }, [obtener]);

  return (
    <>
      {proveedores === undefined ? (
        <p>No hay proveedores</p>
      ) : (
        <div className="overflow-x-auto">
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
                  <td>
                    <button
                      className="btn btn-warning mr-2"
                      onClick={() => editar(proveedor)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-error"
                      onClick={() => eliminar(proveedor.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default TablaProveedores;
