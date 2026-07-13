import { CalendarIcon } from "@phosphor-icons/react";
import { useContext } from "react";
import { ClientContext } from "../../../contexts/Contexts";

export function HeaderFinanceiro() {
  const context = useContext(ClientContext);

  if (!context) {
    throw new Error("Formulario deve ser usado dentro de um ClientProvider");
  }

  const { tatuadorSelected, setTatuadorSelected, week, setWeek } = context;

  function handleSubmitFinancial(e: React.FormEvent) {
    e.preventDefault();
  }

  return (
    <div className="mb-8 w-full flex items-end justify-between ">
      <div>
        <h1 className="text-4xl font-black text-zinc-800">Financeiro</h1>
        <p className="text-base-label text-xs mt-1">
          Consulte todo o financeiro do seu estudio de tatuagem
        </p>
      </div>
      <form onSubmit={handleSubmitFinancial} className="flex gap-2">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-base-label">
            <CalendarIcon size={18} />
          </span>
          <select
            defaultValue=""
            className=" bg-base-input border border-base-border text-base-subtitle rounded-lg pl-10 pr-8 py-2 text-sm focus:outline-none focus:border-base-gold/50 transition-colors duration-200 appearance-none cursor-pointer"
            onChange={(e) => setTatuadorSelected(e.target.value)}
            value={tatuadorSelected}
          >
            <option value="" disabled hidden>
              Tatuador
            </option>
            <option value="Gugo" className="bg-base-card text-base-subtitle">
              Gugo
            </option>
            <option value="Eddy" className="bg-base-card text-base-subtitle">
              Eddy
            </option>
            <option value="Shira" className="bg-base-card text-base-subtitle">
              Shira
            </option>
            <option value="Gih" className="bg-base-card text-base-subtitle">
              Gih
            </option>
            <option value="Eryck" className="bg-base-card text-base-subtitle">
              Eryck
            </option>
            <option value="todos" className="bg-base-card text-base-subtitle">
              Todos Tatuadores
            </option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-base-label">
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-base-label">
            <CalendarIcon size={18} />
          </span>
          <select
            defaultValue=""
            className=" bg-base-input border border-base-border text-base-subtitle rounded-lg pl-10 pr-8 py-2 text-sm focus:outline-none focus:border-base-gold/50 transition-colors duration-200 appearance-none cursor-pointer"
            onChange={(e) => setWeek(e.target.value)}
            value={week}
          >
            <option value="" disabled hidden>
              Semana
            </option>
            <option value="hoje" className="bg-base-card text-base-subtitle">
              Hoje
            </option>
            <option value="semana" className="bg-base-card text-base-subtitle">
              Esta Semana
            </option>
            <option value="mes" className="bg-base-card text-base-subtitle">
              Este Mês
            </option>
            <option value="3meses" className="bg-base-card text-base-subtitle">
              Últimos 3 meses
            </option>
            <option
              value="anoAtual"
              className="bg-base-card text-base-subtitle"
            >
              Ano Atual
            </option>
            <option value="todos" className="bg-base-card text-base-subtitle">
              Todo o Histórico
            </option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-base-label">
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </form>
    </div>
  );
}
