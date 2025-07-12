
/**
 * Componente de Chamada de Vídeo - Vida+ Sistema Hospitalar
 * 
 * Interface de telemedicina que permite comunicação em tempo real
 * entre médicos e pacientes, incluindo chat e controles de mídia.
 * 
 * @author Diogo Florencio
 * @version 1.0.0
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  Phone,
  PhoneOff,
  MessageSquare,
  FileText,
  Settings,
  Monitor,
  Users,
  Camera
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useConsultasStore } from '@/store/consultasStore';
import { useAuthStore } from '@/store/authStore';

// Interface que define as props do componente
interface VideoCallProps {
  consultaId: string;    // ID da consulta em andamento
  onEndCall: () => void; // Callback para finalizar a chamada
}

const VideoCall: React.FC<VideoCallProps> = ({ consultaId, onEndCall }) => {
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: string; message: string; time: string }[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [callDuration, setCallDuration] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  
  const { usuario } = useAuthStore();
  const { consultaAtiva, finalizarConsulta } = useConsultasStore();
  const videoRef = useRef<HTMLVideoElement>(null);
  const userVideoRef = useRef<HTMLVideoElement>(null);

  // Simulação de stream de vídeo
  useEffect(() => {
    const startUserVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: true, 
          audio: true 
        });
        if (userVideoRef.current) {
          userVideoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.log('Erro ao acessar câmera:', err);
      }
    };

    startUserVideo();

    // Timer da chamada
    const timer = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);

    return () => {
      clearInterval(timer);
      // Limpar streams
      if (userVideoRef.current?.srcObject) {
        const stream = userVideoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        sender: usuario?.nome || 'Usuário',
        message: newMessage,
        time: new Date().toLocaleTimeString('pt-BR', { 
          hour: '2-digit', 
          minute: '2-digit' 
        })
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  const handleEndCall = () => {
    if (consultaId) {
      finalizarConsulta(consultaId);
    }
    onEndCall();
  };

  // Dados do médico (simulado)
  const doctorData = {
    nome: 'Dr. Carlos Silva',
    crm: '12345-SP',
    especialidade: 'Cardiologia',
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face'
  };

  return (
    <div className="fixed inset-0 bg-gray-900 z-50 flex flex-col max-h-screen overflow-hidden video-call-container">
      {/* Header da chamada */}
      <div className="bg-gray-800 text-white p-3 flex items-center justify-between min-h-[60px]">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <img
              src={doctorData.avatar}
              alt={doctorData.nome}
              className="w-8 h-8 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold text-sm">{doctorData.nome}</h3>
              <p className="text-xs text-gray-300">{doctorData.especialidade} - {doctorData.crm}</p>
            </div>
          </div>
          <div className="bg-green-500 px-2 py-1 rounded-full text-xs font-medium">
            Em chamada - {formatDuration(callDuration)}
          </div>
        </div>

        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowSettings(!showSettings)}
            className="text-white hover:bg-gray-700 h-8 w-8 p-0"
          >
            <Settings className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setChatOpen(!chatOpen)}
            className="text-white hover:bg-gray-700 h-8 w-8 p-0"
          >
            <MessageSquare className="h-4 w-4" />
            {messages.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full px-1 min-w-[16px] h-4 flex items-center justify-center">
                {messages.length}
              </span>
            )}
          </Button>
        </div>
      </div>

      {/* Área principal da chamada */}
      <div className="flex-1 flex min-h-0">
        {/* Vídeo principal */}
        <div className="flex-1 relative bg-gray-800 overflow-hidden">
          {/* Vídeo do médico (simulado) */}
          <div className="w-full h-full flex items-center justify-center p-2 video-main-container">
            <div className="relative w-full h-full max-w-5xl max-h-full">
              <img
                src={doctorData.avatar}
                alt={doctorData.nome}
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
              <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                <span className="font-medium">{doctorData.nome}</span>
              </div>
            </div>
          </div>

          {/* Vídeo do usuário (canto inferior direito) */}
          <div className="absolute bottom-2 right-2 w-32 h-24 bg-gray-700 rounded-lg overflow-hidden shadow-lg border-2 border-blue-500">
            <video
              ref={userVideoRef}
              autoPlay
              muted
              playsInline
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-1 left-1 bg-black bg-opacity-50 text-white px-1 py-0.5 rounded text-xs">
              <span>Você</span>
            </div>
            {!videoEnabled && (
              <div className="absolute inset-0 bg-gray-600 flex items-center justify-center">
                <Camera className="h-6 w-6 text-gray-400" />
              </div>
            )}
          </div>

          {/* Controles da chamada */}
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2">
            <div className="flex items-center space-x-2 bg-gray-800 bg-opacity-90 backdrop-blur-sm rounded-full px-4 py-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setAudioEnabled(!audioEnabled)}
                className={`rounded-full w-10 h-10 ${
                  audioEnabled 
                    ? 'bg-gray-600 hover:bg-gray-500 text-white' 
                    : 'bg-red-600 hover:bg-red-500 text-white'
                }`}
              >
                {audioEnabled ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setVideoEnabled(!videoEnabled)}
                className={`rounded-full w-10 h-10 ${
                  videoEnabled 
                    ? 'bg-gray-600 hover:bg-gray-500 text-white' 
                    : 'bg-red-600 hover:bg-red-500 text-white'
                }`}
              >
                {videoEnabled ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="bg-gray-600 hover:bg-gray-500 text-white rounded-full w-10 h-10"
              >
                <Monitor className="h-4 w-4" />
              </Button>

              <Button
                variant="destructive"
                size="sm"
                onClick={handleEndCall}
                className="rounded-full w-10 h-10 bg-red-600 hover:bg-red-700"
              >
                <PhoneOff className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Painel de chat */}
        {chatOpen && (
          <div className="w-64 bg-white border-l border-gray-200 flex flex-col min-h-0">
            <div className="p-3 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900 text-sm">Chat da Consulta</h3>
            </div>
            
            <div className="flex-1 p-3 overflow-y-auto space-y-2 min-h-0">
              {messages.length === 0 ? (
                <div className="text-center text-gray-500 text-xs">
                  <MessageSquare className="h-6 w-6 mx-auto mb-1 text-gray-300" />
                  <p>Nenhuma mensagem ainda</p>
                  <p>Inicie a conversa!</p>
                </div>
              ) : (
                messages.map((msg, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-xs text-gray-900">{msg.sender}</span>
                      <span className="text-xs text-gray-500">{msg.time}</span>
                    </div>
                    <p className="text-xs text-gray-700">{msg.message}</p>
                  </div>
                ))
              )}
            </div>

            <div className="p-3 border-t border-gray-200">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Digite sua mensagem..."
                  className="flex-1 px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
                />
                <Button 
                  onClick={handleSendMessage}
                  size="sm" 
                  className="bg-blue-600 hover:bg-blue-700 text-xs px-2 py-1 h-8"
                >
                  Enviar
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Painel de configurações */}
      {showSettings && (
        <div className="absolute top-14 right-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 p-3 z-10">
          <h3 className="font-semibold text-gray-900 mb-2 text-sm">Configurações da Chamada</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-700">Qualidade de vídeo</span>
              <select className="text-xs border rounded px-1 py-0.5">
                <option>Alta (HD)</option>
                <option>Média</option>
                <option>Baixa</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-700">Filtro de ruído</span>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-700">Gravação</span>
              <input type="checkbox" className="rounded" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoCall;
