import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";

import type { ClientData } from "../../../contexts/Contexts";

type ChartFinanceiroProps = {
  financeiro: ClientData[];
};

export function ChartFinanceiro({ financeiro }: ChartFinanceiroProps) {
  const dadosGrafico = financeiro.reduce<
    { date: string; faturamento: number }[]
  >(
    (acc, item) => {
      if (item.status !== "Confirmado") return acc;

      const valorTattoo = Number(item.priceTattoo) || 0;
      const dataTattoo = new Date(item.dateTattoo);

      const diaMes = dataTattoo.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
      });

      const diaExistente = acc.find((registro) => registro.date === diaMes);

      if (diaExistente) {
        diaExistente.faturamento += valorTattoo;
      } else {
        acc.push({ date: diaMes, faturamento: valorTattoo });
      }

      return acc;
    },
    [] as { date: string; faturamento: number }[],
  );

  const dadosGraficoOrdenados = dadosGrafico.sort((a, b) => {
    const [diaA, mesA] = a.date.split("/").map(Number);
    const [diaB, mesB] = b.date.split("/").map(Number);
    return mesA === mesB ? diaA - diaB : mesA - mesB;
  });

  return (
    <Card className="w-full bg-zinc-950 border-zinc-800 rounded-2xl">
      <CardHeader>
        <div>
          <CardTitle className="text-white">Receita no Período</CardTitle>
          <CardDescription className="text-zinc-400">
            Receita Diária no Período
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex justify-center p-6">
        <LineChart width={850} height={340} data={dadosGraficoOrdenados}>
          <XAxis
            dataKey="date"
            stroke="#71717a"
            tickLine={false}
            axisLine={false}
            dy={10}
          />

          <YAxis
            stroke="#71717a"
            axisLine={false}
            tickLine={false}
            width={65}
            tickFormatter={(value: number) =>
              value.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
                maximumFractionDigits: 0,
              })
            }
          />

          <CartesianGrid vertical={false} stroke="#27272a" />

          <Tooltip
            formatter={(value: number) => [
              value.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              }),
              "Faturamento",
            ]}
            isAnimationActive={true}
  animationDuration={200}
          />

          <Line
            type="monotone"
            strokeWidth={3}
            dataKey="faturamento"
            stroke="#8b5cf6"
            isAnimationActive={true}
            animationEasing="ease-in-out"
            animationDuration={1500}
          />
        </LineChart>
      </CardContent>
    </Card>
  );
}
