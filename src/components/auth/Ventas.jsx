import React, { useEffect, useState } from 'react';

const Ventas = ({ ventas }) => {
    const [detalleVentas, setDetallesVentas] = useState(ventas || []);

  useEffect(() => {
    setDetallesVentas(ventas);
  }, [ventas]);


 // Función para cambiar el estado de la venta
 const toggleEstado = (id) => {
    setDetallesVentas(detalleVentas.map(detalle => {
        if (detalle.id === id) {
            return { ...detalle, estado: detalle.estado === 'Habilitado' ? 'Anulado' : 'Habilitado' };
        }
        return detalle;
    }));
};




    return (
        <div className="overflow-x-auto">
            <table className="table w-full">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>FECHA_VENTA</th>
                        <th>ESTADO</th>
                        <th>OBSERVACIONES</th>
                        <th>USUARIO_ID</th>
                        <th>ACCIONES</th>
                    </tr>
                </thead>
                <tbody>
                    {detalleVentas.map(detalle => (
                        <tr key={detalle.id}>
                            <td>{detalle.id}</td>
                            <td>{detalle.fecha_venta}</td>
                            <td>{detalle.estado}</td>
                            <td>{detalle.observaciones}</td>
                            <td>{detalle.usuario_id}</td>
                            <td>
                                <button 
                                    onClick={() => toggleEstado(detalle.id)} 
                                    className="btn btn-secondary"
                                >
                                    {detalle.estado === 'Habilitado' ? 'ANULAR' : 'HABILITAR'}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Ventas;
