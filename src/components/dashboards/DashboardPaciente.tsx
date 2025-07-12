import React from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Video,
  FileText,
  Activity,
  Clock,
  Heart,
  AlertCircle,
  CheckCircle,
  Phone,
  MessageCircle
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useConsultasStore } from '@/store/consultasStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const DashboardPaciente: React.FC = () => {
  const { usuario } = useAuthStore();
  const { getConsultasPorPaciente } = useConsultasStore();
  
  const minhasConsultas = getConsultasPorPaciente(usuario?.id || '');
  const proximaConsulta = minhasConsultas
    .filter(c => c.status === 'agendada')
    .sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime())[0];

  const stats = [
    {
      title: 'Próxima Consulta',
      value: proximaConsulta ? 
        `${new Date(proximaConsulta.data).toLocaleDateString('pt-BR')} às ${proximaConsulta.horario}` : 
        'Nenhuma agendada',
      icon: Calendar,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Consultas Realizadas',
      value: minhasConsultas.filter(c => c.status === 'concluida').length.toString(),
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Telemedicina',
      value: minhasConsultas.filter(c => c.tipo === 'telemedicina').length.toString(),
      icon: Video,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Histórico Médico',
      value: '4 documentos',
      icon: FileText,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Saudação */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              Olá, {usuario?.nome?.split(' ')[0]}! 👋
            </h1>
            <p className="text-blue-100">
              Como está se sentindo hoje? Aqui você pode acompanhar sua saúde.
            </p>
          </div>
          <div className="hidden md:block">
            <Heart className="h-16 w-16 text-white opacity-20" />
          </div>
        </div>
      </div>

      {/* Cards de estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-md transition-shadow dark:bg-gray-800 dark:border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor} dark:bg-gray-700`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Próxima consulta em destaque */}
      {proximaConsulta && (
        <Card className="border-l-4 border-l-blue-600 dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 dark:text-white">
              <Clock className="h-5 w-5 text-blue-600" />
              <span>Próxima Consulta</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {proximaConsulta.especialidade}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  📅 {new Date(proximaConsulta.data).toLocaleDateString('pt-BR', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  🕒 {proximaConsulta.horario}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  📍 {proximaConsulta.tipo === 'telemedicina' ? 'Online' : 'Presencial'}
                </p>
              </div>
              <div className="space-y-2">
                {proximaConsulta.tipo === 'telemedicina' && (
                  <Link to="/telemedicina">
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      <Video className="h-4 w-4 mr-2" />
                      Iniciar Consulta
                    </Button>
                  </Link>
                )}
                <Button variant="outline" className="w-full dark:border-gray-600 dark:text-white dark:hover:bg-gray-700">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Contatar Médico
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Ações rápidas e últimas consultas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ações rápidas */}
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="dark:text-white">Ações Rápidas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link to="/agendamentos">
              <Button className="w-full justify-start bg-blue-600 hover:bg-blue-700">
                <Calendar className="h-4 w-4 mr-2" />
                Agendar Nova Consulta
              </Button>
            </Link>
            <Link to="/telemedicina">
              <Button variant="outline" className="w-full justify-start dark:border-gray-600 dark:text-white dark:hover:bg-gray-700">
                <Video className="h-4 w-4 mr-2" />
                Telemedicina
              </Button>
            </Link>
            <Link to="/historico">
              <Button variant="outline" className="w-full justify-start dark:border-gray-600 dark:text-white dark:hover:bg-gray-700">
                <FileText className="h-4 w-4 mr-2" />
                Ver Histórico Médico
              </Button>
            </Link>
            <Link to="/saude">
              <Button variant="outline" className="w-full justify-start dark:border-gray-600 dark:text-white dark:hover:bg-gray-700">
                <Activity className="h-4 w-4 mr-2" />
                Acompanhar Saúde
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Últimas consultas */}
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center justify-between dark:text-white">
              <span>Histórico Recente</span>
              <Link to="/historico">
                <Button variant="ghost" size="sm" className="dark:text-white dark:hover:bg-gray-700">
                  Ver Todos
                </Button>
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {minhasConsultas
                .filter(c => c.status === 'concluida')
                .slice(0, 3)
                .map((consulta) => (
                  <div key={consulta.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{consulta.especialidade}</p>
                      <p className="text-sm text-gray-600">
                        {new Date(consulta.data).toLocaleDateString('pt-BR')} às {consulta.horario}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                        Concluída
                      </span>
                      <Button variant="ghost" size="sm">
                        <FileText className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              
              {minhasConsultas.filter(c => c.status === 'concluida').length === 0 && (
                <div className="text-center py-6 text-gray-500">
                  <FileText className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                  <p>Nenhuma consulta realizada ainda</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alertas e lembretes */}
      <Card className="border-l-4 border-l-yellow-500">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-yellow-600" />
            <span>Lembretes Importantes</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
              <div className="bg-yellow-100 p-1 rounded-full mt-1">
                <AlertCircle className="h-4 w-4 text-yellow-600" />
              </div>
              <div>
                <p className="font-medium text-yellow-800">Medicação</p>
                <p className="text-sm text-yellow-700">
                  Lembre-se de tomar Losartana às 20:00 hoje
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
              <div className="bg-blue-100 p-1 rounded-full mt-1">
                <Calendar className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-blue-800">Exame</p>
                <p className="text-sm text-blue-700">
                  Resultado do hemograma disponível para visualização
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPaciente;
