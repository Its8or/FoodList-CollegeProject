import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
} from 'react-native';

export default function Preferencias() {
  const [modoEscuro, setModoEscuro] = useState(true);
  const [notificacoes, setNotificacoes] = useState(true);

  return (
    <View style={styles.container}>
      <Text style={styles.secaoTitulo}>PREFERÊNCIAS</Text>

      <View style={styles.card}>
        {/* Modo escuro */}
        <View style={styles.linha}>
          <View style={styles.iconeWrapper}>
            <Text style={styles.icone}>🌙</Text>
          </View>
          <Text style={styles.label}>Modo escuro</Text>
          <Switch
            value={modoEscuro}
            onValueChange={setModoEscuro}
            trackColor={{ false: '#DDDDDD', true: '#E67E22' }}
            thumbColor="#FFFFFF"
          />
        </View>

        <View style={styles.divisor} />

        {/* Notificações */}
        <View style={styles.linha}>
          <View style={[styles.iconeWrapper, styles.iconeNotif]}>
            <Text style={styles.icone}>🔔</Text>
          </View>
          <Text style={styles.label}>Notificações</Text>
          <Switch
            value={notificacoes}
            onValueChange={setNotificacoes}
            trackColor={{ false: '#DDDDDD', true: '#E67E22' }}
            thumbColor="#FFFFFF"
          />
        </View>
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
    backgroundColor: '#2C2C2A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconeNotif: {
    backgroundColor: '#E67E22',
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

  divisor: {
    height: 1,
    backgroundColor: '#DDDDDD',
    marginHorizontal: 15,
  },
});