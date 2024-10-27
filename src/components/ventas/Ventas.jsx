import { useEffect, useState } from 'react';
import { useVentasStore } from '../../store/ventas';

// eslint-disable-next-line react/prop-types
const Ventas = () => {
    const [obtener, ventas] = useVentasStore ();

  useEffect(() => {
    obtener();
  }, [obtener]);


 // Función para cambiar el estado de la venta
const toggleEstado = (id) => {
    ventas(ventas.map(venta => {
        if (venta.id === id) {
            return { ...venta, estado: venta.estado === 'Habilitado' ? 'Anulado' : 'Habilitado' };
        }
        return ventas;
    }));
};




    return (
        <div className='container mx-auto p-4'>
            {ventas === undefined ? (
                <p>No hay ventas</p>
            ) : (
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
                    {ventas.map((venta) => (
                        <tr key={venta.id}>
                            <td>{venta.id}</td>
                            <td>{venta.fechaVenta}</td>
                            <td>{venta.estado}</td>
                            <td>{venta.observaciones}</td>
                            <td>{venta.usuarioId}</td>
                            <td>
                                <button 
                                    onClick={() => toggleEstado(venta.estado)} 
                                    className="btn secondary-theme"
                                >
                                    {venta.estado === 'Habilitado' ? 'ANULAR' : 'HABILITAR'}
                                </button>
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

export default Ventas;
