import { useState } from 'react'
import './App.css'
import { LoginPage } from './components/pages/loginPage'
import { RegisterPage } from './components/pages/registerPage';

function App() {
  const [page, setPage] = useState<'login' | 'register'>('login');

  return (
    <>
      {page === 'login' && <LoginPage onNavigateToRegister={() => setPage('register')} />}
      {page === 'register' && <RegisterPage onNavigateToLogin={() => setPage('login')} />}
    </>
  )
}

export default App
