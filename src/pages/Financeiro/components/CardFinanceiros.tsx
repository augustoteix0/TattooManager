import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card"

export function CardsFinanceiro() {
    return (
        <div className="grid grid-cols-3 gap-4">
            <Card className="rounded-xl bg-zinc-900 text-white">
                <CardHeader>
                    <CardTitle>Total Faturado</CardTitle>
                </CardHeader>
                <CardContent className="text-3xl">
                    R$ 15.293,90
                </CardContent>
                <CardFooter>
                    +12% que o mês anterior.
                </CardFooter>
            </Card>

            <Card className="rounded-xl bg-zinc-900 text-white">
                <CardHeader>
                    <CardTitle>Sessões Realizadas</CardTitle>
                </CardHeader>
                <CardContent className="text-3xl">
                    14
                </CardContent>
                <CardFooter>
                    5 Sessões à mais que o mês passado.
                </CardFooter>
            </Card>

            <Card className="rounded-xl bg-zinc-900 text-white">
                <CardHeader>
                    <CardTitle>Maior Faturador</CardTitle>
                </CardHeader>
                <CardContent className="text-3xl">
                    Gugo tattoo
                </CardContent>
                <CardFooter>
                    Fez R$ 7.649,97 no mês.
                </CardFooter>
            </Card>
        </div>
    )
}