const messagePing = (prefix, pushName, nomeBot) => {
    return `
> ┏━━━━┉┉┉┅┅------┅┅┉┉┉━━━━┓

- ❧ *Ping  🤖🏓*

- ❧ *Usuário:* ${pushName}
- ❧ *${nomeBot} On ⚡*

> *Acesse o Menu:* ${prefix}menu

> ┗━━━━┉┉┉┅┅------┅┅┉┉┉━━━━┛

> © ${nomeBot} ²⁰²⁴`
}

module.exports = messagePing;