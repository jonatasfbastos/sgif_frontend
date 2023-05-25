var selectedId
var turmaList = [] 
var turma = {}


atualizarTabela()

function atualizarTabela(){
    get('turma').then(data=>{
    console.log('Data', data)
    this.turmaList = data
    this.tableCreate(this.turmaList)
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
      
        var colCodigo = document.createElement("td")
        colCodigo.appendChild(document.createTextNode(element.codigoTurma))
        row.appendChild(colCodigo)

        var colSigla = document.createElement("td")
        colSigla.appendChild(document.createTextNode(element.sigla))
        row.appendChild(colSigla)

        var colAtiva = document.createElement("td")
        colAtiva.appendChild(document.createTextNode(element.ativa))
        row.appendChild(colAtiva)

        tableBody.appendChild(row)

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

    });
    }
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

var tablee = document.getElementById("itens-table");

function closePopup(){
    popup.classList.remove("open_popup");
}

function openEditPopup(id){
    teladisabled()
    this.selectedId = id
    popupEdit.classList.add("popupEditOpen");
    console.log('Id ',id)
    let turmaEditando = this.turmaList.find(user=>{
        return user.id === id
    })

    console.log('Turma encontrada ', turmaEditando)
                
    document.getElementById('turmaNomeedit').value = turmaEditando.nome
    document.getElementById('turmaCodigoedit').value = turmaEditando.codigoTurma
    document.getElementById('turmaSiglaedit').value = turmaEditando.sigla

    if(turmaEditando.turma){
        document.getElementById('turmaedit').value = turmaEditando.turma ?turmaEditando.turma.id : '';
    }
}

function closeEditPopup(){
    popupEdit.classList.remove("popupEditOpen");
}

function adicionar(){    
    var radios = document.getElementsByName("Ativa");
   
    this.turma = {};
    this.turma.nome = document.getElementById('turmaNomeadd').value;
    this.turma.codigoTurma = document.getElementById('turmaCodigoadd').value;
    this.turma.sigla = document.getElementById('turmaSiglaadd').value;   
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
           this.turma.ativa = radios[i].value;
           break;
        }
     }

    if(verificaCampo()){
        return exibirPopUpErro("Não foi possível atualizar a turma, há algum campo vazio.");
    }

    //se os campos de nome ou de codigo estiverem vazios, não serão salvos 
    if(this.turma.nome != "" && this.turma.codigoTurma != ""){
        post('salvarTurma', this.turma).then(result=>{
            console.log('result', result)
            atualizarTabela()
        }).catch(error=>{
            console.log('error', error)
        })
    }else{}

    this.turma = {}

    document.getElementById('turmaNomeadd').value = '';
    document.getElementById('turmaCodigoadd').value = '';
    document.getElementById('turmaSiglaadd').value = '';
}

function remover(){
    console.log('Deletar ' + this.selectedId)

    get_params('deletarTurma', {id:this.selectedId}).then(result=>{
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
            td = tr[i].getElementsByTagName("td")[0];
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


function verificaCampo(){

    if (turma.nome.trim().length <= 0) {
        return true;
    }
    if (turma.codigoTurma.trim().length <= 0){
        return true;
    }
    if (turma.sigla.trim().length <= 0){
        return true;
    }
    
    

    return false;
}

function editar(){
    var radios = document.getElementsByName("Ativa");

    var nome = document.getElementById("turmaNomeedit").value;
    var codigoTurma = document.getElementById("turmaCodigoedit").value;
    var sigla = document.getElementById("turmaSiglaedit").value;
    var ativa 
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            ativa = radios[i].value;
           break;
        }
    }
    this.turma = this.turmaList.find(user=>{
        return user.id === this.selectedId
    })

    this.turma.nome = nome
    this.turma.codigoTurma = codigoTurma
    this.turma.sigla = sigla
    this.turma.ativa = ativa
    if(verificaCampo()){
        return exibirPopUpErro("Não foi possível atualizar a turma, há algum campo vazio.");
    }

    console.log('Nova turma ', this.turma)
    post('salvarTurma', this.turma).then(result=>{
        console.log('Result ', result)
        this.atualizarTabela()
    }).catch(error=>{
        console.log('Error ', error)
    })

    this.turma = {}

}

let popup = document.getElementById("popupRemove");
let telaDesativada = document.getElementById("tela");
let backdrop = document.getElementById("backdrop");
let popupEdit = document.getElementById("popupEdit");
let popupAdd = document.getElementById("popupAdd");
var tableInteract = document.getElementById("itens-table");

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