class sendMessage {
    constructor(bot, msgBot, from){
        this.bot = bot;
        this.msgBot = msgBot;
        this.from = from;
    }

    async enviar(text){
        const selo = this.msgBot;
        await this.bot.sendMessage(this.from, { text: text }, { quoted: selo });
    }

    async mencionarUsuarios(text, jids){
        await this.bot.sendMessage(this.from, { text: text, mentions: jids })
    }
  
    async reagirMensagem(emoji){
        const reactionMessage = {
          react: {
            text: emoji,
            key: this.msgBot.key
          }
        }
  
        await this.bot.sendMessage(this.from, reactionMessage);
    }
  
    async enviarImagem(texto, url, viewOnce = false){
        await this.bot.sendMessage(this.from, { image: url, caption: texto, viewOnce: viewOnce }, { quoted: selo });
    }
  
    async enviarAudio(url){
        await this.bot.sendMessage(this.from, { audio: { url: url }, mimetype: 'audio/mp4' }, { url: "Media/audio.mp3" }, { quoted: selo })
    }

    async loading(msgFinal){
        for (let i = 0; i < 10; i++) {
          await bot.sendMessage(this.from, { edit: this.msgBot.key, text: `> Carregando... *${i}0%*` });
        }
  
        await bot.sendMessage(this.from, { edit: key, text: `> *${msgFinal}*` });
    }
}

module.exports = sendMessage;

