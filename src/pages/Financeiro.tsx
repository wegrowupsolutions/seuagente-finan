import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { DollarSign, Wallet, Clock, Shield, ExternalLink, Info } from "lucide-react"

export default function Financeiro() {
  const [activeTab, setActiveTab] = useState("saques")
  const [pixKey, setPixKey] = useState("")
  const [accountType, setAccountType] = useState("cpf")

  const saldoDisponivel = "0,00"
  const saldoPendente = "0,00"

  const historicoSaques = [
    {
      id: 1,
      data: "15/07/2024",
      valor: "R$ 500,00",
      status: "processado"
    },
    {
      id: 2,
      data: "01/07/2024",
      valor: "R$ 1.250,00",
      status: "concluído"
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Financeiro</h1>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Wallet className="h-4 w-4 mr-2" />
          Efetuar saque
        </Button>
      </div>

      {/* Balance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Saldo disponível
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <DollarSign className="h-8 w-8 text-primary" />
              <span className="text-3xl font-bold">R$ {saldoDisponivel}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              Saldo pendente
              <Info className="h-4 w-4 cursor-help" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Clock className="h-8 w-8 text-warning" />
              <span className="text-3xl font-bold">R$ {saldoPendente}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full max-w-2xl grid-cols-4">
          <TabsTrigger value="saques">Saques</TabsTrigger>
          <TabsTrigger value="dados-bancarios">Dados bancários</TabsTrigger>
          <TabsTrigger value="taxas">Taxas e Prazos</TabsTrigger>
          <TabsTrigger value="identidade">Identidade</TabsTrigger>
        </TabsList>

        <TabsContent value="saques" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Saques</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>DATA</TableHead>
                    <TableHead>VALOR</TableHead>
                    <TableHead>STATUS</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {historicoSaques.map((saque) => (
                    <TableRow key={saque.id}>
                      <TableCell>{saque.data}</TableCell>
                      <TableCell className="font-medium">{saque.valor}</TableCell>
                      <TableCell>
                        <Badge variant={saque.status === "concluído" ? "default" : "secondary"}>
                          {saque.status === "concluído" ? "Concluído" : "Processando"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          <div className="text-center">
            <Button variant="link" className="text-primary">
              <ExternalLink className="h-4 w-4 mr-2" />
              Em quanto tempo o saque cai na minha conta?
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="dados-bancarios" className="space-y-4">
          <Alert>
            <Shield className="h-4 w-4" />
            <AlertDescription>
              Você precisa verificar a sua identidade antes de alterar os dados bancários.
            </AlertDescription>
          </Alert>

          <Card>
            <CardHeader>
              <CardTitle>Dados Bancários</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="pix-key">Chave Pix</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="pix-key"
                    value={pixKey}
                    onChange={(e) => setPixKey(e.target.value)}
                    placeholder="Preencha com uma chave Pix da mesma titularidade do seu CPF/CNPJ"
                    className="flex-1"
                  />
                  <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                </div>
              </div>
              
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                Salvar alterações
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="taxas" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Vendas para o Brasil</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Button variant="link" className="p-0 text-primary">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Aprenda mais sobre o recebimento de cartão em 2 dias
                </Button>
              </div>
              
              <div className="space-y-2">
                <p><strong>Suas taxas (produtor):</strong> 8.99% + R$ 2,49 por venda aprovada</p>
                <div>
                  <p><strong>Prazo de recebimento:</strong></p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Cartão: 15 dias <Button variant="link" className="p-0 text-primary text-sm">(Solicitar recebimento em 2 dias)</Button></li>
                    <li>Boleto: 2 dias</li>
                    <li>Pix: 2 dias</li>
                  </ul>
                </div>
                <p><strong>Reserva de segurança:</strong> 4% por 30 dias para cobrir reembolsos e chargebacks</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Vendas Internacionais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p><strong>Suas taxas (internacional):</strong> 8.99% + US$ 0.49 por venda aprovada</p>
              <p><strong>Prazo de recebimento:</strong> 30 dias</p>
              <p><strong>Reserva de segurança:</strong> 5% por 45 dias</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="identidade" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Completar Cadastro</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground">
                Preencha os seus dados para finalizar o seu cadastro e começar a vender.
              </p>
              
              <RadioGroup value={accountType} onValueChange={setAccountType}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cnpj" id="cnpj" />
                  <Label htmlFor="cnpj">Eu quero receber na minha empresa. Já tenho um CNPJ aberto.</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cpf" id="cpf" />
                  <Label htmlFor="cpf">Eu quero receber na minha conta pessoa física (CPF).</Label>
                </div>
              </RadioGroup>
              
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                Continuar
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}