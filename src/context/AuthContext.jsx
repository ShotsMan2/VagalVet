import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('vagalvet_token'));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (token) {
      // Verify token by calling /api/auth/me
      fetch('/api/auth/me', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
        .then(res => {
          if (!res.ok) throw new Error('Invalid token');
          return res.json();
        })
        .then(data => {
          setUser(data);
          setIsLoading(false);
        })
        .catch(() => {
          localStorage.removeItem('vagalvet_token');
          localStorage.removeItem('vagalvet_refresh_token');
          setToken(null);
          setUser(null);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [token]);

  const login = async (username, password) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || 'Giriş başarısız');
    }
    const data = await res.json();
    localStorage.setItem('vagalvet_token', data.accessToken);
    localStorage.setItem('vagalvet_refresh_token', data.refreshToken);
    setToken(data.accessToken);
    setUser(data.user);
    return data;
  };

  const logout = () => {
    localStorage.removeItem('vagalvet_token');
    localStorage.removeItem('vagalvet_refresh_token');
    setToken(null);
    setUser(null);
  };

  // Helper for authenticated API calls
  const authFetch = async (url, options = {}) => {
    const headers = { ...options.headers, 'Authorization': `Bearer ${token}` };
    let res = await fetch(url, { ...options, headers });
    
    if (res.status === 401) {
      // Try to refresh token
      const refreshToken = localStorage.getItem('vagalvet_refresh_token');
      if (refreshToken) {
        const refreshRes = await fetch('/api/auth/refresh', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refreshToken })
        });
        if (refreshRes.ok) {
          const refreshData = await refreshRes.json();
          localStorage.setItem('vagalvet_token', refreshData.accessToken);
          setToken(refreshData.accessToken);
          headers['Authorization'] = `Bearer ${refreshData.accessToken}`;
          res = await fetch(url, { ...options, headers });
        } else {
          logout();
          throw new Error('Oturum süresi doldu');
        }
      } else {
        logout();
        throw new Error('Oturum süresi doldu');
      }
    }
    return res;
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, logout, authFetch }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
