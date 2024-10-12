import { useState } from 'react';
import { MdOutlineShoppingCart, MdMenu, MdMenuOpen } from 'react-icons/md';
const colorIcon = 'primary-theme';

const styleBtnExpand = 'btn btn-outline text-theme h-12 flex primary-theme';
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

const Header = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [openSubmenu, setOpenSubmenu] = useState({
    productos: null,
    ajustes: null,
  });
  return (
    <div className="navbar sticky bg-base-100 bg-theme-secondary text-theme ">
      <div className="flex-1">
        {/* <button
          className={`${styleBtnExpand} hidden sm:block ${
            isExpanded ? 'w-40' : 'w-20'
          }`}
          onClick={toggleExpand}
        >
          <span className="flex justify-center h-full items-center text-xl">
            {isExpanded ? <MdMenuOpen /> : <MdMenu />}
          </span>
        </button> */}

        {/* <button
          className={`${styleBtnExpand} w-20 sm:hidden`}
          onClick={toggleMobileMenu}
        >
          <span className="flex justify-center h-full items-center text-xl">
            {isMobileOpen ? <MdMenuOpen /> : <MdMenu />}
          </span>
        </button> */}
      </div>
      <div className="flex-1 justify-center">
        <a className="text-[2rem] text-center primary-theme primary-theme-hover cursor-pointer hover:border-b-2 rounded-md">
          TheFullStock
        </a>
      </div>
      <div className="flex-1 justify-end">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <div className="indicator">
              <MdOutlineShoppingCart
                className={colorIcon + ' h-5 w-5 fill-tran'}
              />
              <span className="badge badge-sm indicator-item secondary-theme">
                2
              </span>
            </div>
          </div>
          <div
            tabIndex={0}
            className="card card-compact dropdown-content bg-base-100 mt-3 w-52 shadow"
          >
            <div className="card-body rounded-xl border primary-theme shadow-sm shadow-white">
              <span className="text-lg font-bold text-center primary-theme border-b-2">
                8 Productos
              </span>
              <div className="card-body flex flex-row">
                <span className="text-theme font-bold flex-1">Subtotal: </span>
                <span className="secondary-theme flex-1">$999</span>
              </div>
              <div className="card-actions">
                <button className="btn primary-theme btn-block">
                  View cart
                </button>
              </div>
            </div>
          </div>
        </div>
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
              <a className="secondary-theme secondary-theme-hover">Ajustes</a>
            </li>
            <li>
              <a className="error-theme error-theme-hover">Cerrar Sección</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
