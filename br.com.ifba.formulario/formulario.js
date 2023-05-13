let globalFormularioId = 0;

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
        const titulo = document.getElementById("formulario-titulo-add").value;
        const descricao = document.getElementById("formulario-descricao-add").value;

        if (titulo.trim().length <= 0 || descricao.trim().length <= 0) {
            return exibirPopUpErro("Não foi possível salvar a função, há campo vazio.");
        }

        const formulario = {
            titulo: titulo,
            descricao: descricao
        }
        
        post("salvarFormulario", formulario)
        .then(data => {
            atualizarTabela();
        })
        .catch(erro => {
            erro.text()
            .then(mensagem => exibirPopUpErro(mensagem)); 
        });

        ocultarPopUpAdicionar();
        document.getElementById("formulario-titulo-add").value = "";
        document.getElementById("formulario-descricao-add").value = "";
    }
);

document.getElementById("btn-remover-cancelar")
    .addEventListener("click", ocultarPopUpRemover);

function ocultarPopUpRemover() {
    const popupRemover = document.getElementById("popup-remover");
    popupRemover.classList.remove("mostrar-popup");

    ocultarEfeitoBackGround();
}

function removerFormulario(formularioId) {
    globalFormularioId = formularioId;
    const popupRemover = document.getElementById("popup-remover");
    popupRemover.classList.add("mostrar-popup");

    exibirEfeitoBackGround();
}

document.getElementById("btn-remover-confirmar")
    .addEventListener("click", () => {
        fetchDelete("deletarFormulario/" + globalFormularioId)
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

function editarFormulario({id, titulo, descricao}) {
    globalFormularioId = id;

    exibirPopUpEditar();

    document.getElementById("formulario-titulo-editar").value = titulo;
    document.getElementById("formulario-descricao-editar").value = descricao;
}

document.getElementById("btn-editar-confirmar")
    .addEventListener("click", () => {
        const titulo = document.getElementById("formulario-titulo-editar").value;
        const descricao = document.getElementById("formulario-descricao-editar").value;

        if (titulo.trim().length <= 0 || descricao.trim().length <= 0) {
            return exibirPopUpErro("Não foi possível atualizar o formulário, há campo vazio.");
        }

        const formulario = {
            id: globalFormularioId,
            titulo: titulo,
            descricao: descricao
        }

        put("atualizarFormulario", formulario)
        .then(data => {
            atualizarTabela();
        })
        .catch(erro => {
            erro.text()
            .then(mensagem => exibirPopUpErro(mensagem)); 
        });

        ocultarPopUpEditar();
        document.getElementById("formulario-titulo-editar").value = "";
        document.getElementById("formulario-descricao-editar").value = "";
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
    let colTitulo = document.createElement("td");
    let colDescricao = document.createElement("td");
    let colRemover = document.createElement("td");
    let colEditar = document.createElement("td");
    return [colTitulo, colDescricao, colRemover, colEditar];
}

function obterImagens() {
    let imgRemover = document.createElement("img");
    imgRemover.setAttribute("src", "../images/excluir2.png");
    let imgEditar = document.createElement("img");
    imgEditar.setAttribute("src", "../images/botao-editar2.png");
    return [imgRemover, imgEditar];
}

function preencherTabela(formularios) {
    const corpoTabela = document.getElementById('table-body');
    corpoTabela.innerHTML = '';

    formularios.forEach(formulario => {
        const linha = document.createElement("tr");
        const [colTitulo, colDescricao, colRemover, colEditar] = obterColunasTabela();
        const [imgRemover, imgEditar] = obterImagens();

        colTitulo.appendChild(document.createTextNode(formulario.titulo));
        colDescricao.appendChild(document.createTextNode(formulario.descricao));
        
        colRemover.setAttribute("onclick", "removerFormulario("+ formulario.id + ")");
        colRemover.appendChild(imgRemover);

        colEditar.setAttribute("onclick", "editarFormulario(" + JSON.stringify(formulario) + ")");
        colEditar.appendChild(imgEditar);

        linha.append(colTitulo, colDescricao, colRemover, colEditar);
        corpoTabela.appendChild(linha);
    });
}

function atualizarTabela() {
    get("listarFormulario")
    .then(data => preencherTabela(data))
    .catch(erro => {
        erro.text()
        .then(mensagem => exibirPopUpErro(mensagem)); 
    });
}

atualizarTabela();