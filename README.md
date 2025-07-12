# Vida+ - Sistema de Gestão Hospitalar

## 📋 Sobre o Projeto

O **Vida+** é um sistema completo de gestão hospitalar desenvolvido em React com TypeScript, focado em proporcionar uma experiência moderna e eficiente para médicos, pacientes e administradores.

### 🎯 Principais Funcionalidades

- **🔐 Sistema de Autenticação**: Login seguro com diferentes níveis de acesso
- **👨‍⚕️ Dashboard Médico**: Gestão de pacientes, prontuários e consultas
- **👤 Dashboard Paciente**: Agendamentos, histórico médico e telemedicina
- **⚙️ Dashboard Admin**: Gestão de usuários e configurações do sistema
- **📹 Telemedicina**: Chamadas de vídeo com chat integrado
- **🌙 Tema Escuro/Claro**: Interface adaptável às preferências do usuário

## 🛠️ Tecnologias Utilizadas

- **React 18** - Biblioteca principal para interface
- **TypeScript** - Tipagem estática para maior segurança
- **Vite** - Build tool rápido e moderno
- **Tailwind CSS** - Framework CSS utilitário
- **Shadcn/ui** - Componentes UI reutilizáveis
- **Zustand** - Gerenciamento de estado global
- **React Router** - Navegação entre páginas
- **Lucide React** - Ícones modernos

## 👨‍💻 Autor

**Diogo Florencio**
- Desenvolvedor Full Stack
- Especialista em React e TypeScript
- Foco em aplicações médicas e hospitalares

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Instalação

1. **Clone o repositório**
```bash
git clone [url-do-repositorio]
cd vida-plus
```

2. **Instale as dependências**
```bash
npm install
```

3. **Execute o projeto**
```bash
npm run dev
```

4. **Acesse no navegador**
```
http://localhost:8080
```

## 🔑 Credenciais de Teste

### Médico
- **Email**: medico@email.com
- **Senha**: 123

### Paciente
- **Email**: paciente@email.com
- **Senha**: 123

### Administrador
- **Email**: admin@email.com
- **Senha**: 123

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── forms/          # Formulários de login/registro
│   ├── layout/         # Componentes de layout
│   ├── telemedicina/   # Componentes de vídeo chamada
│   └── ui/             # Componentes base (shadcn/ui)
├── pages/              # Páginas principais
├── store/              # Gerenciamento de estado (Zustand)
├── hooks/              # Hooks customizados
├── types/              # Definições de tipos TypeScript
└── assets/             # Imagens e recursos estáticos
```

## 🎨 Personalização

O sistema utiliza um design system consistente com:
- **Cores**: Paleta personalizada com suporte a tema escuro
- **Tipografia**: Fonte moderna e legível
- **Componentes**: Biblioteca de componentes reutilizáveis
- **Responsividade**: Adaptável a diferentes tamanhos de tela

## 🔧 Scripts Disponíveis

- `npm run dev` - Executa o servidor de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run preview` - Visualiza o build de produção
- `npm run lint` - Executa o linter

## 📝 Licença

Este projeto foi desenvolvido como trabalho acadêmico e está sob licença MIT.

## 🤝 Contribuição

Para contribuir com o projeto:
1. Faça um fork do repositório
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Abra um Pull Request

---

**Desenvolvido com ❤️ por Diogo Florencio** 