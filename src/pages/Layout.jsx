import { Outlet } from 'react-router-dom';
import Aside from '../components/Aside';
import Header from '../components/Header';

const Layout = () => {
  return (
    <div className="flex h-screen">
      <Aside />

      <hr className=" border border-3 border-primary opacity-50" />

      <div className="container mx-auto">
        <Header />

        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
