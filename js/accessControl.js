(function () {
  const token = localStorage.getItem("token");
  if (!token) {
    localStorage.setItem(
      "warning_message",
      "Por Favor, faça login para acessar a página"
    );
    window.location.href = "../br.com.ifba.login/index.html";
    return;
  }
})();

