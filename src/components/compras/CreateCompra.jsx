import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useComprasStore } from '../../store/compras';
import { useUsuariosStore } from '../../store/usuarios';
import { useProductosStore } from '../../store/productos';
import { useProveedoresStore } from "../../store/proveedores";

const styleInput = "input input-bordered w-full bg-theme bg-theme-hover secondary-theme placeholder: primary-theme";
const styleLabel = "label label-text text-theme label";
const styleBtn = "btn primary-theme w-full mt-4";

const CreateCompra = () => {
  const navigate = useNavigate();
  const { usuarios, obtener: obtenerUsuarios } = useUsuariosStore();
  const { crear } = useComprasStore();
  const { productos, obtener: obtenerProductos } = useProductosStore();
  const { proveedores, obtener: obtenerProveedores } = useProveedoresStore();

  useEffect(() => {
    obtenerUsuarios();
    obtenerProductos();
    obtenerProveedores();
    }, [obtenerUsuarios, obtenerProductos, obtenerProveedores]); 
  

  const [nuevaCompra, setNuevaCompra] = useState({
    id: '',
    fechaCompra: '',
    observaciones: '',
    usuarioId: '',
    proveedorId: '',
    cantidad: '',
    precio: '',
    productoId: '',
    rolId: '',
  });

  const manejarCambio = (e) => {
    setNuevaCompra({
      ...nuevaCompra,
      [e.target.name]: e.target.value
    });
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    console.log(nuevaCompra);
    await crear(nuevaCompra);
    setNuevaCompra({
      fechaCompra: '',
      observaciones: '',
      usuarioId: '',
      proveedorId: '',
      cantidad: '',
      precio: '',
      productoId: ''
    });
    navigate('/compras'); 
  };

  return (
    <div className="px-4 pb-4 md:px-6 bg-base-200">
      <h1 className="title">Registrar Compra</h1>

      <form onSubmit={manejarEnvio}>

        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">

          {/* Fecha */}
          <div>
          <label className={styleLabel}>Fecha de compra</label>
          <input
            type="date"
            name="fechaCompra"
            value={nuevaCompra.fechaCompra}
            onChange={manejarCambio}
            className={styleInput}
            placeholder="YYYY-MM-DD"
            required
          />
          </div>

          {/* Proveedor ID */}
        {nuevaCompra.proveedorId !== 1 && (
          <select 
          name="proveedorId"
          value={nuevaCompra.proveedorId}
          onChange={manejarCambio}
          required 
          className={styleInput + "input input-bordered w-100 my-9"}
          >
            <option defaultValue="0">
              Selecione un Proveedor
            </option>
            {proveedores.map (
              (proveedor) =>
                // quitar el proveedor administrador
              proveedor.rolId !== 1 && (
                <option key={proveedor.id} value={proveedor.id}>
                {proveedor.nombre}
                </option>
              )
            )}
          </select>
        )}
        

        {/* Usuario ID */}
        {nuevaCompra.usuarioId !== 1 && (
          <select 
          name="usuarioId"
          value={nuevaCompra.usuarioId}
          onChange={manejarCambio}
          required 
          className={styleInput + "input input-bordered w-100 my-9"}
          >
            <option defaultValue="0">
              Selecione un Usuario
            </option>
            {usuarios.map (
              (usuario) =>
                // quitar el usuario administrador
              usuario.rolId === 2 && (
                <option key={usuario.id} value={usuario.id}>
                {usuario.nombres} {usuario.apellidos}
                </option>
              )
            )}
          </select>
        )}
        {/* <div>
          <label className={styleLabel}>Usuario ID</label>
          <input
            type="text"
            name="usuarioId"
            value={nuevaCompra.usuarioId}
            onChange={manejarCambio}
            className={styleInput}
            placeholder="Ingresar Usuario ID"
            required
          />
        </div> */}

          {/* Observaciones */}
        <div className="col-span-1 md:col-span-2 lg:col-span-3">
          <label className={styleLabel}>Observaciones</label>
          <textarea
              className={styleInput + " textarea textarea-bordered"}
              name="observaciones"
              maxLength={100}
              value={nuevaCompra.observaciones}
              placeholder="Sin Observaciones"
              onChange={manejarCambio}
            />
        </div>
        </div>
            <br />
            <br />
        <h3 className="text-xl font-bold mt-6">Detalles de Compra</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">

        {/* Producto ID */}
        {nuevaCompra.productoId !== 1 && (
          <select 
          name="productoId"
          value={nuevaCompra.productoId}
          onChange={manejarCambio}
          required 
          className={styleInput + "input input-bordered w-100 my-9"}
          >
            <option defaultValue="0">
              Selecione un producto
            </option>
            {productos.map (
              (producto) =>
                // quitar el producto administrador
              producto.rolId !== 2 && (
                <option key={producto.id} value={producto.id}>
                {producto.nombre}
                </option>
              )
            )}
          </select>
        )}


        {/* <div>
          <label className={styleLabel}>Producto ID</label>
          <input
            type="number"
            name="productoId"
            value={nuevaCompra.productoId}
            onChange={manejarCambio}
            className={styleInput}
            placeholder="Producto ID"
            required
          />
        </div> */}
        
        {/* Cantidad */}
        <div>
          <label className={styleLabel}>Cantidad</label>
          <input
            type="number"
            name="cantidad"
            value={nuevaCompra.cantidad}
            onChange={manejarCambio}
            className={styleInput}
            required
            placeholder="0"
          />
        </div>

        {/* Precio */}
        <div className="form-control mb-4">
          <label className={styleLabel}>Precio</label>
          <input
            type="number"
            step="0.01"
            name="precio"
            value={nuevaCompra.precio}
            onChange={manejarCambio}
            className={styleInput}
            placeholder="Q 00.00"
            required
          />
        </div>
        </div>
    
        <div className="flex flex-col md:flex-row justify-around mt-6 gap-4">
        <button className={styleBtn + " md:max-w-[48%] error-theme"} type="button">
          Cancelar
        </button>
        <button type="submit" className={styleBtn + " md:max-w-[48%] primary-theme"}>
          Registrar compra
        </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCompra;
