import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const THEME_KEY = '@tema_escuro';
const ThemeContext = createContext();

export const lightTheme = {
  BG: '#F5F5ED',
  CARD: '#EEEEE6',
  DARK: '#1A1A1A',
  MUTED: '#888880',
  BORDER: '#D0D0C8',
  READONLY: '#EEEEE6',
  INPUT_BG: '#F5F5ED',
  TEAL: '#1BB585',
  DANGER: '#D85A30',
  SAVE_BTN: '#1A1A1A',
  SAVE_TXT: '#FFFFFF',
  BACK_BTN: 'rgba(0,0,0,0.06)',
  DIVIDER: 'rgba(0,0,0,0.08)',
  STATUS: 'dark-content',
};

export const darkTheme = {
  BG: '#1A1A18',
  CARD: '#2A2A26',
  DARK: '#F0F0E8',
  MUTED: '#888880',
  BORDER: '#3A3A34',
  READONLY: '#2A2A26',
  INPUT_BG: '#242420',
  TEAL: '#1BB585',
  DANGER: '#E8724A',
  SAVE_BTN: '#F0F0E8',
  SAVE_TXT: '#1A1A18',
  BACK_BTN: 'rgba(255,255,255,0.08)',
  DIVIDER: 'rgba(255,255,255,0.06)',
  STATUS: 'light-content',
};

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);
  const theme = isDark ? darkTheme : lightTheme;

  useEffect(() => {
    async function carregar() {
      try {
        const salvo = await AsyncStorage.getItem(THEME_KEY);
        if (salvo !== null) setIsDark(JSON.parse(salvo));
      } catch (e) {
        console.warn('ThemeContext: erro ao carregar tema:', e);
      }
    }
    carregar();
  }, []);

  // Persistir ao alternar
  const toggleTheme = async () => {
    const novoValor = !isDark;
    setIsDark(novoValor);
    try {
      await AsyncStorage.setItem(THEME_KEY, JSON.stringify(novoValor));
    } catch (e) {
      console.warn('ThemeContext: erro ao salvar tema:', e);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}