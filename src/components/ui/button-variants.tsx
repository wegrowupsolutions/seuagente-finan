import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface HeroButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export function HeroButton({ children, className, ...props }: HeroButtonProps) {
  return (
    <Button
      className={cn(
        "bg-gradient-primary text-primary-foreground font-semibold px-8 py-3 text-lg shadow-elegant hover:shadow-lg transition-all duration-300 hover:scale-105",
        className
      )}
      {...props}
    >
      {children}
    </Button>
  )
}

interface GhostButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export function GhostButton({ children, className, ...props }: GhostButtonProps) {
  return (
    <Button
      variant="ghost"
      className={cn(
        "text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200",
        className
      )}
      {...props}
    >
      {children}
    </Button>
  )
}