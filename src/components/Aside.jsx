import { useContext, useEffect, useState } from 'react';
import { MenuContext } from './context/MenuContext';
import {
  MdAdminPanelSettings,
  MdCategory,
  MdMenu,
  MdMenuOpen,
} from 'react-icons/md';

import PropTypes from 'prop-types';
import {
  FaHome,
  FaBoxOpen,
  FaCogs,
  FaSignOutAlt,
  FaPaintBrush,
  FaShoppingCart,
  FaUser,
  FaCashRegister,
  FaMoneyBill,
} from 'react-icons/fa';
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md';
import { useModeTheme } from './theme/toogleTheme';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import { FaBoxesStacked } from 'react-icons/fa6';
import { useAuthStore } from '../store/auth';

const colorIcon = 'primary-theme text-[1.15rem]';
const styleAside =
  'btn btn-link text-theme w-full justify-start border-0 border-b-2 no-underline hover:no-underline primary-theme-hover bg-theme-secondary';

const SimpleMenuItem = ({ title, icon, isExpanded }) => (
  <div className="flex flex-col gap-3">
    <button className={styleAside}>
      {icon}
      {isExpanded && <span className="ml-2">{title}</span>}
    </button>
  </div>
);

const MenuItem = ({
  title,
  icon,
  isOpen,
  handleClick,
  children,
  isExpanded,
}) => (
  <div className="flex flex-col gap-3">
    <button className={styleAside} onClick={handleClick} aria-expanded={isOpen}>
      {icon}
      {isExpanded && <span className="ml-2">{title}</span>}
      {children && (
        <span className={colorIcon + ' ml-2'}>{isOpen ? '▲' : '▼'}</span>
      )}
    </button>
    {children && (
      <div
        className={`ml-6 space-y-2 transition-all duration-300 gap-96 ${
          isOpen ? 'block' : 'hidden'
        }`}
      >
        {children}
      </div>
    )}
  </div>
);

const SubMenuItem = ({ title, icon, isOpen, handleClick, children }) => (
  <div className="flex flex-col gap-3">
    <button className={styleAside} onClick={handleClick}>
      {icon}
      <span className="ml-2">{title}</span>
      <span className={colorIcon + ' ml-2'}>{isOpen ? '▲' : '▼'}</span>
    </button>
    <div
      className={`ml-6 space-y-2 transition-all duration-300 flex flex-col ${
        isOpen ? 'block' : 'hidden'
      }`}
    >
      {children}
    </div>
  </div>
);

SimpleMenuItem.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
  isExpanded: PropTypes.bool.isRequired,
};

MenuItem.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
  children: PropTypes.node,
  isExpanded: PropTypes.bool.isRequired,
};

SubMenuItem.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
  children: PropTypes.node,
};
const Aside = () => {
  const styleBtnExpand =
    'btn btn-outline text-theme h-12 flex primary-theme w-full';
  const { setDarkTheme, setLightTheme } = useModeTheme();
  const { isExpanded, setIsExpanded, isMobileOpen } = useContext(MenuContext);
  const [openMenu, setOpenMenu] = useState(null);
  const [openSubmenu, setOpenSubmenu] = useState({
    productos: null,
    ajustes: null,
  });

  // Validacion de rol
  const { rolId } = useAuthStore().profile;
  const salir = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  let admin = true;
  if (rolId === 3) admin = false;

  const cerrarSesion = () => {
    salir();
    navigate('/');
  };

  const handleMenuClick = (menu) => {
    if (!isExpanded) {
      setIsExpanded(true);
    }

    setOpenMenu((prevMenu) => (prevMenu === menu ? null : menu));
  };

  useEffect(() => {
    if (!isExpanded) {
      setOpenMenu(null);
      setOpenSubmenu({ productos: null, ajustes: null });
    }
  }, [isExpanded]);

  const handleSubmenuClick = (menu, submenu) => {
    if (!isExpanded) {
      setIsExpanded(true);
    }

    setOpenSubmenu((prevState) => ({
      ...prevState,
      [menu]: prevState[menu] === submenu ? null : submenu,
    }));
  };

  const toggleExpand = () => {
    setIsExpanded((prev) => {
      if (!prev) {
        setOpenMenu(null);
        setOpenSubmenu({ productos: null, ajustes: null });
      }
      return !prev;
    });
  };

  return (
    <aside
      className={`sm:sticky transition-all duration-300 top-0 h-screen p-4 bg-theme primary-theme border-r-2 w-auto min-w-[50%] overflow-y-auto ${
        isMobileOpen
          ? 'fixed z-10 translate-x-0'
          : 'fixed z-10 -translate-x-full'
      } sm:translate-x-0 sm:${isExpanded ? 'w-52' : 'w-20'} ${
        isExpanded ? 'max-w-80' : 'max-w-36'
      }`}
    >
      <nav className="flex flex-col gap-3">
        <button
          className={`${styleBtnExpand} sm:block ${
            isExpanded ? 'w-40' : 'w-20'
          }`}
          onClick={toggleExpand}
        >
          <span className="flex justify-center h-full items-center text-xl">
            {isExpanded ? <MdMenuOpen /> : <MdMenu />}
          </span>
        </button>

        <NavLink to="/">
          <SimpleMenuItem
            title="Inicio"
            icon={<FaHome className={colorIcon} />}
            isExpanded={isExpanded}
          />
        </NavLink>

        {admin && (
          <>
            <NavLink to="/roles">
              <SimpleMenuItem
                title="Roles"
                icon={<MdAdminPanelSettings className={colorIcon} />}
                isExpanded={isExpanded}
              />
            </NavLink>

            <NavLink to="usuarios">
              <SimpleMenuItem
                title="Usuarios"
                icon={<FaUser className={colorIcon} />}
                isExpanded={isExpanded}
              />
            </NavLink>
            <NavLink to="proveedores">
              <SimpleMenuItem
                title="Proveedores"
                icon={<FaUser className={colorIcon} />}
                isExpanded={isExpanded}
              />
            </NavLink>
            <MenuItem
              title="Productos"
              icon={<FaBoxesStacked className={colorIcon} />}
              isOpen={openMenu === 'productos'}
              isExpanded={isExpanded}
              handleClick={() => handleMenuClick('productos')}
            >
              <NavLink to="/tipo-productos">
                <SimpleMenuItem
                  title="Categorías"
                  icon={<MdCategory className={colorIcon} />}
                  isExpanded={isExpanded}
                />
              </NavLink>
              <NavLink to="/productos">
                <SimpleMenuItem
                  title="Inventario"
                  icon={<FaBoxOpen className={colorIcon} />}
                  isExpanded={isExpanded}
                />
              </NavLink>
            </MenuItem>
            <MenuItem
              title="Compras"
              icon={<FaCashRegister className={colorIcon} />}
              isOpen={openMenu === 'compras'}
              isExpanded={isExpanded}
              handleClick={() => handleMenuClick('compras')}
            >
              <NavLink to="/compras">
                <SimpleMenuItem
                  title="Compras"
                  icon={<FaMoneyBill className={colorIcon} />}
                  isExpanded={isExpanded}
                />
              </NavLink>
              <NavLink to="/compras/crear">
                <SimpleMenuItem
                  title="Crear Compra"
                  icon={<FaShoppingCart className={colorIcon} />}
                  isExpanded={isExpanded}
                />
              </NavLink>
            </MenuItem>

            <MenuItem
              title="Ventas"
              icon={<FaCashRegister className={colorIcon} />}
              isOpen={openMenu === 'ventas'}
              isExpanded={isExpanded}
              handleClick={() => handleMenuClick('ventas')}
            >
              <NavLink to="/ventas">
                <SimpleMenuItem
                  title="Ventas"
                  icon={<FaMoneyBill className={colorIcon} />}
                  isExpanded={isExpanded}
                />
              </NavLink>
              <NavLink to="/ventas/crear">
                <SimpleMenuItem
                  title="Crear Venta"
                  icon={<FaCashRegister className={colorIcon} />}
                  isExpanded={isExpanded}
                />
              </NavLink>
            </MenuItem>
          </>
        )}
        {!admin && (
          <>
            <MenuItem
              title="Productos"
              icon={<FaBoxesStacked className={colorIcon} />}
              isOpen={openMenu === 'productos'}
              isExpanded={isExpanded}
              handleClick={() => handleMenuClick('productos')}
            >
              <NavLink to="/productos">
                <SimpleMenuItem
                  title="Inventario"
                  icon={<FaBoxOpen className={colorIcon} />}
                  isExpanded={isExpanded}
                />
              </NavLink>
              <NavLink to="/tipo-productos">
                <SimpleMenuItem
                  title="Categorías"
                  icon={<MdCategory className={colorIcon} />}
                  isExpanded={isExpanded}
                />
              </NavLink>
            </MenuItem>
            <NavLink to="/compras">
              <SimpleMenuItem
                title="Compras"
                icon={<FaShoppingCart className={colorIcon} />}
                isExpanded={isExpanded}
              />
            </NavLink>
          </>
        )}

        <MenuItem
          title="Ajustes"
          icon={<FaCogs className={colorIcon} />}
          isOpen={openMenu === 'ajustes'}
          isExpanded={isExpanded}
          handleClick={() => handleMenuClick('ajustes')}
        >
          <SubMenuItem
            title="Personalización"
            icon={<FaPaintBrush className={colorIcon} />}
            isOpen={openSubmenu.ajustes === 'personalizations'}
            handleClick={() =>
              handleSubmenuClick('ajustes', 'personalizations')
            }
          >
            <button className={styleAside} onClick={setDarkTheme}>
              <MdOutlineDarkMode className={colorIcon} />
              <span className="ml-2">Modo Oscuro</span>
            </button>

            <button className={styleAside} onClick={setLightTheme}>
              <MdOutlineLightMode className={colorIcon} />
              <span className="ml-2">Modo Claro</span>
            </button>
          </SubMenuItem>
        </MenuItem>

        <NavLink onClick={cerrarSesion} to="/">
          <SimpleMenuItem
            title="Cerrar Sesión"
            icon={<FaSignOutAlt className={colorIcon} />}
            isExpanded={isExpanded}
          />
        </NavLink>
      </nav>
    </aside>
  );
};

export default Aside;
