import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { configScreen } from './views/configScreen'


export default function App() {
  return (
    <View style={styles.container}>
      <Text>Hello World!</Text>
      {configScreen()}
    </View>
  );
}
