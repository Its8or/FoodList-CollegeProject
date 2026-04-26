import React from 'react';
import { StyleSheet, Text, View } from 'react-native'
import ConfiguracoesScreen from './views/configScreen/configScreen'
import EditarPerfilScreen from './views/configScreen/editarPerfilScreen';
// import feedScreen from './views/feedScreen/feedScreen'
// import recipeScreen from './views/recipeScreen/recipeScreen'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen name="Feed" component={feedScreen} /> */}
      <Stack.Screen name="Configurações" component={ConfiguracoesScreen} />
      <Stack.Screen name="EditarPerfil" component={EditarPerfilScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}