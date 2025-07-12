
// Tipos e interfaces do sistema
export interface Usuario {
  id: string;
  nome: string;
  email: string;
  cpf: string;
  telefone: string;
  tipo: 'paciente' | 'medico' | 'admin';
  avatar?: string;
  crm?: string; // Para médicos
  especialidade?: string; // Para médicos
  dataNascimento?: string; // Para pacientes
  endereco?: string; // Para pacientes
  convenio?: string; // Para pacientes
}

export interface Consulta {
  id: string;
  pacienteId: string;
  medicoId: string;
  data: string;
  horario: string;
  especialidade: string;
  status: 'agendada' | 'em_andamento' | 'concluida' | 'cancelada';
  tipo: 'presencial' | 'telemedicina';
  observacoes?: string;
  receita?: string;
  prontuario?: string;
}

export interface Prontuario {
  id: string;
  pacienteId: string;
  consultaId: string;
  data: string;
  sintomas: string;
  diagnostico: string;
  tratamento: string;
  medicamentos: string[];
  observacoes: string;
  medicoId: string;
}

export interface Agendamento {
  especialidade: string;
  medico: string;
  data: string;
  horario: string;
  tipo: 'presencial' | 'telemedicina';
}

export interface Notificacao {
  id: string;
  titulo: string;
  mensagem: string;
  tipo: 'info' | 'warning' | 'success' | 'error';
  lida: boolean;
  data: string;
}
