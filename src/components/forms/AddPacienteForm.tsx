/**
 * Componente de Formulário para Adicionar Paciente - Vida+ Sistema Hospitalar
 * 
 * Modal com formulário para cadastrar novos pacientes no sistema,
 * incluindo validação de campos e feedback visual.
 * 
 * @author Diogo Florencio
 * @version 1.0.0
 */

import React, { useState } from 'react';
import { X, User, Mail, Phone, Calendar, FileText, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';

interface AddPacienteFormProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (paciente: any) => void;
}

const AddPacienteForm: React.FC<AddPacienteFormProps> = ({ isOpen, onClose, onAdd }) => {
  // Estados do formulário
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    cpf: '',
    dataNascimento: '',
    endereco: '',
    convenio: '',
    observacoes: ''
  });
  const [carregando, setCarregando] = useState(false);

  // Lista de convênios disponíveis
  const convenios = [
    'Unimed',
    'Amil',
    'SulAmérica',
    'Bradesco Saúde',
    'Porto Seguro',
    'Particular',
    'Outro'
  ];

  // Função para validar CPF (formato básico)
  const validarCPF = (cpf: string) => {
    const cpfLimpo = cpf.replace(/\D/g, '');
    return cpfLimpo.length === 11;
  };

  // Função para validar email
  const validarEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Função para validar telefone
  const validarTelefone = (telefone: string) => {
    const telefoneLimpo = telefone.replace(/\D/g, '');
    return telefoneLimpo.length >= 10;
  };

  // Função para formatar CPF
  const formatarCPF = (value: string) => {
    const cpfLimpo = value.replace(/\D/g, '');
    return cpfLimpo.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  // Função para formatar telefone
  const formatarTelefone = (value: string) => {
    const telefoneLimpo = value.replace(/\D/g, '');
    if (telefoneLimpo.length === 11) {
      return telefoneLimpo.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (telefoneLimpo.length === 10) {
      return telefoneLimpo.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }
    return telefoneLimpo;
  };

  // Função para calcular idade
  const calcularIdade = (dataNascimento: string) => {
    if (!dataNascimento) return 0;
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mesAtual = hoje.getMonth();
    const mesNascimento = nascimento.getMonth();
    
    if (mesAtual < mesNascimento || (mesAtual === mesNascimento && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }
    
    return idade;
  };

  // Função para validar formulário
  const validarFormulario = () => {
    if (!formData.nome.trim()) {
      toast({
        title: "Campo obrigatório",
        description: "Por favor, preencha o nome do paciente.",
        variant: "destructive"
      });
      return false;
    }

    if (!validarEmail(formData.email)) {
      toast({
        title: "Email inválido",
        description: "Por favor, insira um email válido.",
        variant: "destructive"
      });
      return false;
    }

    if (!validarTelefone(formData.telefone)) {
      toast({
        title: "Telefone inválido",
        description: "Por favor, insira um telefone válido.",
        variant: "destructive"
      });
      return false;
    }

    if (!validarCPF(formData.cpf)) {
      toast({
        title: "CPF inválido",
        description: "Por favor, insira um CPF válido.",
        variant: "destructive"
      });
      return false;
    }

    if (!formData.dataNascimento) {
      toast({
        title: "Campo obrigatório",
        description: "Por favor, preencha a data de nascimento.",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  // Função para salvar paciente
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validarFormulario()) {
      return;
    }

    setCarregando(true);

    try {
      // Simula delay de processamento
      await new Promise(resolve => setTimeout(resolve, 1000));

      const novoPaciente = {
        id: Date.now().toString(),
        nome: formData.nome.trim(),
        email: formData.email.trim(),
        telefone: formData.telefone,
        cpf: formData.cpf,
        idade: calcularIdade(formData.dataNascimento),
        dataNascimento: formData.dataNascimento,
        endereco: formData.endereco.trim(),
        convenio: formData.convenio,
        status: 'Ativo',
        ultimaConsulta: null,
        proximaConsulta: null,
        prontuario: {
          historico: formData.observacoes || 'Paciente recém-cadastrado.',
          medicamentos: 'Nenhum medicamento registrado.',
          alergias: 'Nenhuma alergia conhecida.',
          observacoes: formData.observacoes || 'Paciente recém-cadastrado no sistema.',
          ultimaConsulta: null,
          proximaConsulta: null
        }
      };

      onAdd(novoPaciente);

      toast({
        title: "Paciente adicionado!",
        description: `${formData.nome} foi cadastrado com sucesso no sistema.`,
      });

      // Limpa formulário
      setFormData({
        nome: '',
        email: '',
        telefone: '',
        cpf: '',
        dataNascimento: '',
        endereco: '',
        convenio: '',
        observacoes: ''
      });

      onClose();
    } catch (error) {
      toast({
        title: "Erro ao adicionar paciente",
        description: "Tente novamente em alguns instantes.",
        variant: "destructive"
      });
    } finally {
      setCarregando(false);
    }
  };

  // Função para fechar modal
  const handleClose = () => {
    if (!carregando) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 w-screen h-screen modal-overlay">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto m-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
              <User className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Adicionar Novo Paciente</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Preencha os dados do paciente</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            disabled={carregando}
            className="text-gray-400 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Dados pessoais */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Dados Pessoais</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Nome Completo *
                  </label>
                  <Input
                    type="text"
                    value={formData.nome}
                    onChange={(e) => setFormData({...formData, nome: e.target.value})}
                    placeholder="Digite o nome completo"
                    className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    required
                  />
                </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Data de Nascimento *
                </label>
                <Input
                  type="date"
                  value={formData.dataNascimento}
                  onChange={(e) => setFormData({...formData, dataNascimento: e.target.value})}
                  max={new Date().toISOString().split('T')[0]}
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  CPF *
                </label>
                <Input
                  type="text"
                  value={formData.cpf}
                  onChange={(e) => setFormData({...formData, cpf: formatarCPF(e.target.value)})}
                  placeholder="000.000.000-00"
                  maxLength={14}
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Telefone *
                </label>
                <Input
                  type="text"
                  value={formData.telefone}
                  onChange={(e) => setFormData({...formData, telefone: formatarTelefone(e.target.value)})}
                  placeholder="(00) 00000-0000"
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
              </div>
            </div>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Contato</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  E-mail *
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="paciente@email.com"
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Convênio
                </label>
                <select
                  value={formData.convenio}
                  onChange={(e) => setFormData({...formData, convenio: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="">Selecione um convênio</option>
                  {convenios.map((convenio) => (
                    <option key={convenio} value={convenio}>{convenio}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Endereço */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Endereço</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Endereço Completo
              </label>
              <Input
                type="text"
                value={formData.endereco}
                onChange={(e) => setFormData({...formData, endereco: e.target.value})}
                placeholder="Rua, número, bairro, cidade - estado"
                className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
          </div>

          {/* Observações */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Observações</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Observações Iniciais
              </label>
              <Textarea
                value={formData.observacoes}
                onChange={(e) => setFormData({...formData, observacoes: e.target.value})}
                placeholder="Informações adicionais sobre o paciente..."
                rows={3}
                className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
          </div>

          {/* Botões */}
          <div className="flex justify-end space-x-3 pt-6 border-t dark:border-gray-700">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={carregando}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={carregando}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {carregando ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Salvando...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Save className="h-4 w-4" />
                  <span>Adicionar Paciente</span>
                </div>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPacienteForm; 