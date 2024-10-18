import { useState } from "react";

const styleInput = "input input-bordered w-full bg-theme bg-theme-hover secondary-theme placeholder: primary-theme";

const styleLabel = "label label-text text-theme label";
const styleBtn = "btn btn-primary w-full mt-4";

export const CreateCompra =  () => {
  const [compra, setCompra] = useState({
    proveedor: '',
    producto: '',
    cantidad: 0,
    precio: 0,
    fecha: '',
    observaciones: '',
    detalles: [],
  });

  const [total, setTotal] = useState(0);

  const handleAgregarProducto = () => {
    const nuevoDetalle = {
      producto: compra.producto,
      cantidad: compra.cantidad,
      precio: compra.precio,
      subtotal: compra.cantidad * compra.precio,
    };

    setCompra({
      ...compra,
      detalles: [...compra.detalles, nuevoDetalle],
    });

    setTotal(total + nuevoDetalle.subtotal);
  };

  const handleEliminarProducto = (index) => {
    const detallesActualizados = compra.detalles.filter((_, i) => i !== index);
    const subtotalRestado = compra.detalles[index].subtotal;

    setCompra({
      ...compra,
      detalles: detallesActualizados,
    });

    setTotal(total - subtotalRestado);
  };

  const handleRegistrarCompra = () => {
    console.log('Compra registrada:', compra);
  };
  return(
    <div className="px-4 pb-4 md:px-6 bg-base-200">
      <h1 className="title">Registrar Compra</h1>
      <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div>
          <label className={styleLabel}>Proveedor</label>
          <select
            className={styleInput + " select select-bordered"}
            value={compra.proveedor}
            placeholder="Seleccionar Proveedor"
            required
            onChange={(e) => setCompra({ ...compra, proveedor: e.target.value })}
          >
            <option disabled value="">
              Seleccione un proveedor
            </option>
            {/* Simulando opciones de proveedores */}
            <option value="1">Proveedor 1</option>
            <option value="2">Proveedor 2</option>
          </select>
        </div>
        <div>
          <label className={styleLabel}>Producto</label>
          <select
            className={styleInput + " select select-bordered"}
            value={compra.producto}
            placeholder="Seleccionar Producto"
            onChange={(e) => setCompra({ ...compra, producto: e.target.value })}
          >
            <option disabled value="">
              Seleccione un producto
            </option>
            {/* Simulando opciones de productos */}
            <option value="Producto 1">Producto 1</option>
            <option value="Producto 2">Producto 2</option>
          </select>
        </div>
        <div>
          <label className={styleLabel}>Cantidad de Productos</label>
          <input
            type="number"
            className={styleInput}
            value={compra.cantidad}
            placeholder="0"
            required
            onChange={(e) => setCompra({ ...compra, cantidad: e.target.value })}
          />
        </div>
        <div>
          <label className={styleLabel}>Precio</label>
          <input
            type="number"
            className={styleInput}
            value={compra.precio}
            placeholder="99.99"
            required
            onChange={(e) => setCompra({ ...compra, precio: parseFloat(e.target.value) || 0 })}
          />
        </div>
        <div>
          <label className={styleLabel}>Fecha</label>
          <input
            type="date"
            className={styleInput}
            value={compra.fecha}
            placeholder="04/25/2024"
            required
            onChange={(e) => setCompra({ ...compra, fecha: e.target.value })}
          />
        </div>
        <div className="col-span-1 md:col-span-2 lg:col-span-3">
          <label className={styleLabel}>Observaciones</label>
          <textarea
            className={styleInput + " textarea textarea-bordered"}
            maxLength={100}
            value={compra.observaciones}
            placeholder="Sin Observaciones"
            onChange={(e) => setCompra({ ...compra, observaciones: e.target.value })}
          />
        </div>
      </div>
      <button className={styleBtn + " primary-theme"} onClick={handleAgregarProducto}>
        Agregar Producto
      </button>
      <div className="mt-6">
        <h2 className="text-xl font-bold">Detalles de Compra</h2>
        <table className="table w-full mt-4">
          <thead>
            <tr>
              <th>Eliminar</th>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Q. Precio</th>
              <th>Q. SubTotal</th>
            </tr>
          </thead>
          <tbody>
            {compra.detalles.map((detalle, index) => (
              <tr key={index}>
                <td>
                  <button className="btn error-theme btn-xs" onClick={() => handleEliminarProducto(index)}>
                    Eliminar
                  </button>
                </td>
                <td>{detalle.producto}</td>
                <td>{detalle.cantidad}</td>
                <td>Q. {detalle.precio.toFixed(2)}</td>
                <td>Q. {detalle.subtotal.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
          
        <div className="text-right mt-4">
          <p className="primary-theme">Total a Pagar: Q. {(total).toFixed(2)}</p>
        </div>
      </div>
          
      <div className="flex flex-col md:flex-row justify-around mt-6 gap-4">
        <button className={styleBtn + " md:max-w-[48%] error-theme"}>Cancelar</button>
        <button className={styleBtn + " md:max-w-[48%] primary-theme"} onClick={handleRegistrarCompra}>
          Registrar
        </button>
      </div>
    </div>
  );
}