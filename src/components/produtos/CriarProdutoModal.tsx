import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"

interface CriarProdutoModalProps {
  isOpen: boolean
  onClose: () => void
  onProductCreated: () => void
}

export function CriarProdutoModal({ isOpen, onClose, onProductCreated }: CriarProdutoModalProps) {
  const [nome, setNome] = useState("")
  const [tipoProduto, setTipoProduto] = useState("")
  const [valor, setValor] = useState("")
  const [tipoPagamento, setTipoPagamento] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  
  const { toast } = useToast()

  const handleSubmit = async () => {
    if (!nome || !tipoProduto || !valor || !tipoPagamento) {
      toast({
        title: "Erro",
        description: "Todos os campos são obrigatórios",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    
    try {
      // Convert valor to number
      const price = parseFloat(valor.replace(/[^\d,]/g, '').replace(',', '.'))
      
      if (isNaN(price) || price <= 0) {
        toast({
          title: "Erro",
          description: "Valor do produto deve ser um número válido",
          variant: "destructive",
        })
        return
      }

      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        toast({
          title: "Erro",
          description: "Você precisa estar logado para criar um produto",
          variant: "destructive",
        })
        return
      }

      const { error } = await supabase
        .from('products')
        .insert({
          name: nome,
          product_type: tipoProduto,
          price: price,
          payment_type: tipoPagamento,
          user_id: user.id
        })

      if (error) {
        throw error
      }

      toast({
        title: "Sucesso",
        description: "Produto criado com sucesso!",
      })

      // Resetar o formulário
      setNome("")
      setTipoProduto("")
      setValor("")
      setTipoPagamento("")
      onClose()
      onProductCreated()
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message || "Erro ao criar produto",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Criar Produto</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="nome">Nome do produto</Label>
            <Input
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Digite o nome do produto"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="tipo-produto">Tipo de produto</Label>
            <Select value={tipoProduto} onValueChange={setTipoProduto}>
              <SelectTrigger id="tipo-produto">
                <SelectValue placeholder="Selecione o tipo de produto" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="curso-online">Curso online</SelectItem>
                <SelectItem value="mentoria">Mentorias</SelectItem>
                <SelectItem value="evento-online">Evento Online</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="valor">Valor do produto</Label>
            <Input
              id="valor"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              placeholder="R$ 0,00"
              type="text"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="tipo-pagamento">Tipo de pagamento</Label>
            <Select value={tipoPagamento} onValueChange={setTipoPagamento}>
              <SelectTrigger id="tipo-pagamento">
                <SelectValue placeholder="Selecione o tipo de pagamento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="unico">Pagamento único</SelectItem>
                <SelectItem value="recorrente">Pagamento recorrente</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>Cancelar</Button>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? "Criando..." : "Criar produto"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}