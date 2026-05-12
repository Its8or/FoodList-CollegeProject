import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RECIPES_KEY = '@receitas_foodlist';

const RecipesContext = createContext({
  recipes: [],
  addRecipe: async () => {},
  deleteRecipe: async () => {},
  updateRecipe: async () => {},
});

export function RecipesProvider({ children }) {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const json = await AsyncStorage.getItem(RECIPES_KEY);
        if (json) setRecipes(JSON.parse(json));
      } catch (e) {
        console.warn('RecipesContext: erro ao carregar receitas:', e);
      }
    }
    load();
  }, []);

  async function persist(list) {
    try {
      await AsyncStorage.setItem(RECIPES_KEY, JSON.stringify(list));
    } catch (e) {
      console.warn('RecipesContext: erro ao salvar receitas:', e);
    }
  }

  async function addRecipe(recipe) {
    const newRecipe = {
      ...recipe,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    const updated = [newRecipe, ...recipes];
    setRecipes(updated);
    await persist(updated);
    return newRecipe;
  }

  async function deleteRecipe(id) {
    const updated = recipes.filter(r => r.id !== id);
    setRecipes(updated);
    await persist(updated);
  }

  async function updateRecipe(id, data) {
    const updated = recipes.map(r => (r.id === id ? { ...r, ...data } : r));
    setRecipes(updated);
    await persist(updated);
  }

  return (
    <RecipesContext.Provider value={{ recipes, addRecipe, deleteRecipe, updateRecipe }}>
      {children}
    </RecipesContext.Provider>
  );
}

export function useRecipes() {
  return useContext(RecipesContext);
}