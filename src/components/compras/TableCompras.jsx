import { useComprasStore } from "../../store/compras";

export const TablaCompras  = () => {
  const { compras, isLoading, cambiarEstado } =
    useComprasStore();

    const handleCambiarEstado = async (id, nuevoEstado) => {
      await cambiarEstado(id, nuevoEstado);
    };

    if (isLoading) {
      return <div className='h-full flex flex-col justify-center items-center'>
        <span className="loading loading-infinity loading-lg"></span>
        <span className='text-2xl'>Cargando...</span>
      </div>;
    }

  return(
    <div className="bg-theme text-theme">
      <h1 className="title">Historial de compras</h1>
      <div className="container mx-auto px-4">
        <table className="table w-full table-fixed">
          <thead>
            <tr>
              <th>ID</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th>Observaciones</th>
              <th>Proveedor ID</th>
              <th>Usuario ID</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {compras.map((compra) => (
              <tr key={compra.id}>
                <td>{compra.id}</td>
                <td>{compra.fechaCompra}</td>
                <td>{compra.estado ? 'Activa' : 'Anulada'}</td>
                <td>{compra.observaciones}</td>
                <td>{compra.proveedorId}</td>
                <td>{compra.usuarioId}</td>
                <td>
                  <button
                    className="btn"
                    onClick={() =>
                      handleCambiarEstado(compra.id, !compra.estado)
                    }
                  >
                    {compra.estado ? 'Anular' : 'Activar'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}