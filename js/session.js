
function setUser(user) {
  localStorage.setItem("logged_user", JSON.stringify(user));
}

function setToken(token) {
  localStorage.setItem("token", JSON.stringify(token));
}

function getToken() {
  return JSON.parse(localStorage.getItem("token"));
}

function getUser() {
  return JSON.parse(localStorage.getItem("logged_user"));
}

function logOut() {
  ["logged_user", "token"].forEach((element) => {
    localStorage.removeItem(element);
  });

  window.location.href = "./index.html";
}
