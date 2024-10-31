import { createContext, useState } from 'react';

export const MenuContext = createContext();

// eslint-disable-next-line react/prop-types
export const MenuProvider = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [openSubmenu, setOpenSubmenu] = useState({
    productos: null,
    ajustes: null,
  });

  return (
    <MenuContext.Provider
      value={{
        isExpanded,
        setIsExpanded,
        isMobileOpen,
        setIsMobileOpen,
        openMenu,
        setOpenMenu,
        openSubmenu,
        setOpenSubmenu,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};
