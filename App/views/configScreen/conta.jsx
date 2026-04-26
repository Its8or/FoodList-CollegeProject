import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';

export default function Conta({ navigation }) {
  function handleSair() {
    Alert.alert('Sair da conta', 'Tem certeza que deseja sair?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Sair',
        style: 'destructive',
        onPress: () => {
          // TODO: limpar token/contexto de autenticação
          navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
        },
      },
    ]);
  }

  function handleExcluir() {
    Alert.alert(
      'Excluir conta',
      'Essa ação é permanente e não poderá ser desfeita. Deseja continuar?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            // TODO: chamada à API para excluir a conta
            navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
          },
        },
      ]
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.secaoTitulo}>CONTA</Text>

      <View style={styles.card}>
        <TouchableOpacity style={styles.linha} onPress={handleSair}>
          <View style={[styles.iconeWrapper, styles.iconeAviso]}>
            <Text style={styles.icone}>🚪</Text>
          </View>
          <Text style={styles.label}>Sair da conta</Text>
          <Text style={styles.seta}>›</Text>
        </TouchableOpacity>

        <View style={styles.divisor} />

        <TouchableOpacity style={styles.linha} onPress={handleExcluir}>
          <View style={[styles.iconeWrapper, styles.iconePerigo]}>
            <Text style={styles.icone}>🗑️</Text>
          </View>
          <Text style={[styles.label, styles.labelPerigo]}>Excluir conta</Text>
          <Text style={[styles.seta, styles.labelPerigo]}>›</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: '#FFF8F0',
  },

  secaoTitulo: {
    fontSize: 11,
    fontWeight: '600',
    color: '#8B5E3C',
    letterSpacing: 1.2,
    marginBottom: 8,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    overflow: 'hidden',
  },

  linha: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    gap: 12,
  },

  iconeWrapper: {
    width: 34,
    height: 34,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconeAviso: {
    backgroundColor: '#E67E22',
  },
  iconePerigo: {
    backgroundColor: '#D85A30',
  },
  icone: {
    fontSize: 16,
  },

  label: {
    flex: 1,
    fontSize: 15,
    color: '#8B5E3C',
    fontWeight: '500',
  },
  labelPerigo: {
    color: '#D85A30',
  },

  seta: {
    fontSize: 22,
    color: '#8B5E3C',
    opacity: 0.4,
  },

  divisor: {
    height: 1,
    backgroundColor: '#DDDDDD',
    marginHorizontal: 15,
  },
});