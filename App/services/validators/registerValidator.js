import { users } from '../storage/users';

export function camposVazios(nome, email, senha, confirmarSenha) {
  return (
    !nome.trim() ||
    !email.trim() ||
    !senha.trim() ||
    !confirmarSenha.trim()
  );
}

export function emailValido(email) {
  const regex = /^[^\s@]+@(gmail\.com|hotmail\.com)$/i;
  return regex.test(email);
}

export function senhasIguais(senha, confirmarSenha) {
  return senha === confirmarSenha;
}

export function nomeUnico(nome) {
  return !users.some(
    u => u.nome.toLowerCase() === nome.trim().toLowerCase()
  );
}