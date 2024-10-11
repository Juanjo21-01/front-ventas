import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RutasPublicas } from './RutasPublicas';
import { RutasPrivadas } from './rutasPrivadas';
import Inicio from '../pages/public/Inicio';
import Login from '../pages/public/Login';
import Register from '../pages/public/Register';
import Dashboard from '../pages/private/Dashboard';
import Roles from '../pages/private/usuarios/Roles';
import Usuarios from '../pages/private/usuarios/Usuarios';
import UsuariosInicio from '../pages/private/usuarios/UsuariosInicio';
import UsuariosDetalle from '../pages/private/usuarios/UsuariosDetalle';
import Proveedores from '../pages/private/proveedores/Proveedores';
import ProveedoresInicio from '../pages/private/proveedores/ProveedoresInicio';
import ProveedoresDetalle from '../pages/private/proveedores/ProveedoresDetalle';
import TipoProductos from '../pages/private/tipoProductos/TipoProductos';
import TipoProductosInicio from '../pages/private/tipoProductos/TipoProductosInicio';
import TipoProductosDetalle from '../pages/private/tipoProductos/TipoProductosDetalle';
import Productos from '../pages/private/productos/Productos';
import ProductosInicio from '../pages/private/productos/ProductosInicio';
import ProductosDetalle from '../pages/private/productos/ProductosDetalle';
import Compras from '../pages/private/compras/Compras';
import ComprasInicio from '../pages/private/compras/ComprasInicio';
import ComprasDetalle from '../pages/private/compras/ComprasDetalle';
import ComprasCrear from '../pages/private/compras/ComprasCrear';
import Ventas from '../pages/private/ventas/Ventas';
import VentasInicio from '../pages/private/ventas/VentasInicio';
import VentasDetalle from '../pages/private/ventas/VentasDetalle';
import VentasCrear from '../pages/private/ventas/VentasCrear';
import Layout from '../pages/Layout';

const Rutas = () => {
  return (
    <Router>
      {/* Rutas */}
      <Routes>
        {/* RUTAS PUBLICAS */}
        <Route path="/" element={<RutasPublicas />}>
          {/* Ruta principal */}
          <Route path="/" element={<Inicio />} />

          {/* Ruta de login */}
          <Route path="/login" element={<Login />} />

          {/* Ruta de registro */}
          <Route path="/registrarse" element={<Register />} />
        </Route>

        {/* RUTAS PRIVADAS */}
        <Route path="/" element={<RutasPrivadas />}>
          {/* Layout */}
          <Route path="/" element={<Layout />}>
            {/* Ruta de dashboard */}
            <Route path="/dashboard" element={<Dashboard />} />

            {/* Ruta de roles */}
            <Route path="/roles" element={<Roles />} />

            {/* Ruta de usuarios */}
            <Route path="/usuarios" element={<Usuarios />}>
              <Route index element={<UsuariosInicio />} />
              <Route path=":id" element={<UsuariosDetalle />} />
            </Route>

            {/* Ruta de Proveedores */}
            <Route path="/proveedores" element={<Proveedores />}>
              <Route index element={<ProveedoresInicio />} />
              <Route path=":id" element={<ProveedoresDetalle />} />
            </Route>

            {/* Ruta de Tipo de Productos */}
            <Route path="/tipo-productos" element={<TipoProductos />}>
              <Route index element={<TipoProductosInicio />} />
              <Route path=":id" element={<TipoProductosDetalle />} />
            </Route>

            {/* Ruta de Productos */}
            <Route path="/productos" element={<Productos />}>
              <Route index element={<ProductosInicio />} />
              <Route path=":id" element={<ProductosDetalle />} />
            </Route>

            {/* Rutas de Compras */}
            <Route path="/compras" element={<Compras />}>
              <Route index element={<ComprasInicio />} />
              <Route path="crear" element={<ComprasCrear />} />
              <Route path=":id" element={<ComprasDetalle />} />
            </Route>

            {/* Rutas de Ventas */}
            <Route path="/ventas" element={<Ventas />}>
              <Route index element={<VentasInicio />} />
              <Route path="crear" element={<VentasCrear />} />
              <Route path=":id" element={<VentasDetalle />} />
            </Route>
          </Route>
        </Route>

        {/* Ruta de error */}
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </Router>
  );
};

export default Rutas;
