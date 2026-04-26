import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';

import PerfilUsuario from './perfilUsuario';
import Preferencias from './preferencias';
import Conta from './conta';

export default function ConfiguracoesScreen() {
    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <PerfilUsuario />
            <Preferencias />
            <Conta />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF8F0',
    },
    content: {
        padding: 20,
        gap: 24,
    },
    titulo: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#E67E22',
        textAlign: 'center',
        marginBottom: 30,
    },
});