export function geradorDeCodigoGrupo() {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let codigoGrupo = "";
    let length = 5;
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        codigoGrupo += charset.charAt(randomIndex);
    }
    return codigoGrupo;
}

// console.log("Código do grupo: "+geradorDeCodigoGrupo());