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
    this._groups = [];              // Array de grupo
    this._activeGroupId = null;     // ID do grupo selecionado no momento
    this._isAuthenticated = false;  // variavel para salvar estado de autenticacao

    // Persiste a instância na classe
    UserSession.instance = this;
  }

  // --- MÉTODOS DE USUÁRIO ---
  
  login(userData) {
    this._user = userData;
    this._isAuthenticated = true;
    console.log(`[Session] Usuário ${userData.name} logado.`);
  }

  logout() {
    this._user = null;
    this._groups = [];
    this._activeGroupId = null;
    this._isAuthenticated = false;
    console.log("[Session] Sessão encerrada.");
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
      if (isValidName = true) {
        this._user.name == newName;
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

      if (isValidEmail = true) {
        this._user.email = newEmail
      }
      
      console.log(`[Session] Email do utilizador atualizado para: ${newEmail}`);
    }
  }

  // --- MÉTODOS DE GRUPO ---

  // Define todos os grupos que o usuário participa.
  setGroups(groups) {
    this._groups = groups;
  }

  // Adiciona um grupo individualmente (ex: após criar um novo)
  addGroup(group) {
    this._groups.push(group);
  }

  // Define qual grupo o usuário está visualizando agora
  setActiveGroup(groupId) {
    const exists = this._groups.find(g => g.id === groupId);
    if (exists) {
      this._activeGroupId = groupId;
      console.log(`[Session] Grupo ativo alterado para: ${exists.name}`);
    }
  }

  // Retorna os dados do grupo que está aberto no momento
  getActiveGroup() {
    return this._groups.find(g => g.id === this._activeGroupId) || null;
  }

  // Retorna a lista completa de grupos
  getAllGroups() {
    return this._groups;
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
Object.freeze(instance);

export default instance;