import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { lightTheme, darkTheme } from './theme';

const PREFS_KEY = '@preferencias_usuario';

const ThemeContext = createContext({
  theme: lightTheme,
  isDark: false,
  toggleTheme: () => {},
});

/**
 * Controla e salva  o Tema do aplicativo do Usuário.
 */
export function ThemeProvider({ children }) {
  {/**
    * isDark:     valor atual
    * setIsDark:  função para atualizar tema
    */}
  const [isDark, setIsDark] = useState(false); {/* guarda e atualiza tema do app */}

  useEffect(() => {
    /**
     * Carrega preferência de tema do usuário
     */
    async function carregarTema() {
      try {
        const json = await AsyncStorage.getItem(PREFS_KEY); // busca e atribue as preferências de usuário.
        if (json !== null) {
          const prefs = JSON.parse(json);
          setIsDark(prefs.modoEscuro ?? false);
        }
      } catch (e) {
        console.warn('ThemeProvider: erro ao carregar tema:', e);
      }
    }
    carregarTema();
  }, []);

  /**
   * Atualiza o tema e salva a preferência no armazenamento local
   * @param {Boolean} valor: true(escuro) | false(claro) 
   */
  async function toggleTheme(valor) {
    setIsDark(valor); //Atualiza o estado imediatamente, sem esperar o AsyncStorage
    try {
      const json = await AsyncStorage.getItem(PREFS_KEY);
      const prefs = json ? JSON.parse(json) : {};
      await AsyncStorage.setItem(
        PREFS_KEY,
        JSON.stringify({ ...prefs, modoEscuro: valor })
      );
    } catch (e) {
      console.warn('ThemeProvider: erro ao salvar tema:', e);
    }
  }

  return (
    /**
     * Envolve os filhos e disponibiliza o tema para toda a aplicação.
     */
    <ThemeContext.Provider
      value={{ theme: isDark ? darkTheme : lightTheme, isDark, toggleTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

// Hook de conveniência
export function useTheme() {
  return useContext(ThemeContext);
}