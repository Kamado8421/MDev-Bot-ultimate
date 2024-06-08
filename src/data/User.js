const DataLoader = require('./DataLoader');

class User {
    constructor({id, nome, saldo, debito, xp, level, idRank, xpAdded}, {maxLevel, rankname}){
        this.id = id;
        this.nome = nome;
        this.saldo = saldo;
        this.debito = debito;
        this.xp = xp;
        this.level = level;
        this.idRank = idRank;   
        this.xpAdded = xpAdded; 
        this.maxLevel = maxLevel;     
        this.rankname = rankname;    
        this.DL = new DataLoader();
    }

    editarValoresNumericos(attribute, value, add){
        let data = this.DL.getDataJson(this.DL.paths.dataBank);

        let sucess;
        for(let user of data){
            if(user.id === this.id){

                if(add) {user[attribute] += value;}
                else {user[attribute] -= value;}

                try {
                    this.DL.updateDataJson(this.DL.updateDataJson(this.DL.paths.dataBank, null, data, true));
                    sucess = true;
                } catch (error) {
                    sucess = false;
                    console.error(error);
                }
                
                break;
            }
        }

        return sucess;
    }

    adicionarXP(xp){
        let sucess = this.editarValoresNumericos('xp', xp, true);
        return sucess;
    }

    adicionarLevel(level){
        let sucess = this.editarValoresNumericos('level', level, true);
        return sucess;
    }
    
    adicionarSaldo(saldo){
        let sucess = this.editarValoresNumericos('saldo', saldo, true);
        return sucess;
    }

    subtrairSaldo(saldo){
        let sucess = this.editarValoresNumericos('saldo', saldo, false);
        return sucess;
    }

    adicionarDebito(debito){
        let sucess = this.editarValoresNumericos('debito', debito, false);
        return sucess;
    }

    appendXP(index){
        let data = this.DL.getDataJson(this.DL.paths.dataBank);
        let sucess;
        for(let user of data){
            if(user.id === this.id){

                user.xpAdded.push(index);

                try {
                    this.DL.updateDataJson(this.DL.updateDataJson(this.DL.paths.dataBank, null, data, true));
                    sucess = true;
                } catch (error) {
                    sucess = false;
                    console.error(error);
                }
                
                break;
            }
        }
    }

    async subirLevel(mencionarUsuario, msg){

        let subiuNivel;
        for(let i = 100; i <= 100000; i += 100){
            if(this.xp > i && this.xp < (i + 100)){
                let level = 3;
                
                let bonusCollected = this.xpAdded.includes(i);
                
                if(!bonusCollected){
                    this.adicionarLevel(level);
                    this.adicionarSaldo(50);
                    this.appendXP(i);
                    subiuNivel = true;
                    await mencionarUsuario(msg, [this.id])
                }
                subiuNivel = false;
                break;
            }
        }

        return subiuNivel;
    }

}

module.exports = User;
