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
}

export const ClientContext = createContext<ContextType | undefined>(undefined);

export function ClientProvider({ children }: { children: ReactNode }) {
  const [client, setClient] = useState<ClientData[]>([]);

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

  return (
    <ClientContext.Provider value={{ dados: client, saveClient, statusChange }}>
      {children}
    </ClientContext.Provider>
  );
}
