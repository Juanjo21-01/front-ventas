import { useEffect, useState } from 'react';
import { useVentasStore } from '../../../store/ventas';
import { NavLink } from 'react-router-dom';

const Ventas = () => {
  const { ventas, isLoading, obtener, crear, cambiarEstado } = useVentasStore();

  const [ventaForm, setVentaForm] = useState({
    fechaVenta: '',
    estado: true,
    observaciones: '',
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
    setVentaForm({ ...ventaForm, [name]: value });
  };

  const handleDetalleChange = (index, e) => {
    const { name, value } = e.target;
    const detalles = [...ventaForm.detalles];
    detalles[index] = { ...detalles[index], [name]: value };
    setVentaForm({ ...ventaForm, detalles });
  };

  const handleAddDetalle = () => {
    setVentaForm({
      ...ventaForm,
      detalles: [
        ...ventaForm.detalles,
        { cantidad: '', precio: '', productoId: '' },
      ],
    });
  };

  const handleCrearVenta = async (e) => {
    e.preventDefault();

    console.log(ventaForm);
    
    await crear(ventaForm);
    setVentaForm({
      fechaVenta: '',
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
      <h2>Lista de Ventas</h2>
      <NavLink to="/ventas/crear" className="btn">
        Crear Venta
      </NavLink>

      {isLoading ? (
        <p>Cargando...</p>
      ) : ventas === undefined ? (
        <p>No hay ventas</p>
      ) : (
        <table border="1" style={{ width: '100%', marginBottom: '20px' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th>Observaciones</th>
              <th>Usuario ID</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {ventas.map((venta) => (
              <tr key={venta.id}>
                <td>{venta.id}</td>
                <td>{venta.fechaVenta}</td>
                <td>{venta.estado ? 'Activa' : 'Anulada'}</td>
                <td>{venta.observaciones}</td>
                <td>{venta.usuarioId}</td>
                <td>
                  <button
                    className="btn"
                    onClick={() => handleCambiarEstado(venta.id, !venta.estado)}
                  >
                    {venta.estado ? 'Anular' : 'Activar'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <h2>Crear Nueva Venta</h2>
      <form onSubmit={handleCrearVenta}>
        <div>
          <label>Fecha de Venta:</label>
          <input
            type="text"
            name="fechaVenta"
            value={ventaForm.fechaVenta}
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
            value={ventaForm.observaciones}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Usuario ID:</label>
          <input
            type="text"
            name="usuarioId"
            value={ventaForm.usuarioId}
            onChange={handleInputChange}
            required
          />
        </div>

        <h3>Detalles de Venta</h3>
        {ventaForm.detalles.map((detalle, index) => (
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
      </form>
    </div>
  );
};

export default Ventas;
