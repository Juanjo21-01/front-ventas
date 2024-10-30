/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useProveedoresStore } from '../../store/proveedores';
import AlertModal from '../alert/AlertModal';

const TablaProveedores = ({ editar, eliminar }) => {
  const { obtener, proveedores } = useProveedoresStore();
  const [isOpen, setIsOpen] = useState(false);
  const [proveedorAEliminar, setProveedorAEliminar] = useState(null);

  useEffect(() => {
    obtener();
  }, [obtener]);

  const handleEliminar = (id) => {
    const proveedor = proveedores.find(p => p.id === id);
    setProveedorAEliminar(proveedor);
    setIsOpen(true);
  };

  const confirmarEliminacion = (id) => {
    eliminar(id);
    setIsOpen(false);
    setProveedorAEliminar(null);
  };

  return (
    <div className="container mx-auto p-4">
      {proveedores === undefined || proveedores.length === 0 ? (
        <p>No hay proveedores</p>
      ) : (
        <div className="overflow-x-auto pb-24">
          <table className="table w-full">
            <thead>
              <tr className="text-center">
                <th className="w-1/12">No.</th>
                <th className="w-4/12">Nombre</th>
                <th className="w-1/12">NIT</th>
                <th className="w-3/12">Dirección</th>
                <th className="w-1/12">Teléfono</th>
                <th className="w-1/12">Estado</th>
                <th className="w-1/12">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {proveedores.map((proveedor) => (
                <tr key={proveedor.id} className="text-center">
                  <td className="w-1/12">{proveedor.id}</td>
                  <td className="w-4/12">{proveedor.nombre}</td>
                  <td className="w-1/12">{proveedor.nit}</td>
                  <td className="w-3/12">{proveedor.direccion}</td>
                  <td className="w-1/12">{proveedor.telefono}</td>
                  <td className="w-1/12">
                    {proveedor.estado ? (
                      <span className="badge badge-success">Activo</span>
                    ) : (
                      <span className="badge badge-error">Inactivo</span>
                    )}
                  </td>
                  <td className="w-1/12">
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
                            onClick={() => editar(proveedor)}
                          >
                            Editar
                          </button>
                        </li>
                        <li>
                          <button
                            className="btn error-theme w-full"
                            onClick={() => handleEliminar(proveedor.id)}
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

      {proveedorAEliminar && (
        <AlertModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onConfirm={confirmarEliminacion}
          entity={proveedorAEliminar}
          message="¿Estás seguro de que quieres eliminar a"
        />
      )}
    </div>
  );
};

export default TablaProveedores;
