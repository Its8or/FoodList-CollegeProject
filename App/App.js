import React from 'react';
import { StyleSheet, Text, View } from 'react-native'
import { configScreen } from './views/configScreen/configScreen'
import { feedScreen } from './views/feedScreen/feedScreen'
import { recipeScreen } from './views/recipeScreen/recipeScreen'
import styles from './views/styles/style'

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.menu}>
        {/* Group Info */}
        <View> 
          <Text>Group.Name</Text>
          <Text>descrição</Text>
        </View>
        
        {/* Menu Context */}
        <View style={styles.menuContext}>
          <Text>+</Text>
          <Text>☰</Text>
        </View>
      
      </View>
    </View>
  );
}
