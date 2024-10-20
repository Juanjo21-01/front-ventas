import { Outlet } from 'react-router-dom';
import Aside from '../components/Aside';
import Header from '../components/Header';
import { MenuContext, MenuProvider } from '../components/context/MenuContext';
import { useContext } from 'react';

const Layout = () => {
  return (
    <MenuProvider>
      <LayoutContent />
    </MenuProvider>
  );
};

const LayoutContent = () => {
  const { isExpanded, isMobileOpen } = useContext(MenuContext);

  return (
    <div
      className={`grid grid-cols-none sm:grid-cols-[auto_1fr] ${
        isMobileOpen ? 'grid-cols-[auto_1fr]' : 'grid-cols-[0_1fr]'
      } ${isExpanded ? 'grid-cols-[auto_1fr]' : 'grid-cols-[auto_1fr]'}`}
    >

      <Aside />

      <div className="flex flex-col">
        <Header />

        <div className="mt-16 sm:mt-0 pb-20 overflow-auto h-screen w-screen primary-theme">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;