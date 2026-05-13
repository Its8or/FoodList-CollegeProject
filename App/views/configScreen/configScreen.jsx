// Coloque este arquivo em: views/configScreen/configScreen.jsx
import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, Switch, Alert,
  StyleSheet, SafeAreaView, StatusBar,
  ScrollView, Platform,
} from 'react-native';

import { useTheme } from '../styles/themeContext';
import { useUser }  from '../../services/userContext';
import { useAuth }  from '../../services/authContext';

function SectionTitle({ label, t }) {
  return <Text style={[styles.sectionTitle, { color: t.MUTED }]}>{label}</Text>;
}

function RowItem({ icon, label, value, onPress, danger, t }) {
  return (
    <TouchableOpacity style={styles.row} onPress={onPress} activeOpacity={0.6}>
      <View style={[
        styles.iconBox,
        { backgroundColor: t.BACK_BTN },
        danger && { backgroundColor: 'rgba(216,90,48,0.12)' },
      ]}>
        <Text style={styles.iconEmoji}>{icon}</Text>
      </View>
      <Text style={[styles.rowLabel, { color: danger ? t.DANGER : t.DARK }]}>{label}</Text>
      <View style={styles.rowRight}>
        {value ? <Text style={[styles.rowValue, { color: t.MUTED }]}>{value}</Text> : null}
        {!danger && <Text style={[styles.chevron, { color: t.BORDER }]}>›</Text>}
      </View>
    </TouchableOpacity>
  );
}

function RowToggle({ icon, label, value, onValueChange, t }) {
  return (
    <View style={styles.row}>
      <View style={[styles.iconBox, { backgroundColor: t.BACK_BTN }]}>
        <Text style={styles.iconEmoji}>{icon}</Text>
      </View>
      <Text style={[styles.rowLabel, { color: t.DARK }]}>{label}</Text>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: t.BORDER, true: t.TEAL }}
        thumbColor="#FFFFFF"
        ios_backgroundColor={t.BORDER}
        style={styles.toggle}
      />
    </View>
  );
}

function Divider({ t }) {
  return <View style={[styles.divider, { backgroundColor: t.DIVIDER }]} />;
}

export default function SettingsScreen({ navigation }) {
  const { theme: t, isDark, toggleTheme } = useTheme();
  const { perfil }  = useUser();
  const { logout }  = useAuth();

  function handleLogout() {
    Alert.alert(
      'Sair da conta',
      'Tem certeza que deseja sair?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sair',
          style: 'destructive',
          // logout() atualiza isAuthenticated → App troca para AuthNavigator automaticamente
          onPress: logout,
        },
      ],
    );
  }

  function handleDeleteAccount() {
    Alert.alert(
      'Excluir conta',
      'Esta ação é permanente e não pode ser desfeita. Deseja continuar?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Excluir', style: 'destructive', onPress: logout },
      ],
    );
  }

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: t.BG }]}>
      <StatusBar barStyle={t.STATUS} backgroundColor={t.BG} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity
            style={[styles.backButton, { backgroundColor: t.BACK_BTN }]}
            onPress={() => navigation?.goBack()}
            activeOpacity={0.7}
          >
            <Text style={[styles.backArrow, { color: t.DARK }]}>‹</Text>
          </TouchableOpacity>
        </View>

        <Text style={[styles.title, { color: t.DARK }]}>Settings</Text>

        <SectionTitle label="Account" t={t} />
        <View style={[styles.card, { backgroundColor: t.CARD }]}>
          <RowItem icon="👤" label="Edit Profile"    onPress={() => navigation?.navigate('EditProfile')}    t={t} />
          <Divider t={t} />
          <RowItem icon="🔒" label="Change Password" onPress={() => navigation?.navigate('ChangePassword')} t={t} />
          <Divider t={t} />
          <RowItem icon="📧" label="Email" value={perfil.email} onPress={() => navigation?.navigate('ChangeEmail')} t={t} />
        </View>

        <SectionTitle label="Preferences" t={t} />
        <View style={[styles.card, { backgroundColor: t.CARD }]}>
          <RowToggle icon="🌙" label="Dark Mode" value={isDark} onValueChange={toggleTheme} t={t} />
        </View>

        <SectionTitle label="Account Actions" t={t} />
        <View style={[styles.card, { backgroundColor: t.CARD }]}>
          <RowItem icon="🚪" label="Log Out"        onPress={handleLogout}        danger t={t} />
          <Divider t={t} />
          <RowItem icon="🗑️" label="Delete Account" onPress={handleDeleteAccount} danger t={t} />
        </View>

        <Text style={[styles.version, { color: t.MUTED }]}>FoodList v1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea:      { flex: 1 },
  scrollContent: { paddingHorizontal: 24, paddingBottom: 40 },
  header:        { paddingTop: 35, paddingBottom: 16 },
  backButton:    { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  backArrow:     { fontSize: 28, lineHeight: 32, marginTop: -2 },
  title: {
    fontSize: 28, fontWeight: '700', textAlign: 'center', marginBottom: 28,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  sectionTitle: {
    fontSize: 12, fontWeight: '600', letterSpacing: 1,
    textTransform: 'uppercase', marginBottom: 8, marginTop: 20, paddingLeft: 4,
  },
  card:      { borderRadius: 20, overflow: 'hidden' },
  row:       { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, paddingHorizontal: 16, minHeight: 56 },
  iconBox:   { width: 34, height: 34, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginRight: 14 },
  iconEmoji: { fontSize: 17 },
  rowLabel:  { flex: 1, fontSize: 15 },
  rowRight:  { flexDirection: 'row', alignItems: 'center', gap: 4 },
  rowValue:  { fontSize: 14 },
  chevron:   { fontSize: 20, marginLeft: 4, lineHeight: 22 },
  toggle:    { marginLeft: 'auto' },
  divider:   { height: 0.5, marginLeft: 64 },
  version:   { textAlign: 'center', fontSize: 12, marginTop: 32 },
});