import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';

import * as ImagePicker from 'expo-image-picker';

export default function EditProfileScreen({ navigation }) {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [nameFocused, setNameFocused] = useState(false);
  const [usernameFocused, setUsernameFocused] = useState(false);

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
    console.log('Abrir seletor de imagem');
  };

  const handleSave = () => {
    console.log('Salvar perfil:', { name, username, profileImage });
    // navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={styles.safeArea.backgroundColor} />

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

          {/* Título */}
          <Text style={styles.title}>Edit Profile</Text>

          {/* Foto de Perfil */}
          <View style={styles.avatarContainer}>
            <TouchableOpacity onPress={handlePickImage} activeOpacity={0.85}>
              {profileImage ? (
                <Image source={{ uri: profileImage }} style={styles.avatar} />
              ) : (
                <View style={[styles.avatar, styles.avatarPlaceholder]}>
                  <Text style={styles.avatarPlaceholderText}>👤</Text>
                </View>
              )}
            </TouchableOpacity>

            <TouchableOpacity onPress={handlePickImage} activeOpacity={0.7}>
              <Text style={styles.editPictureText}>Edit Profile Picture</Text>
            </TouchableOpacity>
          </View>

          {/* Campos */}
          <View style={styles.fieldsContainer}>
            <TextInput
              style={[styles.input, nameFocused && styles.inputFocused]}
              placeholder="Name"
              placeholderTextColor="#AAAAAA"
              value={name}
              onChangeText={setName}
              onFocus={() => setNameFocused(true)}
              onBlur={() => setNameFocused(false)}
              autoCapitalize="words"
              returnKeyType="next"
            />

            <TextInput
              style={[styles.input, usernameFocused && styles.inputFocused]}
              placeholder="User Name"
              placeholderTextColor="#AAAAAA"
              value={username}
              onChangeText={setUsername}
              onFocus={() => setUsernameFocused(true)}
              onBlur={() => setUsernameFocused(false)}
              autoCapitalize="none"
              returnKeyType="done"
              onSubmitEditing={handleSave}
            />
          </View>
        </ScrollView>

        {/* Botão Save fixo na base */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSave}
            activeOpacity={0.85}
          >
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const TEAL = '#1BB585';
const BG = '#F5F5ED';
const DARK = '#1A1A1A';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: BG,
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 24,
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
    marginBottom: 32,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },

  // Avatar
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 32,
    gap: 10,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2.5,
    borderColor: '#E0E0D8',
  },
  avatarPlaceholder: {
    backgroundColor: '#D0C8B8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarPlaceholderText: {
    fontSize: 36,
  },
  editPictureText: {
    color: TEAL,
    fontSize: 14,
    fontWeight: '500',
    marginTop: 6,
  },

  // Campos
  fieldsContainer: {
    gap: 14,
  },
  input: {
    height: 52,
    borderRadius: 50,
    borderWidth: 1.5,
    borderColor: '#D0D0C8',
    backgroundColor: BG,
    paddingHorizontal: 20,
    fontSize: 15,
    color: DARK,
  },
  inputFocused: {
    borderColor: TEAL,
  },

  // Footer / Save
  footer: {
    paddingHorizontal: 24,
    paddingBottom: Platform.OS === 'ios' ? 16 : 24,
    paddingTop: 12,
    backgroundColor: BG,
  },
  saveButton: {
    height: 54,
    borderRadius: 50,
    backgroundColor: DARK,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
});