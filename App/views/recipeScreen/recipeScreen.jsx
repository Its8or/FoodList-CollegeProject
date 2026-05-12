import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, SafeAreaView, StatusBar, Platform,
} from 'react-native';

import { useTheme } from '../styles/themeContext';
import { useUser } from '../../services/userContext';

function Section({ title, content, t }) {
  if (!content || !content.trim()) return null;
  return (
    <View style={[styles.section, { backgroundColor: t.CARD }]}>
      <Text style={[styles.sectionTitle, { color: t.TEAL }]}>{title}</Text>
      <View style={[styles.divider, { backgroundColor: t.DIVIDER }]} />
      <Text style={[styles.sectionContent, { color: t.DARK }]}>{content}</Text>
    </View>
  );
}

export default function RecipeScreen({ navigation, route }) {
  const { theme: t } = useTheme();
  const { recipe } = route.params;
  const { perfil } = useUser();

  const tags = recipe.tags
    ? recipe.tags.split(',').map(tag => tag.trim()).filter(Boolean)
    : [];

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: t.BG }]}>
      <StatusBar barStyle={t.STATUS} backgroundColor={t.BG} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Back button */}
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
            <Text style={styles.iconEmoji}>🍽️</Text>
          </View>
        </View>

        {/* Title */}
        <Text style={[styles.title, { color: t.DARK }]}>{recipe.nome}</Text>

        {/* Tags */}
        {tags.length > 0 && (
          <View style={styles.tagsRow}>
            {tags.map(tag => (
              <View key={tag} style={[styles.tag, { backgroundColor: t.CARD }]}>
                <Text style={[styles.tagText, { color: t.TEAL }]}>#{tag}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Sections */}
        <View style={styles.sectionsContainer}>
          <Section title="DESCRIÇÃO" content={recipe.descricao} t={t} />
          <Section title="INGREDIENTES" content={recipe.ingredientes} t={t} />
          <Section title="MODO DE PREPARO" content={recipe.modoPreparo} t={t} />
        </View>

        {/* Footer date */}
        <Text style={[styles.dateText, { color: t.MUTED }]}>
          Adicionada em {new Date(recipe.createdAt).toLocaleDateString('pt-BR')} por {perfil.username}.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  scrollContent: { paddingHorizontal: 24, paddingBottom: 40 },
  header: { paddingTop: 35, paddingBottom: 16 },
  backButton: {
    width: 36, height: 36, borderRadius: 18,
    alignItems: 'center', justifyContent: 'center',
  },
  backArrow: { fontSize: 28, lineHeight: 32, marginTop: -2 },
  iconContainer: { alignItems: 'center', marginBottom: 16 },
  iconCircle: {
    width: 72, height: 72, borderRadius: 36,
    alignItems: 'center', justifyContent: 'center',
  },
  iconEmoji: { fontSize: 32 },
  title: {
    fontSize: 28, fontWeight: '700', textAlign: 'center', marginBottom: 16,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  tagsRow: {
    flexDirection: 'row', flexWrap: 'wrap',
    justifyContent: 'center', gap: 6, marginBottom: 24,
  },
  tag: { borderRadius: 50, paddingHorizontal: 12, paddingVertical: 5 },
  tagText: { fontSize: 13, fontWeight: '500' },
  sectionsContainer: { gap: 12 },
  section: { borderRadius: 20, padding: 16 },
  sectionTitle: {
    fontSize: 11, fontWeight: '700', letterSpacing: 1.2,
    textTransform: 'uppercase', marginBottom: 10,
  },
  divider: { height: 0.5, marginBottom: 12 },
  sectionContent: { fontSize: 15, lineHeight: 26 },
  dateText: { fontSize: 12, textAlign: 'center', marginTop: 28 },
});