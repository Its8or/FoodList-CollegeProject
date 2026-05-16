import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, Alert,
  StyleSheet, SafeAreaView, StatusBar, Platform,
} from 'react-native';

import { useTheme }   from '../styles/themeContext';
import { useRecipes } from '../../services/recipesContext';

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
  const { theme: t }     = useTheme();
  const { deleteRecipe } = useRecipes();
  const { recipe }       = route.params;

  const tags = recipe.tags
    ? recipe.tags.split(',').map(tag => tag.trim()).filter(Boolean)
    : [];

  function handleDelete() {
    Alert.alert(
      'Apagar receita',
      `Tem certeza que deseja apagar "${recipe.nome}"? Esta ação não pode ser desfeita.`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Apagar',
          style: 'destructive',
          onPress: async () => {
            await deleteRecipe(recipe.id);
            navigation.navigate('Feed');
          },
        },
      ],
    );
  }

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: t.BG }]}>
      <StatusBar barStyle={t.STATUS} backgroundColor={t.BG} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header: back + edit */}
        <View style={styles.header}>
          <TouchableOpacity
            style={[styles.iconBtn, { backgroundColor: t.BACK_BTN }]}
            onPress={() => navigation?.goBack()}
            activeOpacity={0.7}
          >
            <Text style={[styles.backArrow, { color: t.DARK }]}>‹</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.iconBtn, { backgroundColor: t.BACK_BTN }]}
            onPress={() => navigation?.navigate('EditRecipe', { recipe })}
            activeOpacity={0.7}
          >
            <Text style={styles.editEmoji}>✏️</Text>
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
          <Section title="DESCRIÇÃO"       content={recipe.descricao}   t={t} />
          <Section title="INGREDIENTES"    content={recipe.ingredientes} t={t} />
          <Section title="MODO DE PREPARO" content={recipe.modoPreparo}  t={t} />
        </View>

        {/* Footer date */}
        <Text style={[styles.dateText, { color: t.MUTED }]}>
          Adicionada em {new Date(recipe.createdAt).toLocaleDateString('pt-BR')}
        </Text>

        {/* Delete button */}
        <TouchableOpacity
          style={[styles.deleteButton, { borderColor: t.DANGER, backgroundColor: t.CARD }]}
          onPress={handleDelete}
          activeOpacity={0.7}
        >
          <Text style={[styles.deleteText, { color: t.DANGER }]}>🗑️  Apagar Receita</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea:      { flex: 1 },
  scrollContent: { paddingHorizontal: 24, paddingBottom: 40 },

  header: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', paddingTop: 35, paddingBottom: 16,
  },
  iconBtn:   { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  backArrow: { fontSize: 28, lineHeight: 32, marginTop: -2 },
  editEmoji: { fontSize: 17 },

  iconContainer: { alignItems: 'center', marginBottom: 16 },
  iconCircle:    { width: 72, height: 72, borderRadius: 36, alignItems: 'center', justifyContent: 'center' },
  iconEmoji:     { fontSize: 32 },

  title: {
    fontSize: 28, fontWeight: '700', textAlign: 'center', marginBottom: 16,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },

  tagsRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 6, marginBottom: 24 },
  tag:     { borderRadius: 50, paddingHorizontal: 12, paddingVertical: 5 },
  tagText: { fontSize: 13, fontWeight: '500' },

  sectionsContainer: { gap: 12 },
  section:           { borderRadius: 20, padding: 16 },
  sectionTitle:      { fontSize: 11, fontWeight: '700', letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 10 },
  divider:           { height: 0.5, marginBottom: 12 },
  sectionContent:    { fontSize: 15, lineHeight: 26 },

  dateText: { fontSize: 12, textAlign: 'center', marginTop: 28, marginBottom: 20 },

  deleteButton: {
    height: 54, borderRadius: 50, borderWidth: 1.5,
    alignItems: 'center', justifyContent: 'center',
  },
  deleteText: { fontSize: 15, fontWeight: '600' },
});