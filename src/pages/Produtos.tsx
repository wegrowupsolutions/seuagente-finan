import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { CriarProdutoModal } from "@/components/produtos/CriarProdutoModal"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"
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

type Product = {
  id: string
  name: string
  product_type: string
  price: number
  status: string
  created_at: string
}

export default function Produtos() {
  const [activeTab, setActiveTab] = useState("meus-produtos")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("todos")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [produtos, setProdutos] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  
  const { toast } = useToast()
  const navigate = useNavigate()

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        throw error
      }

      setProdutos(data || [])
    } catch (error: any) {
      toast({
        title: "Erro",
        description: "Erro ao carregar produtos",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const deleteProduct = async (productId: string) => {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId)

      if (error) {
        throw error
      }

      toast({
        title: "Sucesso",
        description: "Produto excluído com sucesso",
      })

      // Refresh the products list
      fetchProducts()
    } catch (error: any) {
      toast({
        title: "Erro",
        description: "Erro ao excluir produto",
        variant: "destructive",
      })
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const getProductTypeDisplayName = (type: string) => {
    switch (type) {
      case 'curso-online':
        return 'Curso online'
      case 'mentoria':
        return 'Mentoria'
      case 'evento-online':
        return 'Evento Online'
      default:
        return type
    }
  }

  const filteredProdutos = produtos.filter(produto => {
    const matchesSearch = produto.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "todos" || produto.status === statusFilter
    return matchesSearch && matchesStatus
  })

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
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-12">
                        Carregando produtos...
                      </TableCell>
                    </TableRow>
                  ) : filteredProdutos.length > 0 ? (
                    filteredProdutos.map((produto) => (
                      <TableRow key={produto.id}>
                        <TableCell className="font-medium">{produto.name}</TableCell>
                        <TableCell>R$ {produto.price.toFixed(2)}</TableCell>
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
                              <DropdownMenuItem 
                                onClick={() => navigate(`/produtos/editar/${produto.id}`)}
                              >
                                Editar
                              </DropdownMenuItem>
                              <DropdownMenuItem>Ver links de afiliado</DropdownMenuItem>
                              <DropdownMenuItem 
                                className="text-destructive"
                                onClick={() => deleteProduct(produto.id)}
                              >
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
        onProductCreated={fetchProducts}
      />
    </div>
  )
}