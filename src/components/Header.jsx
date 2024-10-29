import { useContext } from 'react';
import { MenuContext } from './context/MenuContext';
import { MdArrowRight, MdLogin, MdMenu, MdMenuOpen } from 'react-icons/md';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth';
import { FaUser, FaUserPlus } from 'react-icons/fa';

const styleBtnExpand = 'flex btn btn-outline text-theme h-12 primary-theme';

const Header = () => {
  const { isMobileOpen, setIsExpanded, setIsMobileOpen } =
    useContext(MenuContext);

  const logged = useAuthStore((state) => state.logged);
  const salir = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const { id } = useAuthStore().profile;

  const cerrarSesion = () => {
    salir();
    navigate('/');
  };

  const toggleMobileMenu = () => {
    setIsMobileOpen((prev) => !prev);
    setIsExpanded(true);
  };

  return (
    <header className="navbar fixed sm:sticky bg-base-100 bg-theme-secondary text-theme z-20">
      {logged && (
        <>
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
            <NavLink
              to="/"
              className="text-[2rem] text-center primary-theme primary-theme-hover cursor-pointer"
            >
              TheFullStock
            </NavLink>
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
                className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow-sm shadow-white border primary-theme flex gap-2"
              >
                <li>
                  <NavLink to={`/usuarios/${id}`} className="justify-between secondary-theme secondary-theme-hover">
                    <span>Perfil</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink onClick={cerrarSesion} to="/">
                    <span className="error-theme error-theme-hover">
                      Cerrar Sección
                    </span>
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </>
      )}
      {!logged && (
        <>
          <div className="flex-[2] justify-start sm:ml-16 ml-6">
            <NavLink
              to="/"
              className="text-[2rem] text-center primary-theme primary-theme-hover cursor-pointer"
            >
              TheFullStock
            </NavLink>
          </div>

          <div className="flex-1 justify-end sm:mr-16 mr-6">
            <div className="dropdown dropdown-end flex items-center justify-end gap-1">
              <span className="md:flex hidden items-center justify-end gap-1 cursor-default">
                Perfil
                <MdArrowRight className="primary-theme text-[2rem]" />
              </span>
              <div
                tabIndex={0}
                role="button"
                className={`${styleBtnExpand} w-20`}
              >
                <span className="flex justify-center h-full items-center text-xl">
                  <FaUser />
                </span>
              </div>
              <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-44 top-16 p-2 shadow-sm shadow-white border primary-theme">
                <li className="flex w-full">
                  <NavLink
                    className="flex w-full primary-theme primary-theme-hover"
                    to="/login"
                  >
                    <span className="flex-1">Iniciar Sesión</span>
                    <span className="flex flex-1 justify-end items-center text-xl">
                      <MdLogin />
                    </span>
                  </NavLink>
                </li>
                <li className="flex w-full">
                  <NavLink
                    className="flex w-full primary-theme primary-theme-hover"
                    to="/registrarse"
                  >
                    <span className="flex-1">Registrarse</span>
                    <span className="flex flex-1 justify-end items-center text-xl">
                      <FaUserPlus />
                    </span>
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
