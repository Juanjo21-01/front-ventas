import React, { useEffect, useState } from 'react';
// import CompraModal from './CompraModal';

const TableCompras = ({ compras }) => {
  const [detalleCompras, setDetallesCompras] = useState(compras || []);


  // Efecto para actualizar detalleVentas cuando cambian las props compras
useEffect(() => {
  setDetallesCompras(compras);
}, [compras]);

const toggleEstado = (id) => {
  setDetallesCompras(detalleCompras.map(compra => {
      if (compra.id === id) {
          return { ...compra, estado: compra.estado === 'Habilitado' ? 'Anulado' : 'Habilitado' };
      }
      return compra;
  }));
};




// const TableCompras = () => {
//   const [compras, setCompras] = useState([
//     { id: 1, fecha_compra: '2024-10-07', estado: 'Pendiente', observaciones: 'Ninguna', proveedor_id: 101, usuario_id: 201 },
//     { id: 2, fecha_compra: '2024-10-06', estado: 'Completado', observaciones: 'Revisar factura', proveedor_id: 102, usuario_id: 202 }
//   ]);

//   const [compraActual, setCompraActual] = useState(null); // Compra seleccionada
//   const [modalAbierto, setModalAbierto] = useState(false); // Controla el modal

//   const abrirModal = (compra) => {
//     setCompraActual(compra);
//     setModalAbierto(true);
//   };

//   const cerrarModal = () => setModalAbierto(false);

//   const actualizarCompra = (compraActualizada) => {
//     setCompras(
//       compras.map((compra) => (compra.id === compraActualizada.id ? compraActualizada : compra))
//     );
//     cerrarModal();
//   };

  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>ID</th>
            <th>Fecha de Compra</th>
            <th>Estado</th>
            <th>Observaciones</th>
            <th>Proveedor ID</th>
            <th>Usuario ID</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {detalleCompras.map((compra) => (
            <tr key={compra.id}>
              <td>{compra.id}</td>
              <td>{compra.fecha_compra}</td>
              <td>{compra.estado}</td>
              <td>{compra.observaciones}</td>
              <td>{compra.proveedor_id}</td>
              <td>{compra.usuario_id}</td>
              <td>
                                <button 
                                    onClick={() => toggleEstado(compra.id)} 
                                    className="btn btn-secondary"
                                >
                                    {compra.estado === 'Habilitado' ? 'ANULAR' : 'HABILITAR'}
                                </button>
                </td>
              {/* <td>
                <button className="btn btn-sm btn-warning" onClick={() => abrirModal(compra)}>Editar</button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>

      {/* {modalAbierto && (
        <CompraModal
          compra={compraActual}
          Cerrar={cerrarModal}
          Guardar={actualizarCompra}
        />
      )} */}
    </div>
  );
};

export default TableCompras;
