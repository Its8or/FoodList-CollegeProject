import "./validateData";
import validacao, { validarEmail, validarNome } from "./validateData";

/**
 * Centraliza informações de Sessão de Usuário
 */

class UserSession {
  constructor() {
    // Verifica se já existe uma instância criada
    if (UserSession.instance) {
      return UserSession.instance;
    }

    // Inicialização do Estado Global
    this._user = null;              // Dados do perfil (nome, email, avatar)
    this._isAuthenticated = false;  // variavel para salvar estado de autenticacao

    // Persiste a instância na classe
    UserSession.instance = this;
  }

  // --- MÉTODOS DE USUÁRIO ---
  
  login(userData) {
    this._user = userData;
    this._isAuthenticated = true;
  }

  logout() {
    this._user = null;
    this._isAuthenticated = false;
  }

  getUser() {
    return this._user;
  }

  /**
   * Método para atualização de nome.
   * 
   * Compara se houve mudança entre os nomes, caso verdade atualiza, se não mantem igual.
   * 
   * @param {*} newName - novo valor para nome do usuário
   */
  atualizarNomeUsuario(newName) {
    if (this._user) {
      validacao.setStrategy(validarNome)
      isValidName = validacao.validar(newName, this._user.name)
      if (isValidName == true) {
        this._user.name = newName;
      }
    }
  }

  /**
   * Método para atualização de nome.
   * 
   * Compara se houve mudança entre os emails, caso verdade atualiza, se não mantem igual.
   * @param {*} newEmail - novo valor para email do usuário
   */
  atualizarEmailUsuario(newEmail) {
    if (this._user) {
      validacao.setStrategy(validarEmail)
      isValidEmail = validacao.validar(newEmail, this._user.email)

      if (isValidEmail == true) {
        this._user.email = newEmail
      }
      
      console.log(`[Session] Email do utilizador atualizado para: ${newEmail}`);
    }
  }
  // --- UTILITÁRIOS ---

  /**
   * Método para checagem de sessão de usuário.
   * 
   * @returns estado de sessão do usuário (logado/Não Logado)
   */
  isAuthenticated() {
    return this._isAuthenticated;
  }
}

// Cria e congela a instância única
const instance = new UserSession();

export default instance;