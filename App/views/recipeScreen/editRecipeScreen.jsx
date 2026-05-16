import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, SafeAreaView, StatusBar,
  KeyboardAvoidingView, Platform, ScrollView, Alert,
} from 'react-native';

import { useTheme }   from '../styles/themeContext';
import { useRecipes } from '../../services/recipesContext';

function Field({ label, placeholder, value, onChangeText, multiline, t }) {
  const [focused, setFocused] = useState(false);
  return (
    <View>
      <Text style={[styles.fieldLabel, { color: t.MUTED }]}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          multiline && styles.textArea,
          {
            borderColor: focused ? t.TEAL : t.BORDER,
            backgroundColor: t.INPUT_BG,
            color: t.DARK,
          },
        ]}
        placeholder={placeholder}
        placeholderTextColor={t.MUTED}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        multiline={multiline}
        textAlignVertical={multiline ? 'top' : 'center'}
        autoCapitalize="sentences"
      />
    </View>
  );
}

export default function EditRecipeScreen({ navigation, route }) {
  const { theme: t }    = useTheme();
  const { updateRecipe } = useRecipes();
  const { recipe }      = route.params;          // receita original passada pela RecipeScreen

  const [nome, setNome]             = useState(recipe.nome);
  const [descricao, setDescricao]   = useState(recipe.descricao);
  const [ingredientes, setIngredientes] = useState(recipe.ingredientes);
  const [modoPreparo, setModoPreparo]   = useState(recipe.modoPreparo);
  const [tags, setTags]             = useState(recipe.tags);
  const [loading, setLoading]       = useState(false);

  // Detecta alterações para habilitar o botão
  const hasChanges =
    nome        !== recipe.nome        ||
    descricao   !== recipe.descricao   ||
    ingredientes !== recipe.ingredientes ||
    modoPreparo !== recipe.modoPreparo  ||
    tags        !== recipe.tags;

  const hasRequired = nome.trim() && ingredientes.trim() && modoPreparo.trim();

  async function handleSalvar() {
    if (!nome.trim())         return Alert.alert('Erro', 'O nome da receita é obrigatório.');
    if (!ingredientes.trim()) return Alert.alert('Erro', 'Adicione pelo menos 1 ingrediente.');
    if (!modoPreparo.trim())  return Alert.alert('Erro', 'O modo de preparo é obrigatório.');

    setLoading(true);
    await updateRecipe(recipe.id, {
      nome:        nome.trim(),
      descricao:   descricao.trim(),
      ingredientes: ingredientes.trim(),
      modoPreparo: modoPreparo.trim(),
      tags:        tags.trim(),
    });
    setLoading(false);

    // Volta para o Feed — a RecipeScreen ficou com dados antigos no params,
    // então navegamos até o Feed e removemos a RecipeScreen da pilha.
    navigation.navigate('Feed');
  }

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: t.BG }]}>
      <StatusBar barStyle={t.STATUS} backgroundColor={t.BG} />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Back Button */}
          <View style={styles.header}>
            <TouchableOpacity
              style={[styles.backButton, { backgroundColor: t.BACK_BTN }]}
              onPress={() => navigation?.goBack()}
              activeOpacity={0.7}
            >
              <Text style={[styles.backArrow, { color: t.DARK }]}>‹</Text>
            </TouchableOpacity>
          </View>

          {/* Icon */}
          <View style={styles.iconContainer}>
            <View style={[styles.iconCircle, { backgroundColor: t.CARD }]}>
              <Text style={styles.iconEmoji}>✏️</Text>
            </View>
          </View>

          <Text style={[styles.title, { color: t.DARK }]}>Editar Receita</Text>
          <Text style={[styles.subtitle, { color: t.MUTED }]}>
            Atualize as informações da sua receita.
          </Text>

          {/* Fields */}
          <View style={styles.fieldsContainer}>
            <Field
              label="Nome da Receita *"
              placeholder="Ex: Bolo de cenoura"
              value={nome}
              onChangeText={setNome}
              t={t}
            />
            <Field
              label="Descrição"
              placeholder="Uma breve descrição da receita..."
              value={descricao}
              onChangeText={setDescricao}
              t={t}
            />
            <Field
              label="Ingredientes *"
              placeholder={'1 xícara de farinha\n2 ovos\n200ml de leite\n...'}
              value={ingredientes}
              onChangeText={setIngredientes}
              multiline
              t={t}
            />
            <Field
              label="Modo de Preparo *"
              placeholder={'Passo 1: Pré-aqueça o forno...\nPasso 2: Misture...'}
              value={modoPreparo}
              onChangeText={setModoPreparo}
              multiline
              t={t}
            />
            <Field
              label="Tags"
              placeholder="Ex: sobremesa, fácil, rápido"
              value={tags}
              onChangeText={setTags}
              t={t}
            />
          </View>
        </ScrollView>

        {/* Footer */}
        <View style={[styles.footer, { backgroundColor: t.BG }]}>
          <TouchableOpacity
            style={[
              styles.saveButton,
              {
                backgroundColor:
                  hasChanges && hasRequired ? t.SAVE_BTN : t.BORDER,
              },
            ]}
            onPress={handleSalvar}
            disabled={!hasChanges || !hasRequired || loading}
            activeOpacity={0.85}
          >
            <Text style={[styles.saveButtonText, { color: t.SAVE_TXT }]}>
              {loading ? 'Salvando...' : 'Salvar Alterações'}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea:        { flex: 1 },
  flex:            { flex: 1 },
  scrollContent:   { flexGrow: 1, paddingHorizontal: 24, paddingBottom: 24 },
  header:          { paddingTop: 35, paddingBottom: 16 },
  backButton:      { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  backArrow:       { fontSize: 28, lineHeight: 32, marginTop: -2 },
  iconContainer:   { alignItems: 'center', marginBottom: 16 },
  iconCircle:      { width: 72, height: 72, borderRadius: 36, alignItems: 'center', justifyContent: 'center' },
  iconEmoji:       { fontSize: 32 },
  title: {
    fontSize: 28, fontWeight: '700', textAlign: 'center', marginBottom: 8,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  subtitle:        { fontSize: 14, textAlign: 'center', marginBottom: 32, lineHeight: 20 },
  fieldsContainer: { gap: 20 },
  fieldLabel:      { fontSize: 13, fontWeight: '500', marginBottom: 8, paddingLeft: 4 },
  input:           { borderRadius: 16, borderWidth: 1.5, paddingHorizontal: 20, paddingVertical: 14, fontSize: 15 },
  textArea:        { height: 130, borderRadius: 16 },
  footer:          { paddingHorizontal: 24, paddingBottom: Platform.OS === 'ios' ? 16 : 24, paddingTop: 12 },
  saveButton:      { height: 54, borderRadius: 50, alignItems: 'center', justifyContent: 'center' },
  saveButtonText:  { fontSize: 16, fontWeight: '600', letterSpacing: 0.3 },
});