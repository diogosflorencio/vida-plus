
import React, { useState } from 'react';
import { Calendar, FileText, Download, Eye, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const HistoricoMedico: React.FC = () => {
  const [filtroTipo, setFiltroTipo] = useState('todos');

  const historico = [
    {
      id: '1',
      data: '2024-06-20',
      tipo: 'consulta',
      titulo: 'Consulta Cardiológica',
      medico: 'Dr. Carlos Silva',
      especialidade: 'Cardiologia',
      resumo: 'Consulta de rotina. Pressão arterial controlada. Manter medicação atual.',
      documentos: ['receita_20240620.pdf', 'exame_eco_20240620.pdf']
    },
    {
      id: '2',
      data: '2024-06-15',
      tipo: 'exame',
      titulo: 'Ecocardiograma',
      medico: 'Dr. Carlos Silva',
      especialidade: 'Cardiologia',
      resumo: 'Ecocardiograma dentro dos parâmetros normais. Função cardíaca preservada.',
      documentos: ['resultado_eco_20240615.pdf']
    },
    {
      id: '3',
      data: '2024-05-30',
      tipo: 'consulta',
      titulo: 'Consulta de Retorno',
      medico: 'Dr. Carlos Silva',
      especialidade: 'Cardiologia',
      resumo: 'Paciente apresentando melhora dos sintomas. Ajuste na dosagem da medicação.',
      documentos: ['receita_20240530.pdf']
    },
    {
      id: '4',
      data: '2024-05-20',
      tipo: 'exame',
      titulo: 'Exames Laboratoriais',
      medico: 'Dr. Carlos Silva',
      especialidade: 'Cardiologia',
      resumo: 'Hemograma completo, colesterol e glicemia. Todos os valores dentro da normalidade.',
      documentos: ['hemograma_20240520.pdf', 'lipidograma_20240520.pdf']
    },
    {
      id: '5',
      data: '2024-04-10',
      tipo: 'consulta',
      titulo: 'Primeira Consulta',
      medico: 'Dr. Carlos Silva',
      especialidade: 'Cardiologia',
      resumo: 'Primeira consulta cardiológica. Histórico de hipertensão familiar. Iniciado tratamento.',
      documentos: ['receita_inicial_20240410.pdf']
    }
  ];

  const filteredHistorico = historico.filter(item => 
    filtroTipo === 'todos' || item.tipo === filtroTipo
  );

  const getTipoBadge = (tipo: string) => {
    switch (tipo) {
      case 'consulta':
        return <Badge className="bg-blue-100 text-blue-800">Consulta</Badge>;
      case 'exame':
        return <Badge className="bg-green-100 text-green-800">Exame</Badge>;
      case 'internacao':
        return <Badge className="bg-red-100 text-red-800">Internação</Badge>;
      default:
        return <Badge variant="secondary">{tipo}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Meu Histórico Médico</h1>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Exportar Histórico
        </Button>
      </div>

      {/* Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {historico.filter(h => h.tipo === 'consulta').length}
            </div>
            <div className="text-sm text-gray-600">Consultas</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {historico.filter(h => h.tipo === 'exame').length}
            </div>
            <div className="text-sm text-gray-600">Exames</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">
              {historico.reduce((acc, h) => acc + h.documentos.length, 0)}
            </div>
            <div className="text-sm text-gray-600">Documentos</div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <Filter className="h-4 w-4 text-gray-500" />
            <select
              value={filtroTipo}
              onChange={(e) => setFiltroTipo(e.target.value)}
              className="p-2 border rounded-md"
            >
              <option value="todos">Todos os tipos</option>
              <option value="consulta">Consultas</option>
              <option value="exame">Exames</option>
              <option value="internacao">Internações</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Timeline do histórico */}
      <div className="space-y-4">
        {filteredHistorico.map((item, index) => (
          <Card key={item.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                {/* Timeline indicator */}
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                  {index < filteredHistorico.length - 1 && (
                    <div className="w-0.5 h-16 bg-gray-200 mt-4"></div>
                  )}
                </div>

                {/* Conteúdo */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-lg font-semibold text-gray-900">{item.titulo}</h3>
                      {getTipoBadge(item.tipo)}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(item.data).toLocaleDateString('pt-BR')}
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <p className="text-gray-600">
                      <strong>Médico:</strong> {item.medico} - {item.especialidade}
                    </p>
                    <p className="text-gray-700">{item.resumo}</p>
                  </div>

                  {/* Documentos */}
                  {item.documentos.length > 0 && (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Documentos:</h4>
                      <div className="flex flex-wrap gap-2">
                        {item.documentos.map((doc, idx) => (
                          <div key={idx} className="flex items-center space-x-2 bg-gray-50 p-2 rounded-md">
                            <FileText className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-700">{doc}</span>
                            <Button variant="ghost" size="sm">
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Download className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredHistorico.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum registro encontrado</h3>
            <p className="text-gray-600">Tente ajustar os filtros ou aguarde novos registros médicos</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default HistoricoMedico;
