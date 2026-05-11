import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';

export default function AdicionarReceitaScreen({ navigation }) {

  // Estados dos Inputs
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [ingredientes, setIngredientes] = useState('');
  const [modoPreparo, setModoPreparo] = useState('');
  const [tags, setTags] = useState('');

  // Função de Enviar Receita
  function enviarReceita() {

    // Validação do Nome
    if (!nome.trim()) {
      Alert.alert(
        'Erro',
        'O nome da receita é obrigatório.'
      );
      return;
    }

    // Validação dos Ingredientes
    if (!ingredientes.trim()) {
      Alert.alert(
        'Erro',
        'Adicione pelo menos 1 ingrediente.'
      );
      return;
    }

    // Validação do Modo de Preparo
    if (!modoPreparo.trim()) {
      Alert.alert(
        'Erro',
        'O modo de preparo é obrigatório.'
      );
      return;
    }

    // Mensagem de sucesso
    Alert.alert(
      'Sucesso',
      'Receita enviada com sucesso!'
    );

    // Limpar campos
    setNome('');
    setDescricao('');
    setIngredientes('');
    setModoPreparo('');
    setTags('');
  }

  // Função Cancelar
  function cancelarReceita() {
    navigation.goBack();
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>

      {/* Título */}
      <Text style={styles.titulo}>
        Adicionar Receita
      </Text>

      {/* Nome da Receita */}
      <TextInput
        style={styles.input}
        placeholder="Nome da Receita"
        value={nome}
        onChangeText={setNome}
      />

      {/* Descrição */}
      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={descricao}
        onChangeText={setDescricao}
      />

      {/* Ingredientes */}
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Ingredientes"
        multiline
        value={ingredientes}
        onChangeText={setIngredientes}
      />

      {/* Modo de Preparo */}
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Modo de Preparo"
        multiline
        value={modoPreparo}
        onChangeText={setModoPreparo}
      />

      {/* Tags */}
      <TextInput
        style={styles.input}
        placeholder="Tags"
        value={tags}
        onChangeText={setTags}
      />

      {/* Botão Enviar */}
      <TouchableOpacity
        style={styles.botaoEnviar}
        onPress={enviarReceita}
      >
        <Text style={styles.textoBotao}>
          Enviar Receita
        </Text>
      </TouchableOpacity>

      {/* Botão Cancelar */}
      <TouchableOpacity
        style={styles.botaoCancelar}
        onPress={cancelarReceita}
      >
        <Text style={styles.textoBotao}>
          Cancelar
        </Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flexGrow: 1,
    backgroundColor: '#ffffff',
    padding: 20,
  },

  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ff6600',
    textAlign: 'center',
    marginBottom: 25,
  },

  input: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },

  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },

  botaoEnviar: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },

  botaoCancelar: {
    backgroundColor: '#dc3545',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 15,
  },

  textoBotao: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },

});