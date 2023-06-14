var selectedId
var selectedDtInicio
var selectedDtFim
var selectedIdDisciplina
var avaliacaoList = []
var avaliacao = {}

atualizarTabela()
obterDisciplinas()
setDisciplina()

function atualizarTabela() {
    window.scrollTo(0,0)
    get('avaliacao').then(data => {
        this.avaliacaoList = data
        this.tableCreate(this.avaliacaoList)
    }).catch(error => {
        console.log('Erro: ', error)
        popupErroExibir(error)
    })
}

function filtrar() {
    this.selectedDtInicio = document.getElementById('dt_inicial').value;
    this.selectedDtFim = document.getElementById('dt_final').value;
    this.selectedIdDisciplina = document.getElementById('selec_disc');
    var opcao = selectedIdDisciplina.options[selectedIdDisciplina.selectedIndex].value;
    if(selectedDtInicio == '') {
        this.selectedDtInicio = '2000-01-01';
    }
    if(selectedDtFim == '') {
        this.selectedDtFim = '2100-12-31';
    }
    this.selectedDtInicio = this.selectedDtInicio.split('-').reverse().join('/');
    this.selectedDtFim = this.selectedDtFim.split('-').reverse().join('/');
    window.scrollTo(0,0)
    get_params('filtrarAvaliacao', {
        dtInicio: this.selectedDtInicio,
        dtFim: this.selectedDtFim,
        idDisciplina: opcao
    }).then(data => {
        this.avaliacaoList = data
        this.tableCreate(this.avaliacaoList)
    }).catch(error => {
        console.log('Erro: ', error)
        popupErroExibir('Erro ao filtrar avaliações: HTTP Erro ' + error.status)
    })
}

function obterDisciplinas() {
    get('disciplina').then(disciplinas => {
        disciplinas.forEach(disciplina => {
            var select = document.getElementById('selec_disc');
            option = new Option(disciplina.nome, disciplina.id)
            select.options[select.options.length] = option;
        })
    })
}

function tableCreate(data) {
    window.scrollTo(0,0)
    var tableBody = document.getElementById('table-body');
    var margin = 0;
    var avlEncontradas = 0;
    if (tableBody) {
        tableBody.innerHTML = ''
        data.forEach(element => {
            var row = document.createElement("tr");

            var colDescricao = document.createElement("td")
            colDescricao.appendChild(document.createTextNode(element.descricao))
            row.appendChild(colDescricao)

            var colDataInicio = document.createElement("td")
            colDataInicio.appendChild(document.createTextNode(element.dataInicio))
            row.appendChild(colDataInicio)

            var colDataFim = document.createElement("td")
            colDataFim.appendChild(document.createTextNode(element.dataFim))
            row.appendChild(colDataFim)

            var colDisciplina = document.createElement("td")
            colDisciplina.appendChild(document.createTextNode(element.disciplina ? element.disciplina.nome : ''))
            row.appendChild(colDisciplina)

            var colRemover = document.createElement("td")
            colRemover.setAttribute("onclick", "openPopup(" + element.id + ")")
            var removerLink = document.createElement("a")
            var imgRemove = document.createElement("img")
            imgRemove.setAttribute("src", "../images/excluir2.png")
            removerLink.appendChild(imgRemove)

            colRemover.appendChild(removerLink)
            row.appendChild(colRemover)

            var colEditar = document.createElement("td")
            colEditar.setAttribute("onclick", "openEditPopup(" + element.id + ")")
            var editarLink = document.createElement("a")
            var imgEditar = document.createElement("img")
            imgEditar.setAttribute("src", "../images/botao-editar2.png")
            editarLink.appendChild(imgEditar)

            colEditar.appendChild(editarLink)
            row.appendChild(colEditar)

            tableBody.appendChild(row);

            margin = margin + 31;
            avlEncontradas = avlEncontradas + 1;
        });
        document.getElementById('tbContain').style.marginTop = margin + "px";
        resizeHandler();
        if(avlEncontradas == 0) {
            var row = document.createElement("tr");
            for (i = 0; i < 6; i++) {
                var td = document.createElement("td");
                if(i === 2) {
                    td.style.fontSize = "12px";
                    td.style.textTransform = "uppercase";
                    td.innerText = "Nenhuma avaliação encontrada.";
                }
                row.appendChild(td);
                td.style.cursor = "default";
                resizeHandler();
            }
            tableBody.appendChild(row);
        }
    }
}

function setDisciplina() {

    get('disciplina').then(disciplinas => {

        var multiCombo = document.getElementById('disciplinaAdd')
        var multiComboEdit = document.getElementById('disciplinaEditar')

        disciplinas.forEach(disciplina => {
            let option = document.createElement('option')
            option.value = disciplina.id
            option.innerHTML = disciplina.nome

            multiCombo.appendChild(option)

            let optionEdit = document.createElement('option')
            optionEdit.value = disciplina.id
            optionEdit.innerHTML = disciplina.nome

            multiComboEdit.appendChild(optionEdit)

        })
    }).catch(error => {
        console.log('Erro: ', error)
        popupErroExibir('Erro ao obter disciplinas: HTTP Erro ' + error.status)
    })
}

function stopPropagation(event) {
    event.stopPropagation();
}

function openAddPopup() {
    popupAdd.classList.add("openAddPopup");
    window.scrollTo(0,0);
    var body = document.getElementById('tela');
    body.style = "overflow:hidden";
}

function closeAddPopup() {
    popupAdd.classList.remove("openAddPopup");
    var body = document.getElementById('tela');
    body.style = "overflow:body";
}

function openPopup(id) {
    teladisabled()
    this.selectedId = id
    popup.classList.add("open_popup");
    window.scrollTo(0,0);
}

function teladisabled() {
    telaDesativada.classList.add("disabled_tela");
    backdrop.classList.add("disabled_tela");
    resizeHandler();
}

function getindex(x) {
    globalThis.Index = x.rowIndex;
}

function telaEnabled() {
    telaDesativada.classList.remove("disabled_tela");
    backdrop.classList.remove("disabled_tela");
    resizeHandler();
}

function closePopup() {
    popup.classList.remove("open_popup");
}

function openEditPopup(id) {
    teladisabled()
    this.selectedId = id

    popupEdit.classList.add("popupEditOpen");
    let avl = this.avaliacaoList.find(aval => {
        return aval.id === id
    })

    window.scrollTo(0,0);

    document.getElementById('avaliacaoDescricaoEditar').value = avl.descricao;
    document.getElementById('avaliacaoDataInicioEditar').value = avl.dataInicio.split('/').reverse().join('-');
    document.getElementById('avaliacaoDataFimEditar').value = avl.dataFim.split('/').reverse().join('-');
    
    var body = document.getElementById('tela');
    body.style = "overflow:hidden";

    var select = document.getElementById('disciplinaEditar');
    select.selectedIndex = avl.disciplina.id - 1;
}

function closeEditPopup() {
    popupEdit.classList.remove("popupEditOpen");
    var body = document.getElementById('tela');
    body.style = "overflow:body";
}

function adicionar() {

    this.avaliacao.descricao = document.getElementById('avaliacaoDescricaoAdd').value;
    this.avaliacao.dataInicio = document.getElementById('avaliacaoDataInicioAdd').value;
    this.avaliacao.dataFim = document.getElementById('avaliacaoDataFimAdd').value;
    this.avaliacao.disciplina = { id: document.getElementById('disciplinaAdd').value };

    this.avaliacao.dataInicio = this.avaliacao.dataInicio.split('-').reverse().join('/');
    this.avaliacao.dataFim = this.avaliacao.dataFim.split('-').reverse().join('/');

    //verificação de campos vazios 
    if (this.avaliacao.descricao != "" && this.avaliacao.dataInicio != ""
    && this.avaliacao.dataFim != "") {
        post('salvarAvaliacao', avaliacao).then(result => {
            popupConfirmacaoExibir("Avaliação adicionada")
            atualizarTabela()
        }).catch(error => {
            console.log('Erro: ', error)
            popupErroExibir('Erro ao salvar avaliação: HTTP Erro ' + error.status)
        })
    } else {
        popupErroExibir("Por favor, preencha todos os campos")
    }
    this.avaliacao = {}

    document.getElementById('avaliacaoDescricaoAdd').value = '';
    document.getElementById('avaliacaoDataInicioAdd').value = '';
    document.getElementById('avaliacaoDataFimAdd').value = '';
}

function remover() {
    get_params('deletarAvaliacao', { id: this.selectedId, p2: 'is' }).then(result => {
        popupConfirmacaoExibir("Avaliação removida com sucesso")
        atualizarTabela()
    }).catch(error => {
        popupErroExibir(error)
    })
}

function buscar() {

    if(this.avaliacaoList.length == 0) {
        return
    }

    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("loupe");
    filter = input.value.toUpperCase();
    table = document.getElementById("itens-table");
    tr = table.getElementsByTagName("tr");

    var tableBody = document.getElementById('table-body');
    var margin = 0;

    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
                margin = margin + 31;
            } else {
                tr[i].style.display = "none";
            }
        }
    }
    document.getElementById('tbContain').style.marginTop = margin + "px";
    auxiliarBusca();

    if(input.value == "") {
        resizeHandler();
    }
}

function auxiliarBusca() {
    var tableBody = document.getElementById('table-body');
    var ocultos = 0;
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        if(tr[i].style.display == "none") {
            ocultos = ocultos + 1;
        }
    }
    if(ocultos + 1 == tr.length) {
        var row = document.createElement("tr");
        row.classList.add('rowRemover');
        for (i = 0; i < 6; i++) {
            var td = document.createElement("td");
            if(i === 2) {
                td.style.fontSize = "12px";
                td.style.textTransform = "uppercase";
                td.innerText = "Nenhuma avaliação encontrada.";
            }
            row.appendChild(td);
            td.style.cursor = "default";
        }
        tableBody.appendChild(row);
    } else {
        var td = document.getElementById("td");
        var remover = document.getElementsByClassName('rowRemover');
        for (var i=remover.length-1; i >= 0; i--) {
            remover[i].remove();
        }
    }
}

var table = document.getElementById("itens-table");


function editar() {

    var descricao = document.getElementById("avaliacaoDescricaoEditar").value;
    var dataInicio = document.getElementById("avaliacaoDataInicioEditar").value;
    var dataFim = document.getElementById('avaliacaoDataFimEditar').value;
    var disciplina = { id: document.getElementById('disciplinaEditar').value };

    dataInicio = dataInicio.split('-').reverse().join('/');
    dataFim = dataFim.split('-').reverse().join('/');

    this.avaliacao = this.avaliacaoList.find(aval => {
        return aval.id === this.selectedId
    })

    //verificação se dados estão repetidos
    if(descricao == this.avaliacao.descricao
        && dataInicio == this.avaliacao.dataInicio
        && dataFim == this.avaliacao.dataFim
        && disciplina.id == this.avaliacao.disciplina.id) {
        popupErroExibir("Os dados estão repetidos. Por favor, altere os dados necessários");
        this.avaliacao = {}
        return
    }

    this.avaliacao.descricao = descricao
    this.avaliacao.dataInicio = dataInicio
    this.avaliacao.dataFim = dataFim
    this.avaliacao.disciplina = disciplina

    //verificação de campos vazios 
    if (this.avaliacao.descricao != "" && this.avaliacao.dataInicio != ""
    && this.avaliacao.dataFim != "") {
        post('atualizarAvaliacao', this.avaliacao).then(result => {
            popupConfirmacaoExibir("Avaliação editada com sucesso")
            this.atualizarTabela()
        }).catch(error => {
            console.log('Erro: ', error)
            popupErroExibir('Erro ao editar avaliação: HTTP Erro ' + error.status)
        })
    } else {
        popupErroExibir('Por favor, preencha todos os campos')
    }
    this.avaliacao = {}

}


// Função para exibir o popup de erro
function popupErroExibir(mensagem){
    teladisabled();
    document.getElementById("popupErro").classList.add("exibirErro"); // Adiciona a classe "exibirErro" ao elemento com o ID "popupErro"
    document.getElementById("erro").innerText = mensagem; // Define o texto da mensagem de erro no elemento com o ID "erro"
    window.scrollTo(0,0);
    var body = document.getElementById('tela');
    body.style = "overflow:hidden";
}

// Função para ocultar o popup de erro
function popupErroOcultar(){
    document.getElementById("popupErro").classList.remove("exibirErro"); // Remove a classe "exibirErro" do elemento com o ID "popupErro"
    body.style = "overflow:body";
}

// Função para exibir o popup de confirmação
function popupConfirmacaoExibir(mensagem){
    teladisabled();
    document.getElementById("popupConfirmacao").classList.add("exibirErro"); // Adiciona a classe "exibirErro" ao elemento com o ID "popupConfirmacao"
    document.getElementById("msg").innerText = mensagem; // Define o texto da mensagem de confirmação no elemento com o ID "msg"
    window.scrollTo(0,0);
    var body = document.getElementById('tela');
    body.style = "overflow:hidden";
}

// Função para ocultar o popup de confirmação
function popupConfirmacaoOcultar(){
    document.getElementById("popupConfirmacao").classList.remove("exibirErro"); // Remove a classe "exibirErro" do elemento com o ID "popupConfirmacao"
    body.style = "overflow:body";
}


var tela = document.getElementById('tela');

function resizeHandler() {
    var sw = document.documentElement.scrollWidth;
    var sh = document.documentElement.scrollHeight;
    tela.style.backgroundSize = sw + "px " + sh + "px";
}

function ajustarTr() {
    var tr = document.getElementById('trTopo');
    var posicao = tr.getBoundingClientRect().top;
    var primeiroTh = document.getElementById('primeiroTh');
    var ultimoTh = document.getElementById('ultimoTh');
    if(posicao <= 0) {
        primeiroTh.style.borderTopLeftRadius = "0px";
        ultimoTh.style.borderTopRightRadius = "0px";
    } else {
        primeiroTh.style.borderTopLeftRadius = "20px";
        ultimoTh.style.borderTopRightRadius = "20px";
    }
}

window.addEventListener('resize', resizeHandler);
document.addEventListener('scroll', ajustarTr);

resizeHandler();
ajustarTr();


let popup = document.getElementById("popupRemove");
let telaDesativada = document.getElementById("tela");
let backdrop = document.getElementById("backdrop");
let popupEdit = document.getElementById("popupEdit");
let popupAdd = document.getElementById("popupAdd");
var tableInteract = document.getElementById("itens-table");

