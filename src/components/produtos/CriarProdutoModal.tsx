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

interface CriarProdutoModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CriarProdutoModal({ isOpen, onClose }: CriarProdutoModalProps) {
  const [nome, setNome] = useState("")
  const [tipoProduto, setTipoProduto] = useState("")
  const [valor, setValor] = useState("")
  const [tipoPagamento, setTipoPagamento] = useState("")

  const handleSubmit = () => {
    // Aqui você pode adicionar a lógica para salvar o produto
    console.log({
      nome,
      tipoProduto,
      valor,
      tipoPagamento
    })
    // Resetar o formulário
    setNome("")
    setTipoProduto("")
    setValor("")
    setTipoPagamento("")
    onClose()
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
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button onClick={handleSubmit}>Criar produto</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}