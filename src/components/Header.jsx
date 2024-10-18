import { useContext } from 'react';
import { MenuContext } from './context/MenuContext';
import { MdMenu, MdMenuOpen } from 'react-icons/md';
import { NavLink } from 'react-router-dom';

const styleBtnExpand = 'flex btn btn-outline text-theme h-12 primary-theme';

const Header = () => {
  const { isMobileOpen,setIsExpanded, setIsMobileOpen } = useContext(MenuContext);
  
  const toggleMobileMenu = () => {
    setIsMobileOpen((prev) => !prev);
    setIsExpanded(true);
  };

  return (
    <header className="navbar fixed sm:sticky bg-base-100 bg-theme-secondary text-theme z-20">
      <div className="flex-1">
        <button
          className={`${styleBtnExpand} w-20 sm:hidden`}
          onClick={toggleMobileMenu}
        >
          <span className="flex justify-center h-full items-center text-xl">
            {isMobileOpen ? <MdMenuOpen /> : <MdMenu />}
          </span>
        </button>
      </div>
      <div className="flex-1 justify-center">
        <a className="text-[2rem] text-center primary-theme primary-theme-hover cursor-pointer hover:border-b-2 rounded-md">
          TheFullStock
        </a>
      </div>
      <div className="flex-1 justify-end">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img alt="Perfil" src="https://picsum.photos/200" />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow-sm shadow-white border primary-theme"
          >
            <li>
              <a className="justify-between secondary-theme  secondary-theme-hover">
                Perfil
                <span className="badge primary-theme">New</span>
              </a>
            </li>
            <li>
              <NavLink  to="/login">
                <a className="error-theme error-theme-hover">Cerrar Sección</a>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
