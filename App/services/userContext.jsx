import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PERFIL_KEY = '@perfil_usuario';

const PERFIL_PADRAO = {
  nome: null,
  username: null,
  email: null,
  foto: null,
};

const UserContext = createContext({
  perfil: PERFIL_PADRAO,
  atualizarPerfil: async () => {},
});

export function UserProvider({ children }) {
  const [perfil, setPerfil] = useState(PERFIL_PADRAO);

  // Carrega perfil salvo ao iniciar o app
  useEffect(() => {
    async function carregar() {
      try {
        const json = await AsyncStorage.getItem(PERFIL_KEY);
        if (json !== null) {
          setPerfil(JSON.parse(json));
        }
      } catch (e) {
        console.warn('UserContext: erro ao carregar perfil:', e);
      }
    }
    carregar();
  }, []);

  /**
   *   Persiste e atualiza o contexto em uma única chamada
   */ 
  async function atualizarPerfil(novoPerfil) {
    await AsyncStorage.setItem(PERFIL_KEY, JSON.stringify(novoPerfil));
    setPerfil(novoPerfil);
  }

  return (
    <UserContext.Provider value={{ perfil, atualizarPerfil }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}