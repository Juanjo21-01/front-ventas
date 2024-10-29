import { useEffect, useState } from 'react';
import { useComprasStore } from '../../../store/compras';
import { NavLink } from 'react-router-dom';

const Compras = () => {
  const { compras, isLoading, obtener, crear, cambiarEstado } = useComprasStore();

  const [compraForm, setCompraForm] = useState({
    fechaCompra: '',
    estado: null,
    observaciones: '',
    proveedorId: '',
    usuarioId: '',
    detalles: [
      {
        cantidad: '',
        precio: '',
        productoId: '',
      },
    ],
  });

  useEffect(() => {
    obtener();
  }, [obtener]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCompraForm({ ...compraForm, [name]: value });
  };

  const handleDetalleChange = (index, e) => {
    const { name, value } = e.target;
    const detalles = [...compraForm.detalles];
    detalles[index] = { ...detalles[index], [name]: value };
    setCompraForm({ ...compraForm, detalles });
  };

  const handleAddDetalle = () => {
    setCompraForm({
      ...compraForm,
      detalles: [
        ...compraForm.detalles,
        { cantidad: '', precio: '', productoId: '' },
      ],
    });
  };

  const handleCrearVenta = async (e) => {
    e.preventDefault();

    console.log(compraForm);
    
    await crear(compraForm);
    setCompraForm({
      fechaCompra: '',
      estado: true,
      observaciones: '',
      usuarioId: '',
      detalles: [{ cantidad: '', precio: '', productoId: '' }],
    });
  };

  const handleCambiarEstado = async (id, nuevoEstado) => {
    await cambiarEstado(id, nuevoEstado);
  };

  return (
    <div>
      <h2 className="title">Lista de Compras</h2>

      <NavLink to="/compras/crear" className="btn">
        Crear Compra
      </NavLink>
      <br />

      {isLoading ? (
        <p>Cargando...</p>
      ) : compras === undefined ? (
        <p>No hay compras</p>
      ) : (
        <table border="1" style={{ width: '100%', marginBottom: '20px' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th>Observaciones</th>
              <th>Proveedores</th>
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
                    onClick={() => handleCambiarEstado(compra.id, !compra.estado)}
                  >
                    {compra.estado ? 'Anular' : 'Activar'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* <h2>Crear Nueva Venta</h2>
      <form onSubmit={handleCrearVenta}>
        <div>
          <label>Fecha de Venta:</label>
          <input
            type="text"
            name="fechaCompra"
            value={compraForm.fechaCompra}
            onChange={handleInputChange}
            placeholder="YYYY-MM-DD"
            required
          />
        </div>
        <div>
          <label>Observaciones:</label>
          <input
            type="text"
            name="observaciones"
            value={compraForm.observaciones}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Usuario ID:</label>
          <input
            type="text"
            name="usuarioId"
            value={compraForm.usuarioId}
            onChange={handleInputChange}
            required
          />
        </div>

        <h3>Detalles de Venta</h3>
        {compraForm.detalles.map((detalle, index) => (
          <div key={index}>
            <label>Cantidad:</label>
            <input
              type="number"
              name="cantidad"
              value={detalle.cantidad}
              onChange={(e) => handleDetalleChange(index, e)}
              required
            />
            <label>Precio:</label>
            <input
              type="number"
              name="precio"
              value={detalle.precio}
              onChange={(e) => handleDetalleChange(index, e)}
              required
            />
            <label>Producto ID:</label>
            <input
              type="text"
              name="productoId"
              value={detalle.productoId}
              onChange={(e) => handleDetalleChange(index, e)}
              required
            />
          </div>
        ))}
        <button className="btn" type="button" onClick={handleAddDetalle}>
          Añadir Detalle
        </button>
        <br />
        <button className="btn" type="submit">
          Crear Venta
        </button>
      </form> */}
      
    </div>
    
  );
};

export default Compras;
