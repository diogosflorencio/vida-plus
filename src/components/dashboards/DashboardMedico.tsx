
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Calendar,
  ClipboardList,
  Activity,
  Clock,
  Video,
  FileText,
  CheckCircle2,
  Plus
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useConsultasStore } from '@/store/consultasStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const DashboardMedico: React.FC = () => {
  const { usuario } = useAuthStore();
  const { getConsultasPorMedico } = useConsultasStore();
  
  const minhasConsultas = getConsultasPorMedico(usuario?.id || '');
  const hoje = new Date().toISOString().split('T')[0];
  const consultasHoje = minhasConsultas.filter(c => c.data === hoje);
  const proximasConsultas = minhasConsultas.filter(c => 
    new Date(c.data) >= new Date() && c.status === 'agendada'
  ).sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime());
  
  const proximaConsulta = proximasConsultas[0];

  const stats = [
    {
      title: 'Próximas Consultas',
      value: proximasConsultas.length.toString(),
      icon: Calendar,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      description: 'Agendadas'
    },
    {
      title: 'Consultas Hoje',
      value: consultasHoje.length.toString(),
      icon: Clock,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      description: `${consultasHoje.filter(c => c.status === 'concluida').length} realizadas`
    },
    {
      title: 'Pacientes Ativos',
      value: '24',
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      description: '4 novos este mês'
    },
    {
      title: 'Prontuários',
      value: minhasConsultas.filter(c => c.prontuario).length.toString(),
      icon: FileText,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      description: 'Atualizados'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Saudação */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              Bom dia, Dr. {usuario?.nome?.split(' ')[1]}! 👨‍⚕️
            </h1>
            <p className="text-blue-100">
              {usuario?.especialidade} | CRM: {usuario?.crm}
            </p>
            <p className="text-blue-100 mt-1">
              Você tem {proximasConsultas.length} consultas programadas
            </p>
          </div>
          <div className="hidden md:block">
            <Activity className="h-16 w-16 text-white opacity-20" />
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
                    <p className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    {stat.title}
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

      {/* Próxima consulta em destaque */}
      {proximaConsulta && (
        <Card className="border-l-4 border-l-green-600">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-green-600" />
              <span>Próxima Consulta</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-lg font-semibold text-gray-900">
                  Paciente: Maria Santos
                </p>
                <p className="text-gray-600">
                  🕒 {proximaConsulta.horario} - {proximaConsulta.tipo}
                </p>
                <p className="text-gray-600">
                  📋 {proximaConsulta.observacoes || 'Consulta de rotina'}
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
                <Link to="/prontuarios">
                  <Button variant="outline" className="w-full">
                    <FileText className="h-4 w-4 mr-2" />
                    Ver Prontuário
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Próximos agendamentos e ações */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Próximos agendamentos */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Próximos Agendamentos</span>
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                Ver Todos
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {proximasConsultas.slice(0, 4).length > 0 ? (
                proximasConsultas.slice(0, 4).map((consulta) => (
                  <div key={consulta.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="text-center">
                        <p className="font-semibold text-sm">{consulta.horario}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(consulta.data).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Maria Santos</p>
                        <p className="text-sm text-gray-600">{consulta.tipo}</p>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      {consulta.tipo === 'telemedicina' && (
                        <Link to="/telemedicina">
                          <Button variant="ghost" size="sm">
                            <Video className="h-4 w-4" />
                          </Button>
                        </Link>
                      )}
                      <Link to="/prontuarios">
                        <Button variant="ghost" size="sm">
                          <FileText className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-gray-500">
                  <Calendar className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                  <p>Nenhuma consulta programada</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Ações rápidas */}
        <Card>
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Link to="/pacientes">
                <Button className="w-full justify-start bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Paciente
                </Button>
              </Link>
              <Link to="/telemedicina">
                <Button variant="outline" className="w-full justify-start">
                  <Video className="h-4 w-4 mr-2" />
                  Telemedicina
                </Button>
              </Link>
              <Link to="/prontuarios">
                <Button variant="outline" className="w-full justify-start">
                  <ClipboardList className="h-4 w-4 mr-2" />
                  Prontuários
                </Button>
              </Link>
              <Link to="/pacientes">
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Meus Pacientes
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardMedico;
