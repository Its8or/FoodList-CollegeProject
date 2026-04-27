import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import { getIniciais } from '../../services/profile';
import { useTheme } from '../styles/themeContext';
import { useUser } from '../../services/userContext';

export default function EditarPerfilScreen({ navigation }) {
  const { theme } = useTheme();
  const { perfil, atualizarPerfil } = useUser();  // ← lê e escreve no contexto

  // Inicializa os campos com os dados atuais do contexto
  const [nome, setNome] = useState(perfil.nome);
  const [email, setEmail] = useState(perfil.email);
  const [foto, setFoto] = useState(perfil.foto);

  // Se o contexto mudar externamente, sincroniza os campos
  useEffect(() => {
    setNome(perfil.nome);
    setEmail(perfil.email);
    setFoto(perfil.foto);
  }, [perfil]);

  // Botão ativo apenas quando algo mudou em relação ao perfil salvo
  const houveMudanca =
    nome.trim() !== perfil.nome ||
    email.trim() !== perfil.email ||
    foto !== perfil.foto;

  async function handleSalvar() {
    if (!nome.trim()) {
      Alert.alert('Nome inválido', 'O nome não pode ficar em branco.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      Alert.alert('E-mail inválido', 'Insira um endereço de e-mail válido.');
      return;
    }

    const novoPerfil = { nome: nome.trim(), email: email.trim(), foto };

    try {
      await atualizarPerfil(novoPerfil); // persiste + atualiza contexto em uma chamada
      Alert.alert('Sucesso', 'Perfil atualizado com sucesso!', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (e) {
      console.warn('Erro ao salvar perfil:', e);
      Alert.alert('Erro', 'Não foi possível salvar as alterações.');
    }
  }

  const s = makeStyles(theme);

  return (
    <ScrollView style={s.container} contentContainerStyle={s.content}>
      <Text style={s.titulo}>Editar Perfil</Text>

      {/* Avatar */}
      <View style={s.avatarContainer}>
        {foto ? (
          <Image source={{ uri: foto }} style={s.foto} />
        ) : (
          <View style={s.avatarFallback}>
            <Text style={s.avatarTexto}>{getIniciais(nome)}</Text>
          </View>
        )}
        <TouchableOpacity style={s.botaoAlterarFoto}>
          <Text style={s.botaoAlterarFotoTexto}>Alterar foto</Text>
        </TouchableOpacity>
      </View>

      {/* Inputs */}
      <Text style={s.label}>Nome</Text>
      <TextInput
        style={s.input}
        value={nome}
        onChangeText={setNome}
        placeholder="Seu nome"
        placeholderTextColor={theme.placeholder}
      />

      <Text style={s.label}>Email</Text>
      <TextInput
        style={s.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Seu email"
        placeholderTextColor={theme.placeholder}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Botão Salvar */}
      <TouchableOpacity
        style={[s.botaoSalvar, !houveMudanca && s.botaoSalvarDesabilitado]}
        onPress={handleSalvar}
        disabled={!houveMudanca}
      >
        <Text style={s.textoBotao}>Salvar mudanças</Text>
      </TouchableOpacity>

      <TouchableOpacity style={s.botaoVoltar} onPress={() => navigation.goBack()}>
        <Text style={s.textoBotao}>Voltar</Text>
      </TouchableOpacity>
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
    titulo: {
      fontSize: 26,
      fontWeight: 'bold',
      color: theme.primary,
      textAlign: 'center',
      marginBottom: 24,
    },
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
      backgroundColor: theme.primary,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 10,
    },
    avatarTexto: {
      color: theme.avatarText,
      fontSize: 32,
      fontWeight: 'bold',
    },
    botaoAlterarFoto: {
      paddingVertical: 6,
      paddingHorizontal: 16,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.primary,
    },
    botaoAlterarFotoTexto: {
      color: theme.primary,
      fontSize: 13,
      fontWeight: '600',
    },
    label: {
      fontSize: 12,
      fontWeight: '600',
      color: theme.textDark,
      opacity: 0.7,
      marginBottom: 6,
      marginLeft: 2,
    },
    input: {
      backgroundColor: theme.cardBackground,
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 10,
      padding: 12,
      marginBottom: 16,
      fontSize: 15,
      color: theme.textDark,
    },
    botaoSalvar: {
      backgroundColor: theme.success,
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 8,
      marginBottom: 10,
    },
    botaoSalvarDesabilitado: {
      backgroundColor: theme.successDisabled,
      opacity: 0.6,
    },
    botaoVoltar: {
      backgroundColor: theme.primary,
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
    },
    textoBotao: {
      color: theme.textButton,
      fontWeight: 'bold',
      fontSize: 15,
    },
  });
}