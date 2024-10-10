import { LoginForm } from "./components/auth/login";
import { RegisterForm } from "./components/auth/register";
import { HeaderAndAside } from "./components/headerAndAside";
import { ListaProductos } from "./components/readData/listaProductos";

function App() {
  return <>
    <HeaderAndAside></HeaderAndAside>
    <hr className="mb-[4rem]"/>
    <ListaProductos></ListaProductos>
    <LoginForm></LoginForm>
    <RegisterForm></RegisterForm>
  </>;
}

export default App;
