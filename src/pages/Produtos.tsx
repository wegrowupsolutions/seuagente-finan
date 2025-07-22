import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { CriarProdutoModal } from "@/components/produtos/CriarProdutoModal"
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
import { Search, Plus, MoreHorizontal, Package, ExternalLink } from "lucide-react"

export default function Produtos() {
  const [activeTab, setActiveTab] = useState("meus-produtos")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("todos")
  const [isModalOpen, setIsModalOpen] = useState(false)

  const produtos = [
    {
      id: 1,
      nome: "Curso de Marketing Digital",
      preco: "R$ 297,00",
      status: "ativo",
      vendas: 15,
      comissao: "30%"
    },
    {
      id: 2,
      nome: "E-book de Growth Hacking",
      preco: "R$ 47,00",
      status: "inativo",
      vendas: 5,
      comissao: "25%"
    }
  ]

  const coproducoes = [
    {
      id: 1,
      data: "15/07/2024",
      produto: "Curso de Vendas Online",
      comissao: "20%",
      vencimento: "15/08/2024",
      status: "ativo"
    }
  ]

  const afiliacoes = [
    {
      id: 1,
      data: "10/07/2024",
      produto: "Masterclass de SEO",
      comissao: "40%",
      status: "aprovado"
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Produtos</h1>
        <Button 
          className="bg-primary text-primary-foreground hover:bg-primary/90"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Criar produto
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="meus-produtos">Meus produtos</TabsTrigger>
          <TabsTrigger value="coproducoes">Co-produções</TabsTrigger>
          <TabsTrigger value="afiliacoes">Afiliações</TabsTrigger>
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
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="ativo">Ativo</SelectItem>
              <SelectItem value="inativo">Inativo</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <TabsContent value="meus-produtos" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>NOME</TableHead>
                    <TableHead>PREÇO</TableHead>
                    <TableHead>STATUS</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {produtos.length > 0 ? (
                    produtos.map((produto) => (
                      <TableRow key={produto.id}>
                        <TableCell className="font-medium">{produto.nome}</TableCell>
                        <TableCell>{produto.preco}</TableCell>
                        <TableCell>
                          <Badge variant={produto.status === "ativo" ? "default" : "secondary"}>
                            {produto.status === "ativo" ? "Ativo" : "Inativo"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Editar</DropdownMenuItem>
                              <DropdownMenuItem>Ver links de afiliado</DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">
                                Excluir
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-12">
                        <div className="flex flex-col items-center gap-2 text-muted-foreground">
                          <Package className="h-12 w-12" />
                          <p>Nenhum produto encontrado</p>
                          <p className="text-sm">Comece criando seu primeiro produto</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          <div className="text-center">
            <Button variant="link" className="text-primary">
              <ExternalLink className="h-4 w-4 mr-2" />
              Aprenda mais sobre os produtos
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="coproducoes" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>DATA</TableHead>
                    <TableHead>PRODUTO</TableHead>
                    <TableHead>COMISSÃO</TableHead>
                    <TableHead>VENCIMENTO</TableHead>
                    <TableHead>STATUS</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {coproducoes.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.data}</TableCell>
                      <TableCell className="font-medium">{item.produto}</TableCell>
                      <TableCell>{item.comissao}</TableCell>
                      <TableCell>{item.vencimento}</TableCell>
                      <TableCell>
                        <Badge variant="default">
                          {item.status === "ativo" ? "Ativo" : "Inativo"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="afiliacoes" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>DATA</TableHead>
                    <TableHead>PRODUTO</TableHead>
                    <TableHead>COMISSÃO</TableHead>
                    <TableHead>STATUS</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {afiliacoes.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.data}</TableCell>
                      <TableCell className="font-medium">{item.produto}</TableCell>
                      <TableCell>{item.comissao}</TableCell>
                      <TableCell>
                        <Badge variant="default">
                          {item.status === "aprovado" ? "Aprovado" : "Pendente"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <CriarProdutoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  )
}