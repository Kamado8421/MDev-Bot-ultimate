const messageNotFound = require('../data/messages/infos/messageNotFound');
const messagePing = require('../data/messages/infos/messagePing');
const messageInfoCoin = require('../data/messages/infos/messageInfoCoin');
const messageLevelUp = require('../data/messages/infos/messageLevelUp');
const menu = require('../data/messages/menus/menu');
const menuCoin = require('../data/messages/menus/menu-coin');
const menuLoja = require('../data/messages/menus/menu-loja')

const GeminiModel = require('../utils/Functions');
const User = require('../utils/classes/User');
const sendMessage = require('../utils/SendMessage');

async function VerificarComando(command, args, MDEVBOT=new sendMessage, user=new User, prefix, nomeBot, nomeDono, numeroDono, numeroBot, nomeDinheiro, pushName, mudarPrefixo) {

  switch (command.toLowerCase()) {
    case 'ping':
      user.adicionarXP(3);   
      MDEVBOT.enviar(messagePing(prefix, pushName, nomeBot));  
      break;

    case 'menu': case 'cmd':
      MDEVBOT.enviar(menu(prefix, pushName, nomeBot, nomeDono, nomeDinheiro));
      break;

    case 'menuloja': case 'loja': case 'store': case 'ajudacomprar':
      MDEVBOT.enviar(menuLoja(prefix, nomeDinheiro, pushName, nomeBot, nomeDono));
      break;

    case `menu${nomeDinheiro.toLowerCase()}`: case 'menumoeda': case 'menumoedas': case 'menucoin': case 'menucoins':
      MDEVBOT.enviar(menuCoin(prefix, nomeDinheiro, pushName, nomeBot, nomeDono));
      break;

    case 'gpt': case 'gemini':
      /*if (!args) return enviar('Você precisa mandar o comando junto com um argumento\n\n> *Ex:* ' + prefix + 'gpt o que é H²O?');

      userOn.adicionarXP(20);

      let ia = new GeminiModel(APIKEYS.auth.gemini, prefix, nomeBot);

      let resp = await ia.responder(args);

      enviar(resp);*/

      break
    case 'novoprefixo': case 'prefixo': case 'np':
      if (!user.isDono) return MDEVBOT.enviar('> Você *NÃO É* o meu dono')
      if (!args) return MDEVBOT.enviar('Qual o novo prefixo patrão?')

      prefix = mudarPrefixo(args)
      MDEVBOT.enviar("Prefixo alterado com sucesso, ultilize " + prefix + "ping para testar")
      break

    case `ajuda${nomeDinheiro.toLowerCase()}`: case `ajudacoin`: case 'ajudamoeda': case 'helpcoin': case 'ajudacoins': case 'ajudamoedas':
      //enviarAudio(DL.paths.audios)
      break
    case 'moeda': case 'moedas': case 'coins': case 'coin': case `${nomeDinheiro.toLowerCase()}`: case 'saldo': case 'extrato': case 'xp':

     /* if (!isGroup && !isDono) return enviar('Esse comando é reservado para grupos.');

      let bank = DL.getDataBankUser(participant)
      if (!bank) return enviar('Não encontrei suas informações no nosso banco de dados :(');

      enviar(messageInfoCoin(prefix, pushName, nomeBot, nomeDono, nomeDinheiro, bank.user, bank.rank))
*/
      break
    default:
      MDEVBOT.enviar(messageNotFound(prefix, nomeBot, command));
      break;
  }
}

module.exports = VerificarComando;
