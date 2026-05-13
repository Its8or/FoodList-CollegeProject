// Coloque este arquivo em: views/authScreen/TelaLogin.jsx
import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, SafeAreaView, StatusBar,
  KeyboardAvoidingView, Platform, ScrollView,
} from 'react-native';

import { useTheme } from '../styles/themeContext';
import { useAuth }  from '../../services/authContext';

function PasswordInput({ placeholder, value, onChangeText, onFocus, onBlur, focused, error, t }) {
  const [visible, setVisible] = useState(false);
  return (
    <View>
      <View style={[
        styles.inputWrapper,
        { borderColor: focused ? t.TEAL : t.BORDER, backgroundColor: t.INPUT_BG },
        error && { borderColor: t.DANGER },
      ]}>
        <TextInput
          style={[styles.inputInner, { color: t.DARK }]}
          placeholder={placeholder}
          placeholderTextColor={t.MUTED}
          value={value}
          onChangeText={onChangeText}
          onFocus={onFocus}
          onBlur={onBlur}
          secureTextEntry={!visible}
          autoCapitalize="none"
        />
        <TouchableOpacity onPress={() => setVisible(v => !v)} activeOpacity={0.6} style={styles.eyeButton}>
          <Text style={styles.eyeIcon}>{visible ? '🙈' : '👁️'}</Text>
        </TouchableOpacity>
      </View>
      {error ? <Text style={[styles.errorText, { color: t.DANGER }]}>{error}</Text> : null}
    </View>
  );
}

export default function TelaLogin({ navigation }) {
  const { theme: t } = useTheme();
  const { login }    = useAuth();

  const [nome, setNome]   = useState('');
  const [senha, setSenha] = useState('');
  const [focused, setFocused] = useState('');
  const [errors, setErrors]   = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!nome.trim())  e.nome  = 'Informe o nome.';
    if (!senha.trim()) e.senha = 'Informe a senha.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  async function handleLogin() {
    if (!validate()) return;
    setLoading(true);
    const ok = await login(nome, senha);
    setLoading(false);
    if (!ok) {
      setErrors({ geral: 'Nome ou senha inválidos.' });
    }
    // Se ok === true, o AuthProvider atualiza isAuthenticated → App troca para AppNavigator
  }

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: t.BG }]}>
      <StatusBar barStyle={t.STATUS} backgroundColor={t.BG} />

      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Espaçador superior — mesmo paddingTop das outras telas */}
          <View style={styles.header} />

          {/* Icon */}
          <View style={styles.iconContainer}>
            <View style={[styles.iconCircle, { backgroundColor: t.CARD }]}>
              <Text style={styles.iconEmoji}>🔑</Text>
            </View>
          </View>

          <Text style={[styles.title, { color: t.DARK }]}>Bem-vindo!</Text>
          <Text style={[styles.subtitle, { color: t.MUTED }]}>
            Entre com seu nome e senha para continuar.
          </Text>

          {/* Fields */}
          <View style={styles.fieldsContainer}>
            <View>
              <Text style={[styles.fieldLabel, { color: t.MUTED }]}>Nome</Text>
              <TextInput
                style={[
                  styles.input,
                  { borderColor: focused === 'nome' ? t.TEAL : t.BORDER, backgroundColor: t.INPUT_BG, color: t.DARK },
                  errors.nome && { borderColor: t.DANGER },
                ]}
                placeholder="Seu nome de usuário"
                placeholderTextColor={t.MUTED}
                value={nome}
                onChangeText={setNome}
                onFocus={() => setFocused('nome')}
                onBlur={() => setFocused('')}
                autoCapitalize="none"
              />
              {errors.nome ? <Text style={[styles.errorText, { color: t.DANGER }]}>{errors.nome}</Text> : null}
            </View>

            <View>
              <Text style={[styles.fieldLabel, { color: t.MUTED }]}>Senha</Text>
              <PasswordInput
                placeholder="Sua senha"
                value={senha}
                onChangeText={setSenha}
                onFocus={() => setFocused('senha')}
                onBlur={() => setFocused('')}
                focused={focused === 'senha'}
                error={errors.senha}
                t={t}
              />
            </View>

            {errors.geral ? (
              <View style={[styles.errorBox, { backgroundColor: t.CARD }]}>
                <Text style={[styles.errorBoxText, { color: t.DANGER }]}>{errors.geral}</Text>
              </View>
            ) : null}
          </View>
        </ScrollView>

        {/* Footer */}
        <View style={[styles.footer, { backgroundColor: t.BG }]}>
          <TouchableOpacity
            style={[styles.saveButton, { backgroundColor: t.SAVE_BTN, opacity: loading ? 0.6 : 1 }]}
            onPress={handleLogin}
            disabled={loading}
            activeOpacity={0.85}
          >
            <Text style={[styles.saveButtonText, { color: t.SAVE_TXT }]}>
              {loading ? 'Entrando...' : 'Entrar'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Cadastro')}
            activeOpacity={0.7}
            style={styles.linkRow}
          >
            <Text style={[styles.linkText, { color: t.MUTED }]}>
              Não tem conta?{' '}
              <Text style={{ color: t.TEAL, fontWeight: '600' }}>Cadastre-se</Text>
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
  header:          { paddingTop: 35, paddingBottom: 16 },           // espaçador — igual às outras telas
  iconContainer:   { alignItems: 'center', marginBottom: 16 },
  iconCircle:      { width: 72, height: 72, borderRadius: 36, alignItems: 'center', justifyContent: 'center' },
  iconEmoji:       { fontSize: 32 },
  title: {
    fontSize: 28, fontWeight: '700', textAlign: 'center', marginBottom: 8,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  subtitle:        { fontSize: 14, textAlign: 'center', marginBottom: 32, lineHeight: 20, paddingHorizontal: 8 },
  fieldsContainer: { gap: 20 },
  fieldLabel:      { fontSize: 13, fontWeight: '500', marginBottom: 8, paddingLeft: 4 },
  input:           { height: 52, borderRadius: 50, borderWidth: 1.5, paddingHorizontal: 20, fontSize: 15 },
  inputWrapper:    { flexDirection: 'row', alignItems: 'center', height: 52, borderRadius: 50, borderWidth: 1.5, paddingHorizontal: 20 },
  inputInner:      { flex: 1, fontSize: 15 },
  eyeButton:       { padding: 4 },
  eyeIcon:         { fontSize: 16 },
  errorText:       { fontSize: 12, marginTop: 6, paddingLeft: 8 },
  errorBox:        { borderRadius: 16, padding: 14 },
  errorBoxText:    { fontSize: 14, textAlign: 'center' },
  footer:          { paddingHorizontal: 24, paddingBottom: Platform.OS === 'ios' ? 16 : 24, paddingTop: 12, gap: 14 },
  saveButton:      { height: 54, borderRadius: 50, alignItems: 'center', justifyContent: 'center' },
  saveButtonText:  { fontSize: 16, fontWeight: '600', letterSpacing: 0.3 },
  linkRow:         { alignItems: 'center' },
  linkText:        { fontSize: 14 },
});