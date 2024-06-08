const messageNotFound = (prefix, nomeBot, command) => {
    return `
*Não encontrado:*
┌╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶
├ *Comando:* ${prefix}${command}
├ *Digite:* ${prefix}menu
└╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶╶

> © ${nomeBot} ²⁰²⁴`
}

module.exports = messageNotFound;