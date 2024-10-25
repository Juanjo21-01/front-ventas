import { useComprasStore } from "../../store/compras";

export const TablaCompras  = () => {
  const { compras, isLoading, cambiarEstado } =
    useComprasStore();

    const handleCambiarEstado = async (id, nuevoEstado) => {
      await cambiarEstado(id, nuevoEstado);
    };

  return(
    <div className="container">
      <h1 className="title">Historial de compras</h1>
      <div>
        {isLoading ? (
          <p>Cargando...</p>
        ) : compras === undefined ? (
          <p>Error al obtener las compras</p>
        ) : (
          <table border="1" style={{ width: '100%', marginBottom: '20px' }}>
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
        )}
      </div>
    </div>
  )
}