var selectedId
var matrizesList = []
var etapasList = []
var matriz = {}
var etapas = {}

atualizarTabela()
//atualizarTabelaEtapa()
setCursos()
setEtapasCurso()

//função para atualizar tabela de etapa curso
/*function atualizarTabelaEtapa(){
    get('etapaCurso').then(dataet=>{
    console.log('Data ', dataet)
    this.etapasList = dataet
    this.tableCreateEtapa(this.etapasList)
    }).catch(error=>{
        console.log('Error ', error)
    })
}*/

function atualizarTabela(){
    get('matrizes').then(data=>{
    console.log('Data ', data)
    this.matrizesList = data
    //this.etapasList = data
    //para setar uma ou mais etapa curso da matriz curricular
    this.etapasList = []
        if (this.selectedId) {
            this.etapasList = data.find(data => data.id === this.selectedId).etapacurso
        }
    this.tableCreate(this.matrizesList)
    this.tableCreateEtapa(this.etapasList)
    }).catch(error=>{
        console.log('Error ', error)
    })
}

//tabela de etapa cursos
function tableCreateEtapa(data){
    var tableBodyEta = document.getElementById('table-body-etapa');
    if(tableBodyEta){
        tableBodyEta.innerHTML = ''
        data.forEach(element => {
            var row = document.createElement("tr");

            var colID = document.createElement("td")
            colID.appendChild(document.createTextNode(element.id))
            row.appendChild(colID)
    
            //setando o nome de etapa curso na tabela de etapa cursos
            get('etapaCurso').then(etapascursos=>{
                console.log('Etapas do curso ', etapascursos)

                var colNomeEtapa = document.createElement("td")
                etapascursos.forEach(tipo=>{
                let option = document.createElement('option')
                option.value = tipo.id
                option.innerHTML = tipo.nome

                colNomeEtapa.appendChild(option)
                row.appendChild(colNomeEtapa)

            })
            }).catch(error=>{
                console.log('Error ', error)
            })

            get('disciplina').then(disciplinas=>{
                console.log('Disciplinas ', disciplinas)

                var colNomeDisciplina = document.createElement("td")
                disciplinas.forEach(tipo=>{
                let option = document.createElement('option')
                option.value = tipo.id
                option.innerHTML = tipo.nome

                colNomeDisciplina.appendChild(option)
                row.appendChild(colNomeDisciplina)

            })
            }).catch(error=>{
                console.log('Error ', error)
            })

            /*var colNomeEtapa = document.createElement("td")
            colNomeEtapa.appendChild(document.createTextNode(element.etapacurso ? element.etapacurso.nome : ''))
            row.appendChild(colNomeEtapa)*/

            /*var colDisciplinaEtapa = document.createElement("td")
            colDisciplina.appendChild(document.createTextNode(element.etapacurso ? element.etapacurso.disciplina : ''))
            row.appendChild(colDisciplinaEtapa)*/
    
            tableBodyEta.appendChild(row)
            console.log(element)
        });
    }
}

function tableCreate(data){
    var tableBody = document.getElementById('table-body');
    if(tableBody){
        tableBody.innerHTML = ''
        data.forEach(element => {
            var row = document.createElement("tr");

            var colID = document.createElement("td")
            colID.appendChild(document.createTextNode(element.id))
            row.appendChild(colID)
    
            var colNome = document.createElement("td")
            colNome.appendChild(document.createTextNode(element.nome))
            row.appendChild(colNome)

            var colDescricao = document.createElement("td")
            colDescricao.appendChild(document.createTextNode(element.descricao))
            row.appendChild(colDescricao)

            var colCurso = document.createElement("td")
            colCurso.appendChild(document.createTextNode(element.curso ? element.curso.nome : ''))
            row.appendChild(colCurso)
            
            /*var colEtapa = document.createElement("td")
            colEtapa.appendChild(document.createTextNode(element.etapacurso ? element.etapacurso.nome : ''))
            row.appendChild(colEtapa)*/
            
            //botão para exibir lista de etapa curso
            var colEtapa = document.createElement("td")
            colEtapa.setAttribute("onclick", "openPopupView("+element.id+")")
            var etapaLink = document.createElement("a")
            var imgEye = document.createElement("img")
            imgEye.setAttribute("src", "../images/botao_ver.png")
            etapaLink.appendChild(imgEye)
            
            colEtapa.appendChild(etapaLink)
            row.appendChild(colEtapa)

            var colRemover = document.createElement("td")
            colRemover.setAttribute("onclick", "openPopup("+element.id+")")
            var removerLink = document.createElement("a")
            var imgRemove = document.createElement("img")
            imgRemove.setAttribute("src", "../images/excluir2.png")
            removerLink.appendChild(imgRemove)
            
            colRemover.appendChild(removerLink)
            row.appendChild(colRemover)
            
            var colEditar = document.createElement("td")
            colEditar.setAttribute("onclick", "openEditPopup("+element.id+")")
            var editarLink = document.createElement("a")
            var imgEditar = document.createElement("img")
            imgEditar.setAttribute("src", "../images/botao-editar2.png")
            editarLink.appendChild(imgEditar)
            
            colEditar.appendChild(editarLink)
            row.appendChild(colEditar)
            
    
            tableBody.appendChild(row)
            console.log(element)
        });
    }
}

let etapasSelecionadas = []

function getEtapas(){
    let etapa = document.getElementsByName("etapa")

    for(var i=0; i<etapa.length; i++){
        if(etapa[i].checked){
            console.log("etapas: " + etapa[i].value);
            etapasSelecionadas.push(etapa[i].value);
        }
    }

    console.log(etapasSelecionadas)
}

function setCursos() {

    get('curso').then(cursos=>{
        console.log('Cursos ', cursos)

        var multiCombo = document.getElementById('cursoAdd')
        var multiComboEdit = document.getElementById('cursoEdit')
        cursos.forEach(tipo=>{
            let option = document.createElement('option')
            option.value = tipo.id
            option.innerHTML = tipo.nome

            multiCombo.appendChild(option)

            let optionEdit = document.createElement('option')
            optionEdit.value = tipo.id
            optionEdit.innerHTML = tipo.nome

            multiComboEdit.appendChild(optionEdit)
            
        })
    }).catch(error=>{
        console.log('Error ', error)
    })
}

function setEtapasCurso() {
    //console.log("Chamando etapa cursos")
    get('etapaCurso').then(etapascursos=>{
        console.log('Etapas do curso ', etapascursos)

        var multiCombo = document.getElementById('etapas')
        var multiComboEdit = document.getElementById('etapasEdit')
        etapascursos.forEach(tipo=>{
            //setando as etapa cursos no checkbox
            var option = document.createElement("LABEL")
            var broke = document.createElement("BR")
            var check = document.createElement("INPUT")
            check.setAttribute("type", "checkbox");
            option.value = tipo.id
            option.innerHTML = tipo.nome
            check.value = tipo.id
            check.innerHTML = tipo.nome

            multiCombo.appendChild(check)
            multiCombo.appendChild(option)
            multiCombo.appendChild(broke)
            

            let optionEdit = document.createElement('LABEL')
            var broke = document.createElement("BR")
            var check = document.createElement("INPUT")
            check.setAttribute("type", "checkbox");
            optionEdit.value = tipo.id
            optionEdit.innerHTML = tipo.nome
            check.value = tipo.id
            check.innerHTML = tipo.nome

            multiComboEdit.appendChild(check)
            multiComboEdit.appendChild(optionEdit)
            multiComboEdit.appendChild(broke)
            
        })
    }).catch(error=>{
        console.log('Error ', error)
    })
}

function stopPropagation(event){
    event.stopPropagation();
}

function openAddPopup(){
    popupAdd.classList.add("openAddPopup");
}

function closeAddPopup(){
    popupAdd.classList.remove("openAddPopup");

}

function openPopupView(id){
    teladisabled()
    this.selectedId = id
    popupEye.classList.add("popupEditView");
}

function openPopup(id){
    teladisabled()
    this.selectedId = id
    popup.classList.add("open_popup");
}

function teladisabled(){
    telaDesativada.classList.add("disabled_tela");
    backdrop.classList.add("disabled_tela");
}

function getindex(x){
    globalThis.Index = x.rowIndex;
}

function telaEnabled(){
    telaDesativada.classList.remove("disabled_tela");
    backdrop.classList.remove("disabled_tela");
}

function closePopupView(){
    popupEye.classList.remove("popupEditView");
}

function closePopup(){
    popup.classList.remove("open_popup");
    
}

function openEditPopup(id){
    teladisabled()
    this.selectedId = id
    popupEdit.classList.add("popupEditOpen");
    console.log('Id ',id)
    let usr = this.matrizesList.find(user=>{
        return user.id === id
    })

    console.log('Matriz encontrada', usr)
    
    document.getElementById('nomeMatrizEditar').value = usr.nome
    if(usr.curso){
        document.getElementById('cursoEdit').value = usr.curso ? usr.curso.id : '';
    }
    if(usr.etapacurso){
        document.getElementById('etapaCursoEdit').value = usr.etapacurso ? usr.etapacurso.id : '';
    }
}

var tablee = document.getElementById("itens-table");

function closeEditPopup(){
    popupEdit.classList.remove("popupEditOpen");
}

function adicionar(){

    this.matriz.nome = document.getElementById('nomeMatrizAdd').value;
    this.matriz.descricao = document.getElementById('descricaoMatrizAdd').value;
    /*
        quando tiver o controller de curso e etapa curso descomentar as duas linhas abaixo
    */
    //this.matriz.curso = {id:document.getElementById('cursoAdd').value};
    this.etapas.etapacurso = {id:document.getElementById('etapaCursoAdd').value};
    console.log(this.matriz)

    //se os campos de nome ou de descrição estiverem vazios, não serão salvos
    if(this.matriz.nome != "" && this.matriz.descricao != ""){
        post('salvarMatriz', this.matriz).then(result=>{
            console.log('result', result)
            atualizarTabela()
        }).catch(error=>{
            console.log('error', error)
        })
    }else{console.log('error')}
    this.matriz = {}
    this.etapas = {}

    document.getElementById('nomeMatrizAdd').value = '';
    document.getElementById('descricaoMatrizAdd').value = '';
    //document.getElementById('cursoAdd').value = '';
    document.getElementById('etapaCursoAdd').value = '';
}

function remover(){
    console.log('Deletar ' + this.selectedId)

    get_params('deletarMatriz', {id:this.selectedId}).then(result=>{
        atualizarTabela()
    }).catch(error=>{
    })
}

function buscar(){

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

function editar(){
    let newName = document.getElementById('nomeMatrizEditar').value
    var newDescricao = document.getElementById('descricaoMatrizEditar').value
    /*
        quando tiver o controller de curso e etapa curso descomentar as duas linhas abaixo
    */
    var newCurso = {id:document.getElementById('cursoMatrizEdit').value}
    var newEtapaCurso = {id:document.getElementById('etapaCursoEdit').value}

    console.log(newName)
    console.log(newDescricao)
    /*
        quando tiver o controller de curso e etapa curso descomentar as duas linhas abaixo
    */
    console.log(newCurso)
    console.log(newEtapaCurso)

    this.matriz = this.matrizesList.find(user=>{
        return user.id === this.selectedId
    })
    
    this.matriz.nome = newName;
    this.matriz.descricao = newDescricao;
    /*
        quando tiver o controller de curso e etapa curso descomentar as duas linhas abaixo
    */
    this.matriz.curso = newCurso;
    this.matriz.etapacurso = newEtapaCurso;

    console.log('Nova Matriz Curricular ', this.matriz)
    post('atualizarMatriz', this.matriz).then(result=>{
        console.log('Result ', result)
        this.atualizarTabela()
    }).catch(error=>{
        console.log('Error ', error)
    })
    this.matriz = {}
}

let popupEye = document.getElementById("popupView");
let popup = document.getElementById("popupRemove");
let telaDesativada = document.getElementById("tela");
let backdrop = document.getElementById("backdrop");
let popupEdit = document.getElementById("popupEdit");
let popupAdd = document.getElementById("popupAdd");
var tableInteract = document.getElementById("itens-table");
