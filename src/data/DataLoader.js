const fs = require('fs');
const path = require('path');

class DataLoader {
  constructor() {
    this.initial_path = path.join(__dirname, '..', '..'); // Obtém o diretório pai do diretório atual
    this.paths = {
      admin: path.join(this.initial_path, 'src', 'data', 'admin', 'admin.json'),
      apis: path.join(this.initial_path, 'src', 'data', 'apis', 'keys.json'),
      premiums: path.join(this.initial_path, 'src', 'data', 'premiums', 'vips.json'),
      connection: path.join(this.initial_path, 'assets', 'qrcode'),
      dataBank: path.join(this.initial_path, 'src', 'data', 'bank', 'database.json'),
      ranks: path.join(this.initial_path, 'src', 'data', 'bank', 'ranks.json'),
      audios: path.join(this.initial_path, 'assets', 'audios', 'ajudacoins.mp3')
    };
  }

  getDataJson(filePath) {
    try {
      let data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      return data;
    } catch (error) {
      console.error(`Erro ao ler o arquivo ${filePath}.\n\n${error}`);
      return null;
    }
  }

  updateDataJson(filePath, attribute, value, isArray = false) {
    try {
      let data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

      if (isArray) {
        data = value;
      } else {
        data[attribute.toLowerCase()] = value;
      }

      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      return data;
    } catch (error) {
      console.log(`Erro ao atualizar o arquivo ${filePath}.\n\n${error}`);
    }
  }

  setDataBankUser(id, nome) {
    let users = this.getDataJson(this.paths.dataBank);
    if (!users) {
      console.error('Erro ao obter dados dos usuários');
      return;
    }

    let user = { id: id, nome: nome, saldo: 500, debito: 0, xp: 1, level: 1, idRank: 0, xpAdded: [] };

    users.push(user);

    this.updateDataJson(this.paths.dataBank, null, users, true);
  }

  getRankDataBank(idRank) {
    let ranks = this.getDataJson(this.paths.ranks)

    let rank;
    if (idRank < 1) {
      rank = { id: 0, maxLevel: 2, rankname: 'Sem XP suficiente', coins: 0 }
    } else {
      for (let data of ranks) {
        if (data.id === idRank) {
          rank = data;
          break;
        }
      }
    }
    if (!rank) return false;

    return rank;

  }

  getDataBankUser(id) {
    try {
      let databank = this.getDataJson(this.paths.dataBank)

      let user;
      let rank;
      for (let data of databank) {
        if (data.id === id) {
          user = data;
          rank = this.getRankDataBank(user.idRank)
          break;
        }
      }

      console.log({
        user: user, rank: rank, id: id
      })

      if (!user) return false


      return {
        user: user, rank: rank
      }

    } catch (error) {
      console.error(error);
    }
  }

  getUserOn(id){
    let bank = this.getDataJson(this.paths.dataBank);

    let user;
    for(let data of bank){
      if(data.id === id){
        user = data;
        break;
      } else {
        console.log(data)
      }
    }

    return user;
  }

  getRankUserOn(id){
    let user = this.getUserOn(id);

    let idRank = user.idRank;

    let rank = this.getRankDataBank(idRank);

    return rank;

  }
}

module.exports = DataLoader;
