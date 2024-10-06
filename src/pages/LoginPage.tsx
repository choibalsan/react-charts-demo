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
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-96">
          <h1 className="text-2xl mb-4">Login</h1>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded mt-1"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
                type="password"
                className="w-full p-2 border border-gray-300 rounded mt-1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
            Login
          </button>
        </form>
      </div>
  );
};

export default LoginPage;
