import { useState } from "react"
import { ChevronDown, X, CheckCircle, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { SidebarTrigger } from "@/components/ui/sidebar"
import seuagenteLogo from "@/assets/seuagente-logo.png"
import { useAuth } from "@/components/auth/AuthProvider"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"
import { useNavigate } from "react-router-dom"

export function AppHeader() {
  const [showWarningBanner, setShowWarningBanner] = useState(true)
  const { user } = useAuth()
  const { toast } = useToast()
  const navigate = useNavigate()
  const balance = { available: "0", pending: "0" }

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) {
        toast({
          title: "Erro",
          description: "Erro ao fazer logout",
          variant: "destructive",
        })
      } else {
        toast({
          title: "Sucesso",
          description: "Logout realizado com sucesso",
        })
        navigate("/login")
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro inesperado",
        variant: "destructive",
      })
    }
  }

  const getUserDisplayEmail = () => {
    if (!user?.email) return "Usuário"
    const email = user.email
    if (email.length > 15) {
      const [localPart, domain] = email.split("@")
      const truncatedLocal = localPart.slice(0, 3) + "..."
      const truncatedDomain = domain.slice(0, 4) + "..."
      return `${truncatedLocal}@${truncatedDomain}`
    }
    return email
  }

  return (
    <div className="w-full bg-card border-b border-border">
      {/* Warning Banner */}
      {showWarningBanner && (
        <div className="bg-warning/10 border-b border-warning/20 px-4 py-2">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-warning" />
              <span className="text-sm text-warning-foreground">
                Você precisa completar o seu cadastro antes de começar a vender
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowWarningBanner(false)}
              className="h-6 w-6 p-0 text-warning hover:bg-warning/20"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Main Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="hover:bg-muted" />
          <img 
            src={seuagenteLogo} 
            alt="SeuAgente.ai Logo" 
            className="h-8 w-auto"
          />
        </div>

        <div className="flex items-center gap-4">
          {/* Balance Display */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>R$ {balance.available}K / {balance.pending}</span>
            <Info className="h-4 w-4 cursor-help" />
          </div>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2">
                <span className="text-sm">{getUserDisplayEmail()}</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>
                Mudar para Produtor
              </DropdownMenuItem>
              <DropdownMenuItem>
                Meu perfil
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}