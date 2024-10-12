import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  FaHome,
  FaBoxOpen,
  FaCogs,
  FaSignOutAlt,
  FaPaintBrush,
} from 'react-icons/fa';
import { useModeTheme } from './theme/toogleTheme';
import { NavLink } from 'react-router-dom';
const colorIcon = 'primary-theme';

import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md';
const styleAside =
  'btn btn-link text-theme w-full justify-start border-0 border-b-2 no-underline hover:no-underline text-theme-hover bg-theme-secondary gap-1';

const SimpleMenuItem = ({ title, icon, isExpanded }) => (
  <button className={styleAside}>
    {icon}
    {isExpanded && <span className="ml-2">{title}</span>}
  </button>
);

const handleMenuClick = (menu) => {
  if (!isExpanded) {
    setIsExpanded(true);
  }
  setOpenMenu(openMenu === menu ? null : menu);
};
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
        className={`ml-6 space-y-2 transition-all duration-300 ${
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
      className={`ml-6 space-y-2 transition-all duration-300 ${
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
  // Variables de estado
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [openSubmenu, setOpenSubmenu] = useState({
    productos: null,
    ajustes: null,
  });

  const { setDarkTheme, setLightTheme } = useModeTheme();
  // El toggle funciona, esta por si después se  necesita en lugar de ambos modos
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
    

  return (
    <aside
      className={` mt-16 p-4 bg-theme primary-theme border-r-2 transition-all duration-300 ${
        isMobileOpen ? 'translate-x-0' : '-translate-x-full'
      } sm:translate-x-0 sm:${isExpanded ? 'w-52' : 'w-20'} ${
        isExpanded ? 'max-w-60' : 'max-w-28'
      }`}
    >
      <nav className="flex flex-col gap-3">
        <NavLink to="/dashboard">
          <SimpleMenuItem
            title="Inicio"
            icon={<FaHome className={colorIcon} />}
            isExpanded={isExpanded}
          />
        </NavLink>

        <NavLink to="/productos">
          <SimpleMenuItem
            title="Productos"
            icon={<FaHome className={colorIcon} />}
            isExpanded={isExpanded}
          />
        </NavLink>

        <NavLink to="/tipo-productos">
          <SimpleMenuItem
            title="Categoria de Productos   "
            icon={<FaHome className={colorIcon} />}
            isExpanded={isExpanded}
          />
        </NavLink>

        <MenuItem
          title="Productos"
          icon={<FaBoxOpen className={colorIcon} />}
          isOpen={openMenu === 'productos'}
          isExpanded={isExpanded}
          handleClick={() => handleMenuClick('productos')}
        >
          <NavLink to="/productos">
            <SimpleMenuItem
              title="Productos"
              icon={<FaHome className={colorIcon} />}
              isExpanded={isExpanded}
            />
          </NavLink>

          <NavLink to="/tipo-productos">
            <SimpleMenuItem
              title="Categorias de Productos"
              icon={<FaHome className={colorIcon} />}
              isExpanded={isExpanded}
            />
          </NavLink>
        </MenuItem>

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
              <MdOutlineDarkMode className={colorIcon + ' text-xl'} />
              <span className="ml-2">Modo Oscuro</span>
            </button>

            <button className={styleAside} onClick={setLightTheme}>
              <MdOutlineLightMode className={colorIcon + ' text-xl'} />
              <span className="ml-2">Modo Claro</span>
            </button>
          </SubMenuItem>
        </MenuItem>

        <SimpleMenuItem
          title="Cerrar Sesión"
          icon={<FaSignOutAlt className={colorIcon} />}
          isExpanded={isExpanded}
        />
      </nav>
    </aside>
  );
};

export default Aside;
