import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';

// Substituir pelos dados reais do usuário (contexto/auth)
const MOCK_USER = {
  nome: 'Heitor Oliveira Terto',
  email: 'heitoroliveiraterto@email.com',
  foto: null, // coloque uma URL string para exibir foto real
};

function getIniciais(nome) {
  return nome
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0].toUpperCase())
    .join('');
}

export default function PerfilUsuario() {
  const { nome, email, foto } = MOCK_USER;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.titulo}>Configurações</Text>

      <View style={styles.perfilContainer}>
        {foto ? (
          <Image source={{ uri: foto }} style={styles.foto} />
        ) : (
          <View style={styles.avatarFallback}>
            <Text style={styles.avatarTexto}>{getIniciais(nome)}</Text>
          </View>   
        )}

        <Text style={styles.nome}>{nome}</Text>
        <Text style={styles.email}>{email}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F0',
  },
  content: {
    padding: 20,
  },

  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#E67E22',
    textAlign: 'center',
    marginBottom: 30,
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
    backgroundColor: '#E67E22',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  avatarTexto: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
  },

  nome: {
    fontSize: 18,
    fontWeight: '600',
    color: '#8B5E3C',
    marginBottom: 4,
  },
  email: {
    fontSize: 12,
    color: '#8B5E3C',
    opacity: 0.7,
  },
});