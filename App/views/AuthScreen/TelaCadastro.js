// Coloque este arquivo em: views/authScreen/TelaCadastro.jsx
import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, SafeAreaView, StatusBar,
  KeyboardAvoidingView, Platform, ScrollView, Alert,
} from 'react-native';

import { useTheme } from '../styles/themeContext';
import { useAuth }  from '../../services/authContext';

function Field({ label, placeholder, value, onChangeText, onFocus, onBlur, focused, error, keyboardType, t }) {
  return (
    <View>
      <Text style={[styles.fieldLabel, { color: t.MUTED }]}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          { borderColor: focused ? t.TEAL : t.BORDER, backgroundColor: t.INPUT_BG, color: t.DARK },
          error && { borderColor: t.DANGER },
        ]}
        placeholder={placeholder}
        placeholderTextColor={t.MUTED}
        value={value}
        onChangeText={onChangeText}
        onFocus={onFocus}
        onBlur={onBlur}
        keyboardType={keyboardType || 'default'}
        autoCapitalize="none"
      />
      {error ? <Text style={[styles.errorText, { color: t.DANGER }]}>{error}</Text> : null}
    </View>
  );
}

function PasswordInput({ label, placeholder, value, onChangeText, onFocus, onBlur, focused, error, t }) {
  const [visible, setVisible] = useState(false);
  return (
    <View>
      <Text style={[styles.fieldLabel, { color: t.MUTED }]}>{label}</Text>
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

// --- Validações locais (idênticas ao registerValidator.js original) ---
function emailValido(email) {
  return /^[^\s@]+@(gmail\.com|hotmail\.com)$/i.test(email);
}

export default function TelaCadastro({ navigation }) {
  const { theme: t }          = useTheme();
  const { register, nomeUnico } = useAuth();

  const [nome, setNome]                   = useState('');
  const [email, setEmail]                 = useState('');
  const [senha, setSenha]                 = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [focused, setFocused]             = useState('');
  const [errors, setErrors]               = useState({});
  const [loading, setLoading]             = useState(false);

  function validate() {
    const e = {};
    if (!nome.trim())          e.nome  = 'Informe um nome de usuário.';
    else if (!nomeUnico(nome)) e.nome  = 'Este nome já está em uso.';
    if (!email.trim())         e.email = 'Informe o e-mail.';
    else if (!emailValido(email)) e.email = 'Use um e-mail @gmail.com ou @hotmail.com.';
    if (!senha.trim())         e.senha = 'Informe uma senha.';
    else if (senha.length < 6) e.senha = 'Mínimo de 6 caracteres.';
    if (senha !== confirmarSenha) e.confirmarSenha = 'As senhas não coincidem.';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleCadastro() {
    if (!validate()) return;
    setLoading(true);
    const ok = await register({ nome: nome.trim(), email: email.trim(), senha });
    setLoading(false);
    if (!ok) {
      setErrors({ nome: 'Este nome já está em uso.' });
      return;
    }
    Alert.alert('Conta criada!', 'Faça login para continuar.', [
      { text: 'OK', onPress: () => navigation.navigate('Login') },
    ]);
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
          {/* Icon */}
          <View style={styles.iconContainer}>
            <View style={[styles.iconCircle, { backgroundColor: t.CARD }]}>
              <Text style={styles.iconEmoji}>👤</Text>
            </View>
          </View>

          <Text style={[styles.title, { color: t.DARK }]}>Criar Conta</Text>
          <Text style={[styles.subtitle, { color: t.MUTED }]}>
            Preencha os campos abaixo para se cadastrar.
          </Text>

          {/* Fields */}
          <View style={styles.fieldsContainer}>
            <Field
              label="Nome de usuário"
              placeholder="Como você quer ser chamado?"
              value={nome}
              onChangeText={setNome}
              onFocus={() => setFocused('nome')}
              onBlur={() => setFocused('')}
              focused={focused === 'nome'}
              error={errors.nome}
              t={t}
            />
            <Field
              label="E-mail"
              placeholder="seu@email.com"
              value={email}
              onChangeText={setEmail}
              onFocus={() => setFocused('email')}
              onBlur={() => setFocused('')}
              focused={focused === 'email'}
              error={errors.email}
              keyboardType="email-address"
              t={t}
            />
            <PasswordInput
              label="Senha"
              placeholder="Mínimo 6 caracteres"
              value={senha}
              onChangeText={setSenha}
              onFocus={() => setFocused('senha')}
              onBlur={() => setFocused('')}
              focused={focused === 'senha'}
              error={errors.senha}
              t={t}
            />
            <PasswordInput
              label="Confirmar Senha"
              placeholder="Repita a senha"
              value={confirmarSenha}
              onChangeText={setConfirmarSenha}
              onFocus={() => setFocused('confirmarSenha')}
              onBlur={() => setFocused('')}
              focused={focused === 'confirmarSenha'}
              error={errors.confirmarSenha}
              t={t}
            />
          </View>
        </ScrollView>

        {/* Footer */}
        <View style={[styles.footer, { backgroundColor: t.BG }]}>
          <TouchableOpacity
            style={[styles.saveButton, { backgroundColor: t.SAVE_BTN, opacity: loading ? 0.6 : 1 }]}
            onPress={handleCadastro}
            disabled={loading}
            activeOpacity={0.85}
          >
            <Text style={[styles.saveButtonText, { color: t.SAVE_TXT }]}>
              {loading ? 'Criando conta...' : 'Criar Conta'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            activeOpacity={0.7}
            style={styles.linkRow}
          >
            <Text style={[styles.linkText, { color: t.MUTED }]}>
              Já tem conta?{' '}
              <Text style={{ color: t.TEAL, fontWeight: '600' }}>Entre aqui</Text>
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
  scrollContent:   { flexGrow: 1, paddingHorizontal: 24, paddingBottom: 24, justifyContent: 'center' },
  iconContainer:   { alignItems: 'center', marginBottom: 16, marginTop: 40 },
  iconCircle:      { width: 72, height: 72, borderRadius: 36, alignItems: 'center', justifyContent: 'center' },
  iconEmoji:       { fontSize: 32 },
  title: {
    fontSize: 28, fontWeight: '700', textAlign: 'center', marginBottom: 8,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  subtitle:        { fontSize: 14, textAlign: 'center', marginBottom: 40, lineHeight: 20, paddingHorizontal: 8 },
  fieldsContainer: { gap: 20 },
  fieldLabel:      { fontSize: 13, fontWeight: '500', marginBottom: 8, paddingLeft: 4 },
  input:           { height: 52, borderRadius: 50, borderWidth: 1.5, paddingHorizontal: 20, fontSize: 15 },
  inputWrapper:    { flexDirection: 'row', alignItems: 'center', height: 52, borderRadius: 50, borderWidth: 1.5, paddingHorizontal: 20 },
  inputInner:      { flex: 1, fontSize: 15 },
  eyeButton:       { padding: 4 },
  eyeIcon:         { fontSize: 16 },
  errorText:       { fontSize: 12, marginTop: 6, paddingLeft: 8 },
  footer:          { paddingHorizontal: 24, paddingBottom: Platform.OS === 'ios' ? 16 : 24, paddingTop: 12, gap: 14 },
  saveButton:      { height: 54, borderRadius: 50, alignItems: 'center', justifyContent: 'center' },
  saveButtonText:  { fontSize: 16, fontWeight: '600', letterSpacing: 0.3 },
  linkRow:         { alignItems: 'center' },
  linkText:        { fontSize: 14 },
});