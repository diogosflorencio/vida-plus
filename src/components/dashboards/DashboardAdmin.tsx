
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Activity,
  Database,
  Shield,
  Server,
  UserPlus,
  Settings,
  AlertTriangle,
  CheckCircle,
  TrendingUp
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const DashboardAdmin: React.FC = () => {
  const { usuario } = useAuthStore();

  const stats = [
    {
      title: 'Usuários Ativos',
      value: '156',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      description: '+12 este mês',
      trend: 'up'
    },
    {
      title: 'Status do Sistema',
      value: 'Online',
      icon: Server,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      description: '99.9% uptime',
      trend: 'stable'
    },
    {
      title: 'Segurança',
      value: 'Ativa',
      icon: Shield,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      description: 'Sem ameaças',
      trend: 'stable'
    },
    {
      title: 'Backup',
      value: 'Atualizado',
      icon: Database,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      description: 'Hoje às 02:00',
      trend: 'up'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'user',
      message: 'Novo médico cadastrado: Dr. Carlos Silva',
      time: '2 horas atrás',
      icon: UserPlus,
      color: 'text-green-600'
    },
    {
      id: 2,
      type: 'system',
      message: 'Backup automático concluído com sucesso',
      time: '6 horas atrás',
      icon: CheckCircle,
      color: 'text-blue-600'
    },
    {
      id: 3,
      type: 'alert',
      message: 'Uso de memória do servidor: 75%',
      time: '1 dia atrás',
      icon: AlertTriangle,
      color: 'text-yellow-600'
    },
    {
      id: 4,
      type: 'user',
      message: '5 novos pacientes cadastrados hoje',
      time: '1 dia atrás',
      icon: Users,
      color: 'text-purple-600'
    }
  ];

  const systemHealth = [
    { service: 'Servidor Web', status: 'online', uptime: '99.9%' },
    { service: 'Base de Dados', status: 'online', uptime: '99.8%' },
    { service: 'Sistema de Backup', status: 'online', uptime: '98.5%' },
    { service: 'API Gateway', status: 'online', uptime: '99.7%' }
  ];

  return (
    <div className="space-y-6">
      {/* Saudação */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              Bem-vindo, {usuario?.nome?.split(' ')[0]}! 👨‍💼
            </h1>
            <p className="text-purple-100">
              Administrador do Sistema | Painel de Controle
            </p>
            <p className="text-purple-100 mt-1">
              Sistema funcionando perfeitamente com 156 usuários ativos
            </p>
          </div>
          <div className="hidden md:block">
            <Shield className="h-16 w-16 text-white opacity-20" />
          </div>
        </div>
      </div>

      {/* Cards de estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div className="text-right">
                    {stat.trend === 'up' && <TrendingUp className="h-4 w-4 text-green-500" />}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-500">
                    {stat.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Atividades recentes e status do sistema */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Atividades recentes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5" />
              <span>Atividades Recentes</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => {
                const Icon = activity.icon;
                return (
                  <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className={`p-2 rounded-full bg-white`}>
                      <Icon className={`h-4 w-4 ${activity.color}`} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.message}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Status do sistema */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Server className="h-5 w-5" />
              <span>Status dos Serviços</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {systemHealth.map((service, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div>
                      <p className="font-medium text-gray-900">{service.service}</p>
                      <p className="text-sm text-gray-600">Uptime: {service.uptime}</p>
                    </div>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                    {service.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Ações rápidas */}
      <Card>
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Link to="/usuarios">
              <Button className="h-20 w-full flex flex-col space-y-2 bg-blue-600 hover:bg-blue-700">
                <Users className="h-6 w-6" />
                <span className="text-sm">Gerenciar Usuários</span>
              </Button>
            </Link>
            <Link to="/sistema">
              <Button variant="outline" className="h-20 w-full flex flex-col space-y-2">
                <Server className="h-6 w-6" />
                <span className="text-sm">Sistema</span>
              </Button>
            </Link>
            <Link to="/configuracoes">
              <Button variant="outline" className="h-20 w-full flex flex-col space-y-2">
                <Settings className="h-6 w-6" />
                <span className="text-sm">Configurações</span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Alertas importantes */}
      <Card className="border-l-4 border-l-yellow-500">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-yellow-600" />
            <span>Alertas do Sistema</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mt-1" />
              <div>
                <p className="font-medium text-yellow-800">Uso de Memória</p>
                <p className="text-sm text-yellow-700">
                  O servidor está utilizando 75% da memória disponível. Considere otimizar recursos.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
              <CheckCircle className="h-5 w-5 text-blue-600 mt-1" />
              <div>
                <p className="font-medium text-blue-800">Backup Atualizado</p>
                <p className="text-sm text-blue-700">
                  Último backup realizado com sucesso hoje às 02:00.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardAdmin;
