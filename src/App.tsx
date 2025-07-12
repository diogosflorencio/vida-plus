
/**
 * Vida+ - Sistema de Gestão Hospitalar
 * 
 * Este é o componente principal da aplicação que configura todas as rotas
 * e providers necessários para o funcionamento do sistema.
 * 
 * @author Diogo Florencio
 * @version 1.0.0
 */

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

// Importações das páginas principais
import LoginForm from "@/components/forms/LoginForm";
import RegistroForm from "@/components/forms/RegistroForm";
import Layout from "@/components/layout/Layout";
import Dashboard from "@/pages/Dashboard";
import Telemedicina from "@/pages/Telemedicina";
import Agendamentos from "@/pages/Agendamentos";
import Pacientes from "@/pages/Pacientes";
import Configuracoes from "@/pages/Configuracoes";
import Prontuarios from "@/pages/Prontuarios";
import Consultas from "@/pages/Consultas";
import Usuarios from "@/pages/Usuarios";
import HistoricoMedico from "@/pages/HistoricoMedico";
import MinhaSaude from "@/pages/MinhaSaude";
import Sistema from "@/pages/Sistema";
import ProtectedRoute from "@/components/ProtectedRoute";

// Configuração do cliente React Query para cache e gerenciamento de estado
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // Tenta apenas 1 vez em caso de erro
      staleTime: 5 * 60 * 1000, // 5 minutos
    },
  },
});

const App = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="sghss-theme">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
          <Routes>
            {/* ===== ROTAS PÚBLICAS ===== */}
            {/* Login - redireciona para dashboard se já estiver logado */}
            <Route 
              path="/login" 
              element={
                isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginForm />
              } 
            />
            {/* Registro - redireciona para dashboard se já estiver logado */}
            <Route 
              path="/registro" 
              element={
                isAuthenticated ? <Navigate to="/dashboard" replace /> : <RegistroForm />
              } 
            />

            {/* ===== ROTAS PROTEGIDAS (requer autenticação) ===== */}
            <Route 
              path="/" 
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              {/* Dashboard principal - página inicial após login */}
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              
              {/* Telemedicina - disponível para todos os usuários logados */}
              <Route path="telemedicina" element={<Telemedicina />} />
              
              {/* ===== ROTAS ESPECÍFICAS DO MÉDICO ===== */}
              <Route path="pacientes" element={<ProtectedRoute requiredRole="medico"><Pacientes /></ProtectedRoute>} />
              <Route path="prontuarios" element={<ProtectedRoute requiredRole="medico"><Prontuarios /></ProtectedRoute>} />
              <Route path="consultas" element={<ProtectedRoute requiredRole="medico"><Consultas /></ProtectedRoute>} />
              
              {/* Configurações - disponível para todos */}
              <Route path="configuracoes" element={<Configuracoes />} />
              
              {/* ===== ROTAS ESPECÍFICAS DO PACIENTE ===== */}
              <Route path="agendamentos" element={<Agendamentos />} />
              <Route path="historico" element={<ProtectedRoute requiredRole="paciente"><HistoricoMedico /></ProtectedRoute>} />
              <Route path="saude" element={<ProtectedRoute requiredRole="paciente"><MinhaSaude /></ProtectedRoute>} />
              
              {/* ===== ROTAS ESPECÍFICAS DO ADMIN ===== */}
              <Route path="usuarios" element={<ProtectedRoute requiredRole="admin"><Usuarios /></ProtectedRoute>} />
              <Route path="sistema" element={<ProtectedRoute requiredRole="admin"><Sistema /></ProtectedRoute>} />
            </Route>

            {/* Rota de fallback - redireciona para login ou dashboard */}
            <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} />
          </Routes>
        </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
