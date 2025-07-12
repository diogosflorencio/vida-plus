
import React, { useState } from 'react';
import { Search, User, Calendar, Phone, Mail, Plus, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import AddPacienteForm from '@/components/forms/AddPacienteForm';

/**
 * Página de Pacientes - Vida+ Sistema Hospitalar
 * 
 * Lista todos os pacientes do médico logado com opções para:
 * - Visualizar prontuários
 * - Ver consultas agendadas
 * - Contatar pacientes
 * 
 * @author Diogo Florencio
 * @version 1.0.0
 */

const Pacientes: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const navigate = useNavigate();

  const [pacientes, setPacientes] = useState([
    {
      id: '1',
      nome: 'Maria Santos',
      email: 'maria.santos@email.com',
      telefone: '(11) 98765-4321',
      ultimaConsulta: '2024-06-20',
      proximaConsulta: '2024-06-25',
      status: 'Ativo'
    },
    {
      id: '2',
      nome: 'João Silva',
      email: 'joao.silva@email.com',
      telefone: '(11) 99887-6543',
      ultimaConsulta: '2024-06-18',
      proximaConsulta: null,
      status: 'Ativo'
    }
  ]);

  const filteredPacientes = pacientes.filter(paciente =>
    paciente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    paciente.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Função para adicionar novo paciente
  const handleAddPaciente = (novoPaciente: any) => {
    setPacientes([...pacientes, novoPaciente]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Meus Pacientes</h1>
        <Button 
          className="bg-blue-600 hover:bg-blue-700"
          onClick={() => setShowAddForm(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Paciente
        </Button>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar pacientes por nome ou email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Button variant="outline">
              Filtrar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Lista de pacientes */}
      <div className="grid gap-4">
        {filteredPacientes.map((paciente) => (
          <Card key={paciente.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <User className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{paciente.nome}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-1" />
                        {paciente.email}
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-1" />
                        {paciente.telefone}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      paciente.status === 'Ativo' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {paciente.status}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Última: {new Date(paciente.ultimaConsulta).toLocaleDateString('pt-BR')}
                    </div>
                    {paciente.proximaConsulta && (
                      <div className="flex items-center mt-1">
                        <Calendar className="h-4 w-4 mr-1" />
                        Próxima: {new Date(paciente.proximaConsulta).toLocaleDateString('pt-BR')}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="mt-4 flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate('/prontuarios')}
                  className="flex items-center"
                >
                  <FileText className="h-4 w-4 mr-1" />
                  Ver Prontuário
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate('/consultas')}
                >
                  Ver Consultas
                </Button>
                <Button variant="outline" size="sm">
                  Contatar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {filteredPacientes.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <User className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum paciente encontrado</h3>
              <p className="text-gray-600">Tente ajustar os filtros de busca</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Modal de Adicionar Paciente */}
      <AddPacienteForm
        isOpen={showAddForm}
        onClose={() => setShowAddForm(false)}
        onAdd={handleAddPaciente}
      />
    </div>
  );
};

export default Pacientes;
