import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, MoreHorizontal, Users, UserPlus, ExternalLink } from "lucide-react"

export default function Afiliados() {
  const [activeTab, setActiveTab] = useState("ativos")
  const [searchTerm, setSearchTerm] = useState("")
  const [productFilter, setProductFilter] = useState("todos")

  const afiliadosAtivos = [
    {
      id: 1,
      data: "15/07/2024",
      nome: "João Silva",
      produto: "Curso de Marketing Digital",
      comissao: "30%",
      vendas: 12,
      status: "ativo"
    },
    {
      id: 2,
      data: "10/07/2024",
      nome: "Maria Santos",
      produto: "E-book Growth Hacking",
      comissao: "25%",
      vendas: 8,
      status: "ativo"
    }
  ]

  const solicitacoesPendentes = [
    {
      id: 1,
      data: "14/07/2024",
      nome: "Pedro Costa",
      produto: "Curso de Marketing Digital",
      comissao: "30%",
      status: "pendente"
    }
  ]

  const rejeitados = [
    {
      id: 1,
      data: "12/07/2024",
      nome: "Ana Oliveira",
      produto: "E-book Growth Hacking",
      comissao: "25%",
      status: "rejeitado",
      motivo: "Perfil não compatível"
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Meus Afiliados</h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <MoreHorizontal className="h-4 w-4 mr-2" />
              Ações
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <UserPlus className="h-4 w-4 mr-2" />
              Convidar afiliado
            </DropdownMenuItem>
            <DropdownMenuItem>
              Importar afiliados
            </DropdownMenuItem>
            <DropdownMenuItem>
              Exportar lista
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full max-w-2xl grid-cols-3">
          <TabsTrigger value="ativos">Ativos</TabsTrigger>
          <TabsTrigger value="pendentes">Solicitações pendentes</TabsTrigger>
          <TabsTrigger value="rejeitados">Recusados/Bloqueados</TabsTrigger>
        </TabsList>

        {/* Search and Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={productFilter} onValueChange={setProductFilter}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os produtos</SelectItem>
              <SelectItem value="marketing">Curso de Marketing Digital</SelectItem>
              <SelectItem value="growth">E-book Growth Hacking</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <TabsContent value="ativos" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>DATA</TableHead>
                    <TableHead>NOME</TableHead>
                    <TableHead>PRODUTO</TableHead>
                    <TableHead>COMISSÃO %</TableHead>
                    <TableHead>STATUS</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {afiliadosAtivos.length > 0 ? (
                    afiliadosAtivos.map((afiliado) => (
                      <TableRow key={afiliado.id}>
                        <TableCell>{afiliado.data}</TableCell>
                        <TableCell className="font-medium">{afiliado.nome}</TableCell>
                        <TableCell>{afiliado.produto}</TableCell>
                        <TableCell>{afiliado.comissao}</TableCell>
                        <TableCell>
                          <Badge variant="default">Ativo</Badge>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Ver detalhes</DropdownMenuItem>
                              <DropdownMenuItem>Editar comissão</DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">
                                Bloquear
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-12">
                        <div className="flex flex-col items-center gap-2 text-muted-foreground">
                          <Users className="h-12 w-12" />
                          <p>Nenhum afiliado ativo</p>
                          <p className="text-sm">Convide afiliados para promover seus produtos</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pendentes" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>DATA</TableHead>
                    <TableHead>NOME</TableHead>
                    <TableHead>PRODUTO</TableHead>
                    <TableHead>COMISSÃO %</TableHead>
                    <TableHead>STATUS</TableHead>
                    <TableHead>AÇÕES</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {solicitacoesPendentes.map((solicitacao) => (
                    <TableRow key={solicitacao.id}>
                      <TableCell>{solicitacao.data}</TableCell>
                      <TableCell className="font-medium">{solicitacao.nome}</TableCell>
                      <TableCell>{solicitacao.produto}</TableCell>
                      <TableCell>{solicitacao.comissao}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">Pendente</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="default">
                            Aprovar
                          </Button>
                          <Button size="sm" variant="outline">
                            Rejeitar
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rejeitados" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>DATA</TableHead>
                    <TableHead>NOME</TableHead>
                    <TableHead>PRODUTO</TableHead>
                    <TableHead>STATUS</TableHead>
                    <TableHead>MOTIVO</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rejeitados.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.data}</TableCell>
                      <TableCell className="font-medium">{item.nome}</TableCell>
                      <TableCell>{item.produto}</TableCell>
                      <TableCell>
                        <Badge variant="destructive">Rejeitado</Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {item.motivo}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="text-center">
        <Button variant="link" className="text-primary">
          <ExternalLink className="h-4 w-4 mr-2" />
          Aprenda mais sobre os afiliados
        </Button>
      </div>
    </div>
  )
}