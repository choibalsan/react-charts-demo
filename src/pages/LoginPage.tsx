import {FormEvent, useState} from 'react';
import {useNavigate} from '@tanstack/react-router';
import {Auth} from '../auth';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    const isLoggedIn = Auth.login(username, password);
    if (isLoggedIn) {
      navigate({to: '/dashboard'});
    } else {
      setError('Invalid username or password');
    }
  };

  return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <form onSubmit={handleLogin} className="p-6 rounded shadow-secondary-500 shadow-md w-96">
          <h1 className="text-2xl mb-4">Login</h1>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <div className="mb-4">
            <label className="block text-primary-500">Username</label>
            <input
                type="text"
                className="w-full p-2 border border-secondary-500 rounded mt-1"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-primary-500">Password</label>
            <input
                type="password"
                className="w-full p-2 border border-secondary-500 rounded mt-1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="w-full p-2 text-primary-500 bg-primary-100 shadow-secondary-500 shadow-md rounded">
            Login
          </button>
        </form>
      </div>
  );
};

export default LoginPage;
