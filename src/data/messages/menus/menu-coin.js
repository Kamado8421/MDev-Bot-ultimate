const menuCoin = (prefix, nomeDinheiro, pushName, nomeBot, nomeDono) => {
    return `
> ┏━━━━┉┉┉┅┅------┅┅┉┉┉━━━━┓

*Comandos ${nomeDinheiro}*

> *Usuário:* ${pushName}
> *Algoritmo:* ${nomeBot}
> *Dono:* ${nomeDono}

> ━━━━┉┉┉┅┅--------┅┅┉┉┉━━━━

- ❧ ${prefix}roubar + menção
- ❧ ${prefix}vingança
- ❧ ${prefix}moeda
- ❧ ${prefix}doar + valor + menção
- ❧ ${prefix}comprar + acessório
- ❧ ${prefix}loja
- ❧ ${prefix}ajudamoedas
- ❧ ${prefix}emprestar + valor + menção

> ┗━━━━┉┉┉┅┅------┅┅┉┉┉━━━━┛

> © ${nomeBot} ²⁰²⁴
`
}

module.exports = menuCoin;
