import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, Upload, ExternalLink } from "lucide-react"

const productFormSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  product_type: z.string().min(1, "Tipo de produto é obrigatório"),
  price: z.number().min(0, "Preço deve ser maior que zero"),
  payment_type: z.string().min(1, "Tipo de pagamento é obrigatório"),
  status: z.string().min(1, "Status é obrigatório"),
  description: z.string().optional(),
  image_url: z.string().optional(),
  commission_rate: z.number().min(0).max(100).optional(),
  facebook_pixel: z.string().optional(),
  google_analytics_pixel: z.string().optional(),
})

type ProductFormData = z.infer<typeof productFormSchema>

export default function EditarProduto() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: "",
      product_type: "",
      price: 0,
      payment_type: "",
      status: "ativo",
      description: "",
      image_url: "",
      commission_rate: 0,
      facebook_pixel: "",
      google_analytics_pixel: "",
    },
  })

  const fetchProduct = async () => {
    if (!id) return

    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .maybeSingle()

      if (error) {
        throw error
      }

      if (!data) {
        toast({
          title: "Erro",
          description: "Produto não encontrado",
          variant: "destructive",
        })
        navigate('/produtos')
        return
      }

      form.reset({
        name: data.name,
        product_type: data.product_type,
        price: Number(data.price),
        payment_type: data.payment_type,
        status: data.status,
        description: data.description || "",
        image_url: data.image_url || "",
        commission_rate: Number(data.commission_rate) || 0,
        facebook_pixel: data.facebook_pixel || "",
        google_analytics_pixel: data.google_analytics_pixel || "",
      })
    } catch (error: any) {
      toast({
        title: "Erro",
        description: "Erro ao carregar produto",
        variant: "destructive",
      })
      navigate('/produtos')
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = async (data: ProductFormData) => {
    if (!id) return

    try {
      setSaving(true)
      const { error } = await supabase
        .from('products')
        .update({
          name: data.name,
          product_type: data.product_type,
          price: data.price,
          payment_type: data.payment_type,
          status: data.status,
          description: data.description,
          image_url: data.image_url,
          commission_rate: data.commission_rate,
          facebook_pixel: data.facebook_pixel,
          google_analytics_pixel: data.google_analytics_pixel,
        })
        .eq('id', id)

      if (error) {
        throw error
      }

      toast({
        title: "Sucesso",
        description: "Produto atualizado com sucesso",
      })

      navigate('/produtos')
    } catch (error: any) {
      toast({
        title: "Erro",
        description: "Erro ao atualizar produto",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  useEffect(() => {
    fetchProduct()
  }, [id])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">Carregando produto...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/produtos')}
          className="hover:bg-accent"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Editar Produto</h1>
          <p className="text-muted-foreground">
            Atualize as informações do seu produto
          </p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Dados do Produto */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Dados do Produto</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome do Produto</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: Curso de Marketing Digital" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="product_type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tipo de Produto</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione o tipo" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="curso-online">Curso Online</SelectItem>
                              <SelectItem value="mentoria">Mentoria</SelectItem>
                              <SelectItem value="evento-online">Evento Online</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Status</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="ativo">Ativo</SelectItem>
                              <SelectItem value="inativo">Inativo</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Preço (R$)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              step="0.01"
                              placeholder="0,00"
                              {...field}
                              onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="payment_type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tipo de Pagamento</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione o tipo" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="unico">Pagamento Único</SelectItem>
                              <SelectItem value="recorrente">Recorrente</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Descrição do Produto</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Descreva detalhes do seu produto, benefícios e diferenciais..."
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Afiliação */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Configurações de Afiliação</CardTitle>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="commission_rate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Taxa de Comissão (%)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.01"
                            max="100"
                            placeholder="Ex: 20.00"
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Pixels de Rastreamento */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Pixels de Rastreamento</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="facebook_pixel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Facebook Pixel ID</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: 123456789012345" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="google_analytics_pixel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Google Analytics ID</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: GA-XXXXXXXXX-X" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Imagem do Produto */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Imagem do Produto</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="image_url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>URL da Imagem</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://exemplo.com/imagem.jpg"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {form.watch("image_url") && (
                    <div className="mt-4">
                      <Label className="text-sm font-medium">Preview</Label>
                      <div className="mt-2 border rounded-lg overflow-hidden">
                        <img
                          src={form.watch("image_url")}
                          alt="Preview do produto"
                          className="w-full h-48 object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none'
                          }}
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-2 p-4 bg-muted rounded-lg">
                    <Upload className="h-4 w-4 text-muted-foreground" />
                    <div className="text-sm text-muted-foreground">
                      Recomendamos imagens de 800x600px ou superior
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Ações */}
              <Card>
                <CardContent className="pt-6 space-y-3">
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={saving}
                  >
                    {saving ? "Salvando..." : "Salvar Alterações"}
                  </Button>
                  
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => navigate('/produtos')}
                  >
                    Cancelar
                  </Button>

                  <div className="pt-2 border-t">
                    <Button
                      type="button"
                      variant="link"
                      className="w-full text-sm"
                      size="sm"
                    >
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Ver produto publicado
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}