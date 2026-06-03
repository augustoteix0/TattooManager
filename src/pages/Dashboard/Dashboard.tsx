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
    if (item.dateTattoo === dataDeHojeFormatada && item.status === "Confirmado") {
      return true
    } else {
      return false
    }

  }).reduce((acumulador, servico) => {
        return acumulador + Number(servico.priceTattoo)
      }, 0)

  const todaySessions = dados.filter((item) => {
    return item.dateTattoo === dataDeHojeFormatada && item.status === 'Confirmado'
  }).length

  return (
    <div className="p-10">
      <h1 className="text-4xl font-black text-zinc-800">Dashboard</h1>
      <div className="grid grid-cols-3 gap-4 pt-10">
        <div className="cardDash">
          <h2 className="text-xl font-bold">Faturamento Diario</h2>
          <span className="text-4xl font-semibold font-mono">
            R$&nbsp; {tattooToday}
          </span>
        </div>
        <div>
          <div className="cardDash">
            <h2 className="text-xl font-bold">Sessões Hoje</h2>
            <span className="text-4xl font-semibold font-mono">{todaySessions}</span>
          </div>
        </div>
        <div>
          <div className="cardDash">
            <h2 className="text-xl font-bold">Concluidas</h2>
            <span className="text-4xl font-semibold font-mono">4</span>
          </div>
        </div>
      </div>
      <div>
        <TableDashboard />
      </div>
    </div>
  );
}
