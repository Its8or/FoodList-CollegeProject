import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { lightTheme, darkTheme } from './theme';

const PREFS_KEY = '@preferencias_usuario';

const ThemeContext = createContext({
  theme: lightTheme,
  isDark: false,
  toggleTheme: () => {},
});

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);

  // Lê preferência salva ao iniciar o app
  useEffect(() => {
    async function carregarTema() {
      try {
        const json = await AsyncStorage.getItem(PREFS_KEY);
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

  // Alterna tema E persiste junto com as demais preferências
  async function toggleTheme(valor) {
    setIsDark(valor);
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