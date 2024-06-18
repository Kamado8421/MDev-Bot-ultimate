
class GeminiModel {
  constructor(apikey, prefix, nomeBot) {
    this.apikey = apikey; //AIzaSyAwusis3AYpt6lBFya5_drRNVZUMbgzAQk
    this.prefix = prefix;
    this.nomeBot = nomeBot;
  }

  async fazerRequisicaoIa(msg) {
    const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + this.apikey;
    const data = {
      contents: [{
        parts: [{
          text: `Você é um bot de WhatsApp chamado ${this.nomeBot}. Minha mensagem é: ${msg}`
        }]
      }]


    };

    return await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro na requisição');
        }
        return response.json();
      })
      .then(data => {
        return data; // Retorna os dados da resposta
      })
      .catch(error => {
        console.error('Erro:', error);
        return null;
      });
  }

  async responder(msg) {

    let result = await this.fazerRequisicaoIa(msg)
    let response = result?.candidates[0]?.content?.parts[0]?.text || "Ops!! Acho que meu dono não pagou a conta 😅\n\n> *Obs:* Para que esse comando funcione, meu dono precisa me fornecer uma chave de autenticação da *API do Gemini*\n\n- *Para Resolver:*\n\n> Falar com meu dono para atualizar o token auth da API."
    return response;
  }


}


class APIRequests {
  constructor() {
    this.initial_url = 'http://127.0.0.1:8000/server';
    this.routes = {
      gets: {
        user: `${this.initial_url}/get/user/`,
        verifyUser: `${this.initial_url}/get/verify-user/`,
        config: `${this.initial_url}/get/config/`,
        apikey: `${this.initial_url}/get/apikey/`,
        listBan: `${this.initial_url}/get/user/ban/`,
        listPremium: `${this.initial_url}/get/user/premium/`,
      },
      posts: {
        createUser: `${this.initial_url}/post/create-user/`,
        editAttributeUser: `${this.initial_url}/post/editUserAttribute/`,
        editPremiumUser: `${this.initial_url}/post/editUserIsPremium/`,
      },
      tests: {
        testAPI: `${this.initial_url}/test-api/`,
      },
    };
  }

  async getRequest(url, params) {
    let result;

    try {
      const response = await fetch(`${url}?${params}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      result = await response.json();
    } catch (error) {
      console.error('Error making GET request:', error);
      result = null;
    }

    return result;
  }

  async postRequest(url, data) {
    let result;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      result = await response.json();
    } catch (error) {
      console.error('Error making POST request:', error);
      result = null;
    }

    return result;
  }
}



module.exports = {
  GeminiModel,
  APIRequests
};