import React, { useState } from 'react';
import {
  View, Text, TextInput,
  TouchableOpacity, Alert, StyleSheet
} from 'react-native';
import { users } from '../src/storage/users';
import {
  camposVazios,
  emailValido,
  senhasIguais,
  nomeUnico,
} from '../src/validators/registerValidator';

export default function TelaCadastro({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [erro, setErro] = useState('');

  function handleCadastro() {
    setErro('');

    if (camposVazios(nome, email, senha, confirmarSenha)) {
      setErro('Todos os campos são obrigatórios.');
      return;
    }
    if (!emailValido(email)) {
      setErro('Use um email @gmail.com ou @hotmail.com.');
      return;
    }
    if (!senhasIguais(senha, confirmarSenha)) {
      setErro('As senhas não coincidem.');
      return;
    }
    if (!nomeUnico(nome)) {
      setErro('Este nome já está em uso.');
      return;
    }

    users.push({
      nome: nome.trim(),
      email: email.trim().toLowerCase(),
      senha: senha,
    });

    Alert.alert('Sucesso!', 'Conta criada. Faça login.');
    navigation.navigate('Login');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Cadastro</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmar Senha"
        value={confirmarSenha}
        onChangeText={setConfirmarSenha}
        secureTextEntry
      />

      {erro ? <Text style={styles.erro}>{erro}</Text> : null}

      <TouchableOpacity style={styles.botao} onPress={handleCadastro}>
        <Text style={styles.botaoTexto}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Já tem conta? Entre aqui</Text>
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