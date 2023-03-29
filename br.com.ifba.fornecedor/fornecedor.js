var selectedId
var fornecedorList = [] 
var fornecedor = {}


atualizarTabela()
function atualizarTabela(){
    get('fornecedor').then(data=>{
    console.log('Data', data)
    this.fornecedorList = data
    this.tableCreate(this.fornecedorList)
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

        var colEmail = document.createElement("td")
        colEmail.appendChild(document.createTextNode(element.email))
        row.appendChild(colEmail)

        var colTelefone = document.createElement("td")
        colTelefone.appendChild(document.createTextNode(element.telefone))
        row.appendChild(colTelefone)

        var colCnpj = document.createElement("td")
        colCnpj.appendChild(document.createTextNode(element.cnpj))
        row.appendChild(colCnpj)
        
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
    let usr = this.fornecedorList.find(user=>{
        return user.id === id
    })

    console.log('Fornecedor achado ', usr)
                
    document.getElementById('fornecedorName').value = usr.nome
    document.getElementById('fornecedorEmail').value = usr.email
    document.getElementById('fornecedorTelefone').value = usr.telefone
    document.getElementById('fornecedorCnpj').value = usr.cnpj
}

function closeEditPopup(){
    popupEdit.classList.remove("popupEditOpen");
}

function adicionar(){
    this.fornecedor.nome = document.getElementById('fornecedorNameAdd').value;
    this.fornecedor.email = document.getElementById('fornecedorEmailAdd').value;
    this.fornecedor.telefone = document.getElementById('fornecedorTelefoneAdd').value;
    this.fornecedor.cnpj = document.getElementById('fornecedorCpnjAdd').value;

    //se os campos de nome ou de cnpj estiverem vazios, não serão salvos 
    if(this.fornecedor.nome != "" && this.fornecedor.cnpj != ""){
        post('salvarFornecedor', this.fornecedor).then(result=>{
            console.log('result', result)
            atualizarTabela()
        }).catch(error=>{
            console.log('error', error)
        })
    }else{}

    this.fornecedor = {}

    document.getElementById('fornecedorNameAdd').value = '';
    document.getElementById('fornecedorEmailAdd').value = '';
    document.getElementById('fornecedorTelefoneAdd').value = '';
    document.getElementById('fornecedorCpnjAdd').value = '';
}

function remover(){
    console.log('Deletar ' + this.selectedId)

    get_params('deletarFornecedor', {id:this.selectedId}).then(result=>{
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

    var nome = document.getElementById("fornecedorName").value;
    var email = document.getElementById("fornecedorEmail").value;
    var telefone = document.getElementById("fornecedorTelefone").value;
    var cnpj = document.getElementById("fornecedorCnpj").value

    this.fornecedor = this.fornecedorList.find(user=>{
        return user.id === this.selectedId
    })

    this.fornecedor.nomee = nome
    this.fornecedor.email = email
    this.fornecedor.telefone = telefone
    this.fornecedor.cnpj = cnpj

    console.log('Novo fornecedor ', this.fornecedor)
    post('salvarFornecedor', this.fornecedor).then(result=>{
        console.log('Result ', result)
        this.atualizarTabela()
    }).catch(error=>{
        console.log('Error ', error)
    })

    this.fornecedor = {}
    
}

let popup = document.getElementById("popupRemove");
let telaDesativada = document.getElementById("tela");
let backdrop = document.getElementById("backdrop");
let popupEdit = document.getElementById("popupEdit");
let popupAdd = document.getElementById("popupAdd");
var tableInteract = document.getElementById("itens-table");
