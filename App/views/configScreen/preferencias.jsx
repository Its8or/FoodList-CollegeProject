import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { useTheme } from '../styles/themeContext';

export default function Preferencias() {
  const { theme, toggleTheme, isDark } = useTheme();
  const [notificacoes, setNotificacoes] = useState(true);

  const s = makeStyles(theme);

  return (
    <View style={s.container}>
      <Text style={s.secaoTitulo}>PREFERÊNCIAS</Text>

      <View style={s.card}>
        {/* Modo escuro — controlado pelo ThemeContext */}
        <View style={s.linha}>
          <View style={[s.iconeWrapper, s.iconeDark]}>
            <Text style={s.icone}>🌙</Text>
          </View>
          <Text style={s.label}>Modo escuro</Text>
          <Switch
            value={isDark}
            onValueChange={toggleTheme}
            trackColor={{ false: theme.switchTrackOff, true: theme.primary }}
            thumbColor={theme.textButton}
          />
        </View>

      </View>
    </View>
  );
}

function makeStyles(theme) {
  return StyleSheet.create({
    container: {
      paddingHorizontal: 20,
      backgroundColor: theme.backgroundMain,
    },
    secaoTitulo: {
      fontSize: 11,
      fontWeight: '600',
      color: theme.textDark,
      letterSpacing: 1.2,
      marginBottom: 8,
    },
    card: {
      backgroundColor: theme.cardBackground,
      borderRadius: 10,
      overflow: 'hidden',
    },
    linha: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 15,
      gap: 12,
    },
    iconeWrapper: {
      width: 34,
      height: 34,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
    },
    iconeDark: {
      backgroundColor: theme.iconDark,
    },
    iconeNotif: {
      backgroundColor: theme.primary,
    },
    icone: {
      fontSize: 16,
    },
    label: {
      flex: 1,
      fontSize: 15,
      color: theme.textDark,
      fontWeight: '500',
    },
    divisor: {
      height: 1,
      backgroundColor: theme.divisor,
      marginHorizontal: 15,
    },
  });
}