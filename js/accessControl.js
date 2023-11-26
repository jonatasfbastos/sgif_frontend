(function () {
  const user = localStorage.getItem("user");
  if (!user) {
    localStorage.setItem(
      "warning_message",
      "Por Favor, faça login para acessar a página"
    );
    window.location.href = "../br.com.ifba.login/index.html";
    return;
  }
})();

