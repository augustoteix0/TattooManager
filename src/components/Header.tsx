import { NavLink } from 'react-router-dom';
import { GaugeIcon, CalendarBlankIcon, NotePencilIcon, ListIcon, XIcon } from '@phosphor-icons/react';
import { useState } from 'react';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { to: "/", icon: GaugeIcon, label: "Dashboard" },
    { to: "/agenda", icon: CalendarBlankIcon, label: "Agenda" },
    { to: "/formulario", icon: NotePencilIcon, label: "Formulário" },
  ];

  return (
    <>
      <button 
        className="md:hidden fixed top-4 left-4 z-50 text-base-text"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <XIcon size={24} /> : <ListIcon size={24} />}
      </button>

      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden" 
          onClick={() => setIsOpen(false)}
        />
      )}

      <div className={`
        fixed top-0 left-0 h-screen w-64 bg-base-sidebar p-4 flex flex-col gap-2 select-none border-r border-base-border z-50
        transition-transform duration-300 ease-in-out md:translate-x-0 md:static
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <h1 className='text-xl font-bold text-base-title pb-10 mt-10 md:mt-0'>TattoManager</h1>

        {navLinks.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => `
              flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 w-full
              ${isActive ? 'bg-base-card text-base-title' : 'bg-transparent text-base-text hover:text-base-title'}
            `}
            onClick={() => setIsOpen(false)}
          >
            {({ isActive }) => (
              <>
                <Icon size={22} weight={isActive ? 'fill' : 'regular'} />
                <span>{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </>
  );
}