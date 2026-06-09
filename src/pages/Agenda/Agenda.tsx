import { PesquisaAgenda } from "./components/PesquisaAgenda";
import { TableAgenda } from "./components/TableAgenda";

export function Agenda() {
    return (
        <div className="flex flex-col gap-10 p-10 w-full mt-10">
            <PesquisaAgenda />
            <TableAgenda />
        </div>
    )
}