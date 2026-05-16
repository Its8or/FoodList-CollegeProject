import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import { UserProvider } from './services/userContext';
import { AuthProvider, useAuth } from './services/authContext';
import { ThemeProvider, useTheme } from './views/styles/themeContext';
import { RecipesProvider } from './services/recipesContext';

// Auth screens
import TelaLogin from './views/AuthScreen/TelaLogin';
import TelaCadastro from './views/AuthScreen/TelaCadastro';

// App screens
import FeedScreen from './views/feedScreen/feedScreen';
import RecipeScreen from './views/recipeScreen/recipeScreen';
import EditRecipeScreen from './views/recipeScreen/editRecipeScreen';
import AdicionarReceitaScreen from './views/recipeScreen/createRecipeScreen';
import SettingsScreen from './views/configScreen/configScreen';
import EditProfileScreen from './views/configScreen/editarPerfilScreen';
import ChangePasswordScreen from './views/configScreen/changePasswordScreen';
import ChangeEmailScreen from './views/configScreen/changeEmailScreen';

const Stack = createStackNavigator();

function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={TelaLogin} />
      <Stack.Screen name="Cadastro" component={TelaCadastro} />
    </Stack.Navigator>
  );
}

function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Feed" component={FeedScreen} />
      <Stack.Screen name="Recipe" component={RecipeScreen} />
      <Stack.Screen name="EditRecipe" component={EditRecipeScreen} />
      <Stack.Screen name="AddRecipe" component={AdicionarReceitaScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
      <Stack.Screen name="ChangeEmail" component={ChangeEmailScreen} />
    </Stack.Navigator>
  );
}

// Escolhe qual navigator exibir com base no estado de auth
function RootNavigator() {
  const { isAuthenticated, loading } = useAuth();
  const { theme: t } = useTheme();

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: t.BG, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color={t.TEAL} />
      </View>
    );
  }

  return isAuthenticated ? <AppNavigator /> : <AuthNavigator />;
}

export default function App() {
  return (
    <UserProvider>                {/* disponibiliza os dados de perfil do usuário logado */}
      <AuthProvider>              {/* gerencia o estado de autenticação */}
        <ThemeProvider>           {/* controla o tema visual (dark/light mode) */}
          <RecipesProvider>       {/* controla e carrega dados, CRUD de receitas, pode mudar conforme usuário*/}
            <NavigationContainer>
              <RootNavigator />
            </NavigationContainer>
          </RecipesProvider>
        </ThemeProvider>
      </AuthProvider>
    </UserProvider>
  );
}