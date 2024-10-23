import { useState } from 'react';
import ProductModal from "./components/productos/ProductModal";
import TableCompras from "./components/compras/TableCompras";
import TablaUsuarios from "./components/usuarios/TablaUsuarios";
import TablaProductos from "./components/productos/TablaProductos";
import TablaDetallesCompras from "./components/compras/TablaDetallesCompras";
import TablaDetallesVentas from "./components/ventas/TablaDetallesVentas";
import Proveedores from './components/proveedores/Proveedores';
import Ventas from './components/ventas/Ventas';
import FormularioNuevaVenta from "./components/ventas/FormularioNuevaVenta";
import FormularioNuevaCompra from "./components/compras/FormularioNuevaCompra";

const App = () => {
  // Estado para el modal de producto
  const [ModalAbierto, ActualizarModal] = useState(false);

  const AbrirModal = () => ActualizarModal(true);
  const CerrarModal = () => ActualizarModal(false);
  const [ventas, setVentas] = useState([]);
  const [compras, setCompras] = useState([]);

  const agregarVenta = (venta) => {
    setVentas([...ventas, venta]); // Agrega la nueva venta al estado de ventas
    console.log('Venta creada:', venta); // Puedes agregar lógica para guardarlo en una base de datos
  };

  const agregarCompra = (compra) => {
    setCompras([...compras, compra]); // Agrega la nueva venta al estado de ventas
    console.log('Compra creada:', compra); // Puedes agregar lógica para guardarlo en una base de datos
  };

  return (
    <div className="App">

      {/* Sección de Producto */}
      <div className="seccion-producto my-4">
        <h2 className="text-center text-2xl font-bold">Gestión de Productos</h2>
        <br />
        <br />
        <button className="btn btn-primary" onClick={AbrirModal}>
          Agregar Producto
        </button>
        <ProductModal abrir={ModalAbierto} cerrar={CerrarModal} />
      </div>
      <br />
      <br />

      {/* Sección de Compras */}
      <div className="seccion-compra my-4">
        <h2 className="text-center text-2xl font-bold mb-4">Gestión de Compras</h2>
        <br />
        <br />
        <TableCompras compras={compras} />
      </div>
      <br />
      <br />

      <div className="App">
      <FormularioNuevaCompra agregarCompra={agregarCompra} />
      </div>
      <br />
      <br />

      {/* Sección de Usuarios */}
      <div className="seccion-usuarios my-4">
        <h2 className="text-center text-2xl font-bold mb-4">Gestión de Usuarios</h2>
        <TablaUsuarios />
      </div>
      <br />
      <br />

      <div className="p-4">
            <h1 className="text-center text-2xl font-bold mb-4">Detalles de Compras</h1>
            <TablaDetallesCompras/>
      </div>
      <br />
      <br />

      <div className="p-4">
            <h1 className="text-center text-2xl font-bold mb-4">Detalles de Ventas</h1>
            <TablaDetallesVentas/>
      </div>
      <br />
      <br />

      <div className="seccion-compra my-4">
        <h2 className="text-center text-2xl font-bold mb-4">Productos</h2>
        <br />
        <br />
        <TablaProductos/>
      </div>
      <br />
      <br />

      <div className="p-4">
            <h1 className="text-center text-2xl font-bold mb-4">Proveedores</h1>
            <Proveedores/>
      </div>
      <br />
      <br />

      <div className="p-4">
            <h1 className="text-center text-2xl font-bold mb-4">Ventas</h1>
            <Ventas ventas={ventas} />
      </div>
      <br />
      <br />

      <div className="p-4">
      <FormularioNuevaVenta agregarVenta={agregarVenta} />
      </div>
      <br />
      <br />

    </div>
  );
};

export default App;
