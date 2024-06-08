const menu = (prefix, pushName, nomeBot, nomeDono, nomeDinheiro) => {
    return `
> ┏━━━━┉┉┉┅┅------┅┅┉┉┉━━━━┓

                  *Menu de Comandos*

> *Usuário:* ${pushName}
> *Algoritmo:* ${nomeBot}
> *Dono:* ${nomeDono}

> ━━━━┉┉┉┅┅--------┅┅┉┉┉━━━━

                   *Comando Diversos*

- ❧ ${prefix}ping
- ❧ ${prefix}moeda(s)
- ❧ ${prefix}menudono
- ❧ ${prefix}menuadm
- ❧ ${prefix}ajudamoedas
- ❧ ${prefix}${nomeDinheiro.toLowerCase()}
- ❧ ${prefix}menu${nomeDinheiro.toLowerCase()} ou
- ❧ ${prefix}menumoeda

> ━━━━┉┉┉┅┅--------┅┅┉┉┉━━━━

                   *Comando com APIs*

- ❧ ${prefix}gpt + pergunta         
- ❧ ${prefix}gemini + pergunta        

> ┗━━━━┉┉┉┅┅------┅┅┉┉┉━━━━┛

> © ${nomeBot} ²⁰²⁴`
}

module.exports = menu;
