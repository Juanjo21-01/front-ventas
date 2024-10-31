import { Toaster } from 'sonner';
import { MenuProvider } from '../../components/context/MenuContext';
import { CardsProductos } from '../../components/Dashboard/CardsProductos';
import Header from '../../components/Header';
import { useModeTheme } from '../../components/theme/toogleTheme';

const Inicio = () => {
  const { theme } = useModeTheme();
  return (
    <div className="flex flex-col">
      <MenuProvider>
        <Header />

        <div className="mt-16 sm:mt-0 overflow-auto h-screen primary-theme">
          <CardsProductos />
        </div>
        <Toaster
        visibleToasts={8}
        closeButton
        expand
        position="bottom-right"
        theme={theme}
      />
      </MenuProvider>
    </div>
  );
};

export default Inicio;
