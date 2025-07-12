/**
 * Componente de Login - Vida+ Sistema Hospitalar
 * 
 * Formulário de autenticação com validação de campos e feedback visual.
 * Permite acesso ao sistema para médicos, pacientes e administradores.
 * 
 * @author Diogo Florencio
 * @version 1.0.0
 */

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import imageLogo from '@/assets/image.png';

const LoginForm: React.FC = () => {
  // Estados do formulário
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [carregando, setCarregando] = useState(false);
  
  // Hooks do sistema
  const { login } = useAuthStore();
  const navigate = useNavigate();

  /**
   * Função que processa o envio do formulário de login
   * Valida campos obrigatórios e tenta autenticar o usuário
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação básica dos campos
    if (!email || !senha) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha email e senha.",
        variant: "destructive"
      });
      return;
    }

    setCarregando(true);
    
    try {
      // Tenta fazer login com as credenciais fornecidas
      const sucesso = await login(email, senha);
      
      if (sucesso) {
        toast({
          title: "Login realizado com sucesso!",
          description: "Bem-vindo ao sistema hospitalar.",
        });
        navigate('/dashboard');
      } else {
        toast({
          title: "Erro no login",
          description: "Email ou senha incorretos. Tente novamente.",
          variant: "destructive"
        });
      }
    } catch (error) {
      // Tratamento de erro genérico
      toast({
        title: "Erro no sistema",
        description: "Tente novamente em alguns instantes.",
        variant: "destructive"
      });
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 relative">
      {/* Informações do desenvolvedor */}
      <div className="absolute bottom-4 right-4 text-xs text-gray-500 bg-white/80 px-2 py-1 rounded">
        Diogo da Silva Florêncio - RU: 4330568
      </div>
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl w-full mx-4">
        <div className="flex">
          {/* Lado esquerdo - Imagem */}
          <div className="hidden md:flex md:w-1/2 bg-gray-200 items-center justify-center">
            <img 
              src={imageLogo} 
              alt="Logo do Sistema Hospitalar" 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Lado direito - Formulário */}
          <div className="w-full md:w-1/2 p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">LOGIN</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  E-mail:
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Digite seu e-mail aqui..."
                  className="w-full"
                  required
                />
              </div>

              <div>
                <label htmlFor="senha" className="block text-sm font-medium text-gray-700 mb-2">
                  Senha:
                </label>
                <div className="relative">
                  <Input
                    id="senha"
                    type={mostrarSenha ? 'text' : 'password'}
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    placeholder="Digite sua senha aqui..."
                    className="w-full pr-10"
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setMostrarSenha(!mostrarSenha)}
                  >
                    {mostrarSenha ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-600 mb-4">Esqueceu a senha?</p>
              </div>

              <div className="space-y-6">
                <Button
                  type="submit"
                  className="w-full bg-gray-600 hover:bg-gray-700 text-white mb-3"
                  disabled={carregando}
                >
                  {carregando ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Entrando...</span>
                    </div>
                  ) : (
                    'Fazer Login'
                  )}
                </Button>

                <Link to="/registro">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full border-gray-600 text-gray-600 hover:bg-gray-50"
                  >
                    Registrar
                  </Button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
