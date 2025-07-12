import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, Stethoscope, MapPin, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuthStore } from '@/store/authStore';
import { toast } from '@/hooks/use-toast';

interface Agendamento {
  id: string;
  especialidade: string;
  medico: string;
  data: string;
  horario: string;
  tipo: 'presencial' | 'telemedicina';
  status: 'agendada' | 'cancelada';
  paciente?: string;
}

const Agendamentos: React.FC = () => {
  const { usuario } = useAuthStore();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedType, setSelectedType] = useState<'presencial' | 'telemedicina'>('presencial');
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);

  const especialidades = [
    'Cardiologia',
    'Dermatologia',
    'Endocrinologia',
    'Ginecologia',
    'Neurologia',
    'Ortopedia',
    'Pediatria',
    'Psiquiatria'
  ];

  const horarios = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
  ];

  useEffect(() => {
    // Carrega agendamentos salvos no localStorage
    const savedAgendamentos = localStorage.getItem('agendamentos');
    if (savedAgendamentos) {
      setAgendamentos(JSON.parse(savedAgendamentos));
    }
    
    // Se for médico, carrega também os agendamentos das consultas
    if (usuario?.tipo === 'medico') {
      const consultasAgendadas = [
        {
          id: 'consulta-1',
          especialidade: 'Cardiologia',
          medico: 'Dr. Carlos Silva',
          data: '2024-06-25',
          horario: '14:00',
          tipo: 'telemedicina' as const,
          status: 'agendada' as const,
          paciente: 'Maria Santos'
        },
        {
          id: 'consulta-2',
          especialidade: 'Cardiologia',
          medico: 'Dr. Carlos Silva',
          data: '2024-06-26',
          horario: '15:30',
          tipo: 'presencial' as const,
          status: 'agendada' as const,
          paciente: 'Carmen Rodriguez'
        }
      ];
      
      // Combina agendamentos existentes com consultas do médico
      const todosAgendamentos = [...JSON.parse(savedAgendamentos || '[]'), ...consultasAgendadas];
      setAgendamentos(todosAgendamentos);
    }
  }, [usuario?.tipo]);

  const saveAgendamentos = (newAgendamentos: Agendamento[]) => {
    setAgendamentos(newAgendamentos);
    localStorage.setItem('agendamentos', JSON.stringify(newAgendamentos));
  };

  const handleConfirmarAgendamento = () => {
    if (!selectedSpecialty || !selectedDate || !selectedTime) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    const novoAgendamento: Agendamento = {
      id: Date.now().toString(),
      especialidade: selectedSpecialty,
      medico: 'Dr. Carlos Silva',
      data: selectedDate,
      horario: selectedTime,
      tipo: selectedType,
      status: 'agendada',
      paciente: usuario?.tipo === 'medico' ? 'Maria Santos' : undefined
    };

    const novosAgendamentos = [...agendamentos, novoAgendamento];
    saveAgendamentos(novosAgendamentos);

    toast({
      title: "Agendamento confirmado",
      description: `Consulta de ${selectedSpecialty} agendada para ${new Date(selectedDate).toLocaleDateString('pt-BR')} às ${selectedTime}.`,
    });

    // Limpar formulário
    setSelectedDate('');
    setSelectedTime('');
    setSelectedSpecialty('');
    setSelectedType('presencial');
  };

  const handleCancelarAgendamento = (id: string) => {
    const agendamentosAtualizados = agendamentos.map(ag => 
      ag.id === id ? { ...ag, status: 'cancelada' as const } : ag
    );
    saveAgendamentos(agendamentosAtualizados);

    toast({
      title: "Agendamento cancelado",
      description: "O agendamento foi cancelado com sucesso.",
    });
  };

  const proximosAgendamentos = agendamentos.filter(ag => ag.status === 'agendada');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {usuario?.tipo === 'medico' ? 'Minha Agenda' : 'Agendamentos'}
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Formulário de agendamento - apenas para pacientes */}
        {usuario?.tipo === 'paciente' && (
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="dark:text-white">Agendar Nova Consulta</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 dark:text-gray-200">Especialidade</label>
                <select 
                  className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                >
                  <option value="">Selecione uma especialidade</option>
                  {especialidades.map((esp) => (
                    <option key={esp} value={esp}>{esp}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 dark:text-gray-200">Data</label>
                <Input 
                  type="date" 
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 dark:text-gray-200">Horário</label>
                <div className="grid grid-cols-3 gap-2">
                  {horarios.map((horario) => (
                    <Button
                      key={horario}
                      variant={selectedTime === horario ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedTime(horario)}
                      className={selectedTime !== horario ? "dark:border-gray-600 dark:text-white dark:hover:bg-gray-700" : ""}
                    >
                      {horario}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 dark:text-gray-200">Tipo de Consulta</label>
                <div className="flex space-x-2">
                  <Button 
                    variant={selectedType === 'presencial' ? "default" : "outline"} 
                    className={`flex-1 ${selectedType !== 'presencial' ? "dark:border-gray-600 dark:text-white dark:hover:bg-gray-700" : ""}`}
                    onClick={() => setSelectedType('presencial')}
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    Presencial
                  </Button>
                  <Button 
                    variant={selectedType === 'telemedicina' ? "default" : "outline"} 
                    className={`flex-1 ${selectedType !== 'telemedicina' ? "dark:border-gray-600 dark:text-white dark:hover:bg-gray-700" : ""}`}
                    onClick={() => setSelectedType('telemedicina')}
                  >
                    <User className="h-4 w-4 mr-2" />
                    Telemedicina
                  </Button>
                </div>
              </div>

              <Button 
                className="w-full bg-green-600 hover:bg-green-700"
                onClick={handleConfirmarAgendamento}
              >
                Confirmar Agendamento
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Próximos agendamentos */}
        <Card className={`${usuario?.tipo === 'paciente' ? '' : 'lg:col-span-2'} dark:bg-gray-800 dark:border-gray-700`}>
          <CardHeader>
            <CardTitle className="dark:text-white">
              {usuario?.tipo === 'medico' ? 'Minha Agenda Médica' : 'Próximos Agendamentos'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {proximosAgendamentos.length > 0 ? (
                proximosAgendamentos.map((agendamento) => (
                  <div key={agendamento.id} className="p-4 border rounded-lg dark:border-gray-600 dark:bg-gray-700">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold dark:text-white">{agendamento.especialidade}</h3>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500 dark:text-gray-400">{agendamento.medico}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCancelarAgendamento(agendamento.id)}
                          className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(agendamento.data).toLocaleDateString('pt-BR')}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {agendamento.horario}
                      </div>
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {agendamento.tipo === 'telemedicina' ? 'Telemedicina' : 'Presencial'}
                      </div>
                    </div>
                    {agendamento.paciente && (
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        Paciente: {agendamento.paciente}
                      </p>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-gray-500 dark:text-gray-400">
                  <Calendar className="h-8 w-8 mx-auto mb-2 text-gray-300 dark:text-gray-600" />
                  <p>Nenhum agendamento encontrado</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Agendamentos;
