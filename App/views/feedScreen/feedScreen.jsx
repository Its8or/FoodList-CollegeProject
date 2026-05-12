import React, { useState, useMemo } from 'react';
import {
  View, Text, FlatList, TextInput, TouchableOpacity,
  StyleSheet, SafeAreaView, StatusBar, Platform,
} from 'react-native';

import { useTheme } from '../styles/themeContext';
import { useRecipes } from '../../services/recipesContext';

function RecipeCard({ recipe, onPress, t }) {
  const tags = recipe.tags
    ? recipe.tags.split(',').map(tag => tag.trim()).filter(Boolean)
    : [];

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: t.CARD }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.cardHeader}>
        <Text style={[styles.cardTitle, { color: t.DARK }]} numberOfLines={1}>
          {recipe.nome}
        </Text>
        <Text style={[styles.cardDate, { color: t.MUTED }]}>
          {new Date(recipe.createdAt).toLocaleDateString('pt-BR')}
        </Text>
      </View>

      {recipe.descricao ? (
        <Text style={[styles.cardDescription, { color: t.MUTED }]} numberOfLines={2}>
          {recipe.descricao}
        </Text>
      ) : null}

      {tags.length > 0 && (
        <View style={styles.tagsRow}>
          {tags.slice(0, 3).map(tag => (
            <View key={tag} style={[styles.tag, { backgroundColor: t.BG }]}>
              <Text style={[styles.tagText, { color: t.TEAL }]}>#{tag}</Text>
            </View>
          ))}
          {tags.length > 3 && (
            <Text style={[styles.tagMore, { color: t.MUTED }]}>+{tags.length - 3}</Text>
          )}
        </View>
      )}

      <Text style={[styles.chevron, { color: t.BORDER }]}>›</Text>
    </TouchableOpacity>
  );
}

export default function FeedScreen({ navigation }) {
  const { theme: t } = useTheme();
  const { recipes } = useRecipes();
  const [search, setSearch] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);

  const filtered = useMemo(() => {
    if (!search.trim()) return recipes;
    const q = search.toLowerCase();
    return recipes.filter(
      r =>
        r.nome.toLowerCase().includes(q) ||
        (r.tags && r.tags.toLowerCase().includes(q)) ||
        (r.descricao && r.descricao.toLowerCase().includes(q)),
    );
  }, [search, recipes]);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: t.BG }]}>
      <StatusBar barStyle={t.STATUS} backgroundColor={t.BG} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: t.DARK }]}>Receitas</Text>
        <View style={[ styles.optionsMenu]}>
            <TouchableOpacity
            style={[styles.addButton, { backgroundColor: t.MUTED }]}
            onPress={() => navigation?.navigate('Settings')}
            activeOpacity={0.8}
            >
            <Text style={styles.settingsButtonText}>⚙️</Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={[styles.addButton, { backgroundColor: t.TEAL }]}
            onPress={() => navigation?.navigate('AddRecipe')}
            activeOpacity={0.8}
            >
            <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View
          style={[
            styles.searchBar,
            {
              backgroundColor: t.CARD,
              borderColor: searchFocused ? t.TEAL : 'transparent',
            },
          ]}
        >
          <Text style={[styles.searchIcon, { color: t.MUTED }]}>🔍</Text>
          <TextInput
            style={[styles.searchInput, { color: t.DARK }]}
            placeholder="Buscar receitas, tags..."
            placeholderTextColor={t.MUTED}
            value={search}
            onChangeText={setSearch}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            returnKeyType="search"
            autoCapitalize="none"
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')} activeOpacity={0.7}>
              <Text style={[styles.clearIcon, { color: t.MUTED }]}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* List */}
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        contentContainerStyle={[
          styles.listContent,
          filtered.length === 0 && styles.emptyList,
        ]}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <RecipeCard
            recipe={item}
            onPress={() => navigation?.navigate('Recipe', { recipe: item })}
            t={t}
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyEmoji}>🍽️</Text>
            <Text style={[styles.emptyTitle, { color: t.DARK }]}>
              {search ? 'Nenhuma receita encontrada' : 'Nenhuma receita ainda'}
            </Text>
            <Text style={[styles.emptySubtitle, { color: t.MUTED }]}>
              {search
                ? 'Tente outros termos de busca.'
                : 'Toque em + para adicionar sua primeira receita!'}
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 35,
    paddingBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  optionsMenu:{
    flexDirection: 'row',
    gap: 10,
  },
  addButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: { color: '#FFF', fontSize: 22, lineHeight: 28, fontWeight: '400' },
  settingsButtonText: { fontSize: 22, },
  
  searchContainer: { paddingHorizontal: 24, paddingVertical: 12 },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 1.5,
    paddingHorizontal: 16,
    height: 48,
  },
  searchIcon: { fontSize: 15, marginRight: 8 },
  searchInput: { flex: 1, fontSize: 15 },
  clearIcon: { fontSize: 14, paddingLeft: 8 },

  listContent: { paddingHorizontal: 24, paddingBottom: 32 },
  emptyList: { flexGrow: 1 },
  separator: { height: 12 },

  card: { borderRadius: 20, padding: 16, gap: 8 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardTitle: { fontSize: 17, fontWeight: '600', flex: 1, marginRight: 8 },
  cardDate: { fontSize: 12 },
  cardDescription: { fontSize: 14, lineHeight: 20 },
  tagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  tag: { borderRadius: 50, paddingHorizontal: 10, paddingVertical: 4 },
  tagText: { fontSize: 12, fontWeight: '500' },
  tagMore: { fontSize: 12, alignSelf: 'center' },
  chevron: { fontSize: 20, textAlign: 'right', marginTop: 4 },

  emptyContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8, paddingTop: 80 },
  emptyEmoji: { fontSize: 48 },
  emptyTitle: { fontSize: 18, fontWeight: '600' },
  emptySubtitle: { fontSize: 14, textAlign: 'center', paddingHorizontal: 32 },
});