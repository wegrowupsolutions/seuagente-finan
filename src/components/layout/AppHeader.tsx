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

export function AppHeader() {
  const [showWarningBanner, setShowWarningBanner] = useState(true)
  const userEmail = "v...xtx@gmai..."
  const balance = { available: "0", pending: "0" }

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
                <span className="text-sm">{userEmail}</span>
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
              <DropdownMenuItem className="text-destructive">
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}