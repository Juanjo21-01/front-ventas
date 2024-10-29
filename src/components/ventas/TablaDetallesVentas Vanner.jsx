import React, { useEffect, useState } from 'react';


const TablaDetallesVentas = () => {

    const [detallesVentas, setDetallesCompras] = useState([]);

    // // Función para obtener datos de la base de datos.
    // const obtenerDatos = async () => {
    //     try {
    //         // Simulamos una llamada a una API que obtiene los datos de Workbench.
    //         const respuesta = await fetch('URL_DE_TU_API'); 
    //         const datos = await respuesta.json();
    //         setDetallesCompras(datos); 
    //     } catch (error) {
    //         console.error('Error al obtener los datos:', error);
    //     }
    // };

    // // Usamos useEffect para obtener los datos al cargar el componente.
    // useEffect(() => {
    //     obtenerDatos();
    // }, []);

    return (
        <div className="overflow-x-auto">
            <table className="table w-full">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>VENTA_ID</th>
                        <th>PRODUCTO_ID</th>
                        <th>CANTIDAD</th>
                        <th>PRECIO</th>
                    </tr>
                </thead>
                <tbody>
                    {detallesVentas.map(detalle => (
                        <tr key={detalle.id}>
                            <td>{detalle.id}</td>
                            <td>{detalle.venta_id}</td>
                            <td>{detalle.producto_id}</td>
                            <td>{detalle.cantidad}</td>
                            <td>${detalle.precio.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TablaDetallesVentas;
