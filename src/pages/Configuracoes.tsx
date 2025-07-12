import React, { useState } from 'react';
import { User, Lock, Bell, Settings as SettingsIcon, Save } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuthStore } from '@/store/authStore';
import { useTheme } from '@/components/theme/ThemeProvider';
import { toast } from '@/hooks/use-toast';

const Configuracoes: React.FC = () => {
  const { usuario, updateUser } = useAuthStore();
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('perfil');
  const [formData, setFormData] = useState({
    nome: usuario?.nome || '',
    email: usuario?.email || '',
    telefone: usuario?.telefone || '',
    cpf: usuario?.cpf || ''
  });

  const handleSave = () => {
    updateUser(formData);
    toast({
      title: "Configurações salvas",
      description: "Suas informações foram atualizadas com sucesso.",
    });
  };

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
    toast({
      title: "Tema alterado",
      description: `Tema alterado para ${newTheme === 'light' ? 'Claro' : newTheme === 'dark' ? 'Escuro' : 'Automático'}.`,
    });
  };

  const tabs = [
    { id: 'perfil', label: 'Perfil', icon: User },
    { id: 'seguranca', label: 'Segurança', icon: Lock },
    { id: 'notificacoes', label: 'Notificações', icon: Bell },
    { id: 'sistema', label: 'Sistema', icon: SettingsIcon }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Configurações</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Menu lateral */}
        <Card className="lg:col-span-1 dark:bg-gray-800 dark:border-gray-700">
          <CardContent className="p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-50 text-blue-700 border-r-4 border-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                        : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </CardContent>
        </Card>

        {/* Conteúdo */}
        <div className="lg:col-span-3">
          {activeTab === 'perfil' && (
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="dark:text-white">Informações do Perfil</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 dark:text-gray-200">Nome Completo</label>
                    <Input
                      value={formData.nome}
                      onChange={(e) => setFormData({...formData, nome: e.target.value})}
                      placeholder="Seu nome completo"
                      className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 dark:text-gray-200">Email</label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="seu@email.com"
                      className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 dark:text-gray-200">Telefone</label>
                    <Input
                      value={formData.telefone}
                      onChange={(e) => setFormData({...formData, telefone: e.target.value})}
                      placeholder="(11) 99999-9999"
                      className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 dark:text-gray-200">CPF</label>
                    <Input
                      value={formData.cpf}
                      onChange={(e) => setFormData({...formData, cpf: e.target.value})}
                      placeholder="000.000.000-00"
                      disabled
                      className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                    <Save className="h-4 w-4 mr-2" />
                    Salvar Alterações
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'seguranca' && (
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="dark:text-white">Segurança da Conta</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-gray-200">Senha Atual</label>
                  <Input type="password" placeholder="Digite sua senha atual" className="dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-gray-200">Nova Senha</label>
                  <Input type="password" placeholder="Digite a nova senha" className="dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-gray-200">Confirmar Nova Senha</label>
                  <Input type="password" placeholder="Confirme a nova senha" className="dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                </div>
                
                <div className="flex justify-end">
                  <Button className="bg-orange-600 hover:bg-orange-700">
                    <Lock className="h-4 w-4 mr-2" />
                    Alterar Senha
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'notificacoes' && (
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="dark:text-white">Preferências de Notificação</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div>
                      <h3 className="font-medium dark:text-white">Lembretes de Consulta</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Receber notificações antes das consultas</p>
                    </div>
                    <input type="checkbox" className="h-5 w-5" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div>
                      <h3 className="font-medium dark:text-white">Lembretes de Medicação</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Receber lembretes para tomar medicamentos</p>
                    </div>
                    <input type="checkbox" className="h-5 w-5" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div>
                      <h3 className="font-medium dark:text-white">Resultados de Exames</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Ser notificado quando exames ficarem prontos</p>
                    </div>
                    <input type="checkbox" className="h-5 w-5" defaultChecked />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Bell className="h-4 w-4 mr-2" />
                    Salvar Preferências
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'sistema' && (
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="dark:text-white">Configurações do Sistema</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 dark:text-gray-200">Tema</label>
                    <select 
                      className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      value={theme}
                      onChange={(e) => handleThemeChange(e.target.value as 'light' | 'dark' | 'system')}
                    >
                      <option value="light">Claro</option>
                      <option value="dark">Escuro</option>
                      <option value="system">Automático</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2 dark:text-gray-200">Idioma</label>
                    <select className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                      <option>Português (Brasil)</option>
                      <option>English</option>
                      <option>Español</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2 dark:text-gray-200">Fuso Horário</label>
                    <select className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                      <option>Brasília (GMT-3)</option>
                      <option>São Paulo (GMT-3)</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <SettingsIcon className="h-4 w-4 mr-2" />
                    Aplicar Configurações
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Configuracoes;
