var selectedId
var funcaoServidorList = [] 
var funcaoServidor = {}

const endpoints = {
    getAllServerFunctions: "funcoesServidor",
    postServerFunction: "funcoesServidor/funcaoServidor",
    putServerFunction: "funcoesServidor/funcaoServidor",
    deleteServerFunction: "funcoesServidor/funcaoServidor/",
};


atualizarTabela()

function atualizarTabela(){   
    get(endpoints.getAllServerFunctions).then(data=>{
    console.log('Data', data)
    this.funcaoServidorList = data
    this.tableCreate(this.funcaoServidorList)
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
        
        var colId = document.createElement("td")
        colId.appendChild(document.createTextNode(element.id))
        row.appendChild(colId)

        var colNome = document.createElement("td")
        colNome.appendChild(document.createTextNode(element.nome))
        row.appendChild(colNome)

        var colDescricao = document.createElement("td")
        colDescricao.appendChild(document.createTextNode(element.descricao))
        row.appendChild(colDescricao)
        
        
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
    let funcao = this.funcaoServidorList.find(funcaoServidor=>{
        return funcaoServidor.id === id
    })

    console.log('Função de servidor encontrada', funcao)
    
    document.getElementById('funcaoServidorNameedit').value = funcao.nome
    document.getElementById('funcaoServidorDescricaoedit').value = funcao.descricao
}

function closeEditPopup(){
    popupEdit.classList.remove("popupEditOpen");
}

function adicionar(){

    this.funcaoServidor.nome = document.getElementById('funcaoServidorNameAdd').value;
    this.funcaoServidor.descricao = document.getElementById('funcaoServidorDescricaoAdd').value;
    

    ////se os campos de nome ou de descrição estiverem vazios, não serão salvos 
    if(this.funcaoServidor.nome != "" && this.funcaoServidor.descricao != ""){
        post(endpoints.postServerFunction, funcaoServidor).then(result=>{
            console.log('result', result)
            atualizarTabela()
        }).catch(error=>{
            console.log('error', error)
        })
    }else{}

    this.funcaoServidor = {}


    document.getElementById('funcaoServidorNameAdd').value = '';
    document.getElementById('funcaoServidorDescricaoAdd').value = '';
}


function remover(){
    console.log('Deletar ' + this.selectedId)

    fetchDelete(`${endpoints.deleteServerFunction}${this.selectedId}`).then((result) => {
        atualizarTabela();
    }).catch((error)=>{
        console.log(error);
    });
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

    var nome = document.getElementById("funcaoServidorNameedit").value;
    var descricao = document.getElementById("funcaoServidorDescricaoedit").value;

    this.funcaoServidor = this.funcaoServidorList.find(funcaoServidor=>{
        return funcaoServidor.id === this.selectedId
    })

    this.funcaoServidor.nome = nome
    this.funcaoServidor.descricao = descricao

    console.log('Novo tipo user ', this.funcaoServidor)
    put(endpoints.postServerFunction, this.funcaoServidor).then(result=>{
        console.log('Result ', result)
        this.atualizarTabela()
    }).catch(error=>{
        console.log('Error ', error)
    })
    this.funcaoServidor = {}
}

let popup = document.getElementById("popupRemove");
let telaDesativada = document.getElementById("tela");
let backdrop = document.getElementById("backdrop");
let popupEdit = document.getElementById("popupEdit");
let popupAdd = document.getElementById("popupAdd");
var tableInteract = document.getElementById("itens-table");

