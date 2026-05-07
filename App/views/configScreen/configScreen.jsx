import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '../styles/themeContext';

import PerfilUsuario from './perfilUsuario';
import Preferencias from './preferencias';
import ShowProfile from './contaOptions';

export default function ConfiguracoesScreen({ navigation }) {
  const { theme } = useTheme();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.backgroundMain }]}
      contentContainerStyle={styles.content}
      >
      <PerfilUsuario navigation={navigation} />   {/* import de perfilUsuario.jsx */}
      <Preferencias />                            {/* import de preferencias.jsx  */}
      <ShowProfile navigation={navigation} />     {/* import de contaOptions.jsx  */}
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