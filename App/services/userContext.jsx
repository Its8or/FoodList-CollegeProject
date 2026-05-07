import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import session from './auth/userSession';

const PERFIL_KEY = '@perfil_usuario';

export const UserContext = createContext({
  perfil: null,
  atualizarPerfil: async () => { },
});

/**
 * Gerencia o perfil do usuário logado. 
 * Carrega, atualiza e disponibiliza os dados para toda a aplicação.
 */
export function UserProvider({ children }) {
  const [perfil, setPerfil] = useState(session.getUser()); // inicializa com usuário salvo na memória.

  useEffect(() => {
    async function carregar() {
      try {
        const json = await AsyncStorage.getItem(PERFIL_KEY); // le dados do disco
        if (json !== null) {
          const dados = JSON.parse(json);     // converte em objeto
          session.login(dados);               // Inicializa o Singleton
          setPerfil(dados);                   // atualiza o estado no React
        }
      } catch (e) {
        console.warn('UserContext: erro ao carregar perfil:', e);
      }
    }
    carregar();
  }, []);

  /**
   * atualiza o perfil do usuário em três lugares.
   * @param {*} novoPerfil
   */
  async function atualizarPerfil(novoPerfil) {
    // valida e salva em memória
    session.atualizarNomeUsuario(novoPerfil.nome);
    session.atualizarEmailUsuario(novoPerfil.email);
    // Lê o resultado já validado
    const perfilAtualizado = session.getUser();
    // Persiste no disco
    await AsyncStorage.setItem(PERFIL_KEY, JSON.stringify(perfilAtualizado));
    //  Atualiza a UI
    setPerfil({ ...perfilAtualizado });
  }

  return (
    <UserContext.Provider value={{ perfil, atualizarPerfil }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);