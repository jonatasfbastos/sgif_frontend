var selectedId
var funcaoterceirizadosList = []
var funcaoterceirizado = {}

const endpoints = {
    getAllThirdPartyFunctions: "funcoes-terceirizados",
    postThirdPartyFunction: "funcoes-terceirizados/funcao-terceirizado",
    deleteThirdPartyFunction: "funcoes-terceirizados/funcao-terceirizado/"
};


atualizarTabela()

function atualizarTabela(){
    get(endpoints.getAllThirdPartyFunctions).then(data=>{
    this.funcaoterceirizadosList = data
    console.log('List funcaoTerceirizado', this.funcaoterceirizadosList)

    this.tableCreate(data)
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

            var coldescricao = document.createElement("td")
            coldescricao.appendChild(document.createTextNode(element.descricao))
            row.appendChild(coldescricao) 
            
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

            var colFiltrar = document.createElement('td')
            colFiltrar.setAttribute("onclick", "openFiltrarPopup("+JSON.stringify(element)+")")
            var filtrarLink = document.createElement("a")
            var imgFiltrar = document.createElement("img")
            imgFiltrar.setAttribute("src", "../images/botao_ver.png")
            filtrarLink.appendChild(imgFiltrar)
            
            colFiltrar.appendChild(filtrarLink)
            row.appendChild(colFiltrar)
            
    
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
    console.log(this.funcaoterceirizadosList)
    this.selectedId = id
    popupEdit.classList.add("popupEditOpen");
    console.log('Id ',id)
    let funcTerc = this.funcaoterceirizadosList.find(funcaoterceirizado=>{
        return funcaoterceirizado.id === id
    })

    console.log('funcao terceirizado achado ', funcTerc)
    
    document.getElementById('nomeEdit').value = funcTerc.nome
    document.getElementById('descricaoEdit').value = funcTerc.descricao

}

var tablee = document.getElementById("itens-table");

function closeEditPopup(){
    popupEdit.classList.remove("popupEditOpen");
}

function openFiltrarPopup(funcao){
    document.getElementById("popupFiltrar").classList.add("show-popup");

    get_params('filtrarFuncaoTerceirizado', {id: funcao.id})
    .then(data => {
        console.log("DATA: ", data);

        data.forEach(terceirizado => {
            var row = document.createElement("tr");
    
            var colNome = document.createElement("td")
            colNome.appendChild(document.createTextNode(terceirizado.nome))
            row.appendChild(colNome)
    
            var colFuncao = document.createElement("td")
            colFuncao.appendChild(document.createTextNode(funcao.nome))
            row.appendChild(colFuncao)
    
            console.log("ROW:", row);
            tableAlunosBody.appendChild(row)
        });

    }).catch(error => {
            console.log('Error ', error)
    });

    const tableAlunosBody = document.getElementById('table-alunos-body');
    tableAlunosBody.innerHTML = '';

}

var tablee = document.getElementById("itens-table");

function closeFiltrarPopup(){
    document.getElementById("popupFiltrar").classList.remove("show-popup");
}

function adicionar(){

    this.funcaoterceirizado.nome = document.getElementById('nomeNew').value;
    this.funcaoterceirizado.descricao = document.getElementById('descricaoNew').value;

    post(endpoints.postThirdPartyFunction, this.funcaoterceirizado).then(result=>{
        console.log('result', result)
        atualizarTabela()
    }).catch(error=>{
        console.log('error', error)
    })
    
    this.funcaoterceirizado = {}
}

function remover(){
    console.log('Deletar ' + this.selectedId)

    fetchDelete(`${endpoints.deleteThirdPartyFunction}${this.selectedId}`).then((result) => {
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

    this.funcaoterceirizado.nome = document.getElementById('nomeEdit').value;
    this.funcaoterceirizado.descricao = document.getElementById('descricaoEdit').value;

    this.funcaoterceirizado = this.funcaoterceirizadosList.find(funcaoterceirizado=>{
        return funcaoterceirizado.id === this.selectedId
    })
    console.log('Nova funcao de terceirizado ', this.funcaoterceirizado)

    post(endpoints.postThirdPartyFunction, this.funcaoterceirizado).then(result=>{
        console.log('Result ', result)
        this.atualizarTabela()
    }).catch(error=>{
        console.log('Error ', error)
    })
    this.funcaoterceirizado = {}
}

let popup = document.getElementById("popupRemove");
let telaDesativada = document.getElementById("tela");
let backdrop = document.getElementById("backdrop");
let popupEdit = document.getElementById("popupEdit");
let popupAdd = document.getElementById("popupAdd");
let popupFiltrar = document.getElementById("popupFiltrar");
var tableInteract = document.getElementById("itens-table");
