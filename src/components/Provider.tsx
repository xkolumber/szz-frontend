import { createContext, ReactNode, useContext, useState } from "react";

interface NavbarContextType {
  navbarZIndex: number;
  setNavbarZIndex: (zIndex: number) => void;
}

const NavbarContext = createContext<NavbarContextType | undefined>(undefined);

export const NavbarProvider = ({ children }: { children: ReactNode }) => {
  const [navbarZIndex, setNavbarZIndex] = useState(400);

  return (
    <NavbarContext.Provider value={{ navbarZIndex, setNavbarZIndex }}>
      {children}
    </NavbarContext.Provider>
  );
};

export const useNavbar = () => {
  const context = useContext(NavbarContext);

  if (!context) {
    throw new Error("useNavbar must be used within a NavbarProvider");
  }

  return context;
};
