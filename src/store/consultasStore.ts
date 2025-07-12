
import { create } from 'zustand';
import { Consulta, Prontuario } from '@/types';

interface ConsultasState {
  consultas: Consulta[];
  prontuarios: Prontuario[];
  consultaAtiva: Consulta | null;
  adicionarConsulta: (consulta: Omit<Consulta, 'id'>) => void;
  atualizarConsulta: (id: string, dados: Partial<Consulta>) => void;
  iniciarConsulta: (consultaId: string) => void;
  finalizarConsulta: (consultaId: string) => void;
  adicionarProntuario: (prontuario: Omit<Prontuario, 'id'>) => void;
  getConsultasPorPaciente: (pacienteId: string) => Consulta[];
  getConsultasPorMedico: (medicoId: string) => Consulta[];
}

// Mock de consultas para demonstração
const mockConsultas: Consulta[] = [
  {
    id: '1',
    pacienteId: '2',
    medicoId: '1',
    data: '2024-06-25',
    horario: '14:00',
    especialidade: 'Cardiologia',
    status: 'agendada',
    tipo: 'telemedicina',
    observacoes: 'Consulta de retorno'
  },
  {
    id: '2',
    pacienteId: '2',
    medicoId: '1',
    data: '2024-06-20',
    horario: '10:30',
    especialidade: 'Cardiologia',
    status: 'concluida',
    tipo: 'presencial',
    observacoes: 'Primeira consulta'
  }
];

const mockProntuarios: Prontuario[] = [
  {
    id: '1',
    pacienteId: '2',
    consultaId: '2',
    data: '2024-06-20',
    sintomas: 'Dor no peito, falta de ar',
    diagnostico: 'Hipertensão arterial leve',
    tratamento: 'Mudança de hábitos alimentares, exercícios regulares',
    medicamentos: ['Losartana 50mg', 'Hidroclorotiazida 25mg'],
    observacoes: 'Paciente colaborativo, seguir tratamento conforme orientado',
    medicoId: '1'
  }
];

export const useConsultasStore = create<ConsultasState>((set, get) => ({
  consultas: mockConsultas,
  prontuarios: mockProntuarios,
  consultaAtiva: null,
  
  adicionarConsulta: (novaConsulta) => {
    const consulta: Consulta = {
      ...novaConsulta,
      id: Date.now().toString(),
      status: 'agendada'
    };
    set((state) => ({
      consultas: [...state.consultas, consulta]
    }));
  },
  
  atualizarConsulta: (id, dados) => {
    set((state) => ({
      consultas: state.consultas.map(c => 
        c.id === id ? { ...c, ...dados } : c
      )
    }));
  },
  
  iniciarConsulta: (consultaId) => {
    const consulta = get().consultas.find(c => c.id === consultaId);
    if (consulta) {
      set({ consultaAtiva: consulta });
      get().atualizarConsulta(consultaId, { status: 'em_andamento' });
    }
  },
  
  finalizarConsulta: (consultaId) => {
    get().atualizarConsulta(consultaId, { status: 'concluida' });
    set({ consultaAtiva: null });
  },
  
  adicionarProntuario: (novoProntuario) => {
    const prontuario: Prontuario = {
      ...novoProntuario,
      id: Date.now().toString()
    };
    set((state) => ({
      prontuarios: [...state.prontuarios, prontuario]
    }));
  },
  
  getConsultasPorPaciente: (pacienteId) => {
    return get().consultas.filter(c => c.pacienteId === pacienteId);
  },
  
  getConsultasPorMedico: (medicoId) => {
    return get().consultas.filter(c => c.medicoId === medicoId);
  }
}));
