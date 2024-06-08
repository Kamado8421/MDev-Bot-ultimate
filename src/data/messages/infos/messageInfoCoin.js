const messageInfoCoin = (prefix, pushName, nomeBot, nomeDono, nomeDinheiro, bank, rank) => {
    return `
> ┏━━━━┉┉┉┅┅------┅┅┉┉┉━━━━┓

                  *Informações Básicas*

> *Usuário:* ${pushName}
> *Algoritmo:* ${nomeBot}
> *Dono:* ${nomeDono}

> ━━━━┉┉┉┅┅--------┅┅┉┉┉━━━━

                  *🪙 ${nomeDinheiro} 🪙*

> *Obs:* para entender um pouco do game, utilize o comando abaixo:
- ❧ ${prefix}ajudamoedas

- *Seu Saldo:* *🪙${bank.saldo}* ${nomeDinheiro}(s)
- *Seu Level:* ${bank.level}

- *XP:*  +${bank.level}
- *Rank:*  ${rank.rankname} ✓

- *Débito:* ~🪙${bank.debito} ${nomeDinheiro}(s)~

> ━━━━┉┉┉┅┅--------┅┅┉┉┉━━━━

> Você pode exibir o meunu de comandos da *${nomeDinheiro}*, basta enviar para o bot o comando abaixo:
- ${prefix}menu${nomeDinheiro}

- *Comandos Semelhantes a esse:*
> (Para obter esse mesmo menu)

1. ❧ ${prefix}${nomeDinheiro}
2. ❧ ${prefix}saldo
3. ❧ ${prefix}extrato
4. ❧ ${prefix}moedas
5. ❧ ${prefix}coins
6. ❧ ${prefix}xp

> ┗━━━━┉┉┉┅┅------┅┅┉┉┉━━━━┛

> © ${nomeBot} ²⁰²⁴`
}

module.exports = messageInfoCoin;
