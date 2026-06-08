import { useContext } from "react";
import { ClientContext } from "../../contexts/Contexts";
import { TableDashboard } from "./components/Table";

export function Dashboard() {
  const context = useContext(ClientContext);

  if (!context) {
    throw new Error("Formulario deve ser usado dentro de um ClientProvider");
  }

  const { dados } = context;


  const hoje = new Date();
  const ano = hoje.getFullYear();
  const mes = String(hoje.getMonth() + 1).padStart(2, "0");
  const dia = String(hoje.getDate()).padStart(2, "0");
  const dataDeHojeFormatada = `${ano}-${mes}-${dia}`;
  

  const tattooToday = dados.filter((item) => {
    if (item.dateTattoo === dataDeHojeFormatada && item.status === "Confirmado" || item.status === "Concluido") {
      return true
    } else {
      return false
    }
  }).reduce((acumulador, servico) => {
        return acumulador + Number(servico.priceTattoo)
      }, 0)

  const formatterInvoicing = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })

  const todaySessions = dados.filter((item) => {
    return item.dateTattoo === dataDeHojeFormatada && item.status === 'Confirmado' || item.status === 'Concluido'
  }).length

  const concluidos = dados.filter((item) => {
    return item.status === 'Concluido'
  }).length

  return (
    <div className="p-10 w-full max-x-full">
      <h1 className="text-4xl font-black text-zinc-800">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 md:pt-10">
        <div className="cardDash">
          <h2 className="text-lg md:text-xl font-bold">Faturamento Diario</h2>
          <span className="text-2xl md:text-4xl font-semibold font-mono">
            {formatterInvoicing.format(tattooToday)}
          </span>
        </div>
        <div>
          <div className="cardDash">
            <h2 className="text-lg md:text-xl font-bold">Sessões Hoje</h2>
            <span className="text-2xl md:text-4xl font-semibold font-mono">{todaySessions}</span>
          </div>
        </div>
        <div>
          <div className="cardDash">
            <h2 className="text-lg md:text-xl font-bold">Concluidas</h2>
            <span className="text-2xl md:text-4xl font-semibold font-mono">{concluidos}</span>
          </div>
        </div>
      </div>
      <div className="mt-6 md:mt-0">
        <TableDashboard dataDeHojeFormatada={dataDeHojeFormatada}/>
      </div>
    </div>
  );
}
