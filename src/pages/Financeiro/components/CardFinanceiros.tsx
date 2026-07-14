import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { priceFormatter } from "../../../utils/formatter";
import type { ClientData } from "../../../contexts/Contexts";

type CardsFinanceiroProps = {
  dados: ClientData[];
};

export function CardsFinanceiro({ dados }: CardsFinanceiroProps) {
  const totalFaturado = dados.reduce((acc, itemAtual) => {
    if (itemAtual.status === "Confirmado") {
      return acc + Number(itemAtual.priceTattoo);
    } else {
      return acc;
    }
  }, 0);

  const totalSessions = dados.filter((itemAtual) => {
    if (itemAtual.status === "Confirmado") {
      return true;
    } else {
      return false;
    }
  });

  const bestFaturador = dados.reduce(
    (acc, itemAtual) => {
      const nomeTatuador = itemAtual.tatuador;
      const valorTattoo = Number(itemAtual.priceTattoo) || 0;

      if (itemAtual.status !== "Confirmado") return acc;

      acc.totais[nomeTatuador] = (acc.totais[nomeTatuador] || 0) + valorTattoo;

      if (acc.totais[nomeTatuador] > acc.campeao.faturamento) {
        acc.campeao = {
          nome: nomeTatuador,
          faturamento: acc.totais[nomeTatuador],
        };
      }
      return acc;
    },
    {
      totais: {} as Record<string, number>,
      campeao: { nome: "Nenhum", faturamento: 0 },
    },
  );

  const hoje = new Date();
  const mesAtual = hoje.getMonth();
  const anoAtual = hoje.getFullYear();

  const dataMesPassado = new Date();
  dataMesPassado.setMonth(hoje.getMonth() - 1);
  const mesAnterior = dataMesPassado.getMonth();
  const anoAnterior = dataMesPassado.getFullYear();

  const faturamentoComparado = dados.reduce(
    (acc, item) => {
      if (item.status !== "Confirmado") return acc;

      const valorTattoo = Number(item.priceTattoo) || 0;

      const dataAgendamento = new Date(item.dateTattoo);
      const mesItem = dataAgendamento.getMonth();
      const anoItem = dataAgendamento.getFullYear();

      if (mesItem === mesAtual && anoItem === anoAtual) {
        acc.mesAtual += valorTattoo;
      }

      if (mesItem === mesAnterior && anoItem === anoAnterior) {
        acc.mesAnterior += valorTattoo;
      }

      return acc;
    },
    {
      mesAtual: 0,
      mesAnterior: 0,
    },
  );

  const { mesAtual: faturamentoAtual, mesAnterior: faturamentoAnterior } =
    faturamentoComparado;

  let diferencaPercentual = 0;

  if (faturamentoAnterior > 0) {
    diferencaPercentual =
      ((faturamentoAtual - faturamentoAnterior) / faturamentoAnterior) * 100;
  } else if (faturamentoAtual > 0) {
    diferencaPercentual = 100;
  }

  const ehCrescimentoPositivo = diferencaPercentual >= 0;

  const sessoesComparadas = dados.reduce(
    (acc, item) => {
      if (item.status !== "Confirmado") return acc;

      const dataAgendamento = new Date(item.dateTattoo);
      const mesItem = dataAgendamento.getMonth();
      const anoItem = dataAgendamento.getFullYear();

      if (mesItem === mesAtual && anoItem === anoAtual) {
        acc.mesAtual += 1;
      }

      if (mesItem === mesAnterior && anoItem === anoAnterior) {
        acc.mesAnterior += 1;
      }

      return acc;
    },
    {
      mesAtual: 0,
      mesAnterior: 0,
    },
  );

  const { mesAtual: sessoesAtuais, mesAnterior: sessoesAnteriores } =
    sessoesComparadas;

  let diferencaPercentualSessoes = 0;

  if (sessoesAnteriores > 0) {
    diferencaPercentualSessoes =
      ((sessoesAtuais - sessoesAnteriores) / sessoesAnteriores) * 100;
  } else if (sessoesAtuais > 0) {
    diferencaPercentualSessoes = 100;
  }

  const ehCrescimentoSessoesPositivo = diferencaPercentualSessoes >= 0;

  return (
    <div className="grid grid-cols-3 gap-4">
      <Card className="rounded-xl bg-zinc-900 text-white">
        <CardHeader>
          <CardTitle>Total Faturado</CardTitle>
        </CardHeader>
        <CardContent className="text-3xl">
          {priceFormatter(totalFaturado)}
        </CardContent>
        <CardFooter>
          <span
            className={
              ehCrescimentoPositivo ? "text-emerald-500" : "text-rose-500"
            }
          >
            {ehCrescimentoPositivo ? "↑" : "↓"}{" "}
            {Math.abs(diferencaPercentual).toFixed(1)}%
          </span>{" "}
          <span className="text-zinc-400 ml-1">em relação ao mês passado</span>
        </CardFooter>
      </Card>

      <Card className="rounded-xl bg-zinc-900 text-white">
        <CardHeader>
          <CardTitle>Sessões Realizadas</CardTitle>
        </CardHeader> 
        <CardContent className="text-3xl">{totalSessions.length} {totalSessions.length === 1 ? "sessão" : "sessões"}</CardContent>
        <CardFooter>
          <span className={ehCrescimentoSessoesPositivo ? "text-emerald-500" : "text-rose-500"}>
      {ehCrescimentoSessoesPositivo ? "↑" : "↓"} {Math.abs(diferencaPercentualSessoes).toFixed(1)}%
    </span>{" "}
    <span className="text-zinc-400 ml-1">em relação ao mês passado</span>
        </CardFooter>
      </Card>

      <Card className="rounded-xl bg-zinc-900 text-white">
        <CardHeader>
          <CardTitle>Maior Faturador</CardTitle>
        </CardHeader>
        <CardContent className="text-3xl">
          {bestFaturador.campeao.nome}
        </CardContent>
        <CardFooter>
          Fez {priceFormatter(bestFaturador.campeao.faturamento)} no periodo.
        </CardFooter>
      </Card>
    </div>
  );
}
