import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginForm from './LoginForm';

// Teste básico para verificar se o formulário renderiza
describe('LoginForm', () => {
  it('deve renderizar o formulário de login', () => {
    render(<LoginForm />);
    expect(screen.getByText(/entrar/i)).toBeInTheDocument();
  });
}); 
