import { useContext } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { ClientContext } from "../../../contexts/Contexts";
import { differenceInDays } from "date-fns";
import { WhatsappLogoIcon } from "@phosphor-icons/react";
import { dateFormatter } from "../../../utils/formatter";

export function TableLembrete() {
  const context = useContext(ClientContext);

  if (!context) return null;

  const { dados } = context;

  return (
    <div className="bg-base-card border border-base-border rounded-2xl overflow-hidden w-full shadow-xl">
      <div className="overflow-x-auto w-full ">
        <Table className="w-full text-left border-collapse min-w-[900px] ">
          <TableHeader className="w-40">
            <TableRow className="border-b border-base-border text-base-label text-xs uppercase tracking-wider bg-base-sidebar/40">
              <TableHead className="w-[100px]">Cliente</TableHead>
              <TableHead>Quando fez</TableHead>
              <TableHead>Há quanto tempo</TableHead>
              <TableHead className="text-right">Mandar Lembrete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-base-border text-sm ">
            {dados.map((invoice) => {
              const howLongTime = differenceInDays(
                new Date(),
                new Date(invoice.dateTattoo),
              );

              if (howLongTime >= 30 && invoice.status === "Concluido") {
                return (
                  <TableRow
                    key={invoice.id}
                    className="hover:bg-base-hover transition-colors duration-200"
                  >
                    <TableCell className="py-4 px-5 font-bold text-base-title">
                      {invoice.clientName}
                    </TableCell>
                    <TableCell className="py-4 px-5 font-medium text-base-subtitle">
                      {dateFormatter(invoice.dateTattoo)}
                    </TableCell>
                    <TableCell className="py-4 px-5 font-medium text-base-subtitle">
                      há {howLongTime} dias
                    </TableCell>
                    <TableCell className="py-4 px-5 font-medium text-base-subtitle text-right">
                      <a
                        href={`https://api.whatsapp.com/send?phone=${invoice.phoneClient}&text=E%20a%C3%AD,%20${invoice.clientName}!%20Beleza,%20irm%C3%A3o?%20Cara,%20tava%20organizando%20uns%20flashes%20e%20ideias%20de%20desenhos%20novos%20aqui%20no%20est%C3%Badio%20hoje%20e%20lembrei%20de%20ti.%20Faz%20uma%20cara%20que%20voc%C3%AA%20n%C3%A3o%20brota%20aqui%20para%20mandar%20uma%20tinta%20na%20pele,%20n%C3%A9?%20Como%20%C3%A9%20que%20t%C3%A1%20aquela%20sua%20%C3%BAltima%20tattoo,%20curtiu%20o%20resultado%20final%20depois%20de%20100%25%20cicatrizada?%20Inclusive,%20se%20tiver%20pensando%20em%20rabiscar%20mais%20alguma%20coisa%20ou%20fechar%20algum%20projeto%20que%20ficou%20na%20gaveta,%20d%C3%A1%20um%20salve%20aqui%20pra%20gente%20trocar%20uma%20ideia%20sem%20compromisso!`} 
                        
                        className="inline-flex items-center gap-1 text-base-text hover:text-base-success transition-all"
                      >
                        <WhatsappLogoIcon
                          size={16}
                          weight="fill"
                          className="text-base-success"
                        />
                        Chamar
                      </a>
                    </TableCell>
                  </TableRow>
                );
              }
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
