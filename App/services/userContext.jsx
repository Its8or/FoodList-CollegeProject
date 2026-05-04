import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import session from './auth/userSession';

const PERFIL_KEY = '@perfil_usuario';

const UserContext = createContext({
  perfil: null,
  atualizarPerfil: async () => {},
});

export function UserProvider({ children }) {
  const [perfil, setPerfil] = useState(session.getUser());

  useEffect(() => {
    async function carregar() {
      try {
        const json = await AsyncStorage.getItem(PERFIL_KEY);
        if (json !== null) {
          const dados = JSON.parse(json);
          session.login(dados); // Inicializa o Singleton
          setPerfil(dados);
        }
      } catch (e) {
        console.warn('UserContext: erro ao carregar perfil:', e);
      }
    }
    carregar();
  }, []);

  async function atualizarPerfil(novoPerfil) {
    // 1. Atualiza no Singleton (que usa as estratégias de validação)
    session.atualizarNomeUsuario(novoPerfil.nome);
    session.atualizarEmailUsuario(novoPerfil.email);
    
    const perfilAtualizado = session.getUser();

    // 2. Persiste e atualiza o estado do React para disparar re-render
    await AsyncStorage.setItem(PERFIL_KEY, JSON.stringify(perfilAtualizado));
    setPerfil({ ...perfilAtualizado }); 
  }

  return (
    <UserContext.Provider value={{ perfil, atualizarPerfil }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);