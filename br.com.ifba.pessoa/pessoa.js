var selectedId
var pessoasList = []
var pessoa = {}

atualizarTabela()

function atualizarTabela(){
    get('pessoas').then(data=>{
    this.pessoasList = data
    console.log('List Pessoas', this.pessoasList)

    this.tableCreate(this.pessoasList)
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
    
            var colnome = document.createElement("td")
            colnome.appendChild(document.createTextNode(element.nome))
            row.appendChild(colnome)

            var coltelefone = document.createElement("td")
            coltelefone.appendChild(document.createTextNode(element.telefone))
            row.appendChild(coltelefone)

            var colemail = document.createElement("td")
            colemail.appendChild(document.createTextNode(element.email))
            row.appendChild(colemail)

            var colcpf = document.createElement("td")
            colcpf.appendChild(document.createTextNode(element.cpf))
            row.appendChild(colcpf)

            var coldataDeNascimento = document.createElement("td")
            coldataDeNascimento.appendChild(document.createTextNode(new Date(element.dataDeNascimento).toLocaleDateString()))
            row.appendChild(coldataDeNascimento)
            
            
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
    this.selectedId = id
    popupEdit.classList.add("popupEditOpen");
    console.log('Id ',id)
    let pess = this.pessoasList.find(pessoa=>{
        return pessoa.id === id
    })

    console.log('Pessoa achado ', pess)
    
    document.getElementById('nomeEdit').value = pess.nome
    document.getElementById('telefoneEdit').value = pess.telefone
    document.getElementById('emailEdit').value = pess.email
    document.getElementById('cpfEdit').value = pess.cpf
    document.getElementById('dataNascimentoEdit').value = new Date(pess.dataDeNascimento).toLocaleDateString()

}

var tablee = document.getElementById("itens-table");

function closeEditPopup(){
    popupEdit.classList.remove("popupEditOpen");
}

function adicionar(){

    this.pessoa.nome = document.getElementById('nomeNew').value;
    this.pessoa.telefone = document.getElementById('telefoneNew').value;
    this.pessoa.email = document.getElementById('emailNew').value;
    this.pessoa.cpf = document.getElementById('cpfNew').value;
    this.pessoa.dataDeNascimento = document.getElementById('dataNascimentoNew').value;

    post('salvarPessoa', this.pessoa).then(result=>{
        console.log('result', result)
        atualizarTabela()
    }).catch(error=>{
        console.log('error', error)
    })
    
    this.pessoa = {}
}

function remover(){
    console.log('Deletar ' + this.selectedId)

    get_params('deletarPessoa', {id:this.selectedId}).then(result=>{
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

function editar(){//Editar aqui

    this.pessoa.nome = document.getElementById('nomeEdit').value;
    this.pessoa.telefone = document.getElementById('telefoneEdit').value;
    this.pessoa.email = document.getElementById('emailEdit').value;
    this.pessoa.cpf = document.getElementById('cpfEdit').value;
    this.pessoa.dataDeNascimento = document.getElementById('dataNascimentoEdit').value;

    this.pessoa = this.pessoasList.find(pessoa=>{
        return pessoa.id === this.selectedId
    })
    console.log('Novo user ', this.pessoa)

    post('salvarPessoa', this.pessoa).then(result=>{
        console.log('Result ', result)
        this.atualizarTabela()
    }).catch(error=>{
        console.log('Error ', error)
    })
    this.pessoa = {}
}

let popup = document.getElementById("popupRemove");
let telaDesativada = document.getElementById("tela");
let backdrop = document.getElementById("backdrop");
let popupEdit = document.getElementById("popupEdit");
let popupAdd = document.getElementById("popupAdd");
var tableInteract = document.getElementById("itens-table");
