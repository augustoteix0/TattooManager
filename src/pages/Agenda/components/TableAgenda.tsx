import { WhatsappLogoIcon, CheckIcon, TrashIcon } from '@phosphor-icons/react';
import { ClientContext } from '../../../contexts/Contexts';
import { useContext } from 'react';

export function TableAgenda() {
  

  const context = useContext(ClientContext);
  
    if (!context) {
    throw new Error('Formulario deve ser usado dentro de um ClientProvider');
  }
    const { statusChange, dadosFiltrados } = context

  return (
    <div className="bg-base-card border border-base-border rounded-2xl overflow-hidden w-full shadow-xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse table-fixed">
          <thead>
           
            <tr className="border-b border-base-border text-base-label text-xs uppercase tracking-wider bg-base-sidebar/40">
              <th className="py-4 px-5 font-semibold">Horário</th>
              <th className="py-4 px-5 font-semibold">Nome do Cliente</th>
              <th className="py-4 px-5 font-semibold">Whatsapp</th>
              <th className="py-4 px-5 font-semibold">Tatuador</th>
              <th className="py-4 px-5 font-semibold">Estilo da Tattoo</th>
              <th className="py-4 px-5 font-semibold">Preço</th>
              <th className="py-4 px-5 font-semibold">Status</th>
              <th className="py-4 px-5 font-semibold text-right">Ações</th>
            </tr>
          </thead>
          
          <tbody className="divide-y divide-base-border text-sm ">
            {dadosFiltrados.map((item) => ( 
              <tr key={item.id} className="hover:bg-base-hover transition-colors duration-200">
                
                
                <td className="py-4 px-5 font-bold text-base-title">{item.dateTattoo}</td>
                
                
                <td className="py-4 px-5 font-medium text-base-subtitle">{item.clientName}</td>
                
                
                <td className="py-4 px-5">
                  <a 
                    href={`https://wa.me/${item.phoneClient}?text=Olá%20${encodeURIComponent(item.clientName)},%20passando%20para%20confirmar%20seu%20horário%20de%20tattoo%20às%20${item.timeTattoo}.`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-base-text hover:text-base-success transition-all"
                  >
                    <WhatsappLogoIcon size={16} weight="fill" className="text-base-success" />
                    <span className="underline decoration-base-border hover:decoration-base-success">{item.phoneClient}</span>
                  </a>
                </td>
                
               
                <td className="py-4 px-5 text-base-text">{item.tatuador}</td>
                
                
                <td className="py-4 px-5 text-base-text italic">{item.descriptionTattoo}</td>
                
                
                <td className="py-4 px-5 font-semibold text-base-gold">
                  R$ {item.priceTattoo}
                </td>
                
                
                <td className="py-4 px-5 w-32 h-16">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                    item.status === 'Confirmado' ? 'bg-base-success/10 text-base-success border-base-success/20' :
                    item.status === 'Pendente' ? 'bg-base-alert/10 text-base-alert border-base-alert/20' :
                    item.status === 'Concluido' ? 'bg-base-sidebar text-base-text border-base-border' :
                    'bg-base-error/10 text-base-error border-base-error/20'
                  }`}>
                    {item.status}
                  </span>
                </td>

                
                <td className="py-4 px-5 text-right space-x-1.5 whitespace-nowrap ">
                  <button 
                  onClick={() => statusChange(item.id, item.status === 'Pendente' ? 'Confirmado' : 'Pendente')}
                    title="Confirmar Agendamento"
                    className="inline-flex items-center justify-center p-2 bg-base-gold hover:bg-base-gold-hover text-base-bg rounded-lg transition-all duration-200"
                  >
                    <CheckIcon size={16} weight="bold" />
                  </button>
                  
                  <button 
                    onClick={() => statusChange(item.id, 'Cancelado')}
                    title="Cancelar Sessão"
                    className="inline-flex items-center justify-center p-2 bg-base-sidebar hover:bg-base-error/10 text-base-text hover:text-base-error border border-base-border hover:border-base-error/20 rounded-lg transition-all duration-200"
                  >
                    <TrashIcon size={16} />
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}