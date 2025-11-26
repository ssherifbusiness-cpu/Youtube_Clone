import { useState } from "react"
import type { ReactNode } from 'react';

interface NavItemProps {
  icon?: string
  children?: ReactNode
  title?: string
}

export const NavItem: React.FC<NavItemProps> = ({ title, icon, children }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button className={`overflow-hidden flex rounded-full items-center justify-center hover:bg-stone-100 border h-5`}
        onClick={() => setOpen(!open)}>
        <img className="w-5 h-5" src={`${icon}`} />
        <span className='flex justify-center items-center text-xs'>{title}</span>
      </button>

      {open && (
        <div className={`absolute right-1 top-8 whitespace-nowrap rounded-xl flex flex-col bg-white drop-shadow-sm`}
          onClick={() => setOpen(false)}>
          {children}
        </div>
      )}
    </div >
  );
}

interface DropdownItemProps {
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  title: string
  link?: string
  onClick?: () => void;
}
export const DropdownItem: React.FC<DropdownItemProps> = ({ onClick, link, leftIcon, rightIcon, title }) => {
  return (
    <a onClick={onClick} href={link} className='px-5 py-2 text-start hover:bg-stone-100'>
      <span className='w-[100%]flex'>
        <span>{leftIcon}</span>
        <span>{title}</span>
        <span>{rightIcon}</span>
      </span>
    </a>
  );
};
interface DropdownMenuProps {
  children?: React.ReactNode
}


