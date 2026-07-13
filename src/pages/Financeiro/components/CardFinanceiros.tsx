import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import type { ContextType } from "../../../contexts/Contexts";
import { priceFormatter } from "../../../utils/formatter";

export function CardsFinanceiro({ dados }: ContextType) {
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

  const monthCompatarion = dados.reduce((acc, item) => {

  },0)

  return (
    <div className="grid grid-cols-3 gap-4">
      <Card className="rounded-xl bg-zinc-900 text-white">
        <CardHeader>
          <CardTitle>Total Faturado</CardTitle>
        </CardHeader>
        <CardContent className="text-3xl">
          {priceFormatter(totalFaturado)}
        </CardContent>
        <CardFooter>+12% que o mês anterior.</CardFooter>
      </Card>

      <Card className="rounded-xl bg-zinc-900 text-white">
        <CardHeader>
          <CardTitle>Sessões Realizadas</CardTitle>
        </CardHeader>
        <CardContent className="text-3xl">{totalSessions.length}</CardContent>
        <CardFooter>5 Sessões à mais que o mês passado.</CardFooter>
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
