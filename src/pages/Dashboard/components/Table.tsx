import { WhatsappLogoIcon, CheckIcon } from '@phosphor-icons/react';
import { ClientContext } from '../../../contexts/Contexts';
import { useContext } from 'react'

export function TableDashboard() {

  const context = useContext(ClientContext);
    
      if (!context) {
      throw new Error('Formulario deve ser usado dentro de um ClientProvider');
    }
      const { dadosFiltrados, statusChange } = context

    function handleConclude (id: string) {
      statusChange(id, 'Concluido')
    }


  return (
    <div className="bg-base-card border border-base-border rounded-2xl overflow-hidden w-full shadow-xl mt-10">
      
      <div className="p-5 border-b border-base-border bg-base-card">
        <h2 className="text-base-title font-semibold text-lg">Próximos Clientes</h2>
        <p className="text-base-label text-xs mt-0.5">Gerenciamento de sessões para o dia de hoje.</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse table-fixed">
          <thead>
           
            <tr className="border-b border-base-border text-base-label text-xs uppercase tracking-wider bg-base-sidebar/40">
              <th className="py-4 px-6 font-semibold">Horário</th>
              <th className="py-4 px-6 font-semibold">Nome do Cliente</th>
              <th className="py-4 px-6 font-semibold">Tatuador</th>
              <th className="py-4 px-6 font-semibold">Status Atual</th>
              <th className="py-4 px-6 font-semibold">Contato</th>
              <th className="py-4 px-6 font-semibold text-right">Ações</th>
            </tr>
          </thead>
          {dadosFiltrados.map(item => (
          <tbody className="divide-y divide-base-border text-sm">
              <tr key={item.id} className="hover:bg-base-hover transition-colors duration-200">
                
                
                <td className="py-4 px-6 font-bold text-base-title">{item.timeTattoo}</td>
                
               
                <td className="py-4 px-6 font-medium text-base-subtitle">{item.clientName}</td>
                
                
                <td className="py-4 px-6 text-base-text">{item.tatuador}</td>
                
                
                <td className="py-4 px-6">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium border cursor-default ${
                    item.status === 'Confirmado' ? 'bg-base-success/10 text-base-success border-base-success/20' :
                    item.status === 'Pendente' ? 'bg-base-alert/10 text-base-alert border-base-alert/20' :
                    'bg-base-sidebar text-base-text border-base-border'
                  }`}>
                    {item.status}
                  </span>
                </td>

                
                <td className="py-4 px-6">
                  <a 
                    href={`https://wa.me/${item.phoneClient}?text=Olá%20${encodeURIComponent(item.clientName)},%20confirmamos%20sua%20sessão%20de%20tattoo%20hoje%20às%20${item.timeTattoo}?`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-base-text hover:text-base-success transition-colors duration-200 text-xs"
                  >
                    <WhatsappLogoIcon size={18} weight="fill" className="text-base-success" />
                    <span>Chamar</span>
                  </a>
                </td>

                
                <td className="py-4 px-6 text-right space-x-2">
                  {item.status === 'Confirmado' && (
                    <button onClick={() => handleConclude(item.id)} className="inline-flex items-center gap-1 px-3 py-1.5 bg-base-btn-bg hover:bg-base-btn-hover text-base-btn-text rounded-lg text-xs font-semibold transition-all duration-200 shadow-sm">
                      <CheckIcon size={14} weight="bold" />
                      <span>Concluído</span>
                    </button>
                  )}
                </td>
              </tr>
          </tbody>
          ))}
        </table>
      </div>
    </div>
  );
}