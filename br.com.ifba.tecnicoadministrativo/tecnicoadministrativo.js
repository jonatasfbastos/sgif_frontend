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
        const telefone = document.getElementById("funcao-telefone-add").value;
        const email = document.getElementById("funcao-email-add").value;
        const cpf = document.getElementById("funcao-cpf-add").value;
        const dataDeNascimento = document.getElementById("funcao-dataNascimento-add").value;
        const siape = document.getElementById("funcao-siape-add").value;

        if (nome.trim().length <= 0 || telefone.trim().length <= 0 || email.trim().length <= 0 ||
            cpf.trim().length <= 0 || dataDeNascimento.trim().length <= 0 || siape.trim().length <= 0 ) {
            return exibirPopUpErro("Não foi possível salvar o técnico administrativo, há campo vazio.");
        }

        const tecnicoAdministrativo = {
            nome: nome,
            telefone: telefone,
            email: email,
            cpf: cpf,
            dataDeNascimento: dataDeNascimento,
            siape: siape
        }
        
        post("salvarTecnicoAdministrativo", tecnicoAdministrativo)
        .then(data => {
            atualizarTabela();
        })
        .catch(erro => {
            erro.text()
            .then(mensagem => exibirPopUpErro(mensagem)); 
        });

        ocultarPopUpAdicionar();
        document.getElementById("funcao-nome-add").value = "";
        document.getElementById("funcao-telefone-add").value = "";
        document.getElementById("funcao-email-add").value = "";
        document.getElementById("funcao-cpf-add").value = "";
        document.getElementById("funcao-dataNascimento-add").value = "";
        document.getElementById("funcao-siape-add").value = "";
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
        fetchDelete("deletarTecnicoAdministrativo/" + globalFuncaoId)
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

function editarFuncao({id, nome, telefone, email, cpf, dataDeNascimento, siape}) {
    globalFuncaoId = id;

    exibirPopUpEditar();

    document.getElementById("funcao-nome-editar").value = nome;
    document.getElementById("funcao-telefone-editar").value = telefone;
    document.getElementById("funcao-email-editar").value = email;
    document.getElementById("funcao-cpf-editar").value = cpf;
    document.getElementById("funcao-dataNascimento-editar").value = dataDeNascimento;
    document.getElementById("funcao-siape-editar").value = siape;
}

document.getElementById("btn-editar-confirmar")
    .addEventListener("click", () => {
        const nome = document.getElementById("funcao-nome-editar").value;
        const telefone = document.getElementById("funcao-telefone-editar").value;
        const email = document.getElementById("funcao-email-editar").value;
        const cpf = document.getElementById("funcao-cpf-editar").value;
        const dataDeNascimento = document.getElementById("funcao-dataNascimento-editar").value;
        const siape = document.getElementById("funcao-siape-editar").value;

        if (nome.trim().length <= 0 || telefone.trim().length <= 0 ||
            email.trim().length <= 0 || cpf.trim().length <= 0 ||
            dataDeNascimento.trim().length <= 0 || siape.trim().length <= 0) {
            return exibirPopUpErro("Não foi possível atualizar o ténico administrativo, há campo vazio.");
        }

        const tecnicoAdministrativo = {
            id: globalFuncaoId,
            nome: nome,
            telefone: telefone,
            email: email,
            cpf: cpf,
            dataDeNascimento: dataDeNascimento,
            siape: siape
        }

        put("atualizarTecnicoAdministrativo", tecnicoAdministrativo)
        .then(data => {
            atualizarTabela();
        })
        .catch(erro => {
            erro.text()
            .then(mensagem => exibirPopUpErro(mensagem)); 
        });

        ocultarPopUpEditar();
        document.getElementById("funcao-nome-editar").value = "";
        document.getElementById("funcao-telefone-editar").value = "";
        document.getElementById("funcao-email-editar").value = "";
        document.getElementById("funcao-cpf-editar").value = "";
        document.getElementById("funcao-dataNascimento-editar").value = "";
        document.getElementById("funcao-siape-editar").value = "";
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
    let colTelefone = document.createElement("td");
    let colEmail = document.createElement("td");
    let colCpf = document.createElement("td");
    let colDataDeNascimento = document.createElement("td");
    let colSiape = document.createElement("td");
    let colRemover = document.createElement("td");
    let colEditar = document.createElement("td");
    return [colNome, colTelefone, colEmail, colCpf, colDataDeNascimento, colSiape, colRemover, colEditar];
}

function obterImagens() {
    let imgRemover = document.createElement("img");
    imgRemover.setAttribute("src", "../images/excluir2.png");
    let imgEditar = document.createElement("img");
    imgEditar.setAttribute("src", "../images/botao-editar2.png");
    return [imgRemover, imgEditar];
}

function preencherTabela(tecnicoAdministrativo) {
    const corpoTabela = document.getElementById('table-body');
    corpoTabela.innerHTML = '';

    tecnicoAdministrativo.forEach(funcao => {
        const linha = document.createElement("tr");
        const [colNome, colTelefone, colEmail, colCpf, colDataDeNascimento, colSiape, colRemover, colEditar] = obterColunasTabela();
        const [imgRemover, imgEditar] = obterImagens();

        colNome.appendChild(document.createTextNode(funcao.nome));
        colTelefone.appendChild(document.createTextNode(funcao.telefone));
        colEmail.appendChild(document.createTextNode(funcao.email));
        colCpf.appendChild(document.createTextNode(funcao.cpf));
        colDataDeNascimento.appendChild(document.createTextNode(funcao.dataDeNascimento));
        colSiape.appendChild(document.createTextNode(funcao.siape));
        
        colRemover.setAttribute("onclick", "removerFuncao("+ funcao.id + ")");
        colRemover.appendChild(imgRemover);

        colEditar.setAttribute("onclick", "editarFuncao(" + JSON.stringify(funcao) + ")");
        colEditar.appendChild(imgEditar);

        linha.append(colNome, colTelefone, colEmail, colCpf, colDataDeNascimento, colSiape, colRemover, colEditar);
        corpoTabela.appendChild(linha);
    });
}

function atualizarTabela() {
    get("listarTecnicoAdministrativo")
    .then(data => preencherTabela(data))
    .catch(erro => {
        erro.text()
        .then(mensagem => exibirPopUpErro(mensagem)); 
    });
}

atualizarTabela();