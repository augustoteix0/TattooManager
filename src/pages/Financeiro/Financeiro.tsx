import { CardsFinanceiro } from "./components/CardFinanceiros";
import { HeaderFinanceiro } from "./components/Header";

export function Financeiro() {
    return (
        <div className="flex flex-col gap-2 p-10 w-full mt-10">
            <HeaderFinanceiro />
            <CardsFinanceiro />
        </div>
    )
} 