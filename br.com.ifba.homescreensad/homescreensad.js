let sidebar = document.querySelector(".sidebar");
let sidebarBtn = document.querySelector(".bx-menu");

sidebarBtn.addEventListener("click", ()=>{
  sidebar.classList.toggle("close");
});

function criarGrupo(permissao) {
  const grupo = document.createElement("li");
  
  const headerGrupo = document.createElement("div");
  headerGrupo.classList.add("iocn-link");

  const icone = document.createElement("i");
  icone.classList.add("bx", "bxs-chevron-down", "arrow");
  icone.addEventListener("click", (event) => {
    let arrowParent = event.target.parentElement.parentElement;
    arrowParent.classList.toggle("showMenu");
  });

  headerGrupo.innerHTML = `<a href="#">
                            <i class='bx ${permissao.icone}'></i>
                            <span class="link_name">${permissao.nome}</span>
                          </a>`;
  headerGrupo.appendChild(icone);

  const subMenu = document.createElement("ul");
  subMenu.classList.add("sub-menu");

  subMenu.innerHTML = `
                        <a class="link_name" href="#">${permissao.nome}</a>
                      `;

  permissao.links.forEach(link => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    
    a.href = "../" + link.url;
    a.innerText = link.nome;
    li.appendChild(a);
    subMenu.appendChild(li);
  });

  grupo.append(headerGrupo, subMenu);

  return grupo;
}

function preencherMenu(permissoes) {
  let navLinks = document.querySelector(".nav-links");

  permissoes.forEach(permissao => {
    if (permissao.grupo) {
      navLinks.appendChild(criarGrupo(permissao));
    } else {
      permissao.links.forEach(link => {
        const li = document.createElement("li");

        li.innerHTML = `
            <li>
              <a href="../${link.url}">
                <i class='bx ${permissao.icone}'></i>
                <span class="link_name">${link.nome}</span>
              </a>
              <ul class="sub-menu blank">
                <li><a class="link_name" href="../${link.url}">${link.nome}</a></li>
              </ul>
          </li>
        `;
        navLinks.appendChild(li);
      });
    }
  });

}

function setDados() {
  let usuario = JSON.parse(localStorage.getItem("logged_user"));

  /*
    O IDEAL DEVE SER ALGO ASSIM, PORQUE PODE ACONTECER DE AS PERMISSÕES FICAREM DESATUALIZADAS.

    get("perfilUsuarioUsuarioId/" + usuario.id)
    .then(perfilUsuario => {
      document.querySelector(".profile_name").innerText = usuario.login;
      document.querySelector(".job").innerText = perfilUsuario.nome;

      preencherMenu(perfilUsuario.permissoes);
    })
    .catch(erro => console.log(erro)); 
  */

  document.querySelector(".profile_name").innerText = usuario.login;
  document.querySelector(".job").innerText = usuario.perfilUsuario.nome;

  preencherMenu(usuario.perfilUsuario.permissoes);
}

setDados();