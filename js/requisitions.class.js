const HOST = "http://localhost:8080/";
const API = "apif/v1/";
const URL = HOST + API;

export const Requisitions = {
  async get(endpoint) {
    try {
      const response = await fetch(URL + endpoint, {
        headers: {
          "Cache-Control": "no-cache",
          "Content-type": "application/json",
        },
      });
      return response.json();
    } catch (error) {
      console.error("Erro na requisição GET fo :", error);
      throw error;
    }
  },
  async delete(endpoint) {
    try {
      const response = await fetch(URL + endpoint, {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
        method: "delete",
      });
      return response.json();
    } catch (error) {
      console.error("Erro na requisição DELETE:", error);
      throw error;
    }
  },
  async update(endpoint, data) {
    try {
      const response = await fetch(URL + endpoint, {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
        method: "put",
        body: JSON.stringify(data),
      });
      return response.json();
    } catch (error) {
      console.error("Erro na requisição UPDATE:", error);
      throw error;
    }
  },
  async save(endpoint, data) {
    try {
      const response = await fetch(URL + endpoint, {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
        method: "post",
        body: JSON.stringify(data),
      });
      return response.json();
    } catch (error) {
      console.error("Erro na requisição SAVE:", error);
      throw error;
    }
  },
};
