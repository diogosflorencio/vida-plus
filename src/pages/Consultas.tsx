
import React, { useState } from 'react';
import { Calendar, Clock, User, Search, Filter, CheckCircle, XCircle, FileText, Phone } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

const Consultas: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('todas');
  const navigate = useNavigate();

  const consultas = [
    {
      id: '1',
      paciente: 'Maria Santos',
      data: '2024-06-25',
      horario: '14:00',
      tipo: 'telemedicina',
      status: 'agendada',
      especialidade: 'Cardiologia',
      observacoes: 'Consulta de retorno'
    },
    {
      id: '2',
      paciente: 'João Silva',
      data: '2024-06-24',
      horario: '09:30',
      tipo: 'presencial',
      status: 'concluida',
      especialidade: 'Endocrinologia',
      observacoes: 'Controle glicêmico'
    },
    {
      id: '3',
      paciente: 'Ana Costa',
      data: '2024-06-23',
      horario: '16:00',
      tipo: 'presencial',
      status: 'cancelada',
      especialidade: 'Cardiologia',
      observacoes: 'Paciente cancelou'
    },
    {
      id: '4',
      paciente: 'Pedro Oliveira',
      data: '2024-06-22',
      horario: '11:00',
      tipo: 'telemedicina',
      status: 'concluida',
      especialidade: 'Cardiologia',
      observacoes: 'Primeira consulta'
    },
    {
      id: '5',
      paciente: 'Carmen Rodriguez',
      data: '2024-06-26',
      horario: '15:30',
      tipo: 'presencial',
      status: 'agendada',
      especialidade: 'Cardiologia',
      observacoes: 'Consulta de rotina'
    }
  ];

  const filteredConsultas = consultas.filter(consulta => {
    const matchesSearch = consulta.paciente.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         consulta.especialidade.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'todas' || consulta.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'agendada':
        return <Badge className="bg-blue-100 text-blue-800">Agendada</Badge>;
      case 'concluida':
        return <Badge className="bg-green-100 text-green-800">Concluída</Badge>;
      case 'cancelada':
        return <Badge className="bg-red-100 text-red-800">Cancelada</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getTipoIcon = (tipo: string) => {
    return tipo === 'telemedicina' ? 
      <span className="text-purple-600">📹</span> : 
      <span className="text-blue-600">🏥</span>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Minhas Consultas</h1>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar por paciente ou especialidade..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="p-2 border rounded-md"
              >
                <option value="todas">Todas</option>
                <option value="agendada">Agendadas</option>
                <option value="concluida">Concluídas</option>
                <option value="cancelada">Canceladas</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Estatísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {consultas.filter(c => c.status === 'agendada').length}
            </div>
            <div className="text-sm text-gray-600">Agendadas</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {consultas.filter(c => c.status === 'concluida').length}
            </div>
            <div className="text-sm text-gray-600">Concluídas</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {consultas.filter(c => c.tipo === 'telemedicina').length}
            </div>
            <div className="text-sm text-gray-600">Telemedicina</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">
              {consultas.filter(c => c.tipo === 'presencial').length}
            </div>
            <div className="text-sm text-gray-600">Presenciais</div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de consultas */}
      <div className="grid gap-4">
        {filteredConsultas.length > 0 ? (
          filteredConsultas.map((consulta) => (
            <Card key={consulta.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <User className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {consulta.paciente}
                        </h3>
                        {getStatusBadge(consulta.status)}
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(consulta.data).toLocaleDateString('pt-BR')}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1"  />
                          {consulta.horario}
                        </div>
                        <div className="flex items-center">
                          {getTipoIcon(consulta.tipo)}
                          <span className="ml-1 capitalize">{consulta.tipo}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="font-medium">{consulta.especialidade}</span>
                        </div>
                      </div>
                      {consulta.observacoes && (
                        <p className="text-sm text-gray-600 mt-2">
                          📝 {consulta.observacoes}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    {consulta.status === 'agendada' && (
                      <>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => navigate('/agendamentos')}
                        >
                          Ver Agenda
                        </Button>
                        {consulta.tipo === 'telemedicina' && (
                          <Button 
                            size="sm" 
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => navigate('/telemedicina')}
                          >
                            Iniciar Consulta
                          </Button>
                        )}
                      </>
                    )}
                    {consulta.status === 'concluida' && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => navigate('/prontuarios')}
                        className="flex items-center"
                      >
                        <FileText className="h-4 w-4 mr-1" />
                        Ver Prontuário
                      </Button>
                    )}
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => navigate('/pacientes')}
                      className="flex items-center"
                    >
                      <User className="h-4 w-4 mr-1" />
                      Ver Paciente
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="text-center py-12">
              <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma consulta encontrada</h3>
              <p className="text-gray-600">Tente ajustar os filtros de busca</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Consultas;
