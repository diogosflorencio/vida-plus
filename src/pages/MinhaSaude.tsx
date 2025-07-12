
import React, { useState } from 'react';
import {
  Heart,
  Activity,
  Weight,
  Thermometer,
  Calendar,
  TrendingUp,
  TrendingDown,
  Plus,
  Edit,
  AlertCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const MinhaSaude: React.FC = () => {
  const [editMode, setEditMode] = useState(false);
  const [dadosSaude, setDadosSaude] = useState({
    peso: '70',
    altura: '170',
    pressaoSistolica: '120',
    pressaoDiastolica: '80',
    glicose: '95',
    temperatura: '36.5'
  });

  const calcularIMC = () => {
    const peso = parseFloat(dadosSaude.peso);
    const altura = parseFloat(dadosSaude.altura) / 100;
    return (peso / (altura * altura)).toFixed(1);
  };

  const getStatusIMC = (imc: number) => {
    if (imc < 18.5) return { status: 'Abaixo do peso', color: 'text-blue-600' };
    if (imc < 25) return { status: 'Peso normal', color: 'text-green-600' };
    if (imc < 30) return { status: 'Sobrepeso', color: 'text-yellow-600' };
    return { status: 'Obesidade', color: 'text-red-600' };
  };

  const handleSave = () => {
    // Salvar no localStorage
    localStorage.setItem('dadosSaude', JSON.stringify(dadosSaude));
    setEditMode(false);
  };

  const stats = [
    {
      title: 'IMC',
      value: calcularIMC(),
      icon: Weight,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      description: getStatusIMC(parseFloat(calcularIMC())).status
    },
    {
      title: 'Pressão Arterial',
      value: `${dadosSaude.pressaoSistolica}/${dadosSaude.pressaoDiastolica}`,
      icon: Heart,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      description: 'mmHg'
    },
    {
      title: 'Glicose',
      value: dadosSaude.glicose,
      icon: Activity,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      description: 'mg/dL'
    },
    {
      title: 'Temperatura',
      value: dadosSaude.temperatura,
      icon: Thermometer,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      description: '°C'
    }
  ];

  const historico = [
    { data: '2024-06-20', peso: '70.5', pressao: '118/78', glicose: '92' },
    { data: '2024-06-15', peso: '71.0', pressao: '122/80', glicose: '98' },
    { data: '2024-06-10', peso: '70.8', pressao: '120/82', glicose: '95' },
    { data: '2024-06-05', peso: '71.2', pressao: '125/85', glicose: '100' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              Minha Saúde 💚
            </h1>
            <p className="text-green-100">
              Acompanhe seus dados de saúde e mantenha-se saudável
            </p>
          </div>
          <div className="hidden md:block">
            <Heart className="h-16 w-16 text-white opacity-20" />
          </div>
        </div>
      </div>

      {/* Indicadores de saúde */}
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

      {/* Formulário de dados */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Dados Atuais</span>
            <Button 
              variant={editMode ? "default" : "outline"}
              onClick={editMode ? handleSave : () => setEditMode(true)}
            >
              {editMode ? (
                <>
                  <Plus className="h-4 w-4 mr-2" />
                  Salvar
                </>
              ) : (
                <>
                  <Edit className="h-4 w-4 mr-2" />
                  Editar
                </>
              )}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="peso">Peso (kg)</Label>
              <Input
                id="peso"
                value={dadosSaude.peso}
                onChange={(e) => setDadosSaude({...dadosSaude, peso: e.target.value})}
                disabled={!editMode}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="altura">Altura (cm)</Label>
              <Input
                id="altura"
                value={dadosSaude.altura}
                onChange={(e) => setDadosSaude({...dadosSaude, altura: e.target.value})}
                disabled={!editMode}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pressaoSistolica">Pressão Sistólica</Label>
              <Input
                id="pressaoSistolica"
                value={dadosSaude.pressaoSistolica}
                onChange={(e) => setDadosSaude({...dadosSaude, pressaoSistolica: e.target.value})}
                disabled={!editMode}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pressaoDiastolica">Pressão Diastólica</Label>
              <Input
                id="pressaoDiastolica"
                value={dadosSaude.pressaoDiastolica}
                onChange={(e) => setDadosSaude({...dadosSaude, pressaoDiastolica: e.target.value})}
                disabled={!editMode}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="glicose">Glicose (mg/dL)</Label>
              <Input
                id="glicose"
                value={dadosSaude.glicose}
                onChange={(e) => setDadosSaude({...dadosSaude, glicose: e.target.value})}
                disabled={!editMode}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="temperatura">Temperatura (°C)</Label>
              <Input
                id="temperatura"
                value={dadosSaude.temperatura}
                onChange={(e) => setDadosSaude({...dadosSaude, temperatura: e.target.value})}
                disabled={!editMode}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Histórico e alertas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Histórico */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Histórico Recente</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {historico.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">
                      {new Date(item.data).toLocaleDateString('pt-BR')}
                    </p>
                    <p className="text-sm text-gray-600">
                      Peso: {item.peso}kg | Pressão: {item.pressao} | Glicose: {item.glicose}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {index === 0 ? (
                      <TrendingDown className="h-4 w-4 text-green-600" />
                    ) : (
                      <TrendingUp className="h-4 w-4 text-gray-400" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Alertas e recomendações */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-yellow-600" />
              <span>Recomendações</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                <p className="font-medium text-green-800">Ótimo trabalho!</p>
                <p className="text-sm text-green-700">
                  Seu IMC está dentro da faixa normal. Continue mantendo uma alimentação equilibrada.
                </p>
              </div>
              
              <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <p className="font-medium text-blue-800">Dica de Saúde</p>
                <p className="text-sm text-blue-700">
                  Meça sua pressão arterial regularmente e mantenha um registro.
                </p>
              </div>
              
              <div className="p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                <p className="font-medium text-yellow-800">Lembrete</p>
                <p className="text-sm text-yellow-700">
                  Não esqueça de atualizar seus dados de saúde semanalmente.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MinhaSaude;
