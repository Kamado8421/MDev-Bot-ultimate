const newUserBank = (pushName, nomeDinheiro, nomeBot) => {
    return `
> ┏━━━━┉┉┉┅┅••••••┅┅┉┉┉━━━━┓

 ❧ [ 🚀 ] *Novo Usuário!!*

> Parabéns, ${pushName}, você acaba de ganhar *500* ${nomeDinheiro}s por ser novo usuário.

❧ • Utilize nosso menu e se diverta com os demais usuário!!

*_Alguns Comandos:_*
> *Obs:* Utilize-os para  ajudá-lo(a) a entender o jogo. Boa sorte!!

- ajuda${nomeDinheiro.toLowerCase()}

> ┗━━━━┉┉┉┅┅••••••┅┅┉┉┉━━━━┛

> © ${nomeBot} *²⁰²⁴*
`
}

module.exports = newUserBank;