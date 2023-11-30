let globalPermissaoId = 0;

const endpoints = {
    getAllPermissions: "permissoes",
    getPermissionsById: "permissoes/",
    getPermissionsByLinkId: "permissoes/permissao/link/",
    getAllLinks: "listarLinks",
    updatePermission: "permissoes/permissao",
    savePermission: "permissoes/permissao",
    deletePermissionById: "permissoes/permissao/"
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

function getLinksSelecionados(inputContainer) {
    const links = [];
    const inputs = inputContainer.getElementsByTagName("input");

    for (const input of inputs) {
        if (input.checked) {
            const link = {
                id: input.value
            }
            links.push(link);
        }
    }
    return links;
}

document.getElementById("btn-add-confirmar")
    .addEventListener("click", () => {
        const nome = document.getElementById("permissao-nome-add").value;
        const icone = document.getElementById("permissao-icone-add").value;
        let isGrupo = false;

        if (document.getElementById("permissao-grupo-add").checked) {
            isGrupo = true;
        } 

        if (nome.trim().length <= 0) {
            return exibirPopUpErro("Não foi possível atualizar o permissao, há campo vazio.");
        }

        const links = getLinksSelecionados(document.getElementById("links-add"));

        const permissao = {
            nome: nome,
            icone: icone,
            grupo: isGrupo,
            links: links
        }
        
        post("salvarPermissao", permissao)
        .then(data => {
            atualizarTabela();
        })
        .catch(erro => {
            erro.text()
            .then(mensagem => exibirPopUpErro(mensagem)); 
        });

        ocultarPopUpAdicionar();
        document.getElementById("permissao-nome-add").value = "";
        document.getElementById("permissao-icone-add").value = "";
        document.getElementById("permissao-grupo-add").checked = false;

        const inputs = document.getElementById("links-add")
                            .getElementsByTagName("input");
        for (const input of inputs) {
            input.checked = false;
        }
    }
);

document.getElementById("btn-remover-cancelar")
    .addEventListener("click", ocultarPopUpRemover);

function ocultarPopUpRemover() {
    const popupRemover = document.getElementById("popup-remover");
    popupRemover.classList.remove("mostrar-popup");

    ocultarEfeitoBackGround();
}

function removerPermissao(permissaoId) {
    globalPermissaoId = permissaoId;
    const popupRemover = document.getElementById("popup-remover");
    popupRemover.classList.add("mostrar-popup");

    exibirEfeitoBackGround();
}

document.getElementById("btn-remover-confirmar")
    .addEventListener("click", () => {
        fetchDelete(endpoints.deletePermissionById + globalPermissaoId)
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

function editarPermissao({id, nome, icone, grupo, links}) {
    globalPermissaoId = id;

    exibirPopUpEditar();

    document.getElementById("permissao-nome-editar").value = nome;
    document.getElementById("permissao-icone-editar").value = icone;
    document.getElementById("permissao-grupo-editar").checked = grupo;

    const inputs = document.getElementById("links-editar")
                            .getElementsByTagName("input");

    for (const input of inputs) {
        if (links.some(link => link.id == input.value)) {
            input.checked = true;
        } else {
            input.checked = false;
        }
    }
}

document.getElementById("btn-editar-confirmar")
    .addEventListener("click", () => {
        const nome = document.getElementById("permissao-nome-editar").value;
        const icone = document.getElementById("permissao-icone-editar").value;
        let isGrupo = false;

        if (document.getElementById("permissao-grupo-editar").checked) {
            isGrupo = true;
        }

        if (nome.trim().length <= 0) {
            return exibirPopUpErro("Não foi possível atualizar o permissao, há campo vazio.");
        }

        const links = getLinksSelecionados(document.getElementById("links-editar"));

        const permissao = {
            id: globalPermissaoId,
            nome: nome,
            icone: icone,
            grupo: isGrupo,
            links: links
        }

        put(endpoints.updatePermission, permissao)
        .then(data => {
            atualizarTabela();
        })
        .catch(erro => {
            erro.text()
            .then(mensagem => exibirPopUpErro(mensagem)); 
        });

        ocultarPopUpEditar();

        document.getElementById("permissao-nome-editar").value = "";
        document.getElementById("permissao-icone-editar").value = "";
        document.getElementById("permissao-grupo-editar").checked = false;
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

document.getElementById("btn-fechar-view-links").addEventListener("click", () => {
    document.getElementById("table-links").style.display = "none";
});

function visualizarLinks(permissao) {
    document.getElementById("titulo-tb-links").innerText = `Links associados com ${permissao.nome}`;
    document.getElementById("table-links").style.display = "block";

    get(endpoints.getAllPermissions + permissao.id)
    .then(data => preencherTabelaLinks(data))
    .catch(erro => {
        erro.text()
        .then(mensagem => exibirPopUpErro(mensagem)); 
    });
}

function preencherTabelaLinks(links) {
    const corpoTabela = document.getElementById('table-body-links');
    corpoTabela.innerHTML = '';

    links.forEach(link => {
        const linha = document.createElement("tr");
        let colNome = document.createElement("td");
        colNome.appendChild(document.createTextNode(link.nome));
        linha.append(colNome);
        corpoTabela.appendChild(linha);
    });
}

document.getElementById("btn-fechar-view-perfis").addEventListener("click", () => {
    document.getElementById("table-perfis").style.display = "none";
});

function visualizarPerfis(permissao) {
    document.getElementById("titulo-tb-perfis").innerText = `Perfis associados com ${permissao.nome}`;
    document.getElementById("table-perfis").style.display = "block";

    get(endpoints.getPermissionsById + permissao.id)
    .then(data => preencherTabelaPerfis(data))
    .catch(erro => {
        erro.text()
        .then(mensagem => exibirPopUpErro(mensagem)); 
    }); 
}

function preencherTabelaPerfis(perfis) {
    const corpoTabela = document.getElementById('table-body-perfis');
    corpoTabela.innerHTML = '';

    perfis.forEach(perfil => {
        const linha = document.createElement("tr");
        let colNome = document.createElement("td");
        colNome.appendChild(document.createTextNode(perfil.nome));
        linha.append(colNome);
        corpoTabela.appendChild(linha);
    });
}

function obterColunasTabela() {
    let colNome = document.createElement("td");
    let colIcone = document.createElement("td");
    let colRemover = document.createElement("td");
    let colEditar = document.createElement("td");
    let colViewPerfis = document.createElement("td");
    let colViewLinks = document.createElement("td");
    return [colNome, colIcone, colRemover, colEditar, colViewPerfis, colViewLinks];
}

function obterImagens() {
    let imgRemover = document.createElement("img");
    imgRemover.setAttribute("src", "../images/excluir2.png");
    let imgEditar = document.createElement("img");
    imgEditar.setAttribute("src", "../images/botao-editar2.png");
    let imgView1 = document.createElement("img");
    imgView1.setAttribute("src", "../images/botao_ver.png");
    let imgView2 = document.createElement("img");
    imgView2.setAttribute("src", "../images/botao_ver.png");
    return [imgRemover, imgEditar, imgView1, imgView2];
}

function preencherTabelaPermissoes(permissoes) {
    const corpoTabela = document.getElementById('table-body-permissoes');
    corpoTabela.innerHTML = '';

    permissoes.forEach(permissao => {
        const linha = document.createElement("tr");
        const [colNome, colIcone, colRemover, colEditar, colViewPerfis, colViewLinks] = obterColunasTabela();
        const [imgRemover, imgEditar, imgView1, imgView2] = obterImagens();

        colNome.appendChild(document.createTextNode(permissao.nome));
        colIcone.appendChild(document.createTextNode(permissao.icone));
        
        colViewPerfis.setAttribute("onclick", "visualizarPerfis(" + JSON.stringify(permissao) + ")");
        colViewPerfis.appendChild(imgView1);

        colViewLinks.setAttribute("onclick", "visualizarLinks(" + JSON.stringify(permissao) + ")");
        colViewLinks.appendChild(imgView2);

        colRemover.setAttribute("onclick", "removerPermissao("+ permissao.id + ")");
        colRemover.appendChild(imgRemover);

        colEditar.setAttribute("onclick", "editarPermissao(" + JSON.stringify(permissao) + ")");
        colEditar.appendChild(imgEditar);

        linha.append(colNome, colIcone, colViewLinks, colViewPerfis, colRemover, colEditar);
        corpoTabela.appendChild(linha);
    });
}

function getLinks() {
    get(endpoints.getAllLinks)
    .then(data => preencherLinks(data))
    .catch(erro => {
        erro.text()
        .then(mensagem => exibirPopUpErro(mensagem)); 
    });
}

function getInputs(nome, id) {
    let inputAdd = document.createElement("input");
    inputAdd.setAttribute("id", nome + id);
    inputAdd.type = "checkbox";
    inputAdd.value = id;

    let inputEditar = document.createElement("input");
    inputEditar.setAttribute("id", nome + id);
    inputEditar.type = "checkbox";
    inputEditar.value = id;

    return [inputAdd, inputEditar];
}

function getLabels({id, nome}) {
    const [inputAdd, inputEditar] = getInputs(nome, id);

    let labelAdd = document.createElement("label");
    labelAdd.innerText = nome;
    labelAdd.htmlFor = nome + id;
    labelAdd.appendChild(inputAdd);

    let labelEditar = document.createElement("label");
    labelEditar.innerText = nome;
    labelEditar.htmlFor = nome + id;
    labelEditar.appendChild(inputEditar);

    return [labelEditar, labelAdd];
}

function preencherLinks(links) {
    const linksContainerAdd = document.getElementById("links-add");
    const linksContainerEditar = document.getElementById("links-editar");

    links.forEach(link => {
        const [labelEditar, labelAdd] = getLabels(link);
        
        linksContainerAdd.appendChild(labelAdd);
        linksContainerEditar.appendChild(labelEditar);
    });
}

function atualizarTabela() {
    get(endpoints.getAllPermissions)
    .then(data => preencherTabelaPermissoes(data))
    .catch(erro => {
        erro.text()
        .then(mensagem => exibirPopUpErro(mensagem)); 
    });
}

atualizarTabela();
getLinks();