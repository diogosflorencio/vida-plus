import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import imageLogo from '@/assets/image.png';

const RegistroForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !senha || !confirmarSenha) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive"
      });
      return;
    }

    if (senha !== confirmarSenha) {
      toast({
        title: "Senhas não coincidem",
        description: "As senhas digitadas devem ser iguais.",
        variant: "destructive"
      });
      return;
    }

    setCarregando(true);
    
    try {
      // Simulação de registro
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Registro realizado com sucesso!",
        description: "Sua conta foi criada. Faça login para continuar.",
      });
      navigate('/login');
    } catch (error) {
      toast({
        title: "Erro no registro",
        description: "Tente novamente em alguns instantes.",
        variant: "destructive"
      });
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
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
              <h1 className="text-3xl font-bold text-gray-800 mb-2">REGISTRO</h1>
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

              <div>
                <label htmlFor="confirmarSenha" className="block text-sm font-medium text-gray-700 mb-2">
                  Repetir a Senha:
                </label>
                <Input
                  id="confirmarSenha"
                  type={mostrarSenha ? 'text' : 'password'}
                  value={confirmarSenha}
                  onChange={(e) => setConfirmarSenha(e.target.value)}
                  placeholder="Repita sua senha aqui..."
                  className="w-full"
                  required
                />
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
                      <span>Criando conta...</span>
                    </div>
                  ) : (
                    'Criar Conta'
                  )}
                </Button>

                <Link to="/login">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full border-gray-600 text-gray-600 hover:bg-gray-50"
                  >
                    Fazer Login
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

export default RegistroForm;
