import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, SafeAreaView, StatusBar,
  KeyboardAvoidingView, Platform, ScrollView, Alert,
} from 'react-native';

import { useTheme } from '../styles/themeContext';
import { useUser } from '../../services/userContext';

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

function StepIndicator({ step, t }) {
  const steps = ['New Email', 'Confirm', 'Verify'];
  return (
    <View style={styles.stepContainer}>
      {steps.map((label, i) => {
        const idx = i + 1;
        const active = idx === step;
        const done = idx < step;
        return (
          <React.Fragment key={label}>
            <View style={styles.stepItem}>
              <View style={[
                styles.stepCircle,
                { borderColor: t.BORDER, backgroundColor: t.BG },
                (active || done) && { borderColor: t.TEAL, backgroundColor: t.TEAL },
              ]}>
                <Text style={[styles.stepNumber, { color: t.MUTED }, (active || done) && { color: '#FFF' }]}>
                  {done ? '✓' : idx}
                </Text>
              </View>
              <Text style={[styles.stepLabel, { color: active ? t.TEAL : t.MUTED }, active && { fontWeight: '600' }]}>
                {label}
              </Text>
            </View>
            {i < steps.length - 1 && (
              <View style={[styles.stepLine, { backgroundColor: t.BORDER }, done && { backgroundColor: t.TEAL }]} />
            )}
          </React.Fragment>
        );
      })}
    </View>
  );
}

export default function ChangeEmailScreen({ navigation }) {
  const { theme: t } = useTheme();
  const [step, setStep] = useState(1);
  const [newEmail, setNewEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [focused, setFocused] = useState('');
  const [errors, setErrors] = useState({});
  const { perfil, atualizarPerfil } = useUser();

  const isValidEmail = e => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  const validateStep1 = () => {
    const e = {};
    if (!isValidEmail(newEmail)) e.newEmail = 'Enter a valid email address.';
    if (newEmail === perfil.email) e.newEmail = 'This is already your current email.';
    if (newEmail !== confirmEmail) e.confirmEmail = 'Emails do not match.';
    if (!password) e.password = 'Enter your current password to confirm.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep2 = () => {
    const e = {};
    if (code.length < 6) e.code = 'Enter the 6-digit code sent to your email.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
      setTimeout(async () => {
        await atualizarPerfil({ ...perfil, email: newEmail });
        Alert.alert('Email updated!', `Your email has been changed to ${newEmail}.`, [
          { text: 'OK', onPress: () => navigation?.goBack() },
        ]);
      }, 300);
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: t.BG }]}>
      <StatusBar barStyle={t.STATUS} backgroundColor={t.BG} />

      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>

          <View style={styles.header}>
            <TouchableOpacity
              style={[styles.backButton, { backgroundColor: t.BACK_BTN }]}
              onPress={() => (step > 1 ? setStep(s => s - 1) : navigation?.goBack())}
              activeOpacity={0.7}
            >
              <Text style={[styles.backArrow, { color: t.DARK }]}>‹</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.iconContainer}>
            <View style={[styles.iconCircle, { backgroundColor: t.CARD }]}>
              <Text style={styles.iconEmoji}>📧</Text>
            </View>
          </View>

          <Text style={[styles.title, { color: t.DARK }]}>Change Email</Text>
          <Text style={[styles.subtitle, { color: t.MUTED }]}>
            {step === 1
              ? 'Enter your new email and confirm your password.'
              : 'Enter the 6-digit code sent to your new email.'}
          </Text>

          <StepIndicator step={step} t={t} />

          {step === 1 && (
            <View style={styles.fieldsContainer}>
              <View>
                <Text style={[styles.fieldLabel, { color: t.MUTED }]}>Current Email</Text>
                <View style={[styles.readonlyBox, { backgroundColor: t.READONLY }]}>
                  <Text style={[styles.readonlyText, { color: t.MUTED }]}>{perfil.email}</Text>
                </View>
              </View>
              <Field label="New Email" placeholder="Enter new email" value={newEmail} onChangeText={setNewEmail}
                onFocus={() => setFocused('newEmail')} onBlur={() => setFocused('')} focused={focused === 'newEmail'} error={errors.newEmail} keyboardType="email-address" t={t} />
              <Field label="Confirm New Email" placeholder="Repeat new email" value={confirmEmail} onChangeText={setConfirmEmail}
                onFocus={() => setFocused('confirmEmail')} onBlur={() => setFocused('')} focused={focused === 'confirmEmail'} error={errors.confirmEmail} keyboardType="email-address" t={t} />
              <Field label="Current Password" placeholder="Enter your password" value={password} onChangeText={setPassword}
                onFocus={() => setFocused('password')} onBlur={() => setFocused('')} focused={focused === 'password'} error={errors.password} t={t} />
            </View>
          )}

          {step === 2 && (
            <View style={styles.fieldsContainer}>
              <View style={[styles.verifyInfo, { backgroundColor: t.CARD }]}>
                <Text style={[styles.verifyInfoText, { color: t.DARK }]}>
                  We sent a 6-digit code to{' '}
                  <Text style={{ color: t.TEAL, fontWeight: '600' }}>{newEmail}</Text>
                </Text>
              </View>
              <View>
                <Text style={[styles.fieldLabel, { color: t.MUTED }]}>Verification Code</Text>
                <TextInput
                  style={[
                    styles.input, styles.codeInput,
                    { borderColor: focused === 'code' ? t.TEAL : t.BORDER, backgroundColor: t.INPUT_BG, color: t.DARK },
                    errors.code && { borderColor: t.DANGER },
                  ]}
                  placeholder="000000"
                  placeholderTextColor={t.MUTED}
                  value={code}
                  onChangeText={v => setCode(v.replace(/[^0-9]/g, '').slice(0, 6))}
                  onFocus={() => setFocused('code')}
                  onBlur={() => setFocused('')}
                  keyboardType="number-pad"
                  maxLength={6}
                />
                {errors.code ? <Text style={[styles.errorText, { color: t.DANGER }]}>{errors.code}</Text> : null}
              </View>
              <TouchableOpacity
                onPress={() => Alert.alert('Code resent', `A new code was sent to ${newEmail}.`)}
                activeOpacity={0.7} style={styles.resendRow}
              >
                <Text style={[styles.resendText, { color: t.MUTED }]}>
                  Didn't receive it?{' '}
                  <Text style={{ color: t.TEAL, fontWeight: '600' }}>Resend code</Text>
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>

        <View style={[styles.footer, { backgroundColor: t.BG }]}>
          <TouchableOpacity style={[styles.saveButton, { backgroundColor: t.SAVE_BTN }]} onPress={handleNext} activeOpacity={0.85}>
            <Text style={[styles.saveButtonText, { color: t.SAVE_TXT }]}>
              {step === 1 ? 'Continue' : 'Verify & Save'}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  flex: { flex: 1 },
  scrollContent: { flexGrow: 1, paddingHorizontal: 24, paddingBottom: 24 },
  header: { paddingTop: 35, paddingBottom: 16 },
  backButton: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  backArrow: { fontSize: 28, lineHeight: 32, marginTop: -2 },
  iconContainer: { alignItems: 'center', marginBottom: 16 },
  iconCircle: { width: 72, height: 72, borderRadius: 36, alignItems: 'center', justifyContent: 'center' },
  iconEmoji: { fontSize: 32 },
  title: {
    fontSize: 28, fontWeight: '700', textAlign: 'center', marginBottom: 8,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  subtitle: { fontSize: 14, textAlign: 'center', marginBottom: 24, lineHeight: 20, paddingHorizontal: 8 },
  stepContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 32 },
  stepItem: { alignItems: 'center', gap: 4 },
  stepCircle: { width: 28, height: 28, borderRadius: 14, borderWidth: 1.5, alignItems: 'center', justifyContent: 'center' },
  stepNumber: { fontSize: 12, fontWeight: '600' },
  stepLabel: { fontSize: 11 },
  stepLine: { flex: 1, height: 1.5, marginHorizontal: 6, marginBottom: 16 },
  fieldsContainer: { gap: 20 },
  fieldLabel: { fontSize: 13, fontWeight: '500', marginBottom: 8, paddingLeft: 4 },
  input: { height: 52, borderRadius: 50, borderWidth: 1.5, paddingHorizontal: 20, fontSize: 15 },
  errorText: { fontSize: 12, marginTop: 6, paddingLeft: 8 },
  readonlyBox: { height: 52, borderRadius: 50, paddingHorizontal: 20, justifyContent: 'center' },
  readonlyText: { fontSize: 15 },
  verifyInfo: { borderRadius: 16, padding: 16 },
  verifyInfoText: { fontSize: 14, textAlign: 'center', lineHeight: 20 },
  codeInput: { textAlign: 'center', fontSize: 24, fontWeight: '700', letterSpacing: 8 },
  resendRow: { alignItems: 'center', marginTop: 4 },
  resendText: { fontSize: 13 },
  footer: { paddingHorizontal: 24, paddingBottom: Platform.OS === 'ios' ? 16 : 24, paddingTop: 12 },
  saveButton: { height: 54, borderRadius: 50, alignItems: 'center', justifyContent: 'center' },
  saveButtonText: { fontSize: 16, fontWeight: '600', letterSpacing: 0.3 },
});