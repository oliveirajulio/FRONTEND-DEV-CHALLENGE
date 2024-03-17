class Product {
    constructor(obj) {
        obj = obj || {}
        this.id = obj.id
        this.nome = obj.nome
        this.valor = obj.valor
        this.quantidadeEstoque = obj.quantidadeEstoque
        this.dataCadastro = obj.dataCadastro
        this.observacao = obj.observacao
    }

    validar() {
        return !!(this.quantidadeEstoque && this.valor);
    }
}


    
