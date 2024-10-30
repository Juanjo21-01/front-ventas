import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useComprasStore } from '../../store/compras';
import { getProductoById } from '../../helpers/api/productos/productos';

export const CompraDetalle = () => {
  const { id } = useParams(); // El ID de la compra
  const { obtenerDetalleCompra, detalleCompra, isLoading } = useComprasStore();
  const [detalles, setDetalles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await obtenerDetalleCompra(id);
    };
    fetchData();
  }, [id, obtenerDetalleCompra]);

  useEffect(() => {
    const fetchDetallesConProducto = async () => {
      const detallesCompra = detalleCompra || [];

      const detallesConProducto = await Promise.all(
        detallesCompra.map(async (detalle) => {
          try {
            const producto = await getProductoById(detalle.productoId);
            return {
              ...detalle,
              productoNombre: producto?.nombre || 'Producto no encontrado'
            };
          } catch (error) {
            console.error(`Error al obtener el producto con ID: ${detalle.productoId}`, error);
            return { ...detalle, productoNombre: 'Error al obtener producto' };
          }
        })
      );
      setDetalles(detallesConProducto);
    };

    if (detalleCompra?.length > 0) {
      fetchDetallesConProducto();
    }
  }, [detalleCompra]);


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
        <h2 className='title'>Detalles de Compra No. {id}</h2>


        {detalles === undefined ? (
          <p>No hay detalles</p>
        ) : (
          <div className="overflow-x-auto pb-24">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Precio</th>
                  <th>Total</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {detalles.map((detalle) => (
                  <tr key={detalle.id}>
                    <td>{detalle.id}</td>
                    <td>{detalle.productoNombre}</td>
                    <td>{detalle.cantidad}</td>
                    <td>Q {detalle.precio}</td>
                    <td>Q {detalle.precio * detalle.cantidad}</td>
                    <td>
                      .
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