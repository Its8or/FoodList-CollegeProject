import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';

const TEAL = '#1BB585';
const BG = '#F5F5ED';
const DARK = '#1A1A1A';
const MUTED = '#888880';
const DANGER = '#D85A30';
const CARD = '#EEEEE6';

function PasswordInput({ placeholder, value, onChangeText, onFocus, onBlur, focused, error }) {
  const [visible, setVisible] = useState(false);

  return (
    <View>
      <View style={[styles.inputWrapper, focused && styles.inputFocused, error && styles.inputError]}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#AAAAAA"
          value={value}
          onChangeText={onChangeText}
          onFocus={onFocus}
          onBlur={onBlur}
          secureTextEntry={!visible}
          autoCapitalize="none"
          returnKeyType="next"
        />
        <TouchableOpacity
          onPress={() => setVisible(v => !v)}
          activeOpacity={0.6}
          style={styles.eyeButton}
        >
          <Text style={styles.eyeIcon}>{visible ? '🙈' : '👁️'}</Text>
        </TouchableOpacity>
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

function StrengthBar({ password }) {
  const getStrength = () => {
    if (!password) return 0;
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  };

  const strength = getStrength();
  const labels = ['', 'Fraca', 'Razoável', 'Boa', 'Forte'];
  const colors = ['#D0D0C8', DANGER, '#EF9F27', TEAL, TEAL];

  if (!password) return null;

  return (
    <View style={styles.strengthContainer}>
      <View style={styles.strengthBars}>
        {[1, 2, 3, 4].map(i => (
          <View
            key={i}
            style={[
              styles.strengthSegment,
              { backgroundColor: i <= strength ? colors[strength] : '#D0D0C8' },
            ]}
          />
        ))}
      </View>
      <Text style={[styles.strengthLabel, { color: colors[strength] }]}>
        {labels[strength]}
      </Text>
    </View>
  );
}

export default function ChangePasswordScreen({ navigation }) {
  const [current, setCurrent] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirm, setConfirm] = useState('');
  const [focused, setFocused] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!current) e.current = 'Informe a senha atual.';
    if (newPass.length < 8) e.newPass = 'Mínimo de 8 caracteres.';
    if (newPass !== confirm) e.confirm = 'As senhas não coincidem.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    Alert.alert('Sucesso', 'Senha alterada com sucesso!', [
      { text: 'OK', onPress: () => navigation?.goBack() },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={BG} />

      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation?.goBack()}
              activeOpacity={0.7}
            >
              <Text style={styles.backArrow}>‹</Text>
            </TouchableOpacity>
          </View>

          {/* Ícone + Título */}
          <View style={styles.iconContainer}>
            <View style={styles.iconCircle}>
              <Text style={styles.iconEmoji}>🔒</Text>
            </View>
          </View>
          <Text style={styles.title}>Change Password</Text>
          <Text style={styles.subtitle}>
            Choose a strong password to keep your account safe.
          </Text>

          {/* Campos */}
          <View style={styles.fieldsContainer}>
            <View>
              <Text style={styles.fieldLabel}>Current Password</Text>
              <PasswordInput
                placeholder="Enter current password"
                value={current}
                onChangeText={setCurrent}
                onFocus={() => setFocused('current')}
                onBlur={() => setFocused('')}
                focused={focused === 'current'}
                error={errors.current}
              />
            </View>

            <View>
              <Text style={styles.fieldLabel}>New Password</Text>
              <PasswordInput
                placeholder="Enter new password"
                value={newPass}
                onChangeText={setNewPass}
                onFocus={() => setFocused('new')}
                onBlur={() => setFocused('')}
                focused={focused === 'new'}
                error={errors.newPass}
              />
              <StrengthBar password={newPass} />
            </View>

            <View>
              <Text style={styles.fieldLabel}>Confirm New Password</Text>
              <PasswordInput
                placeholder="Repeat new password"
                value={confirm}
                onChangeText={setConfirm}
                onFocus={() => setFocused('confirm')}
                onBlur={() => setFocused('')}
                focused={focused === 'confirm'}
                error={errors.confirm}
              />
            </View>
          </View>

          {/* Dicas */}
          <View style={styles.tipsCard}>
            <Text style={styles.tipsTitle}>Password requirements</Text>
            {[
              { rule: 'At least 8 characters', ok: newPass.length >= 8 },
              { rule: 'One uppercase letter', ok: /[A-Z]/.test(newPass) },
              { rule: 'One number', ok: /[0-9]/.test(newPass) },
              { rule: 'One special character', ok: /[^A-Za-z0-9]/.test(newPass) },
            ].map(({ rule, ok }) => (
              <View key={rule} style={styles.tipRow}>
                <Text style={[styles.tipDot, ok && styles.tipDotOk]}>
                  {ok ? '✓' : '·'}
                </Text>
                <Text style={[styles.tipText, ok && styles.tipTextOk]}>{rule}</Text>
              </View>
            ))}
          </View>
        </ScrollView>

        {/* Botão Save */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSave}
            activeOpacity={0.85}
          >
            <Text style={styles.saveButtonText}>Save Password</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: BG },
  keyboardAvoid: { flex: 1 },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 24,
  },

  header: { paddingTop: 35, paddingBottom: 16 },
  backButton: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.06)',
    alignItems: 'center', justifyContent: 'center',
  },
  backArrow: { fontSize: 28, color: DARK, lineHeight: 32, marginTop: -2 },

  iconContainer: { alignItems: 'center', marginBottom: 16 },
  iconCircle: {
    width: 72, height: 72, borderRadius: 36,
    backgroundColor: CARD,
    alignItems: 'center', justifyContent: 'center',
  },
  iconEmoji: { fontSize: 32 },

  title: {
    fontSize: 28, fontWeight: '700', color: DARK,
    textAlign: 'center', marginBottom: 8,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  subtitle: {
    fontSize: 14, color: MUTED,
    textAlign: 'center', marginBottom: 32,
    lineHeight: 20,
  },

  fieldsContainer: { gap: 20 },
  fieldLabel: {
    fontSize: 13, fontWeight: '500',
    color: MUTED, marginBottom: 8, paddingLeft: 4,
  },

  inputWrapper: {
    flexDirection: 'row', alignItems: 'center',
    height: 52, borderRadius: 50,
    borderWidth: 1.5, borderColor: '#D0D0C8',
    backgroundColor: BG,
    paddingHorizontal: 20,
  },
  inputFocused: { borderColor: TEAL },
  inputError: { borderColor: DANGER },
  input: { flex: 1, fontSize: 15, color: DARK },
  eyeButton: { padding: 4 },
  eyeIcon: { fontSize: 16 },
  errorText: {
    fontSize: 12, color: DANGER,
    marginTop: 6, paddingLeft: 8,
  },

  strengthContainer: {
    flexDirection: 'row', alignItems: 'center',
    marginTop: 10, gap: 10,
  },
  strengthBars: { flexDirection: 'row', gap: 4, flex: 1 },
  strengthSegment: {
    flex: 1, height: 4, borderRadius: 2,
  },
  strengthLabel: { fontSize: 12, fontWeight: '600', minWidth: 48 },

  tipsCard: {
    backgroundColor: CARD, borderRadius: 20,
    padding: 16, marginTop: 28,
  },
  tipsTitle: {
    fontSize: 13, fontWeight: '600',
    color: DARK, marginBottom: 10,
  },
  tipRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 },
  tipDot: { fontSize: 16, color: '#C0C0B8', width: 16, textAlign: 'center' },
  tipDotOk: { color: TEAL },
  tipText: { fontSize: 13, color: MUTED },
  tipTextOk: { color: DARK },

  footer: {
    paddingHorizontal: 24,
    paddingBottom: Platform.OS === 'ios' ? 16 : 24,
    paddingTop: 12,
    backgroundColor: BG,
  },
  saveButton: {
    height: 54, borderRadius: 50,
    backgroundColor: DARK,
    alignItems: 'center', justifyContent: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF', fontSize: 16,
    fontWeight: '600', letterSpacing: 0.3,
  },
});