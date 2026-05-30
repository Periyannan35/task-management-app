import { useState, useEffect } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import './App.css';

export default function App() {
  const [user, setUser] = useState(null);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = () => {
    const storedUser = localStorage.getItem('user');
    setUser(JSON.parse(storedUser));
    setShowRegister(false);
  };

  const handleRegister = () => {
    const storedUser = localStorage.getItem('user');
    setUser(JSON.parse(storedUser));
    setShowRegister(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  if (!user) {
    return showRegister ? (
      <div>
        <Register onRegister={handleRegister} onToggle={() => setShowRegister(false)} />
      </div>
    ) : (
      <div>
        <Login onLogin={handleLogin} onToggle={() => setShowRegister(true)} />
      </div>
    );
  }

  return <Dashboard user={user} onLogout={handleLogout} />;
}
