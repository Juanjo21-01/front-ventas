import { useEffect, useState } from "react";
import { useComprasStore } from "../../store/compras";

const styleInput = "input input-bordered w-full bg-theme bg-theme-hover secondary-theme placeholder: primary-theme";

const styleLabel = "label label-text text-theme label";
const styleBtn = "btn primary-theme w-full mt-4";

export const CreateCompra =  () => {
  const { obtener, crear } =
    useComprasStore();

  const [compraForm, setCompraForm] = useState({
    fechaCompra: '',
    estado: true,
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

  const handleCrearCompra = async (e) => {
    e.preventDefault();

    console.log(compraForm);

    await crear(compraForm);
    setCompraForm({
      fechaCompra: '',
      estado: true,
      observaciones: '',
      proveedorId: '',
      usuarioId: '',
      detalles: [{ cantidad: '', precio: '', productoId: '' }],
    });
  };

  return(
    <div className="px-4 pb-4 md:px-6 bg-base-200">
      <h1 className="title">Registrar Compra</h1>

      <form onSubmit={handleCrearCompra}>
        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Fecha */}
          <div>
            <label className={styleLabel}>Fecha de Compra</label>
            <input
              type="date"
              className={styleInput}
              name="fechaCompra"
              value={compraForm.fechaCompra}
              onChange={handleInputChange}
              placeholder="YYYY-MM-DD"
              required
            />
          </div>

          {/* Proveedor ID */}
          <div>
            <label className={styleLabel}>Proveedor ID</label>
            <input
              type="text"
              className={styleInput}
              name="proveedorId"
              value={compraForm.proveedorId}
              onChange={handleInputChange}
              placeholder="Ingresar Proveedor ID"
              required
            />
          </div>

          {/* Usuario ID */}
          <div>
            <label className={styleLabel}>Usuario ID</label>
            <input
              type="text"
              className={styleInput}
              name="usuarioId"
              value={compraForm.usuarioId}
              onChange={handleInputChange}
              placeholder="Ingresar Usuario ID"
              required
            />
          </div>

          {/* Observaciones */}
          <div className="col-span-1 md:col-span-2 lg:col-span-3">
            <label className={styleLabel}>Observaciones</label>
            <textarea
              className={styleInput + " textarea textarea-bordered"}
              name="observaciones"
              maxLength={100}
              value={compraForm.observaciones}
              placeholder="Sin Observaciones"
              onChange={handleInputChange}
            />
          </div>
        </div>

        <h3 className="text-xl font-bold mt-6">Detalles de Compra</h3>
        {compraForm.detalles.map((detalle, index) => (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4" key={index}>
            {/* Producto ID */}
            <div>
              <label className={styleLabel}>Producto ID</label>
              <input
                type="text"
                className={styleInput}
                name="productoId"
                value={detalle.productoId}
                onChange={(e) => handleDetalleChange(index, e)}
                placeholder="Producto ID"
                required
              />
            </div>
        
            {/* Cantidad */}
            <div>
              <label className={styleLabel}>Cantidad</label>
              <input
                type="number"
                className={styleInput}
                name="cantidad"
                value={detalle.cantidad}
                onChange={(e) => handleDetalleChange(index, e)}
                placeholder="0"
                required
              />
            </div>
        
            {/* Precio */}
            <div>
              <label className={styleLabel}>Precio</label>
              <input
                type="number"
                className={styleInput}
                name="precio"
                value={detalle.precio}
                onChange={(e) => handleDetalleChange(index, e)}
                placeholder="99.99"
                required
              />
            </div>
          </div>
        ))}

        <button
          type="button"
          className={styleBtn + " primary-theme mt-4"}
          onClick={handleAddDetalle}
        >
          Añadir Detalle
        </button>
      
        <div className="flex flex-col md:flex-row justify-around mt-6 gap-4">
          <button className={styleBtn + " md:max-w-[48%] error-theme"} type="button">
            Cancelar
          </button>
          <button
            className={styleBtn + " md:max-w-[48%] primary-theme"}
            type="submit"
          >
            Registrar Compra
          </button>
        </div>
      </form>
    </div>
  );
}