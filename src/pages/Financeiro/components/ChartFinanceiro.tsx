import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";

const chartData = [
  { month: "Jan", revenue: 1200 },
  { month: "Fev", revenue: 900 },
  { month: "Mar", revenue: 400 },
  { month: "Abr", revenue: 2300 },
  { month: "Mai", revenue: 800 },
  { month: "Jun", revenue: 648 },
];

export function ChartFinanceiro() {
  return (
    <Card className="w-full bg-zinc-950 border-zinc-800 rounded-2xl">
      <CardHeader>
        <div>
          <CardTitle className="text-white">Receita no Período</CardTitle>
          <CardDescription className="text-zinc-400">Receita Diária no Período</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex justify-center p-6">
        
        
        <LineChart width={850} height={340} data={chartData}>
          <XAxis dataKey="month" stroke="#71717a" tickLine={false} axisLine={false} dy={10} />
          
          <YAxis
            stroke="#71717a"
            axisLine={false}
            tickLine={false}
            width={65}
            tickFormatter={(value: number) =>
              value.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
                maximumFractionDigits: 0
              })
            }
          />

          <CartesianGrid vertical={false} stroke="#27272a" />
          
          <Tooltip />

          <Line
            type="monotone"
            strokeWidth={3}
            dataKey="revenue"
            stroke="#8b5cf6" 
            isAnimationActive={false}
          />
        </LineChart>

      </CardContent>
    </Card>
  );
}