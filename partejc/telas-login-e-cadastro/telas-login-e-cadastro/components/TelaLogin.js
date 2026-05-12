import React, { useState } from 'react';
import {
  View, Text, TextInput,
  TouchableOpacity, Alert, StyleSheet
} from 'react-native';
import {
  camposLoginVazios,
  encontrarUsuario,
} from '../src/validators/loginValidator';

export default function TelaLogin({ navigation }) {
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  function handleLogin() {
    setErro('');

    if (camposLoginVazios(nome, senha)) {
      setErro('Preencha o nome e a senha.');
      return;
    }

    const usuario = encontrarUsuario(nome, senha);
    if (!usuario) {
      setErro('Nome ou senha inválidos.');
      return;
    }

    Alert.alert('Bem-vindo!', `Olá, ${usuario.nome}!`);
    navigation.navigate('Home');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      {erro ? <Text style={styles.erro}>{erro}</Text> : null}

      <TouchableOpacity style={styles.botao} onPress={handleLogin}>
        <Text style={styles.botaoTexto}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
        <Text style={styles.link}>Não tem conta? Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#f2f6ff',
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 28,
    textAlign: 'center',
  },
  input: {
    height: 48,
    borderWidth: 1.5,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 14,
    marginBottom: 12,
    backgroundColor: '#fff',
    fontSize: 15,
  },
  erro: {
    color: '#e53935',
    fontSize: 13,
    marginBottom: 10,
    textAlign: 'center',
  },
  botao: {
    backgroundColor: '#111',
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 16,
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  link: {
    textAlign: 'center',
    color: '#555',
    fontSize: 14,
  },
});