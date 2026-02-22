import { useState } from 'react'
import './App.css'
import { LoginPage } from './components/pages/loginPage'
import { RegisterPage } from './components/pages/registerPage';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DashboardPage } from './components/pages/dashboard';

function AppContent() {
  const { user } = useAuth();
  const [page, setPage] = useState<'login' | 'register'>('login');

  if (user) {
    return <DashboardPage onNavigateToLogin={() => setPage('login')} />;
  }

  return (
    <>
      {page === 'login' && <LoginPage onNavigateToRegister={() => setPage('register')} />}
      {page === 'register' && <RegisterPage onNavigateToLogin={() => setPage('login')} />}
    </>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}
