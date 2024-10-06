export interface IAuthService {
  checkAuth: () => Promise<boolean>;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

export const Auth: IAuthService = {
  checkAuth: async () => {
    const token = localStorage.getItem('authToken');
    return !!token; // Authenticated if there's any token
  },
  login: (username: string, password: string) => {
    // Simulate a login process
    if (username === 'user' && password === '1234') {
      localStorage.setItem('authToken', 'secure123'); // Set token, no matter what
      return true;
    }
    return false;
  },
  logout: () => {
    localStorage.removeItem('authToken');
  },
}
