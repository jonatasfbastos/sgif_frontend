let globalPerfilId = 0;

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

function getPermissoesSelecionados(inputContainer) {
    const permissoes = [];
    const inputs = inputContainer.getElementsByTagName("input");

    for (const input of inputs) {
        if (input.checked) {
            const permissao = {
                id: input.value
            }
            permissoes.push(permissao);
        }
    }
    return permissoes;
}


document.getElementById("btn-add-confirmar")
    .addEventListener("click", () => {
        const nome = document.getElementById("perfil-nome-add").value;
        const descricao = document.getElementById("perfil-descricao-add").value;

        if (nome.trim().length <= 0 || descricao.trim().length <= 0) {
            return exibirPopUpErro("Não foi possível salvar o perfil, há campo vazio.");
        }

        const permissoes = getPermissoesSelecionados(document.getElementById("permissoes-add"));

        const perfil = {
            nome: nome,
            descricao: descricao,
            permissoes: permissoes
        }
        
        post("salvarPerfilUsuario", perfil)
        .then(data => {
            atualizarTabela();
        })
        .catch(erro => {
            erro.text()
            .then(mensagem => exibirPopUpErro(mensagem)); 
        });

        ocultarPopUpAdicionar();
        document.getElementById("perfil-nome-add").value = "";
        document.getElementById("perfil-descricao-add").value = "";

        const inputs = document.getElementById("permissoes-add")
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

function removerPerfil(perfilId) {
    globalPerfilId = perfilId;
    const popupRemover = document.getElementById("popup-remover");
    popupRemover.classList.add("mostrar-popup");

    exibirEfeitoBackGround();
}

document.getElementById("btn-remover-confirmar")
    .addEventListener("click", () => {
        get_params("deletarPerfilDeUsuario/", {id: globalPerfilId})
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

function editarPerfil({id, nome, descricao, permissoes}) {
    globalPerfilId = id;

    exibirPopUpEditar();

    document.getElementById("perfil-nome-editar").value = nome;
    document.getElementById("perfil-descricao-editar").value = descricao;

    const inputs = document.getElementById("permissoes-editar")
                            .getElementsByTagName("input");
    for (const input of inputs) {
        if (permissoes.some(permissao => permissao.id == input.value)) {
            input.checked = true;
        } else {
            input.checked = false;
        }
    }
}

document.getElementById("btn-editar-confirmar")
    .addEventListener("click", () => {
        const nome = document.getElementById("perfil-nome-editar").value;
        const descricao = document.getElementById("perfil-descricao-editar").value;

        if (nome.trim().length <= 0 || descricao.trim().length <= 0) {
            return exibirPopUpErro("Não foi possível atualizar o perfil, há campo vazio.");
        }

        const permissoes = getPermissoesSelecionados(document.getElementById("permissoes-editar"));

        const perfil = {
            id: globalPerfilId,
            nome: nome,
            descricao: descricao,
            permissoes: permissoes
        }

        post("salvarPerfilUsuario", perfil)
        .then(data => {
            atualizarTabela();
        })
        .catch(erro => {
            erro.text()
            .then(mensagem => exibirPopUpErro(mensagem)); 
        });

        ocultarPopUpEditar();
        document.getElementById("perfil-nome-editar").value = "";
        document.getElementById("perfil-descricao-editar").value = "";
    }
);

const inputBuscar = document.getElementById("input-buscar");
inputBuscar.addEventListener("keyup", () => {
    const busca = inputBuscar.value.toLowerCase();
    const corpoTabela = document.getElementById('table-body-perfis');
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

function visualizarPermissoes(perfil) {
    document.getElementById("table-permissoes").style.display = "block";
    get("listarPermissoesPerfil/" + perfil.id)
    .then(data => preencherTabelaPermissoes(perfil, data))
    .catch(erro => {
        erro.text()
        .then(mensagem => exibirPopUpErro(mensagem)); 
    });
}

function preencherTabelaPermissoes(perfil, permissoes) {
    document.getElementById("titulo-tb-permissao").innerText = `Permissões associadas com ${perfil.nome}`;

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
    let colDescricao = document.createElement("td");
    let colRemover = document.createElement("td");
    let colEditar = document.createElement("td");
    let colView = document.createElement("td");
    return [colNome, colDescricao, colRemover, colEditar, colView];
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

function preencherTabelaPerfis(perfis) {
    const corpoTabela = document.getElementById('table-body-perfis');
    corpoTabela.innerHTML = '';

    perfis.forEach(perfil => {
        const linha = document.createElement("tr");
        const [colNome, colDescricao, colRemover, colEditar, colView] = obterColunasTabela();
        const [imgRemover, imgEditar, imgView] = obterImagens();

        colNome.appendChild(document.createTextNode(perfil.nome));
        colDescricao.appendChild(document.createTextNode(perfil.descricao));
        
        colView.setAttribute("onclick", "visualizarPermissoes(" + JSON.stringify(perfil) + ")");
        colView.appendChild(imgView);

        colRemover.setAttribute("onclick", "removerPerfil("+ perfil.id + ")");
        colRemover.appendChild(imgRemover);

        colEditar.setAttribute("onclick", "editarPerfil(" + JSON.stringify(perfil) + ")");
        colEditar.appendChild(imgEditar);

        linha.append(colNome, colDescricao, colView, colRemover, colEditar);
        corpoTabela.appendChild(linha);
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

function preencherPermissoes(permissoes) {
    const permissoesContainerAdd = document.getElementById("permissoes-add");
    const permissoesContainerEditar = document.getElementById("permissoes-editar");

    permissoes.forEach(permissao => {
        const [labelEditar, labelAdd] = getLabels(permissao);
        
        permissoesContainerAdd.appendChild(labelAdd);
        permissoesContainerEditar.appendChild(labelEditar);
    });
}

function getPermissoes() {
    get("listarPermissoes")
    .then(data => preencherPermissoes(data))
    .catch(erro => {
        erro.text()
        .then(mensagem => exibirPopUpErro(mensagem)); 
    });
}

function atualizarTabela() {
    get("perfilusuario")
    .then(data => preencherTabelaPerfis(data))
    .catch(erro => {
        console.log(erro);
    });
}

getPermissoes();
atualizarTabela();