import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, Image,
  StyleSheet, SafeAreaView, StatusBar,
  KeyboardAvoidingView, Platform, ScrollView,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import { useTheme } from '../styles/themeContext';
import { useUser } from '../../services/userContext';

export default function EditProfileScreen({ navigation }) {
  const { perfil, atualizarPerfil } = useUser();
  const { theme: t } = useTheme();
  const [name, setName] = useState(perfil.nome);
  const [username, setUsername] = useState(perfil.username);
  const [profileImage, setProfileImage] = useState(perfil.foto);
  const [nameFocused, setNameFocused] = useState(false);
  const [usernameFocused, setUsernameFocused] = useState(false);

  // Após os useState existentes, adicione:
  const hasChanges =
    name !== perfil.nome ||
    username !== perfil.username ||
    profileImage !== perfil.foto;

  const handlePickImage = async () => {
    // Solicita permissão
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permissão para acessar a galeria é necessária!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) setProfileImage(result.assets[0].uri);
  };

  const handleSave = async () => {
    await atualizarPerfil({ ...perfil, nome: name, username, foto: profileImage });
    navigation.goBack();
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: t.BG }]}>
      <StatusBar barStyle={t.STATUS} backgroundColor={t.BG} />

      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Go Back Button */}
          <View style={styles.header}>
            <TouchableOpacity
              style={[styles.backButton, { backgroundColor: t.BACK_BTN }]}
              onPress={() => navigation?.goBack()}
              activeOpacity={0.7}
            >
              <Text style={[styles.backArrow, { color: t.DARK }]}>‹</Text>
            </TouchableOpacity>
          </View>

          <Text style={[styles.title, { color: t.DARK }]}>Editar Perfil</Text>

          {/* Avatar container */}
          <View style={styles.avatarContainer}>
            <TouchableOpacity onPress={handlePickImage} activeOpacity={0.85}>
              {profileImage ? (
                <Image source={{ uri: profileImage }} style={styles.avatar} />
              ) : (
                <View style={[styles.avatar, styles.avatarPlaceholder, { backgroundColor: t.CARD }]}>
                  <Text style={styles.avatarPlaceholderText}>👤</Text>
                </View>
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={handlePickImage} activeOpacity={0.7}>
              <Text style={[styles.editPictureText, { color: t.TEAL }]}>Edit Profile Picture</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.fieldsContainer}>
            {/* Name Input */}
            <TextInput
              style={[styles.input, { borderColor: nameFocused ? t.TEAL : t.BORDER, backgroundColor: t.INPUT_BG, color: t.DARK }]}
              placeholder={name}
              placeholderTextColor={t.MUTED}
              onChangeText={setName}
              onFocus={() => setNameFocused(true)}
              onBlur={() => setNameFocused(false)}
              autoCapitalize="words"
            />
            {/* UserName Input */}
            <TextInput
              style={[styles.input, { borderColor: usernameFocused ? t.TEAL : t.BORDER, backgroundColor: t.INPUT_BG, color: t.DARK }]}
              placeholder={username}
              placeholderTextColor={t.MUTED}
              onChangeText={setUsername}
              onFocus={() => setUsernameFocused(true)}
              onBlur={() => setUsernameFocused(false)}
              autoCapitalize="none"
            />
          </View>
        </ScrollView>

        <View style={[styles.footer, { backgroundColor: t.BG }]}>
          <TouchableOpacity style={[styles.saveButtonAble, { backgroundColor: hasChanges ?  t.SAVE_BTN : t.BORDER }]} disabled={!hasChanges} onPress={handleSave} activeOpacity={0.85}>
            <Text style={[styles.saveButtonTextAble, { color: t.SAVE_TXT }]}>Save</Text>
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
  title: {
    fontSize: 28, fontWeight: '700', textAlign: 'center', marginBottom: 32,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  avatarContainer: { alignItems: 'center', marginBottom: 32, gap: 10 },
  avatar: { width: 90, height: 90, borderRadius: 45, borderWidth: 2.5, borderColor: '#E0E0D8' },
  avatarPlaceholder: { alignItems: 'center', justifyContent: 'center' },
  avatarPlaceholderText: { fontSize: 36 },
  editPictureText: { fontSize: 14, fontWeight: '500', marginTop: 6 },
  fieldsContainer: { gap: 14 },
  input: {
    height: 52, borderRadius: 50, borderWidth: 1.5,
    paddingHorizontal: 20, fontSize: 15,
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: Platform.OS === 'ios' ? 16 : 24,
    paddingTop: 12,
  },
  saveButtonAble: { height: 54, borderRadius: 50, alignItems: 'center', justifyContent: 'center' },
  saveButtonTextAble: { fontSize: 16, fontWeight: '600', letterSpacing: 0.3 },
});