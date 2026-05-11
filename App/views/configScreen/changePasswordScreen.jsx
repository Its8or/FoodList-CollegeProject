import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, SafeAreaView, StatusBar,
  KeyboardAvoidingView, Platform, ScrollView, Alert,
} from 'react-native';

import { useTheme } from '../styles/themeContext';


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
          style={[styles.input, { color: t.DARK }]}
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

function StrengthBar({ password, t }) {
  const getStrength = () => {
    if (!password) return 0;
    let s = 0;
    if (password.length >= 8)        s++;
    if (/[A-Z]/.test(password))      s++;
    if (/[0-9]/.test(password))      s++;
    if (/[^A-Za-z0-9]/.test(password)) s++;
    return s;
  };
  const strength = getStrength();
  const labels   = ['', 'Fraca', 'Razoável', 'Boa', 'Forte'];
  const colors   = [t.BORDER, t.DANGER, '#EF9F27', t.TEAL, t.TEAL];
  if (!password) return null;
  return (
    <View style={styles.strengthContainer}>
      <View style={styles.strengthBars}>
        {[1, 2, 3, 4].map(i => (
          <View key={i} style={[styles.strengthSegment, { backgroundColor: i <= strength ? colors[strength] : t.BORDER }]} />
        ))}
      </View>
      <Text style={[styles.strengthLabel, { color: colors[strength] }]}>{labels[strength]}</Text>
    </View>
  );
}

export default function ChangePasswordScreen({ navigation }) {
  const { theme: t } = useTheme();
  const [current, setCurrent] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirm, setConfirm] = useState('');
  const [focused, setFocused] = useState('');
  const [errors, setErrors]   = useState({});

  const validate = () => {
    const e = {};
    if (!current)             e.current = 'Informe a senha atual.';
    if (newPass.length < 8)   e.newPass  = 'Mínimo de 8 caracteres.';
    if (newPass !== confirm)  e.confirm  = 'As senhas não coincidem.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    Alert.alert('Sucesso', 'Senha alterada com sucesso!', [{ text: 'OK', onPress: () => navigation?.goBack() }]);
  };

  const tips = [
    { rule: 'At least 8 characters',   ok: newPass.length >= 8 },
    { rule: 'One uppercase letter',     ok: /[A-Z]/.test(newPass) },
    { rule: 'One number',               ok: /[0-9]/.test(newPass) },
    { rule: 'One special character',    ok: /[^A-Za-z0-9]/.test(newPass) },
  ];

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: t.BG }]}>
      <StatusBar barStyle={t.STATUS} backgroundColor={t.BG} />

      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>

          <View style={styles.header}>
            <TouchableOpacity style={[styles.backButton, { backgroundColor: t.BACK_BTN }]} onPress={() => navigation?.goBack()} activeOpacity={0.7}>
              <Text style={[styles.backArrow, { color: t.DARK }]}>‹</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.iconContainer}>
            <View style={[styles.iconCircle, { backgroundColor: t.CARD }]}>
              <Text style={styles.iconEmoji}>🔒</Text>
            </View>
          </View>

          <Text style={[styles.title, { color: t.DARK }]}>Change Password</Text>
          <Text style={[styles.subtitle, { color: t.MUTED }]}>Choose a strong password to keep your account safe.</Text>

          <View style={styles.fieldsContainer}>
            <View>
              <Text style={[styles.fieldLabel, { color: t.MUTED }]}>Current Password</Text>
              <PasswordInput placeholder="Enter current password" value={current} onChangeText={setCurrent}
                onFocus={() => setFocused('current')} onBlur={() => setFocused('')}
                focused={focused === 'current'} error={errors.current} t={t} />
            </View>
            <View>
              <Text style={[styles.fieldLabel, { color: t.MUTED }]}>New Password</Text>
              <PasswordInput placeholder="Enter new password" value={newPass} onChangeText={setNewPass}
                onFocus={() => setFocused('new')} onBlur={() => setFocused('')}
                focused={focused === 'new'} error={errors.newPass} t={t} />
              <StrengthBar password={newPass} t={t} />
            </View>
            <View>
              <Text style={[styles.fieldLabel, { color: t.MUTED }]}>Confirm New Password</Text>
              <PasswordInput placeholder="Repeat new password" value={confirm} onChangeText={setConfirm}
                onFocus={() => setFocused('confirm')} onBlur={() => setFocused('')}
                focused={focused === 'confirm'} error={errors.confirm} t={t} />
            </View>
          </View>

          <View style={[styles.tipsCard, { backgroundColor: t.CARD }]}>
            <Text style={[styles.tipsTitle, { color: t.DARK }]}>Password requirements</Text>
            {tips.map(({ rule, ok }) => (
              <View key={rule} style={styles.tipRow}>
                <Text style={[styles.tipDot, { color: ok ? t.TEAL : t.BORDER }]}>{ok ? '✓' : '·'}</Text>
                <Text style={[styles.tipText, { color: ok ? t.DARK : t.MUTED }]}>{rule}</Text>
              </View>
            ))}
          </View>
        </ScrollView>

        <View style={[styles.footer, { backgroundColor: t.BG }]}>
          <TouchableOpacity style={[styles.saveButton, { backgroundColor: t.SAVE_BTN }]} onPress={handleSave} activeOpacity={0.85}>
            <Text style={[styles.saveButtonText, { color: t.SAVE_TXT }]}>Save Password</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea:      { flex: 1 },
  flex:          { flex: 1 },
  scrollContent: { flexGrow: 1, paddingHorizontal: 24, paddingBottom: 24 },
  header:        { paddingTop: 35, paddingBottom: 16 },
  backButton:    { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  backArrow:     { fontSize: 28, lineHeight: 32, marginTop: -2 },
  iconContainer: { alignItems: 'center', marginBottom: 16 },
  iconCircle:    { width: 72, height: 72, borderRadius: 36, alignItems: 'center', justifyContent: 'center' },
  iconEmoji:     { fontSize: 32 },
  title: {
    fontSize: 28, fontWeight: '700', textAlign: 'center', marginBottom: 8,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  subtitle:      { fontSize: 14, textAlign: 'center', marginBottom: 32, lineHeight: 20 },
  fieldsContainer: { gap: 20 },
  fieldLabel:    { fontSize: 13, fontWeight: '500', marginBottom: 8, paddingLeft: 4 },
  inputWrapper:  { flexDirection: 'row', alignItems: 'center', height: 52, borderRadius: 50, borderWidth: 1.5, paddingHorizontal: 20 },
  input:         { flex: 1, fontSize: 15 },
  eyeButton:     { padding: 4 },
  eyeIcon:       { fontSize: 16 },
  errorText:     { fontSize: 12, marginTop: 6, paddingLeft: 8 },
  strengthContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 10, gap: 10 },
  strengthBars:  { flexDirection: 'row', gap: 4, flex: 1 },
  strengthSegment: { flex: 1, height: 4, borderRadius: 2 },
  strengthLabel: { fontSize: 12, fontWeight: '600', minWidth: 48 },
  tipsCard:      { borderRadius: 20, padding: 16, marginTop: 28 },
  tipsTitle:     { fontSize: 13, fontWeight: '600', marginBottom: 10 },
  tipRow:        { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 },
  tipDot:        { fontSize: 16, width: 16, textAlign: 'center' },
  tipText:       { fontSize: 13 },
  footer:        { paddingHorizontal: 24, paddingBottom: Platform.OS === 'ios' ? 16 : 24, paddingTop: 12 },
  saveButton:    { height: 54, borderRadius: 50, alignItems: 'center', justifyContent: 'center' },
  saveButtonText:{ fontSize: 16, fontWeight: '600', letterSpacing: 0.3 },
});