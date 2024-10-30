import { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useVentasStore } from '../../store/ventas'; // Asegúrate de que tienes un store para ventas
import { getProductoById } from '../../helpers/api/productos/productos';
import { getVentaById } from '../../helpers/api/ventas/ventas'; // Asumiendo que tienes una función para obtener ventas

export const VentaDetalle = () => {
    const { id } = useParams(); // El ID de la venta
    const { obtenerDetalleVenta, detalleVenta, isLoading } = useVentasStore(); // Usando store para ventas
    const [venta, setVenta] = useState({});
    const [productos, setProductos] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        obtenerDetalleVenta(id);
    }, [id, obtenerDetalleVenta]);

    useEffect(() => {
        const fetchVenta = async () => {
            const venta = await getVentaById(id);
            setVenta(venta);
        };
        fetchVenta();
    }, [id]);

    useEffect(() => {
        const fetchProductos = async () => {
            if (detalleVenta === undefined) return;
            const productos = await Promise.all(
                detalleVenta.map((detalle) => getProductoById(detalle.productoId))
            );

            const productosNombre = productos.map((producto) => producto.nombre);
            setProductos(productosNombre);
        };
        fetchProductos();
    }, [detalleVenta]);

    const detalles = detalleVenta?.map((detalle, index) => {
        return {
            ...detalle,
            productoId: detalle.productoId,
            nombre: productos[index],
        };
    });

    // Calcular el total de la venta en base a los detalles
    useEffect(() => {
        if (detalles === undefined) return;
        const total = detalles.reduce((acc, detalle) => {
            return acc + detalle.precio * detalle.cantidad;
        }, 0);
        setTotal(total);
    }, [detalles]);

    if (isLoading) {
        return (
            <div className="h-full flex flex-col justify-center items-center">
                <span className="loading loading-infinity loading-lg"></span>
                <span className="text-2xl">Cargando...</span>
            </div>
        );
    }

    return (
        <div className="bg-theme text-theme">
            <div className="container mx-auto px-4">
                <NavLink to="/ventas" className="btn btn-success my-4">
                    Regresar
                </NavLink>

                <h2 className="title">Detalles de Venta No. {id}</h2>

                {/* card con la informacion de la venta */}
                <div className="card">
                    <div className="card-body">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p>
                                    <strong>Fecha:</strong> {venta.fechaVenta}
                                </p>
                                <p></p>
                                <p>
                                    <strong>Estado:</strong>
                                    <span
                                        className={`badge mx-3 ${
                                            venta.estado ? 'badge-success' : 'badge-error'
                                        }`}
                                    >
                                        {venta.estado ? 'Activa' : 'Inactiva'}
                                    </span>
                                </p>
                            </div>
                            <div>
                                <p>
                                    <strong>Total:</strong> Q {total}
                                </p>
                                <p>
                                    <strong>Observaciones:</strong> {venta.observaciones}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {detalles === undefined ? (
                    <p>No hay detalles</p>
                ) : (
                    <div className="overflow-x-auto pb-24">
                        <table className="table">
                            <thead>
                                <tr className="text-center">
                                    <th className="w-2/12">No.</th>
                                    <th className="w-4/12">Producto</th>
                                    <th className="w-2/12">Cantidad</th>
                                    <th className="w-2/12">Precio</th>
                                    <th className="w-2/12">Sub Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {detalles.map((detalle) => (
                                    <tr key={detalle.id} className="text-center">
                                        <td className="w-2/12">{detalle.id}</td>
                                        <td className="w-4/12">
                                            {detalle.nombre} ({detalle.productoId})
                                        </td>
                                        <td className="w-2/12">{detalle.cantidad}</td>
                                        <td className="w-2/12">Q {detalle.precio}</td>
                                        <td className="w-2/12">
                                            Q {detalle.precio * detalle.cantidad}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

