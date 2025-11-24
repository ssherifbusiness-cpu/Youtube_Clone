import { useRef, useEffect, useState } from "react"
import type { ReactNode } from 'react';

interface NavItemProps {
  icon?: string
  children?: ReactNode
  title?: string
  additionalClasses?: string
}

export const NavItem: React.FC<NavItemProps> = ({ additionalClasses, title, icon, children }) => {
  const [open, setOpen] = useState(false);
  let menuRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handler = (e: Event) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handler)
    return () => {
      document.removeEventListener("mousedown", handler)
    }
  }, [])
  return (
    <div>
      <button className={`${additionalClasses} overflow-hidden flex rounded-full items-center justify-center hover:bg-stone-100 border h-5`} onClick={() => setOpen(!open)}>
        <img className="w-5 h-5" src={`${icon}`} />
        <span className='flex justify-center items-center text-xs'>{title}</span>
      </button>

      {open && children}
    </div>
  );
}

interface DropdownItemProps {
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  title: string
  link?: string
}
export const DropdownItem: React.FC<DropdownItemProps> = ({ link, leftIcon, rightIcon, title }) => {
  return (
    <a href={link} className='w-full flex px-5 py-2 w-full text-start hover:bg-stone-100'>
      <span className='w-full flex'>
        <span>{leftIcon}</span>
        <span>{title}</span>
        <span>{rightIcon}</span>
      </span>
    </a>
  );
};
interface DropdownMenuProps {
  children?: React.ReactNode
  additionalClasses?: string
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({ additionalClasses, children }) => {
  return (
    <div className={`${additionalClasses} whitespace-nowrap rounded-xl fixed flex flex-col bg-white drop-shadow-sm`}>
      {children}
    </div>
  )
}
