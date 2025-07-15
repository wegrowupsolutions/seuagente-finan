import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, CreditCard, Percent, Banknote, BarChart3 } from "lucide-react"

export default function Dashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("hoje")
  const [selectedProduct, setSelectedProduct] = useState("todos")
  const [selectedCurrency, setSelectedCurrency] = useState("todas")

  const metricsData = [
    {
      title: "Valor líquido",
      value: "R$ 0,00",
      icon: DollarSign,
      trend: "neutral"
    },
    {
      title: "Vendas",
      value: "0",
      icon: ShoppingCart,
      trend: "neutral"
    },
    {
      title: "Aprovação cartão",
      value: "0%",
      icon: CreditCard,
      trend: "neutral"
    },
    {
      title: "Reembolso",
      value: "0%",
      icon: TrendingDown,
      trend: "neutral"
    },
    {
      title: "Chargeback",
      value: "0%",
      icon: TrendingDown,
      trend: "neutral"
    },
    {
      title: "Vendas 1-click da rede Kiwify",
      value: "R$ 0,00",
      subtitle: "0%",
      icon: BarChart3,
      trend: "neutral",
      tooltip: "Vendas realizadas por afiliados da Kiwify"
    },
    {
      title: "Conversão boleto",
      value: "0%",
      icon: Percent,
      trend: "neutral"
    },
    {
      title: "Boletos gerados",
      value: "0",
      icon: Banknote,
      trend: "neutral"
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="hoje">Hoje</SelectItem>
            <SelectItem value="ontem">Ontem</SelectItem>
            <SelectItem value="ultimos-7-dias">Últimos 7 dias</SelectItem>
            <SelectItem value="mes-atual">Mês atual</SelectItem>
            <SelectItem value="mes-anterior">Mês anterior</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedProduct} onValueChange={setSelectedProduct}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos os produtos</SelectItem>
            <SelectItem value="produto-1">Produto Exemplo 1</SelectItem>
            <SelectItem value="produto-2">Produto Exemplo 2</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todas">Todas as moedas</SelectItem>
            <SelectItem value="brl">BRL</SelectItem>
            <SelectItem value="usd">USD</SelectItem>
            <SelectItem value="eur">EUR</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Hoje</h3>
                <p className="text-sm text-muted-foreground">0:00 - 23:59</p>
              </div>
              <div className="flex gap-4 text-sm">
                <div className="text-right">
                  <p className="text-muted-foreground">Receita</p>
                  <p className="font-semibold">R$ 0</p>
                </div>
                <div className="text-right">
                  <p className="text-muted-foreground">Vendas</p>
                  <p className="font-semibold">R$ 0</p>
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center border-2 border-dashed border-muted rounded-lg">
              <div className="text-center text-muted-foreground">
                <BarChart3 className="h-12 w-12 mx-auto mb-2" />
                <p>Gráfico de receita aparecerá aqui</p>
                <p className="text-sm">Dados serão exibidos conforme vendas são realizadas</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Metrics Grid */}
        <div className="space-y-4">
          {metricsData.map((metric, index) => (
            <Card key={index} className="relative">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">{metric.title}</p>
                    <p className="text-2xl font-bold">{metric.value}</p>
                    {metric.subtitle && (
                      <p className="text-sm text-muted-foreground">{metric.subtitle}</p>
                    )}
                  </div>
                  <metric.icon className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}