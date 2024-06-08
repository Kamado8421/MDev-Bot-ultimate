const {
    default: makeWASocket,
    DisconnectReason,
    useMultiFileAuthState,
    downloadContentFromMessage,
} = require('@whiskeysockets/baileys');


async function Connect(){
    const { state, saveCreds } = await useMultiFileAuthState('./assets/json');

    const bot = await makeWASocket({
        auth: state,
        printQRInTerminal: true,
        defaultQueryTimeoutMs: undefined,
    });

    bot.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === 'close') {
            const shouldReconnect = (lastDisconnect.error)?.output?.statusCode !== DisconnectReason.loggedOut;
            console.log('connection closed due to ', lastDisconnect.error, ', reconnecting ', shouldReconnect);

            if (shouldReconnect) {
                Connect();
            }
        } else if (connection === 'open') {
            console.log('opened connection');
        }
    });

    bot.ev.on('creds.update', saveCreds);

    return bot;
}


module.exports = Connect;

