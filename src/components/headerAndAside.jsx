import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FaHome, FaBoxOpen, FaCogs, FaSignOutAlt, FaPaintBrush } from "react-icons/fa";
import { MdOutlineShoppingCart, MdCategory, MdOutlineDarkMode, MdOutlineLightMode, MdMenu, MdMenuOpen } from "react-icons/md";
import { useModeTheme } from "./theme/toogleTheme";

const styleAside = "btn btn-link text-theme w-full justify-start border-0 border-b-2 no-underline hover:no-underline text-theme-hover bg-theme-secondary gap-1";

const styleBtnExpand = "btn btn-outline text-theme h-12 flex primary-theme";

const colorIcon = "primary-theme";

const SimpleMenuItem = ({ title, icon, isExpanded }) => (
  <button className={styleAside}>
    {icon}
    {isExpanded && <span className="ml-2">{title}</span>}
  </button>
);

SimpleMenuItem.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
  isExpanded: PropTypes.bool.isRequired,
};

const MenuItem = ({ title, icon, isOpen, handleClick, children, isExpanded }) => (
  <div className="flex flex-col gap-3">
    <button className={styleAside} onClick={handleClick} aria-expanded={isOpen}>
      {icon}
      {isExpanded && <span className="ml-2">{title}</span>}
      {children && <span className={colorIcon +" ml-2"}>{isOpen ? "▲" : "▼"}</span>}
    </button>
    {children && (
      <div className={`ml-6 space-y-2 transition-all duration-300 ${isOpen ? "block" : "hidden"}`}>
        {children}
      </div>
    )}
  </div>
);

MenuItem.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
  children: PropTypes.node,
  isExpanded: PropTypes.bool.isRequired,
};

const SubMenuItem = ({ title, icon, isOpen, handleClick, children }) => (
  <div className="flex flex-col gap-3">
    <button className={styleAside} onClick={handleClick}>
      {icon}
      <span  className="ml-2">{title}</span>
      <span className={colorIcon +" ml-2"}>{isOpen ? "▲" : "▼"}</span>
    </button>
    <div className={`ml-6 space-y-2 transition-all duration-300 ${isOpen ? "block" : "hidden"}`}>
      {children}
    </div>
  </div>
);

SubMenuItem.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export const HeaderAndAside = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [openSubmenu, setOpenSubmenu] = useState({ productos: null, ajustes: null });

  const { setDarkTheme, setLightTheme } = useModeTheme();
  // El toggle funciona, esta por si después se  necesita en lugar de ambos modos


  const toggleExpand = () => {
    setIsExpanded((prev) => {
      if (!prev) {
        setOpenMenu(null);
        setOpenSubmenu({ productos: null, ajustes: null });
      }
      return !prev;
    });
  };

  const toggleMobileMenu = () => {
    setIsMobileOpen((prev) => !prev);
  };

  const handleMenuClick = (menu) => {
    if (!isExpanded) {
      setIsExpanded(true);
    }
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const handleSubmenuClick = (menu, submenu) => {
    if (!isExpanded) {
      setIsExpanded(true);
    }

    setOpenSubmenu((prevState) => ({
      ...prevState,
      [menu]: prevState[menu] === submenu ? null : submenu,
    }));
  };

  useEffect(() => {
    if (!isExpanded) {
      setOpenMenu(null);
      setOpenSubmenu({ productos: null, ajustes: null });
    }
  }, [isExpanded]);

  return (
    <div>
      <div className="navbar fixed bg-base-100 bg-theme-secondary text-theme z-50">
        <div className="flex-1">
          <button
            className={`${styleBtnExpand} hidden sm:block ${isExpanded ? "w-40" : "w-20"}`}
            onClick={toggleExpand}
          >
              <span className="flex justify-center h-full items-center text-xl">{isExpanded ? <MdMenuOpen /> : <MdMenu />}</span>
          </button>

          <button
            className={`${styleBtnExpand} w-20 sm:hidden`}
            onClick={toggleMobileMenu}
          >
            <span className="flex justify-center h-full items-center text-xl">{isMobileOpen ? <MdMenuOpen /> : <MdMenu />}</span>
          </button>
        </div>
        <div className="flex-1 justify-center">
          <a className="text-[2rem] text-center primary-theme primary-theme-hover cursor-pointer hover:border-b-2 rounded-md">TheFullStock</a>
        </div>
        <div className="flex-1 justify-end">
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
              <div className="indicator">
                <MdOutlineShoppingCart className={colorIcon+" h-5 w-5 fill-tran"}/>
                <span className="badge badge-sm indicator-item secondary-theme">
                  2
                </span>
              </div>
            </div>
            <div
              tabIndex={0}
              className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow">
              <div className="card-body rounded-xl border primary-theme shadow-sm shadow-white">
                <span className="text-lg font-bold text-center primary-theme border-b-2">8 Productos</span>
                <div className="card-body flex flex-row">
                  <span className="text-theme font-bold flex-1">Subtotal: </span>
                  <span className="secondary-theme flex-1">$999</span>
                </div>
                <div className="card-actions">
                  <button className="btn primary-theme btn-block">View cart</button>
                </div>
              </div>
            </div>
          </div>
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Perfil"
                  src="https://picsum.photos/200" />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow-sm shadow-white border primary-theme">
              <li>
                <a className="justify-between secondary-theme  secondary-theme-hover">
                  Perfil
                  <span className="badge primary-theme">New</span>
                </a>
              </li>
              <li><a className="secondary-theme secondary-theme-hover">Ajustes</a></li>
              <li><a className="error-theme error-theme-hover">Cerrar Sección</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex">
        <aside
          className={`
            fixed top-0 left-0 z-10 mt-[4rem] h-screen p-4 bg-theme     primary-theme border-r-2 transition-all duration-300 
            ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} 
            sm:translate-x-0 sm:${isExpanded ? "w-52" : "w-20"}
            ${isExpanded ? "max-w-60" : "max-w-28"}

          `}
        >

          <nav  className="flex flex-col gap-3">
            <SimpleMenuItem
              title="Inicio"
              icon={<FaHome className={colorIcon}/>}
              isExpanded={isExpanded}
            />

            <MenuItem
              title="Productos"
              icon={<FaBoxOpen className={colorIcon}/>}
              isOpen={openMenu === "productos"}
              isExpanded={isExpanded}
              handleClick={() => handleMenuClick("productos")}
            >
              <SubMenuItem
                title="Categorías"
                icon={<MdCategory className={colorIcon}/>}
                isOpen={openSubmenu.productos === "categorias"}
                handleClick={() => handleSubmenuClick("productos", "categorias")}
                >
                <button className={styleAside}>Tecnología</button>
                <button className={styleAside}>Hogar</button>
              </SubMenuItem>
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
                handleClick={() => handleSubmenuClick('ajustes', 'personalizations')}
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
              icon={<FaSignOutAlt className={colorIcon}/>}
              isExpanded={isExpanded}
            />
          </nav>
        </aside>
      </div>
    </div>
  );
};