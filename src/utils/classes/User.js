const { APIRequests } = require('../Functions');

class User {
    constructor(id, nome, xp, saldo, level, rank, debito, banido, isPremium, isDono, SERVER){
        this.id = id;
        this.nome = nome;
        this.saldo = saldo;
        this.debito = debito;
        this.xp = xp;
        this.level = level;
        this.rank = rank;
        this.isBanido = banido;
        this.isPremium = isPremium,
        this.isDono = isDono;
        this.SERVER = SERVER;
    }

    editarValoresNumericos(attribute, value, add){
        
    }

    adicionarXP(xp){
        
        
    }

    adicionarLevel(level){
        
        
    }
    
    adicionarSaldo(saldo){

    }

    subtrairSaldo(saldo){

    }

    adicionarDebito(debito){

    }

    appendXP(index){
        
        
    }

    subirLevel(mencionarUsuario, msg){

    }
      

}

module.exports = User;
