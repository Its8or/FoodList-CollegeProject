import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { getIniciais } from '../../services/profile'

const MOCK_USER = {
  nome: 'João Silva',
  email: 'joao.silva@email.com',
  foto: null,
};

export default function EditarPerfilScreen({ navigation }) {
  const [nome, setNome] = useState(MOCK_USER.nome);
  const [email, setEmail] = useState(MOCK_USER.email);
  const [foto, setFoto] = useState(MOCK_USER.foto);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.titulo}>Editar Perfil</Text>

      {/* Avatar */}
      <View style={styles.avatarContainer}>
        {foto ? (
          <Image source={{ uri: foto }} style={styles.foto} />
        ) : (
          <View style={styles.avatarFallback}>
            <Text style={styles.avatarTexto}>{getIniciais(nome)}</Text>
          </View>
        )}
        <TouchableOpacity style={styles.botaoAlterarFoto}>
          <Text style={styles.botaoAlterarFotoTexto}>Alterar foto</Text>
        </TouchableOpacity>
      </View>

      {/* Inputs */}
      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={setNome}
        placeholder="Seu nome"
        placeholderTextColor="#C4A882"
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Seu email"
        placeholderTextColor="#C4A882"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Botões */}
      <TouchableOpacity
        style={styles.botaoSalvar}
        onPress={() => {/* TODO: salvar mudanças */ }}
      >
        <Text style={styles.textoBotao}>Salvar mudanças</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botaoVoltar}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.textoBotaoVoltar}>Voltar</Text>
      </TouchableOpacity>
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
    marginBottom: 24,
  },

  // Avatar
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 28,
  },
  foto: {
    width: 90,
    height: 90,
    borderRadius: 45,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  avatarFallback: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#E67E22',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  avatarTexto: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
  },
  botaoAlterarFoto: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E67E22',
  },
  botaoAlterarFotoTexto: {
    color: '#E67E22',
    fontSize: 13,
    fontWeight: '600',
  },

  // Inputs
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#8B5E3C',
    opacity: 0.7,
    marginBottom: 6,
    marginLeft: 2,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    fontSize: 15,
    color: '#8B5E3C',
  },

  // Botões
  botaoSalvar: {
    backgroundColor: '#34C759',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 10,
  },
  botaoVoltar: {
    backgroundColor: '#E67E22',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  textoBotao: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
  textoBotaoVoltar: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
});