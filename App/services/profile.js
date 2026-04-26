export function getIniciais(nome) {
  if (!nome) return '?';

  return nome
    .trim()
    .split(' ')
    .filter((n) => n.length > 0)  // remove strings vazias (espaços duplos)
    .slice(0, 2)
    .map((n) => n[0].toUpperCase())
    .join('');
}
