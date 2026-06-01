import { CalendarIcon, MagnifyingGlassIcon, UserIcon } from "@phosphor-icons/react";

export function PesquisaAgenda() {
  return (
    <div>
      <h1 className="text-4xl font-black text-zinc-800">Agenda</h1>
      <form className="grid grid-cols-3 pt-10 gap-x-3">

        <div className="relative w-full sm:flex-1 ">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-base-label">
            <MagnifyingGlassIcon size={20} />
          </span>
          <input
            type="text"
            placeholder="Pesquisar Cliente..."
            className="w-full bg-base-input border border-base-border text-base-title placeholder-base-label rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-base-gold/50 transition-colors duration-200"
          />
        </div>

        <div className="relative w-full">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-base-label">
          <UserIcon size={18} />
        </span>
        <select
          defaultValue=""
          className="w-full bg-base-input border border-base-border text-base-subtitle rounded-lg pl-10 pr-8 py-2 text-sm focus:outline-none focus:border-base-gold/50 transition-colors duration-200 appearance-none cursor-pointer"
        >
          <option value="" disabled hidden>Tatuador</option>
          <option value="todos" className="bg-base-card text-base-subtitle">Todos os Profissionais</option>
          <option value="seu-pai" className="bg-base-card text-base-subtitle">Gugo</option>
          <option value="carlos" className="bg-base-card text-base-subtitle">Eddy</option>
          <option value="carlos" className="bg-base-card text-base-subtitle">Gih</option>
          <option value="carlos" className="bg-base-card text-base-subtitle">Shira</option>
          <option value="carlos" className="bg-base-card text-base-subtitle">Eryck</option>
        </select>
        
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-base-label">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      <div className="relative w-full">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-base-label">
          <CalendarIcon size={18} />
        </span>
        <select
          defaultValue=""
          className="w-full bg-base-input border border-base-border text-base-subtitle rounded-lg pl-10 pr-8 py-2 text-sm focus:outline-none focus:border-base-gold/50 transition-colors duration-200 appearance-none cursor-pointer"
        >
          <option value="" disabled hidden>Semana</option>
          <option value="hoje" className="bg-base-card text-base-subtitle">Hoje</option>
          <option value="semana" className="bg-base-card text-base-subtitle">Esta Semana</option>
          <option value="mes" className="bg-base-card text-base-subtitle">Este Mês</option>
          <option value="todos" className="bg-base-card text-base-subtitle">Todo o Histórico</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-base-label">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      </form>
    </div>
  );
}
