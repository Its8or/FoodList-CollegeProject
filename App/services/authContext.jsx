import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const USERS_KEY = '@users_foodlist';
const AUTH_KEY  = '@auth_session_foodlist';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [users, setUsers]               = useState([]);
  const [currentUser, setCurrentUser]   = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading]           = useState(true); // aguarda AsyncStorage

  // Carrega usuários e sessão persistida
  useEffect(() => {
    async function load() {
      try {
        const [usersJson, authJson] = await Promise.all([
          AsyncStorage.getItem(USERS_KEY),
          AsyncStorage.getItem(AUTH_KEY),
        ]);
        const loadedUsers = usersJson ? JSON.parse(usersJson) : [];
        setUsers(loadedUsers);

        if (authJson) {
          const session = JSON.parse(authJson);
          // Verifica se o usuário ainda existe na lista
          const found = loadedUsers.find(u => u.nome === session.nome);
          if (found) {
            setCurrentUser(found);
            setIsAuthenticated(true);
          }
        }
      } catch (e) {
        console.warn('AuthContext: erro ao carregar:', e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // Registra novo usuário (retorna false se nome já existir)
  async function register({ nome, email, senha }) {
    const nomeDuplicado = users.some(
      u => u.nome.toLowerCase() === nome.trim().toLowerCase(),
    );
    if (nomeDuplicado) return false;

    const newUser = {
      nome:  nome.trim(),
      email: email.trim().toLowerCase(),
      senha,
    };
    const updated = [...users, newUser];
    setUsers(updated);
    await AsyncStorage.setItem(USERS_KEY, JSON.stringify(updated));
    return true;
  }

  // Login — retorna true em caso de sucesso
  async function login(nome, senha) {
    const user = users.find(
      u =>
        u.nome.toLowerCase() === nome.trim().toLowerCase() &&
        u.senha === senha,
    );
    if (!user) return false;

    setCurrentUser(user);
    setIsAuthenticated(true);
    await AsyncStorage.setItem(AUTH_KEY, JSON.stringify({ nome: user.nome }));
    return true;
  }

  // Logout
  async function logout() {
    setCurrentUser(null);
    setIsAuthenticated(false);
    await AsyncStorage.removeItem(AUTH_KEY);
  }

  // Utilitário usado na tela de cadastro
  function nomeUnico(nome) {
    return !users.some(
      u => u.nome.toLowerCase() 
      === nome.trim().toLowerCase()
    );
  }

  return (
    <AuthContext.Provider
      value={{ currentUser, isAuthenticated, loading, register, login, logout, nomeUnico }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}