const Connect = require('./socket/Connec');
const fs = require('fs');

const DataLoader = require('./data/DataLoader');
const messageNotFound = require('./data/messages/infos/messageNotFound');
const newUserBank = require('./data/messages/infos/newUserBank');
const messagePing = require('./data/messages/infos/messagePing');
const messageInfoCoin = require('./data/messages/infos/messageInfoCoin');
const messageLevelUp = require('./data/messages/infos/messageLevelUp');
const menu = require('./data/messages/menus/menu');
const menuCoin = require('./data/messages/menus/menu-coin');
const menuLoja = require('./data/messages/menus/menu-loja')
const VerificarComando = require('./commands/switch');
const User = require('./data/User');

const DL = new DataLoader();

async function startBot() {
  const bot = await Connect();

  bot.ev.on('messages.upsert', async ({ messages }) => {
    const msgBot = messages[0];
    const from = msgBot.key?.remoteJid;
    const participant = msgBot.key?.participant;
    const fromMe = msgBot.key?.fromMe;
    const message = msgBot?.message?.extendedTextMessage?.text || msgBot?.message?.conversation;
    const pushName = msgBot?.pushName;

    if (fromMe) return console.log('\n\n[ Resposta do Bot ]\n\n');
    console.log(msgBot);
    const selo = msgBot;

    const enviar = async (text) => {
      await bot.sendMessage(from, { text: text }, { quoted: selo });
    };

    const mencionarUsuario = async (text, jids) => {
      await bot.sendMessage(from, { text: text, mentions: jids })
    }

    const reagirMensagem = async (emoji) => {
      const reactionMessage = {
        react: {
          text: emoji,
          key: msgBot.key
        }
      }

      await bot.sendMessage(from, reactionMessage);
    }

    const enviarImagem = async (texto, url, viewOnce = false) => {
      await bot.sendMessage(from, { image: url, caption: texto, viewOnce: viewOnce }, { quoted: selo });
    };

    const enviarAudio = async (url) => {
      await bot.sendMessage(from, { audio: { url: url }, mimetype: 'audio/mp4' }, { url: "Media/audio.mp3" }, { quoted: selo })
    }

    const isImage = message && (msgBot?.message?.imageMessage || msgBot?.message?.extendedTextMessage?.contextInfo?.quotedMessage?.imageMessage);

    const loading = async (key) => {
      for (let i = 0; i < 10; i++) {
        await bot.sendMessage(from, { edit: key, text: `> Carregando... *${i}0%*` });
      }

      await bot.sendMessage(from, { edit: key, text: `> *DOWNLOAD COMPLETO ✅*` });
    };

    const { prefix, nomeDono, nomeBot, numeroDono, numeroBot, nomeDinheiro } = DL.getDataJson(DL.paths.admin);

    const databankUsers = DL.getDataJson(DL.paths.dataBank);

    const isGroup = from.endsWith('@g.us') ? true : false;

    const isQuotedMessage = isGroup && msgBot?.message?.extendedTextMessage?.contextInfo?.quotedMessage ? msgBot?.message?.extendedTextMessage?.contextInfo?.participant : false;
    const isMentionMessage = isGroup && msgBot?.message?.extendedTextMessage?.contextInfo?.mentionedJid.length > 0 ? msgBot?.message?.extendedTextMessage?.contextInfo?.mentionedJid : false;


    const isDono = from === `${numeroDono}@s.whatsapp.net` || participant === `${numeroDono}@s.whatsapp.net` ? true : false;

    try {
      const userInDataBanck = !isGroup ? databankUsers.some(user => user.id === from) : databankUsers.some(user => user.id === participant);

      if (!userInDataBanck) {
        DL.setDataBankUser(!isGroup ? from : participant, pushName)

        await enviar(newUserBank(pushName, nomeDinheiro, nomeBot))
      }


      const isCommand = message.startsWith(prefix);

      const parts = message.split(' ');
      const command = parts[0].replace(prefix, '');
      const args = parts.slice(1).join(' ');

      const AUTH = DL.getDataJson(DL.paths.apis);

      const userOn = new User(DL.getUserOn(!isGroup ? from : participant), DL.getRankUserOn(!isGroup ? from : participant));
      userOn.subirLevel(mencionarUsuario, messageLevelUp(pushName, nomeDinheiro));

      if (!isCommand) return;
      else VerificarComando(bot, command, args, DL, reagirMensagem, enviar, enviarImagem,
         prefix, nomeDono, nomeBot, numeroDono, numeroBot, nomeDinheiro, isDono, isGroup, 
         from, pushName, loading, messagePing, messageNotFound, enviarAudio, menu, messageInfoCoin,
          participant, menuCoin, menuLoja, AUTH, userOn, isQuotedMessage, isMentionMessage);
      
    } catch (error) {
      console.error(`Ocorreu um erro: \n\n${error}`);
    }
  });
}

startBot();
