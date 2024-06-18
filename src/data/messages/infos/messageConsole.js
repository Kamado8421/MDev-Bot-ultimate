const messageConsole = (pushName, command, nomeBot) => {
return '\
\033[1;32m┏━━━━┉┉┉┅┅------┅┅┉┉┉━━━━┓\033[m\n\
\n\
[❧ ] \033[1;33mMensagem Recebida 🤖\033[m\n\
\n\
- ❧ \033[1;33mUsuário:\033[m \033[1;37m' + pushName + '\033[m\n\
- ❧ \033[1;33mComando:\033[m \033[1;37m' + command + '\033[m\n\
\n\
\033[1;32m┗━━━━┉┉┉┅┅------┅┅┉┉┉━━━━┛\033[m\n\
\n\
\033[1;37m> © \033[1;33m' + nomeBot + '\033[1;37m ²⁰²⁴\033[m\n'
}

module.exports = messageConsole;
