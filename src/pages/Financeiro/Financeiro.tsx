import { useContext } from "react";
import { ClientContext } from "../../contexts/Contexts";
import { CardsFinanceiro } from "./components/CardFinanceiros";
import { ChartFinanceiro } from "./components/ChartFinanceiro";
import { HeaderFinanceiro } from "./components/Header";

export function Financeiro() {
     const context = useContext(ClientContext);
    
      if (!context) {
        throw new Error("Formulario deve ser usado dentro de um ClientProvider");
      }
      const { dadosFiltrados } = context;
    
    return (
        <div className="flex flex-col gap-6 p-10 w-full mt-10">
            <div className="flex flex-col">
                <HeaderFinanceiro />
                <CardsFinanceiro dados={dadosFiltrados}  />
            </div>
            <div>
                <ChartFinanceiro financeiro={dadosFiltrados}/>
            </div>
        </div>
    )
} 