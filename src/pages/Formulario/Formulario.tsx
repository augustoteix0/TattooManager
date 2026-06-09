import { UserIcon, WhatsappLogoIcon, PaintBrushIcon, CurrencyDollarIcon, ClockIcon, CalendarIcon, IdentificationCardIcon } from '@phosphor-icons/react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { ClientContext } from '../../contexts/Contexts';

const createClientFormSchema = z.object({
  clientName: z.string().nonempty('O Nome do Cliente é obrigatório'),
  phoneClient: z.string().nonempty('O numero do Cliente é obrigatorio'),
  tatuador: z.enum(['Gugo', 'Eddy', 'Gih', 'Shira', 'Eryck']),
  descriptionTattoo: z.string().nonempty('A Descrição é obrigatoria'),
  priceTattoo: z.string().nonempty('Este campo é obrigatorio'),
  timeTattoo: z.string().nonempty('O horário é obrigatório').regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'Horário inválido (deve ser entre 00:00 e 23:59)'),
  dateTattoo: z.string().nonempty('A data é obrigatória').regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato de data inválido'),
})

export type CreateClientFormData = z.infer<typeof createClientFormSchema>

export function Formulario() {
  const {register, reset, handleSubmit, formState:{errors}} = useForm({
    resolver: zodResolver(createClientFormSchema)
  })

  const context = useContext(ClientContext);

  if (!context) {
  throw new Error('Formulario deve ser usado dentro de um ClientProvider');
}
  const { saveClient } = context

  function createClient(data: CreateClientFormData) {
    saveClient(data)
    reset()
  }

  return (
    <form onSubmit={handleSubmit(createClient)} className="w-full mx-auto p-4 md:p-10 shadow-xl overflow-hidden">
      <div className="mb-8">
        <h1 className="text-4xl font-black text-zinc-800">Agenda um Cliente</h1>
        <p className="text-base-label text-xs mt-1">Insira os dados da sessão para atualizar o dashboard automaticamente.</p>
      </div>

      <div className="space-y-5">
        
       
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-base-card uppercase tracking-wider">Nome do Cliente</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-base-label">
              <UserIcon size={18} />
            </span>
            <input
              type="text"
              placeholder="Ex: Augusto Moraes"
              className="w-full bg-base-input border border-base-border text-base-title placeholder-base-label rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-base-gold/50 transition-colors duration-200"
              {...register('clientName')}
            />
            {errors.clientName && <span className='spanMessage'>{errors.clientName.message}</span>}
          </div>
        </div>

        
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-base-card uppercase tracking-wider">WhatsApp</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-base-label">
              <WhatsappLogoIcon size={18} />
            </span>
            <input
              type="tel"
              placeholder="Ex: 11999999999"
              className="w-full bg-base-input border border-base-border text-base-title placeholder-base-label rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-base-gold/50 transition-colors duration-200"
              {...register('phoneClient')}
            />
            {errors.phoneClient && <span className='spanMessage'>{errors.phoneClient.message}</span>}
          </div>
        </div>

        
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-base-card uppercase tracking-wider">Tatuador Responsável</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-base-label">
              <IdentificationCardIcon size={18} />
            </span>
            <select
              defaultValue=""
              className="w-full bg-base-input border border-base-border text-base-title rounded-xl pl-11 pr-10 py-3 text-sm focus:outline-none focus:border-base-gold/50 transition-colors duration-200 appearance-none cursor-pointer"
              {...register('tatuador')}
            >
              {errors.tatuador && <span className='spanMessage'>{errors.tatuador.message}</span>}
              <option value="" disabled hidden>Selecione o profissional</option>
              <option value="Gugo" className="bg-base-card text-base-title">Gugo</option>
              <option value="Eddy" className="bg-base-card text-base-title">Eddy</option>
              <option value="Gih" className="bg-base-card text-base-title">Gih</option>
              <option value="Shira" className="bg-base-card text-base-title">Shira</option>
              <option value="Eryck" className="bg-base-card text-base-title">Eryck</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-base-label">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-base-card uppercase tracking-wider">Descrição da Tatuagem</label>
          <div className="relative">
            <span className="absolute top-3.5 left-3.5 text-base-label">
              <PaintBrushIcon size={18} />
            </span>
            <textarea
              placeholder="Ex: Fechamento de antebraço em Blackwork (Leão e bússola)"
              rows={3}
              className="w-full bg-base-input border border-base-border text-base-title placeholder-base-label rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-base-gold/50 transition-colors duration-200 resize-none"
              {...register('descriptionTattoo')}
            />
            {errors.descriptionTattoo && <span className='spanMessage'>{errors.descriptionTattoo.message}</span>}
          </div>
        </div>

        
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-base-card uppercase tracking-wider">Preço da Tatuagem</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-base-label">
              <CurrencyDollarIcon size={18} />
            </span>
            <input
              type="number"
              placeholder="Ex: 1200"
              className="w-full bg-base-input border border-base-border text-base-title placeholder-base-label rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-base-gold/50 transition-colors duration-200"
              {...register('priceTattoo')}
            />
            {errors.priceTattoo && <span className='spanMessage'>{errors.priceTattoo.message}</span>}
          </div>
        </div>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          <div className="space-y-1.5 w-full">
            <label className="text-xs font-bold text-base-card uppercase tracking-wider">Horário</label>
            <div className="flex items-center w-full bg-base-input border border-base-border rounded-xl px-3.5 py-3 focus-within:border-base-gold/50 transition-colors duration-200 overflow-hidden">    
                <ClockIcon size={18} className="text-base-label shrink-0" />
              <input
                type="time"
                className="w-full bg-transparent text-base-title text-sm focus:outline-none appearance-none ml-3"
                {...register('timeTattoo')}
              />
              {errors.timeTattoo && <span className='spanMessage'>{errors.timeTattoo.message}</span>}
            </div>
          </div>

          <div className="space-y-1.5 w-full">
            <label className="text-xs text-base-card font-bold uppercase tracking-wider">Data</label>
            <div className="flex items-center w-full bg-base-input border border-base-border rounded-xl px-3.5 py-3 focus-within:border-base-gold/50 transition-colors duration-200 overflow-hidden">
                <CalendarIcon size={18} className="text-base-label shrink-0" />
              <input
                type="date"
                className="w-full bg-transparent text-base-title text-sm focus:outline-none appearance-none ml-3"
                {...register('dateTattoo')}
              />
              {errors.dateTattoo && <span className='spanMessage'>{errors.dateTattoo.message}</span>}
            </div>
          </div>

        </div>

        
        <div className="pt-2">
          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-3 bg-base-btn-bg text-base-btn-text hover:bg-base-btn-hover font-bold text-sm rounded-xl transition-all duration-200 shadow-md cursor-pointer"
          >
            Salvar Agendamento
          </button>
        </div>

      </div>
      
    </form>
  );
}

