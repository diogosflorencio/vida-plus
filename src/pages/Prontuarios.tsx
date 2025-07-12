
import React, { useState } from 'react';
import { Search, User, Calendar, Phone, Mail, Plus, FileText, Edit, Clock, Stethoscope } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useNavigate } from 'react-router-dom';

const Prontuarios: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPaciente, setSelectedPaciente] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<any>(null);
  const navigate = useNavigate();

  const pacientes = [
    {
      id: '1',
      nome: 'Maria Santos',
      email: 'maria.santos@email.com',
      telefone: '(11) 98765-4321',
      idade: 39,
      cpf: '123.456.789-00',
      prontuario: {
        historico: 'Paciente com histórico de hipertensão arterial. Acompanhamento regular.',
        medicamentos: 'Losartana 50mg - 1x ao dia\nAmlodipina 5mg - 1x ao dia',
        alergias: 'Penicilina',
        observacoes: 'Paciente colaborativa, seguindo corretamente o tratamento.',
        ultimaConsulta: '2024-06-20',
        proximaConsulta: '2024-07-20'
      }
    },
    {
      id: '2',
      nome: 'João Silva',
      email: 'joao.silva@email.com',
      telefone: '(11) 99887-6543',
      idade: 45,
      cpf: '987.654.321-00',
      prontuario: {
        historico: 'Paciente diabético tipo 2. Controle glicêmico adequado.',
        medicamentos: 'Metformina 850mg - 2x ao dia\nGlicazida 30mg - 1x ao dia',
        alergias: 'Nenhuma conhecida',
        observacoes: 'Paciente aderiu bem às mudanças na dieta.',
        ultimaConsulta: '2024-06-18',
        proximaConsulta: '2024-07-18'
      }
    }
  ];

  const filteredPacientes = pacientes.filter(paciente =>
    paciente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    paciente.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pacienteSelecionado = pacientes.find(p => p.id === selectedPaciente);

  const handleEdit = () => {
    if (pacienteSelecionado) {
      setEditData({ ...pacienteSelecionado.prontuario });
      setIsEditing(true);
    }
  };

  const handleSave = () => {
    // Aqui você salvaria os dados editados na base de dados
    console.log('Salvando prontuário:', editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(null);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Prontuários</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lista de pacientes */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Pacientes</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar pacientes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {filteredPacientes.map((paciente) => (
                <div
                  key={paciente.id}
                  onClick={() => setSelectedPaciente(paciente.id)}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedPaciente === paciente.id
                      ? 'bg-blue-50 border-blue-200 border'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <User className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{paciente.nome}</p>
                      <p className="text-sm text-gray-600">{paciente.idade} anos</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Prontuário do paciente selecionado */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>
                {pacienteSelecionado ? `Prontuário - ${pacienteSelecionado.nome}` : 'Selecione um Paciente'}
              </span>
              {pacienteSelecionado && (
                <div className="flex space-x-2">
                  {isEditing ? (
                    <>
                      <Button size="sm" onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                        Salvar
                      </Button>
                      <Button size="sm" variant="outline" onClick={handleCancel}>
                        Cancelar
                      </Button>
                    </>
                  ) : (
                    <Button size="sm" onClick={handleEdit}>
                      <Edit className="h-4 w-4 mr-2" />
                      Editar
                    </Button>
                  )}
                </div>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {pacienteSelecionado ? (
              <div className="space-y-6">
                {/* Dados do paciente */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Nome</p>
                    <p className="text-gray-900">{pacienteSelecionado.nome}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Idade</p>
                    <p className="text-gray-900">{pacienteSelecionado.idade} anos</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">CPF</p>
                    <p className="text-gray-900">{pacienteSelecionado.cpf}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Telefone</p>
                    <p className="text-gray-900">{pacienteSelecionado.telefone}</p>
                  </div>
                </div>

                {/* Histórico médico */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Histórico Médico</h3>
                  <Textarea
                    value={isEditing ? editData?.historico : pacienteSelecionado.prontuario.historico}
                    readOnly={!isEditing}
                    onChange={(e) => isEditing && setEditData({...editData, historico: e.target.value})}
                    className="min-h-[100px]"
                  />
                </div>

                {/* Medicamentos */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Medicamentos Atuais</h3>
                  <Textarea
                    value={isEditing ? editData?.medicamentos : pacienteSelecionado.prontuario.medicamentos}
                    readOnly={!isEditing}
                    onChange={(e) => isEditing && setEditData({...editData, medicamentos: e.target.value})}
                    className="min-h-[80px]"
                  />
                </div>

                {/* Alergias */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Alergias</h3>
                  <Input
                    value={isEditing ? editData?.alergias : pacienteSelecionado.prontuario.alergias}
                    readOnly={!isEditing}
                    onChange={(e) => isEditing && setEditData({...editData, alergias: e.target.value})}
                  />
                </div>

                {/* Observações */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Observações</h3>
                  <Textarea
                    value={isEditing ? editData?.observacoes : pacienteSelecionado.prontuario.observacoes}
                    readOnly={!isEditing}
                    onChange={(e) => isEditing && setEditData({...editData, observacoes: e.target.value})}
                    className="min-h-[80px]"
                  />
                </div>

                {/* Consultas */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Última Consulta</h3>
                    <p className="text-gray-900">
                      {new Date(pacienteSelecionado.prontuario.ultimaConsulta).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Próxima Consulta</h3>
                    <p className="text-gray-900">
                      {new Date(pacienteSelecionado.prontuario.proximaConsulta).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>

                {/* Botões de ação */}
                <div className="flex space-x-3 pt-4 border-t">
                  <Button 
                    variant="outline" 
                    onClick={() => navigate('/consultas')}
                    className="flex items-center"
                  >
                    <Clock className="h-4 w-4 mr-2" />
                    Ver Consultas
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => navigate('/agendamentos')}
                    className="flex items-center"
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Ver Agenda
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => navigate('/pacientes')}
                    className="flex items-center"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Voltar aos Pacientes
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>Selecione um paciente para visualizar o prontuário</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Prontuarios;
