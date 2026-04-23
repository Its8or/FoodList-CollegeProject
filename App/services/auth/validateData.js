export const validarNome = {
    validar(nomeNovo, nomeAtual) {
        (nomeNovo == nomeAtual) ? true : false;
    }
};

export const validarEmail = {
    validar(emailNovo, emailAtual) {
        (emailNovo == emailAtual) ? true : false;
    }
};


class ValidarStrategy {

    constructor() {
        this.strategy = null;
    }

    setStrategy(strategy) {
        this.setStrategy = strategy;
    };

    validar(novo, atual) {
        if (!this.strategy) {
            throw new Error("Validation strategy has not been initialized.");
        }
        return this.strategy.validar(novo, atual);
    }
}

const validacao = new ValidarStrategy();
export default validacao;