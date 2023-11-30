const HOST = "http://localhost:8080/";
const API = "apif/v1/";

addErrorOnStart();

async function get(endpoint) {
  loadingStart();
  try {
    // para teste: Quando o back-end estiver funcionando remover
    const isLocale = endpoint.includes("../assets");
    url = isLocale ? endpoint : HOST + API + endpoint;

    const fetched = await fetch(url);

    if (fetched.ok) {
      const result = await fetched.json();
      loadingEnd();
      return result;
    }

    throw fetched;
  } catch (error) {
    loadingEnd();
    // showMessage({message:error.type + ' - ' + error.status, type:'error'})
    throw error;
  }
}

async function fetchDelete(endpoint) {
  loadingStart();
  try {
    const fetched = await fetch(HOST + API + endpoint, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    });

    if (fetched.ok) {
      const result = await fetched.text();
      return result;
    }

    throw fetched;
  } catch (error) {
    throw error;
  } finally {
    loadingEnd();
  }
}

async function put(endpoint, body) {
  loadingStart();
  try {
    const fetched = await fetch(HOST + API + endpoint, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(body),
    });

    if (fetched.ok) {
      const result = await fetched.json();
      return result;
    }

    throw fetched;
  } catch (error) {
    throw error;
  } finally {
    loadingEnd();
  }
}

async function get_no_load(endpoint) {
  try {
    const fetched = await fetch(HOST + API + endpoint, {
      method: "GET",
      headers: { "Content-type": "application/json" },
    });

    if (fetched.ok) {
      const result = await fetched.json();
      return result;
    }
    throw fetched;
  } catch (error) {
    // showMessage({message:error.type + ' - ' + error.status, type:'error'})
    throw error;
  }
}

async function get_params_no_load(endpoint, paramsMap) {
  let params = Object.entries(paramsMap).map((a) => a.join("="));
  try {
    let url = HOST + API + endpoint + "?" + params.join("&");
    const fetched = await fetch(url, {
      method: "GET",
      headers: { "Content-type": "application/json" },
    });
    console.log("fecthed ", fetched);

    if (fetched.ok) {
      const result = await fetched.json();
      return result;
    }
    throw fetched;
  } catch (error) {
    console.log("Erro", error);
    // showMessage({message:error.type + ' - ' + error.status, type:'error'})
    throw error;
  }
}

async function get_params(endpoint, paramsMap) {
  loadingStart();
  let params = Object.entries(paramsMap).map((a) => a.join("="));
  try {
    let url = "";

    // Rota para login diferete da padrão
    if (endpoint === "login") url = HOST + endpoint + "?" + params.join("&");
    else url = HOST + API + endpoint + "?" + params.join("&");
    console.log(url);
    console.log("ois");

    const fetched = await fetch(url, {
      method: "GET",
      headers: { "Content-type": "application/json" },
    });
    console.log("fecthed ", fetched);

    if (fetched.ok) {
      const result = await fetched.json();
      loadingEnd();
      return result;
    }
    throw fetched;
  } catch (error) {
    loadingEnd();
    console.log("Erro", error);
    // showMessage({message:error.type + ' - ' + error.status, type:'error'})
    throw error;
  }
}

async function post(endpoint, body) {
  loadingStart();
  try {
    let jwt;

    const urlPost =
      endpoint === "login" ? HOST + endpoint : HOST + API + endpoint;

    console.log(urlPost);
    console.log(body);
    const fetched = await fetch(urlPost, {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify(body),
    });

    if (fetched.ok) {
      const result = await fetched.json();
      loadingEnd();
      return result;
    }
    throw fetched;
  } catch (error) {
    loadingEnd();
    // showMessage({message:error.type + ' - ' + error.status, type:'error'})
    throw error;
  }
}

const body = document.body;

function loadingStart() {
  var loadingDiv = document.createElement("div");
  loadingDiv.id = "loading-default-div";
  loadingDiv.style.zIndex = 100;
  loadingDiv.style.backgroundColor = "rgba(255, 255, 255, 0.4)";
  loadingDiv.style.width = "100%";
  loadingDiv.style.height = "100%";
  loadingDiv.style.position = "absolute";
  loadingDiv.style.top = 0;
  loadingDiv.style.display = "flex";
  loadingDiv.style.justifyContent = "center";

  var loadingImage = document.createElement("img");

  loadingImage.src =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAYAAADFeBvrAAAABmJLR0QA/wD/AP+gvaeTAAACpklEQVRoge2ZO2sVQRiG39FEIl6iJlqkiFbKaYI/IDmKEm+gIRa2QfEX2Ai2XjpNHTsbq8RCULEwRjQpoo2CaWxELAQFQU910DwWO0fXda/uTPaI+8CBc9n53u898zE7345UU1NTBuNbABiTdMx+fGCMeeZb0xvANWCVX6wCV6vO668AxiJmwqaavnTX+Qos6bjiS9pIOu1L1KchPMZeezJKbixj7BBwysbY6DPJUWAWmAcuAD0Z11+JWRQuZ4y5BLRDY94A+9060U8z3yL/9kyOcU1g2r6yZmYyZkY7pvrcuQnE5hLKp9+hxmyCIYDRPDGKLArbYr4zkpwZkrQ95bcdeQIUMXQv5rtXxph3BWJkkbSLaEt67lBHAnqAGeC7LYGXQMOxxmZgJabcLrrUiYpuBYY9xt9EsDouAveBCV9aNTU1/wHeO1ZXULbztfedI/aVugn1DWU7X2vmSSjAQlWmKNj5Jm19DksKX3xA0iEfCeegUOfrs2N1RfnO15bcQmh6H3dpyaX2V9FAnUVhvAsWhdyd77+0bDclTdqPd4wxT6vMp6amZg0BeoEGMFR1LqUBpoBPoSV6GRjxKdgP7PYUeyrmBgrwARj0IXgUaFmRm45j90ZmJsq0S72O6HxExNnTH2BfihmApTxxim5p3ofetyR9TkmwT9J5SSckDUh6K+m2pLvGmLgNZytD+2uxVHMA7AJuAY+A8ZTrhol/YAjB8+sNCeOWU2borHNDeQDWAy8yyud6wtgRggUgyhxQzb4TmMgwA8H5z0DC+EGCo5cl4CFwrjIzNqEbOQwBnPSh76NjzXuE6OWo0YehlZzXvfag7R5gJ/Alo9wWq86zEMAZ/jyP7fAR2Ft1joUBDvL7faVNsPzuqTq3UtgSbABbqs6lphv4AT/8SFjNRIBZAAAAAElFTkSuQmCC";

  loadingImage.style.width = "60px";
  loadingImage.style.height = "60px";
  loadingImage.style.margin = "auto";
  loadingImage.style.animation = "rotation 2s infinite linear";

  const keyFrames = document.createElement("style");
  keyFrames.innerHTML = `
    @keyframes rotation {
        from {
        transform: rotate(0deg);
        }
        to {
        transform: rotate(360deg);
        }
    }`;

  loadingDiv.appendChild(loadingImage);
  body.appendChild(loadingDiv);
  body.appendChild(keyFrames);
}

function loadingEnd() {
  document.getElementById("loading-default-div").remove();
}

function showMessage(params) {
  let src = "images/icons8-ok-48.png";

  let back = "green";

  if (params.type == "error") {
    src = "images/icons8-blocked-48.png";

    back = "red";
  } else if (params.type == "warning") {
    src = "images/icons8-warning-48.png";
    back = "orange";
  }

  let img =
    '<img style="width:40px;height:40px;margin-right:10px" src="' + src + '">';

  let errorElementHTML =
    '<div id="error-message"><div>' +
    img +
    '<p style="align-self: center;">' +
    params.message +
    "</p><div></div>";
  console.log("body", document.body);
  document.body.innerHTML += errorElementHTML;

  var errorElement = document.getElementById("error-message");
  errorElement.style.position = "absolute";
  errorElement.style.top = "30px";
  errorElement.style.width = "100%";
  errorElement.style.alignContent = "center";

  errorElement.firstChild.style.backgroundColor = back;
  errorElement.firstChild.style.display = "flex";
  errorElement.firstChild.style.color = "white";
  errorElement.firstChild.style.color = "white";
  errorElement.firstChild.style.minHeight = "50px";
  errorElement.firstChild.style.width = "40%";
  errorElement.firstChild.style.borderRadius = "10px";
  errorElement.firstChild.style.padding = "10px";
  errorElement.firstChild.style.textAlign = "center";
  errorElement.firstChild.style.verticalAlign = "middle";
  errorElement.firstChild.style.marginLeft = "auto";
  errorElement.firstChild.style.marginRight = "auto";
  //

  wait(2500).then((res) => {
    fade(errorElement);

    wait(500).then((res) => {
      errorElement.remove();
    });
  });
}

function fade(element) {
  var op = 1; // initial opacity
  var timer = setInterval(function () {
    if (op <= 0.1) {
      clearInterval(timer);
      element.style.display = "none";
    }
    element.style.opacity = op;
    element.style.filter = "alpha(opacity=" + op * 100 + ")";
    op -= op * 0.1;
  }, 50);
}

function wait(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

function addErrorOnStart() {
  if (localStorage.getItem("warning_message")) {
    showMessage({
      message: localStorage.getItem("warning_message"),
      type: "warning",
    });
    localStorage.removeItem("warning_message");
  }
}
