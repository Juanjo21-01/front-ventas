import React, { useEffect, useState } from 'react';

const TablaProductos = () => {

    const [DetalleProducto, setDetallesCompras] = useState([]);

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
                        <th>NOMBRE</th>
                        <th>PRECIO_UNITARIO</th>
                        <th>STOCK</th>
                        <th>ESTADO</th>
                        <th>TIPO_PRODUCTO_ID</th>
                        <th>PROVEEDOR_ID</th>
                    </tr>
                </thead>
                <tbody>
                    {DetalleProducto.map(detalle => (
                        <tr key={detalle.id}>
                            <td>{detalle.id}</td>
                            <td>{detalle.nombre}</td>
                            <td>${detalle.precio_unitario.toFixed(2)}</td>
                            <td>{detalle.stock}</td>
                            <td>{detalle.estado}</td>
                            <td>{detalle.estado}</td>
                            <td>{detalle.tipo_producto_id}</td>
                            <td>{detalle.proveedor_id}</td>

                            
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TablaProductos;
