const Connect = require('./socket/Connec');
const fs = require('fs');

const VerificarComando = require('./commands/switch');
const newUserBank = require('./data/messages/infos/newUserBank');
const messageConsole = require('./data/messages/infos/messageConsole')

const { APIRequests } = require('./utils/Functions');
const User = require('./utils/classes/User');
const sendMessage = require('./utils/SendMessage')

const SERVER = new APIRequests();

async function startBot() {
  // variaveis de configuracao vindas do servidor
  const data = await SERVER.getRequest(SERVER.routes.gets.config, 'identificadorNomeBot=mdevbot');
  let {prefix, nomeBot, nomeDono, numeroDono, numeroBot, nomeDinheiro } = data.config;

  const bot = await Connect();

  bot.ev.on('messages.upsert', async ({ messages }) => {
    const msgBot = messages[0];
    const from = msgBot.key?.remoteJid;
    const participant = msgBot.key?.participant;
    const fromMe = msgBot.key?.fromMe;
    const message = msgBot?.message?.extendedTextMessage?.text || msgBot?.message?.conversation;
    const pushName = msgBot?.pushName;

    if (fromMe) return console.log('\n[ Resposta do Bot ]\n');
    console.log(msgBot);

    // variaveis de verificacoes 'is'
    const isImage = message && (msgBot?.message?.imageMessage || msgBot?.message?.extendedTextMessage?.contextInfo?.quotedMessage?.imageMessage);
    const isGroup = from.endsWith('@g.us') ? true : false;
    const isQuotedMessage = isGroup && msgBot?.message?.extendedTextMessage?.contextInfo?.quotedMessage ? msgBot?.message?.extendedTextMessage?.contextInfo?.participant : false;
    const isMentionMessage = isGroup && msgBot?.message?.extendedTextMessage?.contextInfo?.mentionedJid.length > 0 ? msgBot?.message?.extendedTextMessage?.contextInfo?.mentionedJid : false;
    const isDono = from === `${numeroDono}@s.whatsapp.net` || participant === `${numeroDono}@s.whatsapp.net` ? true : false;

    if (!message) return console.log('Mensagem inválida ou indefinida');

    const isCommand = message.startsWith(prefix);

    const parts = message.split(' ');
    const command = parts[0].replace(prefix, '');
    const args = parts.slice(1).join(' ');

    const MDEVBOT = new sendMessage(bot, msgBot, from);

    const mudarPrefixo = (p) => {
      prefix = p;
      return prefix;
    }

    userNotFound = false;
    try {

      if(isGroup){
        const usuario_on = await SERVER.getRequest('http://127.0.0.1:8000/server/get/verify-user/', `jid=${participant}`);

        console.log(usuario_on)
        if(usuario_on.sucesso && !usuario_on.existe){
          let data = {
            jid: participant,
            nome: pushName,
            xpInicial: 50,
            saldoInicial: 500
          }

          let novo_usuario = await SERVER.postRequest('http://127.0.0.1:8000/server/post/create-user/', data);

          if(novo_usuario.usuario){
            // enviar resposta de novo usuário
            await bot.sendMessage(from, {text: newUserBank(pushName, nomeDinheiro, nomeBot)});
            userNotFound = true;
          }
        }

      }

      //  if(userNotFound) return await bot.sendMessage(from, {text: 'envie dnv'});

      const data_user = await SERVER.getRequest(SERVER.routes.gets.user, `jid=${isGroup ? participant : from}`);
      const userResult = data_user?.usuario ? data_user.usuario : null;

      if(!userResult) return console.log('\n\nO usuário '+ isGroup ? participant : from +' não está no banco de dados\n\n');

      const { id, nome, xp, saldo, level, rank, debito, banido, isPremium } = userResult;
      const user = new User(id, nome, xp, saldo, level, rank, debito, banido, isPremium, isDono, SERVER);


      if (!isCommand) return;
      else VerificarComando(command, args, MDEVBOT, user, prefix, nomeBot, nomeDono, numeroDono, numeroBot, nomeDinheiro, pushName, mudarPrefixo);
      
      console.log(messageConsole(pushName, command, nomeBot));
        

    } catch (error) {
      console.error(`Ocorreu um erro: \n\n${error}`);
    }
  });
}

startBot();

