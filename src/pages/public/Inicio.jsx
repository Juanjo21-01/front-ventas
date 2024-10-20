import { MenuProvider } from "../../components/context/MenuContext";
import { ListaProductos } from "../../components/Dashboard/CardsProductos";
import Header from "../../components/Header";

const Inicio = () => {
  return (
    <div className="flex flex-col">
      <MenuProvider>
      <Header />

      <div className="mt-16 sm:mt-0 overflow-auto h-screen primary-theme">
        <ListaProductos />
      </div>
      </MenuProvider>
    </div>
  );
};

export default Inicio;