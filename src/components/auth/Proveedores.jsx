import React, { useEffect, useState } from 'react';

const Proveedores = () => {

    const [DetalleProveedores, setProveedores] = useState([]);

    // const obtenerDatos = async () => {
    //     try {
    //         const respuesta = await fetch('URL_DE_TU_API'); 
    //         const datos = await respuesta.json();
    //         setProveedores(datos); 
    //     } catch (error) {
    //         console.error('Error al obtener los datos:', error);
    //     }
    // };

    // useEffect(() => {
    //     obtenerDatos();
    // }, []);

    return (
        <div className="overflow-x-auto">
            <table className="table w-full">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NOMBRE_ID</th>
                        <th>NIT_ID</th>
                        <th>DIRECCION</th>
                        <th>TELEFONO</th>
                        <th>ESTADO</th>
                    </tr>
                </thead>
                <tbody>
                    {DetalleProveedores.map(detalle => (
                        <tr key={detalle.id}>
                            <td>{detalle.id}</td>
                            <td>{detalle.nombre_id}</td>
                            <td>{detalle.nit_id}</td>
                            <td>{detalle.direccion}</td>
                            <td>{detalle.telefono}</td>
                            <td>{detalle.estado}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Proveedores;
