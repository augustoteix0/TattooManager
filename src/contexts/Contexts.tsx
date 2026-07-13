import { createContext, useEffect, useState, type ReactNode } from "react";
import { type CreateClientFormData } from "../pages/Formulario/Formulario";

export interface ClientData {
  id: string;
  clientName: string;
  phoneClient: string;
  tatuador: "Gugo" | "Eddy" | "Gih" | "Shira" | "Eryck";
  descriptionTattoo: string;
  priceTattoo: string;
  timeTattoo: string;
  dateTattoo: string;
  status: "Pendente" | "Confirmado" | "Cancelado" | "Concluido";
}

export interface ContextType {
  dados: ClientData[];
  saveClient: (data: CreateClientFormData) => void;
  statusChange: (
    id: string,
    novoStatus: "Pendente" | "Confirmado" | "Cancelado" | "Concluido",
  ) => void;
  handleRemoveClient: (id: string) => void;
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
  const [client, setClient] = useState<ClientData[]>(() => {
    const storageStateJSON = localStorage.getItem(
      "@projeto-tattoo:client-1.0.0",
    );

    if (storageStateJSON) {
      return JSON.parse(storageStateJSON);
    }
    return [];
  });

  useEffect(() => {
    const stateJSON = JSON.stringify(client);

    localStorage.setItem("@projeto-tattoo:client-1.0.0", stateJSON);
  }, [client]);

  const [searchClient, setSearchClient] = useState("");
  const [tatuadorSelected, setTatuadorSelected] = useState("");
  const [week, setWeek] = useState("");

  function saveClient(data: CreateClientFormData) {
    const newClient: ClientData = {
      ...data,
      id: crypto.randomUUID(),
      status: "Pendente",
    };
    setClient((state) => [...state, newClient]);
  }

  function statusChange(
    id: string,
    novoStatus: "Confirmado" | "Pendente" | "Cancelado" | "Concluido",
  ) {
    setClient((state) =>
      state.map((item) =>
        item.id === id ? { ...item, status: novoStatus } : item,
      ),
    );
  }

  function handleRemoveClient(id: string) {
    setClient((state) => {
      return state.filter((item) => item.id !== id);
    });
  }

  const dadosFiltrados = client.filter((item) => {
    const clientName = item.clientName ? item.clientName.toLowerCase() : "";
    const termoDeBusca = searchClient ? searchClient.toLowerCase() : "";
    const matchesName = clientName.includes(termoDeBusca);

    const tatuador =
      tatuadorSelected === "" || tatuadorSelected === "todos"
        ? true
        : item.tatuador === tatuadorSelected;

    const hoje = new Date();
    const hojeZerado = new Date(
      hoje.getFullYear(),
      hoje.getMonth(),
      hoje.getDate(),
    );
    const dataTattoo = new Date(item.dateTattoo + "T00:00:00");
    let data = true;

    if (week === "" || week.toLowerCase() === "todos") {
      data = true;
    } else if (week === "hoje") {
      data = hojeZerado.getTime() === dataTattoo.getTime();
    } else if (week === "semana") {
      const seteDiasAtras = new Date(hojeZerado);
      seteDiasAtras.setDate(hoje.getDate() - 7);
      data = dataTattoo >= seteDiasAtras && dataTattoo <= hojeZerado;
    } else if (week === "mes") {
      data =
        hoje.getMonth() === dataTattoo.getMonth() &&
        hoje.getFullYear() === dataTattoo.getFullYear();
    } else if (week === "mesPassado") {
      const dataMesPassado = new Date(hoje);
      dataMesPassado.setMonth(hoje.getMonth() - 1);

      data =
        dataTattoo.getMonth() === dataMesPassado.getMonth() &&
        dataTattoo.getFullYear() === dataMesPassado.getFullYear();
    } else if (week === "3meses") {
      const tresMesesAtras = new Date(hojeZerado);
      tresMesesAtras.setMonth(hoje.getMonth() - 3);
      data = dataTattoo >= tresMesesAtras && dataTattoo <= hojeZerado;
    } else if (week === "anoAtual") {
      data = hoje.getFullYear() === dataTattoo.getFullYear();
    }

    return matchesName && tatuador && data;
  });

  useEffect(() => {
    const stateJSON = JSON.stringify(client);

    localStorage.setItem("@projeto-gugo:dados-filtrados-1.0.0", stateJSON);
  }, [client]);

  return (
    <ClientContext.Provider
      value={{
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
      }}
    >
      {children}
    </ClientContext.Provider>
  );
}
