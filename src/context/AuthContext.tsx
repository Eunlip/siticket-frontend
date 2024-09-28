import Cookies from 'js-cookie';
import { createContext, useContext, useMemo, useState } from 'react';
import { TUserData } from '../types/user';

interface IAuthContext {
  user: TUserData[];
  token: string | null;
  login: (userData: TUserData, tokenData: string) => void;
  logout: () => void;
}

// Create Context
const AuthContext = createContext<IAuthContext | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<TUserData[]>([]);
  const [token, setToken] = useState<string | null>(null);

  const login = (userData: TUserData, tokenData: string) => {
    setUser([userData]);
    setToken(tokenData);
    Cookies.set('access_token', tokenData);
  };

  const logout = () => {
    setUser([]);
    setToken(null);
    Cookies.remove('access_token');
  };

  const value = useMemo(() => ({ user, token, login, logout }), [user, token]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
