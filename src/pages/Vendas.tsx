import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Search, Filter, Download, ShoppingCart, ExternalLink } from "lucide-react"

export default function Vendas() {
  const [activeTab, setActiveTab] = useState("aprovadas")
  const [searchTerm, setSearchTerm] = useState("")

  const vendasEncontradas = 0
  const valorLiquido = "0,00"

  const vendas = [
    {
      id: 1,
      data: "15/07/2024",
      produto: "Curso de Marketing Digital",
      cliente: "João Silva",
      status: "aprovada",
      valorLiquido: "R$ 287,51"
    },
    {
      id: 2,
      data: "14/07/2024",
      produto: "E-book Growth Hacking",
      cliente: "Maria Santos",
      status: "aprovada",
      valorLiquido: "R$ 42,30"
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Vendas</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filtros
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{vendasEncontradas}</div>
            <p className="text-muted-foreground">Vendas encontradas</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">R$ {valorLiquido}</div>
            <p className="text-muted-foreground">Valor líquido</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar vendas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="aprovadas">Aprovadas</TabsTrigger>
          <TabsTrigger value="todas">Todas</TabsTrigger>
        </TabsList>

        <TabsContent value="aprovadas" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>DATA</TableHead>
                    <TableHead>PRODUTO</TableHead>
                    <TableHead>CLIENTE</TableHead>
                    <TableHead>STATUS</TableHead>
                    <TableHead>VALOR LÍQUIDO</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vendas.length > 0 ? (
                    vendas.map((venda) => (
                      <TableRow key={venda.id}>
                        <TableCell>{venda.data}</TableCell>
                        <TableCell className="font-medium">{venda.produto}</TableCell>
                        <TableCell>{venda.cliente}</TableCell>
                        <TableCell>
                          <Badge variant="default">Aprovada</Badge>
                        </TableCell>
                        <TableCell className="font-semibold">{venda.valorLiquido}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-12">
                        <div className="flex flex-col items-center gap-2 text-muted-foreground">
                          <ShoppingCart className="h-12 w-12" />
                          <p>Nenhuma venda encontrada</p>
                          <p className="text-sm">As vendas aparecerão aqui quando forem realizadas</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="todas" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>DATA</TableHead>
                    <TableHead>PRODUTO</TableHead>
                    <TableHead>CLIENTE</TableHead>
                    <TableHead>STATUS</TableHead>
                    <TableHead>VALOR LÍQUIDO</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-12">
                      <div className="flex flex-col items-center gap-2 text-muted-foreground">
                        <ShoppingCart className="h-12 w-12" />
                        <p>Nenhuma venda encontrada</p>
                        <p className="text-sm">As vendas aparecerão aqui quando forem realizadas</p>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="text-center">
        <Button variant="link" className="text-primary">
          <ExternalLink className="h-4 w-4 mr-2" />
          Aprenda mais sobre as vendas
        </Button>
      </div>
    </div>
  )
}