import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { getIniciais } from '../../services/profile';
import { useTheme } from '../styles/themeContext';
import { useUser } from '../../services/userContext';

export default function PerfilUsuario() {
  const { theme } = useTheme();
  const { perfil } = useUser();

  if (!perfil) {
    return null; // Ou um <ActivityIndicator /> para indicar carregamento
  }
  
  const { nome, email, foto } = perfil;
  const s = makeStyles(theme);

  return (
    <ScrollView style={s.container} contentContainerStyle={s.content}>
      <View style={s.perfilContainer}>
        {foto ? (
          <Image source={{ uri: foto }} style={s.foto} />
        ) : (
          <View style={s.avatarFallback}>
            <Text style={s.avatarTexto}>{getIniciais(nome)}</Text>
          </View>
        )}
        <Text style={s.nome}>{nome}</Text>
        <Text style={s.email}>{email}</Text>
      </View>
    </ScrollView>
  );
}

function makeStyles(theme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundMain,
    },
    content: {
      padding: 20,
    },
    perfilContainer: {
      alignItems: 'center',
    },
    foto: {
      width: 90,
      height: 90,
      borderRadius: 45,
      resizeMode: 'cover',
      marginBottom: 16,
    },
    avatarFallback: {
      width: 90,
      height: 90,
      borderRadius: 45,
      backgroundColor: theme.primary,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 16,
    },
    avatarTexto: {
      color: theme.avatarText,
      fontSize: 32,
      fontWeight: 'bold',
    },
    nome: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.textDark,
      marginBottom: 4,
    },
    email: {
      fontSize: 12,
      color: theme.textMuted,
      opacity: 0.7,
    },
  });
}