import React, { createContext, useContext, useEffect, useState } from 'react';

const STORAGE_KEY = 'auth_user';
const USERS_KEY = 'users';

const demoUser = {
  id: 'demo-1',
  name: 'Demo User',
  email: 'demo@dandy.com',
  password: 'password123',
};

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch (_) {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  const getUsers = () => {
    try {
      const raw = localStorage.getItem(USERS_KEY);
      return raw ? JSON.parse(raw) : [demoUser];
    } catch (_) {
      return [demoUser];
    }
  };

  const saveUsers = (users) => localStorage.setItem(USERS_KEY, JSON.stringify(users));

  const login = (email, password) => {
    const users = getUsers();
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (!found) throw new Error('Invalid email or password');
    setUser(found);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(found));
    return found;
  };

  const register = (name, email, password) => {
    const users = getUsers();
    const exists = users.some(u => u.email.toLowerCase() === email.toLowerCase());
    if (exists) throw new Error('User already exists');
    const newUser = { id: `user-${Date.now()}`, name, email, password };
    const next = [...users, newUser];
    saveUsers(next);
    setUser(newUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    return newUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
export { AuthContext };
