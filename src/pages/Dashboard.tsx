
import React from 'react';
import { useAuthStore } from '@/store/authStore';
import DashboardPaciente from '@/components/dashboards/DashboardPaciente';
import DashboardMedico from '@/components/dashboards/DashboardMedico';
import DashboardAdmin from '@/components/dashboards/DashboardAdmin';

const Dashboard: React.FC = () => {
  const { usuario } = useAuthStore();

  const renderDashboard = () => {
    switch (usuario?.tipo) {
      case 'paciente':
        return <DashboardPaciente />;
      case 'medico':
        return <DashboardMedico />;
      case 'admin':
        return <DashboardAdmin />;
      default:
        return <div>Tipo de usuário não reconhecido</div>;
    }
  };

  return renderDashboard();
};

export default Dashboard;
