//Variveis do script
var selectedId
var modalidadesList = []
var modalidade = {}

//Funcoes
atualizarTabela()

function atualizarTabela(){
    get('modalidades').then(data=>{
    this.modalidadesList = data
    console.log('List Modalidades', this.modalidadesList)
    this.tableCreate(this.modalidadesList)
    }).catch(error=>{
        console.log('Error ', error)
    })
}

function tableCreate(data){
    var tableBody = document.getElementById('table-body');
    if(tableBody){
        tableBody.innerHTML = ''
        data.forEach(element => {
            //Definindo as variaveis correspondentes as colunas da tabela
            var row = document.createElement("tr");
    
            var colNome = document.createElement("td")
            colNome.appendChild(document.createTextNode(element.nome))
            row.appendChild(colNome)

            var colDescricao = document.createElement("td")
            colDescricao.appendChild(document.createTextNode(element.descricao))
            row.appendChild(colDescricao)
            
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

//Funcoes padroes do script
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
    //teladisabled()
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
    //teladisabled()
    this.selectedId = id
    popupEdit.classList.add("popupEditOpen");
    console.log('Id ',id)
    let mod = this.modalidadesList.find(modalidade=>{
        return modalidade.id === id
    })

    console.log('Modalidade encontrada', mod)
    
    document.getElementById('nomeModalidadeEditar').value = mod.nome
    document.getElementById('descricaoModalidadeEditar').value = mod.descricao
}

var tablee = document.getElementById("itens-table");

function closeEditPopup(){
    popupEdit.classList.remove("popupEditOpen");
}

function adicionar(){
    //Definindo as variaveis de modalidade
    this.modalidade.nome = document.getElementById('nomeModalidadeAdd').value;
    this.modalidade.descricao = document.getElementById('descricaoModalidadeAdd').value;
    /*console.log(modalidade)
    console.log(modalidade.id)*/

    //Verificando se os campos nome e descricao estiverem vazios
    post('salvarModalidade', this.modalidade).then(result=>{
        console.log('result', result)
        atualizarTabela()
    }).catch(error=>{
        console.log('error', error)
    })

    /*document.getElementById('nomeModalidadeAdd').value = '';
    document.getElementById('descricaoModalidadeAdd').value = '';*/

    this.modalidade = {}
}

function remover(){
    console.log('Deletar ' + this.selectedId)

    get_params('deletarModalidade', {id:this.selectedId}).then(result=>{
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
    let newName = document.getElementById('nomeModalidadeEditar').value
    var newDescricao = document.getElementById('descricaoModalidadeEditar').value

    console.log(newName)
    console.log(newDescricao)

    this.modalidade = this.modalidadesList.find(modalidade=>{
        return modalidade.id === this.selectedId
    })
    
    this.modalidade.nome = newName;
    this.modalidade.descricao = newDescricao;

    console.log('Nova Modalidade ', this.modalidade)
    post('salvarModalidade', this.modalidade).then(result=>{
        console.log('Result ', result)
        this.atualizarTabela()
    }).catch(error=>{
        console.log('Error ', error)
    })
    this.modalidade = {}
}

let popup = document.getElementById("popupRemove");
let telaDesativada = document.getElementById("tela");
let backdrop = document.getElementById("backdrop");
let popupEdit = document.getElementById("popupEdit");
let popupAdd = document.getElementById("popupAdd");
var tableInteract = document.getElementById("itens-table");