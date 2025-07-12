
/**
 * Store de Autenticação - Vida+ Sistema Hospitalar
 * 
 * Gerencia o estado de autenticação dos usuários, incluindo login, logout
 * e persistência dos dados do usuário logado.
 * 
 * @author Diogo Florencio
 * @version 1.0.0
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Usuario } from '@/types';

// Interface que define a estrutura do estado de autenticação
interface AuthState {
  usuario: Usuario | null;           // Dados do usuário logado
  isAuthenticated: boolean;          // Status de autenticação
  login: (email: string, senha: string) => Promise<boolean>;  // Função de login
  logout: () => void;                // Função de logout
  updateUser: (userData: Partial<Usuario>) => void;  // Atualizar dados do usuário
}

// Dados mockados para demonstração do sistema
// Em produção, isso seria substituído por chamadas à API
const mockUsuarios: Usuario[] = [
  {
    id: '1',
    nome: 'Dr. Carlos Silva',
    email: 'medico@email.com',
    cpf: '12345678901',
    telefone: '11987654321',
    tipo: 'medico',
    crm: '12345-SP',
    especialidade: 'Cardiologia',
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face'
  },
  {
    id: '2',
    nome: 'Maria Santos',
    email: 'paciente@email.com',
    cpf: '98765432100',
    telefone: '11876543210',
    tipo: 'paciente',
    dataNascimento: '1985-03-15',
    endereco: 'Rua das Flores, 123 - São Paulo',
    convenio: 'Unimed',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b647?w=400&h=400&fit=crop&crop=face'
  },
  {
    id: '3',
    nome: 'Admin Sistema',
    email: 'admin@email.com',
    cpf: '11111111111',
    telefone: '1133334444',
    tipo: 'admin',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face'
  }
];

// Criação do store usando Zustand com persistência
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      // Estado inicial
      usuario: null,
      isAuthenticated: false,
      
      // Função de login - simula autenticação com dados mockados
      login: async (email: string, senha: string) => {
        // TODO: Em produção, fazer chamada para API de autenticação
        const usuario = mockUsuarios.find(u => u.email === email);
        
        // Senha padrão para demonstração: '123'
        if (usuario && senha === '123') {
          set({ usuario, isAuthenticated: true });
          return true;
        }
        return false;
      },
      
      // Função de logout - limpa dados do usuário
      logout: () => {
        set({ usuario: null, isAuthenticated: false });
      },
      
      // Atualiza dados do usuário logado
      updateUser: (userData) => {
        set((state) => ({
          usuario: state.usuario ? { ...state.usuario, ...userData } : null
        }));
      }
    }),
    {
      name: 'auth-storage' // Nome da chave no localStorage
    }
  )
);
