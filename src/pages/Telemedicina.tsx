
import React, { useState } from 'react';
import {
  Video,
  Calendar,
  Clock,
  User,
  Monitor,
  PhoneCall,
  Settings,
  Wifi,
  WifiOff
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import VideoCall from '@/components/telemedicina/VideoCall';
import { useConsultasStore } from '@/store/consultasStore';
import { useAuthStore } from '@/store/authStore';

const Telemedicina: React.FC = () => {
  const [chamadaAtiva, setChamadaAtiva] = useState<string | null>(null);
  const [testeConexao, setTesteConexao] = useState<'testando' | 'ok' | 'erro' | null>(null);
  
  const { consultas, iniciarConsulta } = useConsultasStore();
  const { usuario } = useAuthStore();

  // Consultas de telemedicina disponíveis
  const consultasTelemedicina = consultas.filter(c => 
    c.tipo === 'telemedicina' && 
    (usuario?.tipo === 'paciente' ? c.pacienteId === usuario.id : c.medicoId === usuario.id)
  );

  const consultasAgendadas = consultasTelemedicina.filter(c => c.status === 'agendada');
  const proximaConsulta = consultasAgendadas[0];

  const testarConexao = async () => {
    setTesteConexao('testando');
    // Simular teste de conexão
    setTimeout(() => {
      setTesteConexao('ok');
      setTimeout(() => setTesteConexao(null), 3000);
    }, 2000);
  };

  const iniciarChamada = (consultaId: string) => {
    iniciarConsulta(consultaId);
    setChamadaAtiva(consultaId);
  };

  const finalizarChamada = () => {
    setChamadaAtiva(null);
  };

  if (chamadaAtiva) {
    return (
      <VideoCall 
        consultaId={chamadaAtiva} 
        onEndCall={finalizarChamada} 
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              Telemedicina 💻
            </h1>
            <p className="text-green-100">
              Consultas médicas online com segurança e qualidade
            </p>
          </div>
          <div className="hidden md:block">
            <Video className="h-16 w-16 text-white opacity-20" />
          </div>
        </div>
      </div>

      {/* Status da conexão */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Wifi className="h-5 w-5 text-green-600" />
            <span>Status da Conexão</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-700 font-medium">Online</span>
              </div>
              <div className="text-sm text-gray-600">
                Velocidade: 50 Mbps | Latência: 12ms
              </div>
              {testeConexao && (
                <div className="flex items-center space-x-2">
                  {testeConexao === 'testando' && (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                      <span className="text-blue-600 text-sm">Testando...</span>
                    </>
                  )}
                  {testeConexao === 'ok' && (
                    <span className="text-green-600 text-sm font-medium">✓ Conexão estável</span>
                  )}
                </div>
              )}
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={testarConexao}
              disabled={testeConexao === 'testando'}
            >
              <Settings className="h-4 w-4 mr-2" />
              Testar Conexão
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Consulta em destaque */}
      {proximaConsulta && (
        <Card className="border-l-4 border-l-green-600">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-green-600" />
              <span>Próxima Consulta Online</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-3">
                <div className="flex items-center space-x-4">
                  <img
                    src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face"
                    alt="Dr. Carlos Silva"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-xl font-semibold text-gray-900">
                      {usuario?.tipo === 'paciente' ? 'Dr. Carlos Silva' : 'Maria Santos'}
                    </p>
                    <p className="text-gray-600">
                      {usuario?.tipo === 'paciente' ? 'Cardiologia - CRM 12345-SP' : 'Paciente - 39 anos'}
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span>{new Date(proximaConsulta.data).toLocaleDateString('pt-BR')}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span>{proximaConsulta.horario}</span>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm">
                  📋 {proximaConsulta.observacoes || 'Consulta de rotina'}
                </p>
              </div>
              
              <div className="space-y-3">
                <Button 
                  onClick={() => iniciarChamada(proximaConsulta.id)}
                  className="w-full bg-green-600 hover:bg-green-700"
                  size="lg"
                >
                  <Video className="h-5 w-5 mr-2" />
                  Iniciar Consulta
                </Button>
                <p className="text-xs text-gray-500 text-center">
                  Consulta disponível a partir de<br />
                  {proximaConsulta.horario}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Lista de consultas agendadas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Consultas Agendadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {consultasAgendadas.length > 0 ? (
                consultasAgendadas.map((consulta) => (
                  <div key={consulta.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <Video className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {usuario?.tipo === 'paciente' ? 'Dr. Carlos Silva' : 'Maria Santos'}
                        </p>
                        <p className="text-sm text-gray-600">
                          {new Date(consulta.data).toLocaleDateString('pt-BR')} às {consulta.horario}
                        </p>
                        <p className="text-xs text-gray-500">{consulta.especialidade}</p>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => iniciarChamada(consulta.id)}
                    >
                      <PhoneCall className="h-4 w-4 mr-2" />
                      Entrar
                    </Button>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Video className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                  <p className="text-lg font-medium mb-1">Nenhuma consulta online agendada</p>
                  <p className="text-sm">Agende uma consulta de telemedicina</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Informações sobre telemedicina */}
        <Card>
          <CardHeader>
            <CardTitle>Como Funciona</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Calendar className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">1. Agendamento</h4>
                  <p className="text-sm text-gray-600">
                    Agende sua consulta online através do sistema
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <Monitor className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">2. Preparação</h4>
                  <p className="text-sm text-gray-600">
                    Teste sua câmera, microfone e conexão antes da consulta
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="bg-purple-100 p-2 rounded-full">
                  <Video className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">3. Consulta</h4>
                  <p className="text-sm text-gray-600">
                    Realize sua consulta com total segurança e qualidade
                  </p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Requisitos Técnicos</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Conexão estável de internet (mín. 5 Mbps)</li>
                  <li>• Câmera e microfone funcionais</li>
                  <li>• Navegador atualizado</li>
                  <li>• Ambiente silencioso e bem iluminado</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer de suporte */}
      <Card className="bg-gradient-to-r from-gray-50 to-blue-50">
        <CardContent className="p-6">
          <div className="text-center">
            <h3 className="font-semibold text-gray-900 mb-2">
              Precisa de Ajuda com a Telemedicina?
            </h3>
            <p className="text-gray-600 mb-4">
              Nossa equipe está disponível para ajudar com questões técnicas
            </p>
            <div className="flex justify-center space-x-4">
              <Button variant="outline">
                <PhoneCall className="h-4 w-4 mr-2" />
                Suporte Técnico
              </Button>
              <Button variant="outline">
                <Video className="h-4 w-4 mr-2" />
                Tutorial
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Telemedicina;
