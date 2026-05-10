import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Platform,
} from 'react-native';

function SectionTitle({ label }) {
  return <Text style={styles.sectionTitle}>{label}</Text>;
}

function RowItem({ icon, label, value, onPress, danger }) {
  return (
    <TouchableOpacity style={styles.row} onPress={onPress} activeOpacity={0.6}>
      <View style={[styles.iconBox, danger && styles.iconBoxDanger]}>
        <Text style={styles.iconEmoji}>{icon}</Text>
      </View>
      <Text style={[styles.rowLabel, danger && styles.rowLabelDanger]}>{label}</Text>
      <View style={styles.rowRight}>
        {value ? <Text style={styles.rowValue}>{value}</Text> : null}
        {!danger && <Text style={styles.chevron}>›</Text>}
      </View>
    </TouchableOpacity>
  );
}

function RowToggle({ icon, label, value, onValueChange }) {
  return (
    <View style={styles.row}>
      <View style={styles.iconBox}>
        <Text style={styles.iconEmoji}>{icon}</Text>
      </View>
      <Text style={styles.rowLabel}>{label}</Text>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: '#D0D0C8', true: TEAL }}
        thumbColor="#FFFFFF"
        ios_backgroundColor="#D0D0C8"
        style={styles.toggle}
      />
    </View>
  );
}

function Divider() {
  return <View style={styles.divider} />;
}

export default function SettingsScreen({ navigation }) {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [privateAccount, setPrivateAccount] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={BG} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
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

        <Text style={styles.title}>Settings</Text>

        {/* Conta */}
        <SectionTitle label="Conta" />
        <View style={styles.card}>
          <RowItem
            icon="👤"
            label="Edit Profile"
            onPress={() => navigation?.navigate('EditProfile')}
          />
          <Divider />
          <RowItem
            icon="🔒"
            label="Change Password"
            onPress={() => {navigation.navigate('ChangePassword')}}
          />
          <Divider />
          <RowItem
            icon="📧"
            label="Email"
            value="user@email.com"
            onPress={() => navigation.navigate('ChangeEmail')}
          />
        </View>

        {/* Preferências */}
        <SectionTitle label="Preferences" />
        <View style={styles.card}>
          <RowToggle
            icon="🔔"
            label="Notifications"
            value={notifications}
            onValueChange={setNotifications}
          />
          <Divider />
          <RowToggle
            icon="🌙"
            label="Dark Mode"
            value={darkMode}
            onValueChange={setDarkMode}
          />
        </View>

        {/* Zona de perigo */}
        <SectionTitle label="Account Actions" />
        <View style={styles.card}>
          <RowItem
            icon="🚪"
            label="Log Out"
            onPress={() => {}}
            danger
          />
          <Divider />
          <RowItem
            icon="🗑️"
            label="Delete Account"
            onPress={() => {}}
            danger
          />
        </View>

        {/* Versão */}
        <Text style={styles.version}>FoodList v1.0.0</Text>

      </ScrollView>
    </SafeAreaView>
  );
}

const TEAL = '#1BB585';
const BG = '#F5F5ED';
const DARK = '#1A1A1A';
const MUTED = '#888880';
const CARD = '#EEEEE6';
const DANGER = '#D85A30';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: BG,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },

  // Header
  header: {
    paddingTop: 35,
    paddingBottom: 16,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backArrow: {
    fontSize: 28,
    color: DARK,
    lineHeight: 32,
    marginTop: -2,
  },

  // Título
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: DARK,
    textAlign: 'center',
    marginBottom: 28,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },

  // Section label
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: MUTED,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 8,
    marginTop: 20,
    paddingLeft: 4,
  },

  // Card agrupador
  card: {
    backgroundColor: CARD,
    borderRadius: 20,
    overflow: 'hidden',
  },

  // Row
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    minHeight: 56,
  },
  iconBox: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.07)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  iconBoxDanger: {
    backgroundColor: 'rgba(216,90,48,0.1)',
  },
  iconEmoji: {
    fontSize: 17,
  },
  rowLabel: {
    flex: 1,
    fontSize: 15,
    color: DARK,
    fontWeight: '400',
  },
  rowLabelDanger: {
    color: DANGER,
    fontWeight: '500',
  },
  rowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rowValue: {
    fontSize: 14,
    color: MUTED,
  },
  chevron: {
    fontSize: 20,
    color: '#C0C0B8',
    marginLeft: 4,
    lineHeight: 22,
  },
  toggle: {
    marginLeft: 'auto',
  },

  // Divider
  divider: {
    height: 0.5,
    backgroundColor: 'rgba(0,0,0,0.08)',
    marginLeft: 64,
  },

  // Versão
  version: {
    textAlign: 'center',
    fontSize: 12,
    color: MUTED,
    marginTop: 32,
  },
});