import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '../styles/themeContext';

import PerfilUsuario from './perfilUsuario';
import Preferencias from './preferencias';
import Conta from './conta';

export default function ConfiguracoesScreen({ navigation }) {
  const { theme } = useTheme();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.backgroundMain }]}
      contentContainerStyle={styles.content}
    >
      <PerfilUsuario navigation={navigation} />
      <Preferencias />
      <Conta navigation={navigation} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    gap: 24,
  },
});