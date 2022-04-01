import React from "react";

export type SideMenuStore = {
  state: boolean;
  close: () => void;
  open: () => void;
};

const SideMenuContext = React.createContext<SideMenuStore>({
  state: false,
  open: () => {},
  close: () => {},
});

// @ts-ignore
export const SideMenuProvider: React.FC = ({ children }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <SideMenuContext.Provider
      value={{
        state: isOpen,
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
      }}
    >
      {children}
    </SideMenuContext.Provider>
  );
};

export const useSideMenuContext = () => React.useContext(SideMenuContext);
