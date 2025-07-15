import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import Produtos from "./pages/Produtos";
import Afiliados from "./pages/Afiliados";
import Financeiro from "./pages/Financeiro";
import Vendas from "./pages/Vendas";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/produtos" element={<Produtos />} />
            <Route path="/afiliados" element={<Afiliados />} />
            <Route path="/financeiro" element={<Financeiro />} />
            <Route path="/membros" element={<Dashboard />} />
            <Route path="/vendas" element={<Vendas />} />
            <Route path="/assinaturas" element={<Dashboard />} />
            <Route path="/relatorios" element={<Dashboard />} />
            <Route path="/colaboradores" element={<Dashboard />} />
            <Route path="/apps" element={<Dashboard />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
