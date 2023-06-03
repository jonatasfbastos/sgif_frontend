var selectedId
var selectedDtInicio
var selectedDtFim
var selectedIdDisciplina
var avaliacaoList = []
var avaliacao = {}

// function tipoDeUsuarioNameAddChange(){
//     tipodeusuario.nome = document.getElementById('tipoDeUsuarioNameAdd').value;
//     console.log(tipodeusuario);
// }

// function tipoDeUsuarioDescricaoAddChange(){
//     tipodeusuario.descricao = document.getElementById('tipoDeUsuarioDescricaoAdd').value;
//     console.log(tipodeusuario);
// }

atualizarTabela()
obterDisciplinas()

function atualizarTabela() {
    get('avaliacao').then(data => {
        console.log('Data', data)
        this.avaliacaoList = data
        this.tableCreate(this.avaliacaoList)
    }).catch(error => {
        console.log('Error ', error)
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
    console.log(selectedDtInicio)
    console.log(selectedDtFim)
    get_params('filtrarAvaliacao', {
        dtInicio: this.selectedDtInicio,
        dtFim: this.selectedDtFim,
        idDisciplina: opcao
    }).then(data => {
        this.avaliacaoList = data
        this.tableCreate(this.avaliacaoList)
    }).catch(error => {
        console.log('Error ', error)
    })
}

function obterDisciplinas() {
    get('disciplina').then(disciplinas => {
        console.log(disciplinas)
        disciplinas.forEach(disciplina => {
            var select = document.getElementById('selec_disc');
            option = new Option(disciplina.nome, disciplina.id)
            select.options[select.options.length] = option;
        })
    })
}

function tableCreate(data) {
    var tableBody = document.getElementById('table-body');
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

            tableBody.appendChild(row)

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

        });
    }
}

function setDisciplina() {

    get('disciplina').then(disciplinas => {
        console.log('Disciplina', disciplinas)

        var multiCombo = document.getElementById('disciplina')
        var multiComboEdit = document.getElementById('disciplinaEdit')
        tiposdeusuarios.forEach(tipo => {
            let option = document.createElement('option')
            option.value = tipo.id
            option.innerHTML = tipo.nome

            multiCombo.appendChild(option)

            let optionEdit = document.createElement('option')
            optionEdit.value = tipo.id
            optionEdit.innerHTML = tipo.nome

            multiComboEdit.appendChild(optionEdit)

        })
    }).catch(error => {
        console.log('Error ', error)
    })
}

function stopPropagation(event) {
    event.stopPropagation();
}

function openAddPopup() {
    popupAdd.classList.add("openAddPopup");
}

function closeAddPopup() {
    popupAdd.classList.remove("openAddPopup");
}

function openPopup(id) {
    teladisabled()
    this.selectedId = id
    popup.classList.add("open_popup");
}

function teladisabled() {
    telaDesativada.classList.add("disabled_tela");
    backdrop.classList.add("disabled_tela");
}

function getindex(x) {
    globalThis.Index = x.rowIndex;
}

function telaEnabled() {
    telaDesativada.classList.remove("disabled_tela");
    backdrop.classList.remove("disabled_tela");
}

var tablee = document.getElementById("itens-table");

function closePopup() {
    popup.classList.remove("open_popup");
}

function openEditPopup(id) {
    teladisabled()
    this.selectedId = id
    popupEdit.classList.add("popupEditOpen");
    console.log('Id ', id)
    let avl = this.avaliacaoList.find(aval => {
        return aval.id === id
    })

    console.log('Avaliação encontrada ', avl)

    document.getElementById('avaliacaoDescricao').value = avl.descricao
    document.getElementById('avaliacaoDataInicio').value = avl.dataInicio
    document.getElementById('avaliacaoDataFim').value = avl.dataFim
    document.getElementById('disciplinaEdit').value = avl.disciplina
}

function closeEditPopup() {
    popupEdit.classList.remove("popupEditOpen");
}

function adicionar() {

    this.avaliacao.descricao = document.getElementById('avaliacaoDescricaoAdd').value;
    this.avaliacao.dataInicio = document.getElementById('avaliacaoDataInicioAdd').value;
    this.avaliacao.dataFim = document.getElementById('avaliacaoDataFimAdd').value;
    this.avaliacao.disciplina = { id: document.getElementById('disciplinaAdd').value };

    console.log(avaliacao)
    console.log(avaliacao.id)

    //se os campos de nome ou de descrição estiverem vazios, não serão salvos 
    if (this.avaliacao.nome != "" && this.avaliacao.descricao != "") {
        post('salvarAvalicao', avaliacao).then(result => {
            console.log('result', result)
            atualizarTabela()
        }).catch(error => {
            console.log('error', error)
        })
    } else { console.log('error') }
    this.avaliacao = {}

    document.getElementById('avaliacaoDescricaoAdd').value = '';
    document.getElementById('avaliacaoDataInicioAdd').value = '';
    document.getElementById('avaliacaoDataFimAdd').value = '';
    document.getElementById('disciplinaAdd').value = '';
}


function remover() {
    console.log('Deletar ' + this.selectedId)

    get_params('deletarAvaliacao', { id: this.selectedId, p2: 'is' }).then(result => {
        atualizarTabela()
    }).catch(error => {
    })
}

function buscar() {

    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("loupe");
    filter = input.value.toUpperCase();
    table = document.getElementById("itens-table");
    tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

var table = document.getElementById("itens-table");


function editar() {

    var descricao = document.getElementById("avalicaoName").value;
    var dataInicio = document.getElementById("avalicaoDescricao").value;
    var dataFim = document.getElementById('dataFim').value;
    var disciplina = document.getElementById('disciplina').value;

    this.avaliacao = this.avaliacaoList.find(aval => {
        return aval.id === this.selectedId
    })

    this.avaliacao.descricao = descricao
    this.avaliacao.dataInicio = dataInicio
    this.avaliacao.dataFim = dataFim
    this.avaliacao.disciplina = disciplina

    post('salvarAvalicao', this.avaliacao).then(result => {
        console.log('Result ', result)
        this.atualizarTabela()
    }).catch(error => {
        console.log('Error ', error)
    })
    this.avaliacao = {}
}

let popup = document.getElementById("popupRemove");
let telaDesativada = document.getElementById("tela");
let backdrop = document.getElementById("backdrop");
let popupEdit = document.getElementById("popupEdit");
let popupAdd = document.getElementById("popupAdd");
var tableInteract = document.getElementById("itens-table");

