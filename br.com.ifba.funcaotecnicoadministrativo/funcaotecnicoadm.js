let globalFuncaoId = 0;

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
        const nome = document.getElementById("funcao-nome-add").value;
        const descricao = document.getElementById("funcao-descricao-add").value;

        if (nome.trim().length <= 0 || descricao.trim().length <= 0) {
            return exibirPopUpErro("Não foi possível salvar a função, há campo vazio.");
        }

        const funcaoTecnicoAdm = {
            nome: nome,
            descricao: descricao
        }
        
        post("funcoes-tecnico-administrativo", funcaoTecnicoAdm)
        .then(data => {
            atualizarTabela();
        })
        .catch(erro => {
            erro.text()
            .then(mensagem => exibirPopUpErro(mensagem)); 
        });

        ocultarPopUpAdicionar();
        document.getElementById("funcao-nome-add").value = "";
        document.getElementById("funcao-descricao-add").value = "";
    }
);

document.getElementById("btn-remover-cancelar")
    .addEventListener("click", ocultarPopUpRemover);

function ocultarPopUpRemover() {
    const popupRemover = document.getElementById("popup-remover");
    popupRemover.classList.remove("mostrar-popup");

    ocultarEfeitoBackGround();
}

function removerFuncao(funcaoId) {
    globalFuncaoId = funcaoId;
    const popupRemover = document.getElementById("popup-remover");
    popupRemover.classList.add("mostrar-popup");

    exibirEfeitoBackGround();
}

document.getElementById("btn-remover-confirmar")
    .addEventListener("click", () => {
        fetchDelete("deletarFuncaoTecnicoAdm/" + globalFuncaoId)
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

function editarFuncao({id, nome, descricao}) {
    globalFuncaoId = id;

    exibirPopUpEditar();

    document.getElementById("funcao-nome-editar").value = nome;
    document.getElementById("funcao-descricao-editar").value = descricao;
}

document.getElementById("btn-editar-confirmar")
    .addEventListener("click", () => {
        const nome = document.getElementById("funcao-nome-editar").value;
        const descricao = document.getElementById("funcao-descricao-editar").value;

        if (nome.trim().length <= 0 || descricao.trim().length <= 0) {
            return exibirPopUpErro("Não foi possível atualizar a função, há campo vazio.");
        }

        const funcaoTecnicoAdm = {
            id: globalFuncaoId,
            nome: nome,
            descricao: descricao
        }

        put("atualizarFuncaoTecnicoAdm", funcaoTecnicoAdm)
        .then(data => {
            atualizarTabela();
        })
        .catch(erro => {
            erro.text()
            .then(mensagem => exibirPopUpErro(mensagem)); 
        });

        ocultarPopUpEditar();
        document.getElementById("funcao-nome-editar").value = "";
        document.getElementById("funcao-descricao-editar").value = "";
    }
);

const inputBuscar = document.getElementById("input-buscar");
inputBuscar.addEventListener("keyup", () => {
    const busca = inputBuscar.value.toLowerCase();
    const corpoTabela = document.getElementById('table-body');
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

function obterColunasTabela() {
    let colNome = document.createElement("td");
    let colDescricao = document.createElement("td");
    let colRemover = document.createElement("td");
    let colEditar = document.createElement("td");
    return [colNome, colDescricao, colRemover, colEditar];
}

function obterImagens() {
    let imgRemover = document.createElement("img");
    imgRemover.setAttribute("src", "../images/excluir2.png");
    let imgEditar = document.createElement("img");
    imgEditar.setAttribute("src", "../images/botao-editar2.png");
    return [imgRemover, imgEditar];
}

function preencherTabela(funcoesTecnicoAdm) {
    const corpoTabela = document.getElementById('table-body');
    corpoTabela.innerHTML = '';

    funcoesTecnicoAdm.forEach(funcao => {
        const linha = document.createElement("tr");
        const [colNome, colDescricao, colRemover, colEditar] = obterColunasTabela();
        const [imgRemover, imgEditar] = obterImagens();

        colNome.appendChild(document.createTextNode(funcao.nome));
        colDescricao.appendChild(document.createTextNode(funcao.descricao));
        
        colRemover.setAttribute("onclick", "removerFuncao("+ funcao.id + ")");
        colRemover.appendChild(imgRemover);

        colEditar.setAttribute("onclick", "editarFuncao(" + JSON.stringify(funcao) + ")");
        colEditar.appendChild(imgEditar);

        linha.append(colNome, colDescricao, colRemover, colEditar);
        corpoTabela.appendChild(linha);
    });
}

function atualizarTabela() {
    get("listarFuncoesTecnicoAdm")
    .then(data => preencherTabela(data))
    .catch(erro => {
        erro.text()
        .then(mensagem => exibirPopUpErro(mensagem)); 
    });
}

atualizarTabela();