
// estratégia de validação de nome
export const validarNome = {
    validar(nomeNovo, nomeAtual) {
        return nomeNovo !== nomeAtual; // retorna true se mudou
    }
};
// estratégia de validação de email
export const validarEmail = {
    validar(emailNovo, emailAtual) {
        return emailNovo !== emailAtual;
    }
};

/** 
*  Classe de Estratégias de Validação
*/

class ValidarStrategy {

    constructor() {
        this.strategy = null;
    }

    /**
     * Método para definir stratégia de validacao
     * @param {*} strategy - Estratégia que será utilizada
     */
    setStrategy(strategy) {
        this.strategy = strategy;
    };

    /**
     * Método de validação de algo(Email, Nome, Senha?)
     * 
     * @param {*} novo - nova informação
     * @param {*} atual - informação antes da mudança
     * @returns método validar específico da Estratégia
     */
    validar(novo, atual) {
        if (!this.strategy) {
            throw new Error("Validation strategy has not been initialized.");
        }
        return this.strategy.validar(novo, atual);
    }
}

const validacao = new ValidarStrategy();
export default validacao;