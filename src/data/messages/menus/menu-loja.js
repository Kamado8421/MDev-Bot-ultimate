const menuLoja = (prefix, nomeDinheiro, pushName, nomeBot, nomeDono) => {
    return `
> ┏━━━━┉┉┉┅┅------┅┅┉┉┉━━━━┓

*Menu de Loja*

> *Usuário:* ${pushName}
> *Algoritmo:* ${nomeBot}
> *Dono:* ${nomeDono}

> ━━━━┉┉┉┅┅--------┅┅┉┉┉━━━━

- Você pode usar o comando:
> ${prefix}comprar + item
> (Ex: ${prefix}comprar escudo)

- *Compre esses itens:*

- ❧ escudo  (💵 +50 ${nomeDinheiro}s)
- ❧ fixagpt (💵 +30 ${nomeDinheiro}s)
- ❧ martelo (💵 +80 ${nomeDinheiro}s)
 
> *Ps:* Você só pode comprar 1 item por vez e ter apenas 5 de cada item no seu estoque.

> ┗━━━━┉┉┉┅┅------┅┅┉┉┉━━━━┛

> © ${nomeBot} ²⁰²⁴
`
}

module.exports = menuLoja;
