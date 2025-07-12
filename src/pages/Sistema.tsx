
import React, { useState } from 'react';
import {
  Server,
  Database,
  Shield,
  Settings,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  HardDrive,
  Wifi,
  Users,
  FileText
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Sistema: React.FC = () => {
  const [backupStatus, setBackupStatus] = useState<'idle' | 'running' | 'completed'>('idle');

  const systemStats = [
    {
      title: 'Status do Sistema',
      value: 'Online',
      icon: Activity,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      status: 'success'
    },
    {
      title: 'Uso de CPU',
      value: '45%',
      icon: Server,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      status: 'normal'
    },
    {
      title: 'Uso de Memória',
      value: '68%',
      icon: HardDrive,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      status: 'warning'
    },
    {
      title: 'Conectividade',
      value: '99.9%',
      icon: Wifi,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      status: 'success'
    }
  ];

  const services = [
    { name: 'Servidor Web', status: 'online', uptime: '99.9%' },
    { name: 'Base de Dados', status: 'online', uptime: '99.8%' },
    { name: 'Sistema de Backup', status: 'online', uptime: '98.5%' },
    { name: 'API Gateway', status: 'online', uptime: '99.7%' },
    { name: 'Monitoramento', status: 'online', uptime: '100%' }
  ];

  const logs = [
    { time: '14:30:15', type: 'info', message: 'Backup automático concluído com sucesso' },
    { time: '12:45:22', type: 'warning', message: 'Uso de memória acima de 70%' },
    { time: '10:15:08', type: 'info', message: 'Novo usuário cadastrado no sistema' },
    { time: '09:30:45', type: 'success', message: 'Sistema reiniciado com sucesso' },
    { time: '08:20:12', type: 'error', message: 'Erro temporário na conexão com API externa' }
  ];

  const handleBackup = () => {
    setBackupStatus('running');
    setTimeout(() => {
      setBackupStatus('completed');
      setTimeout(() => setBackupStatus('idle'), 3000);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-800 to-blue-800 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              Sistema ⚙️
            </h1>
            <p className="text-gray-200">
              Monitoramento e configuração do sistema hospitalar
            </p>
          </div>
          <div className="hidden md:block">
            <Server className="h-16 w-16 text-white opacity-20" />
          </div>
        </div>
      </div>

      {/* Status do sistema */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {systemStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <Badge 
                    className={`${
                      stat.status === 'success' ? 'bg-green-100 text-green-800' :
                      stat.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {stat.status === 'success' ? '✓' : stat.status === 'warning' ? '⚠' : 'ℹ'}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Serviços e Backup */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status dos serviços */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Database className="h-5 w-5" />
              <span>Status dos Serviços</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {services.map((service, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div>
                      <p className="font-medium text-gray-900">{service.name}</p>
                      <p className="text-sm text-gray-600">Uptime: {service.uptime}</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">
                    {service.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Backup e manutenção */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span>Backup & Manutenção</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-blue-900">Backup Automático</h4>
                <Badge className="bg-blue-100 text-blue-800">
                  {backupStatus === 'idle' ? 'Pronto' :
                   backupStatus === 'running' ? 'Executando...' : 'Concluído'}
                </Badge>
              </div>
              <p className="text-sm text-blue-700 mb-3">
                Último backup: Hoje às 02:00
              </p>
              <Button 
                onClick={handleBackup}
                disabled={backupStatus === 'running'}
                className="w-full"
              >
                {backupStatus === 'running' ? (
                  <>
                    <Clock className="h-4 w-4 mr-2 animate-spin" />
                    Executando Backup...
                  </>
                ) : (
                  <>
                    <Database className="h-4 w-4 mr-2" />
                    Iniciar Backup Manual
                  </>
                )}
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="flex flex-col space-y-1 h-auto py-3">
                <Settings className="h-5 w-5" />
                <span className="text-xs">Configurações</span>
              </Button>
              <Button variant="outline" className="flex flex-col space-y-1 h-auto py-3">
                <Users className="h-5 w-5" />
                <span className="text-xs">Usuários</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Logs do sistema */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>Logs do Sistema</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {logs.map((log, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0 mt-1">
                  {log.type === 'success' && <CheckCircle className="h-4 w-4 text-green-600" />}
                  {log.type === 'warning' && <AlertTriangle className="h-4 w-4 text-yellow-600" />}
                  {log.type === 'error' && <AlertTriangle className="h-4 w-4 text-red-600" />}
                  {log.type === 'info' && <Activity className="h-4 w-4 text-blue-600" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">
                      {log.message}
                    </p>
                    <span className="text-xs text-gray-500">
                      {log.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Informações do sistema */}
      <Card>
        <CardHeader>
          <CardTitle>Informações do Sistema</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Versão</h4>
              <p className="text-sm text-gray-600">SGHSS v2.1.0</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Última Atualização</h4>
              <p className="text-sm text-gray-600">15/06/2024 - 10:30</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Ambiente</h4>
              <p className="text-sm text-gray-600">Produção</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Sistema;
