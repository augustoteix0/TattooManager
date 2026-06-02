import { createContext, useState, type ReactNode } from "react";

interface ClientData {
  id: string;
  clientName: string;
  phoneClient: string;
  tatuador: "Gugo" | "Eddy" | "Gih" | "Shira" | "Eryck";
  descriptionTattoo: string;
  priceTattoo: string;
  timeTattoo: string;
  dateTattoo: string;
  status: "Pendente" | "Confirmado" | "Cancelado";
}

interface ContextType {
  dados: ClientData[];
  saveClient: (data: ClientData) => void;
  statusChange: (
    id: string,
    novoStatus: "Pendente" | "Confirmado" | "Cancelado",
  ) => void;
  handleRemoveClient: (id: string) => void
  searchClient: string;
  setSearchClient: (value: string) => void;
  tatuadorSelected: string;
  setTatuadorSelected: (value: string) => void;
  week: string;
  setWeek: (value: string) => void;
  dadosFiltrados: ClientData[];
}

export const ClientContext = createContext<ContextType | undefined>(undefined);

export function ClientProvider({ children }: { children: ReactNode }) {
  const [client, setClient] = useState<ClientData[]>([]);
  const [searchClient, setSearchClient] = useState('')
    const [tatuadorSelected, setTatuadorSelected] = useState('')
    const [week, setWeek] = useState('')

  function saveClient(data: Omit<ClientData, "id" | "status">) {
    const newClient: ClientData = {
      ...data,
      id: crypto.randomUUID(),
      status: "Pendente",
    };
    setClient((state) => [...state, newClient]);
  }

  function statusChange(
    id: string,
    novoStatus: "Confirmado" | "Pendente" | "Cancelado",
  ) {
    setClient((state) =>
      state.map((item) =>
        item.id === id ? { ...item, status: novoStatus } : item,
      ),
    );
  }

  function handleRemoveClient (id: string) {
    setClient((state) => { 
     return state.filter((item) => 
        item.id !== id)
    })
}

const dadosFiltrados = client.filter((item) => {
    const clientName = item.clientName.toLowerCase().includes(searchClient.toLowerCase())

    const tatuador = tatuadorSelected === '' || tatuadorSelected === 'Todos' ? true : item.tatuador === tatuadorSelected

    const hoje = new Date()
    const dataTattoo = new Date(item.dateTattoo)
    let data = true

    if (week === 'hoje') {
      data = hoje.toDateString() === dataTattoo.toDateString();
    } 
    else if (week === 'semana') {
    
      const seteDiasAtras = new Date();
      seteDiasAtras.setDate(hoje.getDate() - 7);
      data = dataTattoo >= seteDiasAtras && dataTattoo <= hoje;
    } 
    else if (week === 'mes') {
     
      data = hoje.getMonth() === dataTattoo.getMonth() && hoje.getFullYear() === dataTattoo.getFullYear();
    }
    
    return clientName && tatuador && data;
  })    

  return (
    <ClientContext.Provider value={{
        dados: client,
        saveClient,
        statusChange,
        handleRemoveClient,
        searchClient,
        setSearchClient,
        tatuadorSelected,
        setTatuadorSelected,
        week,
        setWeek,
        dadosFiltrados,
      }}>
      {children}
    </ClientContext.Provider>
  );
}
