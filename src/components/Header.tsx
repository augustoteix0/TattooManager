import { NavLink } from 'react-router-dom';
// Import correto dos componentes da Phosphor
import { GaugeIcon, CalendarBlankIcon, NotePencilIcon } from '@phosphor-icons/react';

export function Header() {
  return (
    <div className="w-64 flex-shrink-0 bg-base-sidebar h-screen p-4 flex flex-col gap-2 select-none border-r border-base-border sticky top-0">
    <h1 className='text-xl font-bold text-base-title pb-10'>TattoManager</h1>

      <NavLink
        to="/"
        className={({ isActive }) => `
          flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 w-full
          ${isActive 
            ? 'bg-base-card text-base-title' 
            : 'bg-transparent text-base-text hover:text-base-title'
          }
        `}
      >
        
        {({ isActive }) => (
          <>
            <GaugeIcon size={22} weight={isActive ? 'fill' : 'regular'} />
            <span>Dashboard</span>
          </>
        )}
      </NavLink>

      
      <NavLink
        to="/agenda"
        className={({ isActive }) => `
          flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 w-full
          ${isActive 
            ? 'bg-base-card text-base-title' 
            : 'bg-transparent text-base-text hover:text-base-title'
          }
        `}
      >
        {({ isActive }) => (
          <>
            <CalendarBlankIcon size={22} weight={isActive ? 'fill' : 'regular'} />
            <span>Agenda</span>
          </>
        )}
      </NavLink>

      {/* LINK: FORMULÁRIO */}
      <NavLink
        to="/formulario"
        className={({ isActive }) => `
          flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 w-full
          ${isActive 
            ? 'bg-base-card text-base-title' 
            : 'bg-transparent text-base-text hover:text-base-title'
          }
        `}
      >
        {({ isActive }) => (
          <>
            <NotePencilIcon size={22} weight={isActive ? 'fill' : 'regular'} />
            <span>Formulário</span>
          </>
        )}
      </NavLink>

    </div>
  );
}