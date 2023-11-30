let globalLinkId = 0;

const endpoints = {
    getAllLinks: "listarLinks",
    getPermissionsById: "listarLinksPermissao/",
    updatePermissionLink: "permissoesLinks/permissoesLink",
    savePermission: "permissoesLinks/permissoesLink",
    deletePermissionLinkId: "permissoesLinks/permissoesLink/"
};


function exibirEfeitoBackGround() {
    const efeitoBackground = document.getElementById("background-efeito");
    efeitoBackground.classList.add("mostrar-efeito");
}

function ocultarEfeitoBackGround() {
    const efeitoBackground = document.getElementById("background-efeito");
    efeitoBackground.classList.remove("mostrar-efeito");
}

document.getElementById("btn-erro-fechar")
    .addEventListener("click", ocultarPopUpErro);

function exibirPopUpErro(mensagem) {
    const popupErro = document.getElementById("popup-erro");
    popupErro.classList.add("mostrar-popup");
    document.getElementById("erro-mensagem").innerText = mensagem;
}

function ocultarPopUpErro() {
    const popupErro = document.getElementById("popup-erro");
    popupErro.classList.remove("mostrar-popup");
    document.getElementById("erro-mensagem").innerText = "";
}

document.getElementById("btn-adicionar")
    .addEventListener("click", exibirPopUpAdicionar);

function exibirPopUpAdicionar() {
    const popupAdicionar = document.getElementById("popup-adicionar");
    popupAdicionar.classList.add("mostrar-popup");

    exibirEfeitoBackGround();
}

document.getElementById("btn-add-cancelar")
    .addEventListener("click", ocultarPopUpAdicionar);

function ocultarPopUpAdicionar() {
    const popupAdicionar = document.getElementById("popup-adicionar");
    popupAdicionar.classList.remove("mostrar-popup");

    ocultarEfeitoBackGround();
}

document.getElementById("btn-add-confirmar")
    .addEventListener("click", () => {
        const nome = document.getElementById("link-nome-add").value;
        const url = document.getElementById("link-url-add").value;

        if (nome.trim().length <= 0 || url.trim().length <= 0) {
            return exibirPopUpErro("Não foi possível salvar a permissão, há campo vazio.");
        }

        const link = {
            nome: nome,
            url: url
        }
        
        post(endpoints.savePermission, link)
        .then(data => {
            atualizarTabela();
        })
        .catch(erro => {
            erro.text()
            .then(mensagem => exibirPopUpErro(mensagem)); 
        });

        ocultarPopUpAdicionar();
        document.getElementById("link-nome-add").value = "";
        document.getElementById("link-url-add").value = "";
    }
);

document.getElementById("btn-remover-cancelar")
    .addEventListener("click", ocultarPopUpRemover);

function ocultarPopUpRemover() {
    const popupRemover = document.getElementById("popup-remover");
    popupRemover.classList.remove("mostrar-popup");

    ocultarEfeitoBackGround();
}

function removerLink(linkId) {
    globalLinkId = linkId;
    const popupRemover = document.getElementById("popup-remover");
    popupRemover.classList.add("mostrar-popup");

    exibirEfeitoBackGround();
}

document.getElementById("btn-remover-confirmar")
    .addEventListener("click", () => {
        fetchDelete(endpoints.deletePermissionLinkId + globalLinkId)
        .then(data => {
            atualizarTabela();
        })
        .catch(erro => {
            erro.text()
            .then(mensagem => exibirPopUpErro(mensagem)); 
        });

        ocultarPopUpRemover();
    }
);

document.getElementById("btn-editar-cancelar")
    .addEventListener("click", ocultarPopUpEditar);

function ocultarPopUpEditar() {
    const popupEditar = document.getElementById("popup-editar");
    popupEditar.classList.remove("mostrar-popup");

    ocultarEfeitoBackGround();
}

function exibirPopUpEditar() {
    const popupEditar = document.getElementById("popup-editar");
    popupEditar.classList.add("mostrar-popup");

    exibirEfeitoBackGround();
}

function editarLink({id, nome, url}) {
    globalLinkId = id;

    exibirPopUpEditar();

    document.getElementById("link-nome-editar").value = nome;
    document.getElementById("link-url-editar").value = url;
}

document.getElementById("btn-editar-confirmar")
    .addEventListener("click", () => {
        const nome = document.getElementById("link-nome-editar").value;
        const url = document.getElementById("link-url-editar").value;

        if (nome.trim().length <= 0 || url.trim().length <= 0) {
            return exibirPopUpErro("Não foi possível atualizar o link, há campo vazio.");
        }

        const link = {
            id: globalLinkId,
            nome: nome,
            url: url
        }

        put(endpoints.updatePermissionLink, link)
        .then(data => {
            atualizarTabela();
        })
        .catch(erro => {
            erro.text()
            .then(mensagem => exibirPopUpErro(mensagem)); 
        });

        ocultarPopUpEditar();
        document.getElementById("link-nome-editar").value = "";
        document.getElementById("link-url-editar").value = "";
    }
);

const inputBuscar = document.getElementById("input-buscar");
inputBuscar.addEventListener("keyup", () => {
    const busca = inputBuscar.value.toLowerCase();
    const corpoTabela = document.getElementById('table-body-links');
    const linhas = corpoTabela.getElementsByTagName("tr");

    for(let i = 0; i < linhas.length; i++) {
        const colunaTexto = linhas[i].getElementsByTagName("td")[0].innerText;
        if (colunaTexto.toLowerCase().includes(busca)) {
            linhas[i].style.display = "";
        } else {
            linhas[i].style.display = "none";
        }
    }
});

document.getElementById("btn-fechar-view").addEventListener("click", () => {
    document.getElementById("table-permissoes").style.display = "none";
});

function visualizarPermissoes(link) {
    document.getElementById("table-permissoes").style.display = "block";
    get(endpoints.getPermissionsById + link.id)
    .then(data => preencherTabelaPermissoes(link, data))
    .catch(erro => {
        erro.text()
        .then(mensagem => exibirPopUpErro(mensagem)); 
    });
}

function preencherTabelaPermissoes(link, permissoes) {
    document.getElementById("titulo-tb-permissoes").innerText = `Permissões associadas com ${link.nome}`;

    const corpoTabela = document.getElementById('table-body-permissoes');
    corpoTabela.innerHTML = '';

    permissoes.forEach(permissao => {
        const linha = document.createElement("tr");
        const colPermissao = document.createElement("td");
        colPermissao.appendChild(document.createTextNode(permissao.nome));
        linha.append(colPermissao);
        corpoTabela.appendChild(linha);
    });
}

function obterColunasTabela() {
    let colNome = document.createElement("td");
    let colUrl = document.createElement("td");
    let colRemover = document.createElement("td");
    let colEditar = document.createElement("td");
    let colView = document.createElement("td");
    return [colNome, colUrl, colRemover, colEditar, colView];
}

function obterImagens() {
    let imgRemover = document.createElement("img");
    imgRemover.setAttribute("src", "../images/excluir2.png");
    let imgEditar = document.createElement("img");
    imgEditar.setAttribute("src", "../images/botao-editar2.png");
    let imgView = document.createElement("img");
    imgView.setAttribute("src", "../images/botao_ver.png");
    return [imgRemover, imgEditar, imgView];
}

function preencherTabelaLinks(links) {
    const corpoTabela = document.getElementById('table-body-links');
    corpoTabela.innerHTML = '';

    links.forEach(link => {
        const linha = document.createElement("tr");
        const [colNome, colUrl, colRemover, colEditar, colView] = obterColunasTabela();
        const [imgRemover, imgEditar, imgView] = obterImagens();

        colNome.appendChild(document.createTextNode(link.nome));
        colUrl.appendChild(document.createTextNode(link.url));
        
        colView.setAttribute("onclick", "visualizarPermissoes(" + JSON.stringify(link) + ")");
        colView.appendChild(imgView);

        colRemover.setAttribute("onclick", "removerLink("+ link.id + ")");
        colRemover.appendChild(imgRemover);

        colEditar.setAttribute("onclick", "editarLink(" + JSON.stringify(link) + ")");
        colEditar.appendChild(imgEditar);

        linha.append(colNome, colUrl, colView, colRemover, colEditar);
        corpoTabela.appendChild(linha);
    });
}

function atualizarTabela() {
    get(endpoints.getAllLinks)
    .then(data => preencherTabelaLinks(data))
    .catch(erro => {
        erro.text()
        .then(mensagem => exibirPopUpErro(mensagem)); 
    });
}

atualizarTabela();