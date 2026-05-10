import React from 'react';
import { StyleSheet, Text, View } from 'react-native'
import ConfiguracoesScreen from './views/configScreen/configScreen'
import EditarPerfilScreen from './views/configScreen/editarPerfilScreen';
import ChangePasswordScreen from './views/configScreen/changePasswordScreen';
import ChangeEmailScreen from './views/configScreen/changeEmailScreen';
// import feedScreen from './views/feedScreen/feedScreen'
// import recipeScreen from './views/recipeScreen/recipeScreen'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { UserProvider } from './services/userContext';
import { ThemeProvider } from './views/styles/themeContext';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <ThemeProvider>
      <UserProvider>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {/* <Stack.Screen name="Feed" component={feedScreen} /> */}
          <Stack.Screen name="Configurations" component={ConfiguracoesScreen} />
          <Stack.Screen name="ChangePassword" component={ChangePasswordScreen}  />
          <Stack.Screen name="ChangeEmail" component={ChangeEmailScreen}  />
          <Stack.Screen name="EditProfile" component={EditarPerfilScreen} />
        </Stack.Navigator>
      </UserProvider>
    </ThemeProvider>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}