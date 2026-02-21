import { useState } from 'react'
import './App.css'
import { LoginPage } from './components/pages/loginPage'
import { RegisterPage } from './components/pages/registerPage';
import { AuthProvider, useAuth } from './contexts/AuthContext';

function AppContent() {
  const { user } = useAuth();
  const [page, setPage] = useState<'login' | 'register'>('login');

  if (user) {
    return <div>Main Page - Logged in: {user.firstName}</div>
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
