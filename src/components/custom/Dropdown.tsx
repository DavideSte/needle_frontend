import { useOutsideClick } from "@/hooks/use-outside-click";
import { createContext, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Typography } from "../ui/typography";

interface DropdownContextProps {
  isOpen: boolean;
  toggleDropdown: () => void;
}

const DropdownContext = createContext<DropdownContextProps | undefined>(undefined);

interface DropdownProps {
  children: React.ReactNode;
}

export function Dropdown({ children }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const ref = useOutsideClick(() => setIsOpen(false));

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <DropdownContext.Provider value={{ isOpen, toggleDropdown }}>
      <div ref={ref} className="relative">
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

interface DropdownToggleProps {
  children: React.ReactNode;
  variant?: string;
  id?: string;
}

export const DropdownToggle: React.FC<DropdownToggleProps> = ({ children, variant = "", id }) => {
  const context = useContext(DropdownContext);

  if (!context) {
    throw new Error("DropdownToggle must be used within a Dropdown");
  }

  return (
    <div className="flex items-center">
      <button id={id} className={` ${variant}`} onClick={context.toggleDropdown}>
        {children}
      </button>
    </div>
  );
};

interface DropdownMenuProps {
  children: React.ReactNode;
}

export const DropdownMenu = ({ children }: DropdownMenuProps) => {
  const context = useContext(DropdownContext);

  if (!context) {
    throw new Error("DropdownMenu must be used within a Dropdown");
  }

  return context.isOpen ? (
    <div className="absolute z-50 shadow-lg  right-0 mt-2 border border-cream/20 w-full bg-darkred rounded-md min-w-fit max-w-60 overflow-hidden flex flex-col p-1">
      {children}
    </div>
  ) : null;
};

// Dropdown Item Component
interface DropdownItemProps {
  children: React.ReactNode;
  href: string;
  variant?: string;
  icon: JSX.Element;
}

export const DropdownItem = ({ children, href, variant = "", icon }: DropdownItemProps) => {
  return (
    <Link
      to={href}
      className={`pl-4 px-8 py-2 cursor-pointer hover:bg-custom-red/30 rounded-sm text-cream duration-200 whitespace-nowrap flex gap-3 items-center ${variant}`}
    >
      <div className="text-lg">{icon}</div>
      <Typography variant="small">{children}</Typography>
    </Link>
  );
};

export const DropdownSeparator = () => {
  return <hr className="border-cream/40 border my-[5px] mx-3 rounded-full " />;
};

// Attach subcomponents to the main Dropdown component
Dropdown.Toggle = DropdownToggle;
Dropdown.Menu = DropdownMenu;
Dropdown.Item = DropdownItem;
Dropdown.Separator = DropdownSeparator;

export default Dropdown;
