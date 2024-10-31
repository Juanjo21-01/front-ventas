import { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useComprasStore } from '../../store/compras';
import { getProductoById } from '../../helpers/api/productos/productos';
import { getCompraById } from '../../helpers/api/compras/compras';

export const CompraDetalle = () => {
  const { id } = useParams(); // El ID de la compra
  const { obtenerDetalleCompra, detalleCompra, isLoading } = useComprasStore();
  const [compra, setCompra] = useState({});
  const [productos, setProductos] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    obtenerDetalleCompra(id);
  }, [id, obtenerDetalleCompra]);

  useEffect(() => {
    const fetchCompra = async () => {
      const compra = await getCompraById(id);
      setCompra(compra);
    };
    fetchCompra();
  }, [id]);

  useEffect(() => {
    const fetchProductos = async () => {
      if (detalleCompra === undefined) return;
      const productos = await Promise.all(
        detalleCompra.map((detalle) => getProductoById(detalle.productoId))
      );

      const productosNombre = productos.map((producto) => producto.nombre);
      setProductos(productosNombre);
    };
    fetchProductos();
  }, [detalleCompra]);

  const detalles = detalleCompra?.map((detalle, index) => {
    return {
      ...detalle,
      productoId: detalle.productoId,
      nombre: productos[index],
    };
  });

  // Calcular el total de la compra en base a los detalles
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
        <NavLink to="/compras" className="btn primary-theme my-4">
          Regresar
        </NavLink>

        <h2 className="title">Detalles de Compra No. {id}</h2>

        {/* card con la informacion de la compra */}
        <div className="card">
          <div className="card-body">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p>
                  <strong>Fecha:</strong> {compra.fechaCompra}
                </p>
                <p></p>
                <p>
                  <strong>Estado:</strong>
                  <span
                    className={`badge mx-3 ${
                      compra.estado ? 'badge-success' : 'badge-error'
                    }`}
                  >
                    {compra.estado ? 'Activa' : 'Inactiva'}
                  </span>
                </p>
              </div>
              <div>
                <p>
                  <strong>Total:</strong> Q {total}
                </p>
                <p>
                  <strong>Observaciones:</strong> {compra.observaciones}
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
