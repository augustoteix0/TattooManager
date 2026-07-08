import { Header } from "./components/header";
import { TableLembrete } from "./components/TableLembrete";


export function LembretePage() {
    return (
        <div className="flex flex-col gap-2 p-10 w-full mt-10">
            <Header />
            <TableLembrete />
        </div>
    )
}