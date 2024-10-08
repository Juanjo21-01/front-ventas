import { LoginForm } from "./components/auth/login";
import { RegisterForm } from "./components/auth/register";
import { ListaProductos } from "./components/readData/listaProductos";
import { BtnModeTheme } from "./components/theme/btnMode";

function App() {
  return <>
    <BtnModeTheme></BtnModeTheme>
    <ListaProductos></ListaProductos>
    <LoginForm></LoginForm>
    <RegisterForm></RegisterForm>
  </>;
}

export default App;
