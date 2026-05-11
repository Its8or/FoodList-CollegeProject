import React from 'react';
import { StyleSheet, Text, View } from 'react-native'
import ConfiguracoesScreen from './views/configScreen/configScreen'
import EditarPerfilScreen from './views/configScreen/editarPerfilScreen';
import joinGroupScreen from './views/groupScreen/joinGroupScreen'
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
        <Stack.Navigator>
          <Stack.Screen name="EntrarGrupo" component={joinGroupScreen}/>
          <Stack.Screen name="Configurações" component={ConfiguracoesScreen} />
          <Stack.Screen name="EditarPerfil" component={EditarPerfilScreen} />
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