import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, Menu, User, LogOut, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuthStore } from '@/store/authStore';
import { Badge } from '@/components/ui/badge';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { usuario, logout } = useAuthStore();

  const getNotificationsByUserType = () => {
    if (usuario?.tipo === 'paciente') {
      return [
        { id: 1, texto: 'Consulta agendada para amanhã às 14:00', tipo: 'info' },
        { id: 2, texto: 'Resultado de exame disponível', tipo: 'success' },
        { id: 3, texto: 'Lembrete: Tomar medicação às 20:00', tipo: 'warning' }
      ];
    } else if (usuario?.tipo === 'medico') {
      return [
        { id: 1, texto: '3 consultas agendadas para hoje', tipo: 'info' },
        { id: 2, texto: 'Prontuário de Maria Santos atualizado', tipo: 'success' },
        { id: 3, texto: 'Telemedicina às 15:30 com João Silva', tipo: 'warning' }
      ];
    } else if (usuario?.tipo === 'admin') {
      return [
        { id: 1, texto: 'Backup do sistema concluído', tipo: 'success' },
        { id: 2, texto: 'Novo usuário cadastrado no sistema', tipo: 'info' },
        { id: 3, texto: 'Atualização do sistema disponível', tipo: 'warning' }
      ];
    }
    return [];
  };

  const notificacoes = getNotificationsByUserType();

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 lg:px-6 relative z-10 dark:bg-gray-900 dark:border-gray-700">
      <div className="flex items-center justify-between">
        {/* Menu mobile e logo */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuClick}
            className="lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="hidden lg:flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-2 rounded-lg">
              <User className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-gray-900 dark:text-white">SGHSS</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">Sistema de Gestão Hospitalar</p>
            </div>
          </div>
        </div>

        {/* Ações do usuário */}
        <div className="flex items-center space-x-2">
          {/* Notificações */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                 {notificacoes.length > 0 && (
                   <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs bg-red-500 flex items-center justify-center">
                     {notificacoes.length}
                   </Badge>
                 )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="end" 
              className="w-80 z-[9999] bg-background border shadow-lg max-h-[80vh] overflow-y-auto"
              sideOffset={8}
              avoidCollisions={true}
              collisionPadding={10}
            >
              <div className="px-4 py-3 border-b sticky top-0 bg-background">
                <h3 className="font-semibold text-gray-900 dark:text-white">Notificações</h3>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notificacoes.map((notif) => (
                  <DropdownMenuItem 
                    key={notif.id} 
                    className="px-4 py-3 border-b last:border-b-0 cursor-pointer focus:bg-gray-50 dark:focus:bg-gray-800 flex items-start space-x-3"
                  >
                    <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                      notif.tipo === 'success' ? 'bg-green-500' :
                      notif.tipo === 'warning' ? 'bg-yellow-500' :
                      'bg-blue-500'
                    }`} />
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed flex-1">{notif.texto}</p>
                  </DropdownMenuItem>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Perfil do usuário */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2 px-3 py-2">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                    {usuario?.nome?.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </span>
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {usuario?.nome?.split(' ').slice(0, 2).join(' ')}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                    {usuario?.tipo}
                  </p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="end" 
              className="w-56 z-[9999] bg-background border shadow-lg"
              sideOffset={8}
              avoidCollisions={true}
              collisionPadding={10}
            >
              <div className="px-3 py-2 border-b">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{usuario?.nome}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{usuario?.tipo}</p>
              </div>
              <Link to="/configuracoes">
                <DropdownMenuItem className="px-3 py-2 cursor-pointer focus:bg-gray-50 dark:focus:bg-gray-800">
                  <Settings className="h-4 w-4 mr-2" />
                  Meu Perfil
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={logout} 
                className="px-3 py-2 text-red-600 dark:text-red-400 cursor-pointer focus:bg-red-50 dark:focus:bg-red-900/20"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
