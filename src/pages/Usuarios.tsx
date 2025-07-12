
import React, { useState } from 'react';
import { Search, User, Plus, Edit, Trash2, UserCheck, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';

interface Usuario {
  id: string;
  nome: string;
  email: string;
  cpf: string;
  telefone: string;
  tipo: 'paciente' | 'medico' | 'admin';
  status: 'ativo' | 'inativo';
  crm?: string;
  especialidade?: string;
  dataCadastro: string;
}

const Usuarios: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [tipoFilter, setTipoFilter] = useState('todos');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [usuarios, setUsuarios] = useState<Usuario[]>([
    {
      id: '1',
      nome: 'Dr. Carlos Silva',
      email: 'carlos.silva@hospital.com',
      cpf: '123.456.789-01',
      telefone: '(11) 98765-4321',
      tipo: 'medico',
      status: 'ativo',
      crm: '12345-SP',
      especialidade: 'Cardiologia',
      dataCadastro: '2024-01-15'
    },
    {
      id: '2',
      nome: 'Maria Santos',
      email: 'maria.santos@email.com',
      cpf: '987.654.321-00',
      telefone: '(11) 99887-6543',
      tipo: 'paciente',
      status: 'ativo',
      dataCadastro: '2024-03-20'
    },
    {
      id: '3',
      nome: 'Admin Sistema',
      email: 'admin@hospital.com',
      cpf: '111.222.333-44',
      telefone: '(11) 95555-0000',
      tipo: 'admin',
      status: 'ativo',
      dataCadastro: '2024-01-01'
    }
  ]);

  const [novoUsuario, setNovoUsuario] = useState({
    nome: '',
    email: '',
    cpf: '',
    telefone: '',
    tipo: 'paciente' as 'paciente' | 'medico' | 'admin',
    crm: '',
    especialidade: ''
  });

  const filteredUsuarios = usuarios.filter(usuario => {
    const matchesSearch = usuario.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         usuario.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTipo = tipoFilter === 'todos' || usuario.tipo === tipoFilter;
    return matchesSearch && matchesTipo;
  });

  const getTipoBadge = (tipo: string) => {
    switch (tipo) {
      case 'medico':
        return <Badge className="bg-blue-100 text-blue-800">Médico</Badge>;
      case 'paciente':
        return <Badge className="bg-green-100 text-green-800">Paciente</Badge>;
      case 'admin':
        return <Badge className="bg-purple-100 text-purple-800">Admin</Badge>;
      default:
        return <Badge variant="secondary">{tipo}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    return status === 'ativo' ?
      <Badge className="bg-green-100 text-green-800">Ativo</Badge> :
      <Badge className="bg-red-100 text-red-800">Inativo</Badge>;
  };

  const handleAddUsuario = () => {
    if (!novoUsuario.nome || !novoUsuario.email || !novoUsuario.cpf) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    const usuario: Usuario = {
      id: Date.now().toString(),
      ...novoUsuario,
      status: 'ativo',
      dataCadastro: new Date().toISOString().split('T')[0]
    };

    setUsuarios([...usuarios, usuario]);
    setShowAddDialog(false);
    setNovoUsuario({
      nome: '',
      email: '',
      cpf: '',
      telefone: '',
      tipo: 'paciente',
      crm: '',
      especialidade: ''
    });

    toast({
      title: "Usuário adicionado",
      description: `${usuario.nome} foi adicionado com sucesso.`,
    });
  };

  const toggleStatus = (id: string) => {
    setUsuarios(usuarios.map(user => 
      user.id === id 
        ? { ...user, status: user.status === 'ativo' ? 'inativo' : 'ativo' as 'ativo' | 'inativo' }
        : user
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Gestão de Usuários</h1>
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Novo Usuário
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Adicionar Novo Usuário</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="nome">Nome Completo</Label>
                <Input
                  id="nome"
                  value={novoUsuario.nome}
                  onChange={(e) => setNovoUsuario({...novoUsuario, nome: e.target.value})}
                  placeholder="Nome completo"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={novoUsuario.email}
                  onChange={(e) => setNovoUsuario({...novoUsuario, email: e.target.value})}
                  placeholder="email@exemplo.com"
                />
              </div>
              <div>
                <Label htmlFor="cpf">CPF</Label>
                <Input
                  id="cpf"
                  value={novoUsuario.cpf}
                  onChange={(e) => setNovoUsuario({...novoUsuario, cpf: e.target.value})}
                  placeholder="000.000.000-00"
                />
              </div>
              <div>
                <Label htmlFor="telefone">Telefone</Label>
                <Input
                  id="telefone"
                  value={novoUsuario.telefone}
                  onChange={(e) => setNovoUsuario({...novoUsuario, telefone: e.target.value})}
                  placeholder="(11) 99999-9999"
                />
              </div>
              <div>
                <Label htmlFor="tipo">Tipo de Usuário</Label>
                <select
                  id="tipo"
                  value={novoUsuario.tipo}
                  onChange={(e) => setNovoUsuario({...novoUsuario, tipo: e.target.value as any})}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="paciente">Paciente</option>
                  <option value="medico">Médico</option>
                  <option value="admin">Administrador</option>
                </select>
              </div>
              {novoUsuario.tipo === 'medico' && (
                <>
                  <div>
                    <Label htmlFor="crm">CRM</Label>
                    <Input
                      id="crm"
                      value={novoUsuario.crm}
                      onChange={(e) => setNovoUsuario({...novoUsuario, crm: e.target.value})}
                      placeholder="12345-SP"
                    />
                  </div>
                  <div>
                    <Label htmlFor="especialidade">Especialidade</Label>
                    <Input
                      id="especialidade"
                      value={novoUsuario.especialidade}
                      onChange={(e) => setNovoUsuario({...novoUsuario, especialidade: e.target.value})}
                      placeholder="Cardiologia"
                    />
                  </div>
                </>
              )}
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleAddUsuario}>
                  Adicionar
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar por nome ou email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <select
              value={tipoFilter}
              onChange={(e) => setTipoFilter(e.target.value)}
              className="p-2 border rounded-md"
            >
              <option value="todos">Todos os tipos</option>
              <option value="paciente">Pacientes</option>
              <option value="medico">Médicos</option>
              <option value="admin">Administradores</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {usuarios.filter(u => u.tipo === 'paciente').length}
            </div>
            <div className="text-sm text-gray-600">Pacientes</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {usuarios.filter(u => u.tipo === 'medico').length}
            </div>
            <div className="text-sm text-gray-600">Médicos</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {usuarios.filter(u => u.tipo === 'admin').length}
            </div>
            <div className="text-sm text-gray-600">Admins</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {usuarios.filter(u => u.status === 'ativo').length}
            </div>
            <div className="text-sm text-gray-600">Ativos</div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de usuários */}
      <div className="grid gap-4">
        {filteredUsuarios.map((usuario) => (
          <Card key={usuario.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <User className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{usuario.nome}</h3>
                      {getTipoBadge(usuario.tipo)}
                      {getStatusBadge(usuario.status)}
                    </div>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p>📧 {usuario.email}</p>
                      <p>📱 {usuario.telefone}</p>
                      <p>🆔 {usuario.cpf}</p>
                      {usuario.crm && <p>🩺 CRM: {usuario.crm}</p>}
                      {usuario.especialidade && <p>🏥 {usuario.especialidade}</p>}
                      <p>📅 Cadastrado em: {new Date(usuario.dataCadastro).toLocaleDateString('pt-BR')}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Editar
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => toggleStatus(usuario.id)}
                    className={usuario.status === 'ativo' ? 'text-red-600' : 'text-green-600'}
                  >
                    {usuario.status === 'ativo' ? 'Desativar' : 'Ativar'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Usuarios;
