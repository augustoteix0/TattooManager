import { TableDashboard } from './components/Table'

export function Dashboard() {
  return (
    <div className="p-10">
      <h1 className="text-4xl font-black text-zinc-800">Dashboard</h1>
      <div className="grid grid-cols-3 gap-4 pt-10">
        <div className="cardDash">
          <h2 className="text-xl font-bold">Faturamento</h2>
          <span className="text-4xl font-semibold font-mono">R$&nbsp; 12,903.09</span>
        </div>
        <div>
          <div className="cardDash">
          <h2 className="text-xl font-bold">Sessões Hoje</h2>
          <span className="text-4xl font-semibold font-mono">12</span>
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
  )
}