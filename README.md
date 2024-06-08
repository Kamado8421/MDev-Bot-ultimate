# MDev Bot de WhtasApp

Bot de WhatsApp feito por mim, Luciano Mendes, como Node.js, utilizando a API de Web Sockets Baileys v6.

## Check List de Instalação

Para a instalação do bot no termux ou Desktop Linux é necessário seguir algumas etapas IMPORTANTES do checklist abaixo.

* [ ]  Atualizar pacotes da máquina
* [ ]  Instalar o Git
* [ ]  Instalar Nodejs e NPM
* [ ]  Clonar este repositório para sua máquina local
* [ ]  Atualizar e baixar bibliotecas com npm. (OBS: node_modules inclusa no repositório para usuários do Termux)

### Instalação do Bot

Obs: para os comandos a seguir você precisa está em uma máquina Linux ou Termux. Se Windows, pesquise como dar comandos semelhante a esses no PowerShell. 👍

* **Atualizar pacotes da máquina**:

```bash
apt upgrade -y
apt update -y
```

- Instalar o Git

```bash
apt install git -y
```

- Instalar Nodejs e NPM

```bash
apt install nodejs -y && apt install nodejs-lts -y
```

- Clonar este repositório para sua máquina local

```bash
git clone https://github.com/Kamado8421/MDev-bot.git
```

- Atualizar e baixar bibliotecas com npm

```bash
npm install
```

- Iniciar

```bash
npm start
```

ou

```bash
node ./src/index.js
```
