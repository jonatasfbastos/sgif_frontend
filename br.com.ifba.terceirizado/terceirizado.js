var selectedId
var terceirizadosList = []
var terceirizado = {}

const endpoints = {
    getAllTerceirizados: "terceirizados",
    saveTerceirizado: "terceirizados/terceirizado",
    deleteTerceirizadoById: "terceirizados/terceirizado/"
};


atualizarTabela()
setFuncao()

function atualizarTabela(){
    get(endpoints.getAllTerceirizados).then(data=>{
    this.terceirizadosList = data
    console.log('List terceirizados', this.terceirizadosList)

    this.tableCreate(this.terceirizadosList)
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

            var colFuncao = document.createElement("td")
            colFuncao.appendChild(document.createTextNode(element.funcaoTerceirizado ? element.funcaoTerceirizado.nome : ''))
            row.appendChild(colFuncao)

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

function setFuncao() {

    get('listarFuncoesTerceirizado').then(funcoes=>{
        console.log('Funcao Terceirizado ', funcoes)

        var multiCombo = document.getElementById('funcaoadd')
        var multiComboEdit = document.getElementById('funcaoedit')
        funcoes.forEach(func=>{
            let option = document.createElement('option')
            option.value = func.id
            option.innerHTML = func.nome

            multiCombo.appendChild(option)

            let optionEdit = document.createElement('option')
            optionEdit.value = func.id
            optionEdit.innerHTML = func.nome

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
    let terc = this.terceirizadosList.find(terceirizado=>{
        return terceirizado.id === id
    })

    console.log('terceirizado achado ', terc)
    
    document.getElementById('nomeEdit').value = terc.nome
    document.getElementById('telefoneEdit').value = terc.telefone
    document.getElementById('emailEdit').value = terc.email
    document.getElementById('cpfEdit').value = terc.cpf
    document.getElementById('dataNascimentoEdit').value = new Date(terc.dataDeNascimento).toLocaleDateString()

}

var tablee = document.getElementById("itens-table");

function closeEditPopup(){
    popupEdit.classList.remove("popupEditOpen");
}

function adicionar(){

    this.terceirizado.nome = document.getElementById('nomeNew').value;
    this.terceirizado.funcaoTerceirizado = {id:document.getElementById('funcaoadd').value};
    this.terceirizado.telefone = document.getElementById('telefoneNew').value;
    this.terceirizado.email = document.getElementById('emailNew').value;
    this.terceirizado.cpf = document.getElementById('cpfNew').value;
    this.terceirizado.dataDeNascimento = document.getElementById('dataNascimentoNew').value;

    console.log('Jonas', this.terceirizado)

    post(endpoints.saveTerceirizado, this.terceirizado).then(result=>{
        console.log('result', result)
        atualizarTabela()
    }).catch(error=>{
        console.log('error', error)
    })
    
    this.terceirizado = {}
}

function remover(){
    console.log('Deletar ' + this.selectedId)

    fetchDelete(`${endpoints.deleteTerceirizadoById}${this.selectedId}`).then((result) => {
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

function editar(){//Editar aqui

    this.terceirizado.nome = document.getElementById('nomeEdit').value;
    this.terceirizado.funcaoTerceirizado = {id:document.getElementById('funcaoedit').value};
    this.terceirizado.telefone = document.getElementById('telefoneEdit').value;
    this.terceirizado.email = document.getElementById('emailEdit').value;
    this.terceirizado.cpf = document.getElementById('cpfEdit').value;
    this.terceirizado.dataDeNascimento = document.getElementById('dataNascimentoEdit').value;

    this.terceirizado = this.terceirizadosList.find(terceirizado=>{
        return terceirizado.id === this.selectedId
    })
    console.log('Novo user ', this.terceirizado)

    post(endpoints.saveTerceirizado, this.terceirizado).then(result=>{
        console.log('Result ', result)
        this.atualizarTabela()
    }).catch(error=>{
        console.log('Error ', error)
    })
    this.terceirizado = {}
}

let popup = document.getElementById("popupRemove");
let telaDesativada = document.getElementById("tela");
let backdrop = document.getElementById("backdrop");
let popupEdit = document.getElementById("popupEdit");
let popupAdd = document.getElementById("popupAdd");
var tableInteract = document.getElementById("itens-table");
