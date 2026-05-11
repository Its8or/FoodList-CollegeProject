import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { UserProvider } from './services/userContext';
import { ThemeProvider } from './views/styles/themeContext';
import SettingsScreen from './views/configScreen/configScreen';
import EditProfileScreen from './views/configScreen/editarPerfilScreen';
import ChangePasswordScreen from './views/configScreen/changePasswordScreen';
import ChangeEmailScreen from './views/configScreen/changeEmailScreen';
import AdicionarReceitaScreen from './views/recipeScreen/createRecipeScreen'

const Stack = createStackNavigator();

export default function App() {
  return (
    <UserProvider>
      <ThemeProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="AddRecipe" component={AdicionarReceitaScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="EditProfile" component={EditProfileScreen} />
            <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
            <Stack.Screen name="ChangeEmail" component={ChangeEmailScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </UserProvider>
  );
}