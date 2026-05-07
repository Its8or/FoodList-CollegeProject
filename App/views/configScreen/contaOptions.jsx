import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useTheme } from '../styles/themeContext';
import session from '../../services/auth/userSession';

/**  
 * mostra foto, nome e email de usuário. 
 */
export default function ShowProfile({ navigation }) { 
  const { theme } = useTheme();
  const s = makeStyles(theme);

  /**
   * Encerra a sessão do usuário, envia alert de confirmção e faz Logout.
   */
  async function handleSair() {
    Alert.alert('Sair', 'Deseja encerrar a sessão?', [
      { text: 'Cancelar' },
      {
        text: 'Sair',
        onPress: async () => {
          session.logout();
          await AsyncStorage.removeItem('@perfil_usuario'); // limpa o disco também
          navigation.reset({ index: 0, routes: [{ name: 'Login' }] }); // redireciona para tela de login, sem volta
        },
      },
    ]);
  }

  return (
    <View style={s.container}>
      <Text style={s.secaoTitulo}>CONTA</Text>

      <View style={s.card}>
        <TouchableOpacity
          style={s.linha}
          onPress={() => navigation.navigate('EditarPerfil')}
        >
          <View style={[s.iconeWrapper, s.iconeAviso]}>
            <Text style={s.icone}>✏️</Text>
          </View>
          <Text style={s.label}>Editar perfil</Text>
          <Text style={s.seta}>›</Text>
        </TouchableOpacity>

        <View style={s.divisor} />

        <TouchableOpacity style={s.linha} onPress={handleSair}>
          <View style={[s.iconeWrapper, s.iconeAviso]}>
            <Text style={s.icone}>🚪</Text>
          </View>
          <Text style={s.label}>Sair da conta</Text>
          <Text style={s.seta}>›</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

function makeStyles(theme) {
  return StyleSheet.create({
    container: {
      paddingHorizontal: 20,
      backgroundColor: theme.backgroundMain,
    },
    secaoTitulo: {
      fontSize: 11,
      fontWeight: '600',
      color: theme.textDark,
      letterSpacing: 1.2,
      marginBottom: 8,
    },
    card: {
      backgroundColor: theme.cardBackground,
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
      backgroundColor: theme.primary,
    },
    iconePerigo: {
      backgroundColor: theme.danger,
    },
    icone: {
      fontSize: 16,
    },
    label: {
      flex: 1,
      fontSize: 15,
      color: theme.textDark,
      fontWeight: '500',
    },
    labelPerigo: {
      color: theme.danger,
    },
    seta: {
      fontSize: 22,
      color: theme.textDark,
      opacity: 0.4,
    },
    divisor: {
      height: 1,
      backgroundColor: theme.divisor,
      marginHorizontal: 15,
    },
  });
}