const usuario = document.getElementById("usuario").value;
const senha = document.getElementById("senha").value;
const buttonLogin = document.getElementById("botao-login");

const user = {
  login: usuario,
  senha: senha,
};

function parseJwt(token) {
  const tokenResult = token.Authorization.split(" ")[1]; // Obtém apenas o token, ignorando 'Bearer'
  console.log(tokenResult);

  const base64Url = tokenResult.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

buttonLogin.addEventListener("click", (e) => {
  e.preventDefault();

  post("login", user)
    .then((token) => {
      if (!token) return;

      // Salvar o token para próximas requisições
      setToken(token);

      console.log(token);

      const decodedToken = parseJwt(token);
      console.log(decodedToken);

      // Salvar o usuário
      setUser(decodedToken);

      window.location.replace(
        "../br.com.ifba.homescreensad/homescreensad.html"
      );
    })
    .catch((erro) => {
      console.log(erro);
      showMessage({
        type: "warning",
        message: "Verifique o login e a senha e tente novamente",
      });
    });
});
