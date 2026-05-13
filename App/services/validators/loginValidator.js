import { users } from '../storage/users';

export function camposLoginVazios(nome, senha) {
  return !nome.trim() || !senha.trim();
}

export function encontrarUsuario(nome, senha) {
  return (
    users.find(
      u =>
        u.nome.toLowerCase() === nome.trim().toLowerCase() &&
        u.senha === senha
    ) || null
  );
}