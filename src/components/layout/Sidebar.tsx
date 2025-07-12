import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  Calendar,
  Video,
  FileText,
  Users,
  Settings,
  Activity,
  ClipboardList,
  UserCheck,
  BarChart3,
  X
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { usuario } = useAuthStore();

  const getMenuItems = () => {
    const baseItems = [
      { icon: Home, label: 'Dashboard', path: '/dashboard', roles: ['paciente', 'medico', 'admin'] }
    ];

    const roleSpecificItems = {
      paciente: [
        { icon: Calendar, label: 'Agendamentos', path: '/agendamentos', roles: ['paciente'] },
        { icon: Video, label: 'Telemedicina', path: '/telemedicina', roles: ['paciente'] },
        { icon: FileText, label: 'Meu Histórico', path: '/historico', roles: ['paciente'] },
        { icon: Activity, label: 'Minha Saúde', path: '/saude', roles: ['paciente'] },
      ],
      medico: [
        { icon: Calendar, label: 'Agendamentos', path: '/agendamentos', roles: ['medico'] },
        { icon: Video, label: 'Telemedicina', path: '/telemedicina', roles: ['medico'] },
        { icon: Users, label: 'Meus Pacientes', path: '/pacientes', roles: ['medico'] },
        { icon: ClipboardList, label: 'Prontuários', path: '/prontuarios', roles: ['medico'] },
        { icon: UserCheck, label: 'Consultas', path: '/consultas', roles: ['medico'] },
      ],
      admin: [
        { icon: Users, label: 'Usuários', path: '/usuarios', roles: ['admin'] },
        { icon: Activity, label: 'Sistema', path: '/sistema', roles: ['admin'] },
      ]
    };

    const commonItems = [
      { icon: Settings, label: 'Configurações', path: '/configuracoes', roles: ['paciente', 'medico', 'admin'] }
    ];

    const userRole = usuario?.tipo as keyof typeof roleSpecificItems;
    const specificItems = roleSpecificItems[userRole] || [];

    return [...baseItems, ...specificItems, ...commonItems].filter(item =>
      item.roles.includes(usuario?.tipo || '')
    );
  };

  const menuItems = getMenuItems();

  return (
    <>
      {/* Overlay para mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out
          lg:relative lg:translate-x-0 lg:shadow-none lg:border-r lg:border-gray-200 dark:border-gray-700
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Header do sidebar */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 lg:hidden">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-2 rounded-lg">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-gray-900 dark:text-white">SGHSS</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">Gestão Hospitalar</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Menu de navegação */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => onClose()}
                className={`
                  flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200
                  ${isActive
                    ? 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 border-r-4 border-blue-600 dark:from-blue-900/20 dark:to-blue-800/20 dark:text-blue-400'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                  }
                `}
              >
                <Icon className={`h-5 w-5 ${isActive ? 'text-blue-600 dark:text-blue-400' : ''}`} />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer do sidebar */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-4 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full">
                <Activity className="h-4 w-4 text-green-600 dark:text-green-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-green-800 dark:text-green-200">Sistema Online</p>
                <p className="text-xs text-green-600 dark:text-green-400">Todos os serviços funcionando</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
