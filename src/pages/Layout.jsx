import { Outlet } from 'react-router-dom';
import { HeaderAndAside } from '../components/headerAndAside';

const Layout = () => {
  return (
    <>
      {/* <HeaderAndAside /> */}
      
      <hr className=" border border-3 border-primary opacity-50" />
      <h2>Navegacion</h2>
      
      <Outlet />
    </>
  );
};

export default Layout;
