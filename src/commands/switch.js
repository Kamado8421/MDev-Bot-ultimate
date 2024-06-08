const GeminiModel = require('../data/apis/Functions');
const User = require('../data/User')

async function VerificarComando(bot, command, args, DL, reagirMensagem, enviar, enviarImagem, prefix, nomeDono,
  nomeBot, numeroDono, numeroBot, nomeDinheiro, isDono, isGroup, from, pushName,
  loading, messagePing, messageNotFound, enviarAudio, menu, messageInfoCoin,
  participant, menuCoin, menuLoja, APIKEYS, userOn = new User, isQuotedMessage, isMentionMessage) {

  userOn.adicionarXP(8);

  switch (command.toLowerCase()) {
    case 'ping':
      userOn.adicionarXP(3);
      
  // enviar(messagePing(prefix, pushName, nomeBot));

      if(isQuotedMessage) enviar('OK')
     else enviar('Nao')
      break;
    case 'menu': case 'cmd':

      enviar(menu(prefix, pushName, nomeBot, nomeDono));

      break


    case 'menuloja': case 'loja': case 'store': case 'ajudacomprar':
      enviar(menuLoja(prefix, nomeDinheiro, pushName, nomeBot, nomeDono));
      break;
    case `menu${nomeDinheiro.toLowerCase()}`: case 'menumoeda': case 'menumoedas': case 'menucoin': case 'menucoins':
      enviar(menuCoin(prefix, nomeDinheiro, pushName, nomeBot, nomeDono));
      break
    case 'teste':
      let { key } = await bot.sendMessage(from, { text: '' });

      loading(key);

      break;
    case 'gpt': case 'gemini':
      if (!args) return enviar('Você precisa mandar o comando junto com um argumento\n\n> *Ex:* ' + prefix + 'gpt o que é H²O?');

      userOn.adicionarXP(20);

      let ia = new GeminiModel(APIKEYS.auth.gemini, prefix, nomeBot);

      let resp = await ia.responder(args);

      enviar(resp);

      break
    case 'novoprefixo': case 'prefixo': case 'np':
      if (!isDono) return enviar('Nao é dono')
      if (!args) return enviar('qual o novo prefixo?')

      DL.updateDataJson(DL.paths.admin, 'prefix', args);

      enviar("Prefixo alterado com sucesso, ultilize " + args + "ping para testar")
      break

    case `ajuda${nomeDinheiro.toLowerCase()}`: case `ajudacoin`: case 'ajudamoeda': case 'helpcoin': case 'ajudacoins': case 'ajudamoedas':
      enviarAudio(DL.paths.audios)
      break
    case 'moeda': case 'moedas': case 'coins': case 'coin': case `${nomeDinheiro.toLowerCase()}`: case 'saldo': case 'extrato': case 'xp':

      if (!isGroup && !isDono) return enviar('Esse comando é reservado para grupos.');

      let bank = DL.getDataBankUser(participant)
      if (!bank) return enviar('Não encontrei suas informações no nosso banco de dados :(');

      enviar(messageInfoCoin(prefix, pushName, nomeBot, nomeDono, nomeDinheiro, bank.user, bank.rank))

      break
    default:
      enviar(messageNotFound(prefix, nomeBot, command));
      break;
  }
}

module.exports = VerificarComando;
