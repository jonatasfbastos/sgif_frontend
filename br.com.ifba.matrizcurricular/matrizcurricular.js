var selectedId
var matrizesList = []
var matriz = {}

atualizarTabela()
setCursos()
setEtapasCurso()

function atualizarTabela(){
    get('matrizes').then(data=>{
    console.log('Data ', data)
    this.matrizesList = data
    this.tableCreate(this.matrizesList)
    }).catch(error=>{
        console.log('Error ', error)
    })
}

function tableCreate(data){
    var tableBody = document.getElementById('table-body');
    if(tableBody){
        tableBody.innerHTML = ''
        data.forEach(element => {
            var row = document.createElement("tr");
    
            var colNome = document.createElement("td")
            colNome.appendChild(document.createTextNode(element.nome))
            row.appendChild(colNome)

            var colDescricao = document.createElement("td")
            colDescricao.appendChild(document.createTextNode(element.descricao))
            row.appendChild(colDescricao)

            var colCurso = document.createElement("td")
            colCurso.appendChild(document.createTextNode(element.curso ? element.curso.nome : ''))
            row.appendChild(colCurso)
            
            var colEtapa = document.createElement("td")
            colEtapa.appendChild(document.createTextNode(element.etapacurso ? element.etapacurso.nome : ''))
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

function setCursos() {

    get('curso').then(cursos=>{
        console.log('Cursos ', cursos)

        var multiCombo = document.getElementById('curso')
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

    get('etapaCurso').then(etapascursos=>{
        console.log('Etapas do curso ', etapascursos)

        var multiCombo = document.getElementById('etapaCurso')
        var multiComboEdit = document.getElementById('etapaCursoEdit')
        etapascursos.forEach(tipo=>{
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

function stopPropagation(event){
    event.stopPropagation();
}

function openAddPopup(){
    popupAdd.classList.add("openAddPopup");
}

function closeAddPopup(){
    popupAdd.classList.remove("openAddPopup");

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
    //this.matriz.curso = {id:document.getElementById('curso').value};
    //this.matriz.etapacurso = {id:document.getElementById('etapaCurso').value};
    console.log(this.matriz)

    //this.matriz.pessoa = null;
    //console.log(this.usuario)


    //se os campos de login ou de senha estiverem vazios, não serão salvos
    if(this.matriz.nome != "" && this.matriz.descricao != ""){
        post('salvarMatriz', this.matriz).then(result=>{
            console.log('result', result)
            atualizarTabela()
        }).catch(error=>{
            console.log('error', error)
        })
    }else{console.log('error')}
    this.matriz = {}

    document.getElementById('nomeMatrizAdd').value = '';
    document.getElementById('descricaoMatrizAdd').value = '';
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
    //var newCurso = {id:document.getElementById('cursoMatrizEdit').value}
    //var newEtapaCurso = {id:document.getElementById('etapaCursoEdit').value}

    console.log(newName)
    console.log(newDescricao)
    /*
        quando tiver o controller de curso e etapa curso descomentar as duas linhas abaixo
    */
   //console.log(newCurso)
    //console.log(newEtapaCurso)

    this.matriz = this.matrizesList.find(user=>{
        return user.id === this.selectedId
    })
    
    this.matriz.nome = newName;
    this.matriz.descricao = newDescricao;
    /*
        quando tiver o controller de curso e etapa curso descomentar as duas linhas abaixo
    */
    //this.matriz.curso = newCurso;
    //this.matriz.etapacurso = newEtapaCurso;

    console.log('Nova Matriz Curricular ', this.matriz)
    post('atualizarMatriz', this.matriz).then(result=>{
        console.log('Result ', result)
        this.atualizarTabela()
    }).catch(error=>{
        console.log('Error ', error)
    })
    this.matriz = {}
}

let popup = document.getElementById("popupRemove");
let telaDesativada = document.getElementById("tela");
let backdrop = document.getElementById("backdrop");
let popupEdit = document.getElementById("popupEdit");
let popupAdd = document.getElementById("popupAdd");
var tableInteract = document.getElementById("itens-table");
