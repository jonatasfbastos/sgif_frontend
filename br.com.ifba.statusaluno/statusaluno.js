var selectedId
var statusList = []
var statusA = {}

atualizarTabela()

function atualizarTabela(){
    get('status').then(data=>{
        console.log('Data', data)
        this.statusList = data
        this.tableCreate(this.statusList)
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

            
            tableBody.appendChild(row)
                        
            var colVisualizar= document.createElement("td")
            colVisualizar.setAttribute("onclick", "openVerAlunos(" + JSON.stringify(element) + ")")
            var visualizarLink = document.createElement("a")
            var imgVisualizar = document.createElement("img")
            imgVisualizar.setAttribute("src", "../images/botao_ver.png")
            visualizarLink.appendChild(imgVisualizar)
            
            colVisualizar.appendChild(visualizarLink)
            row.appendChild(colVisualizar)
            
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

function openAddPopup(){
    popupAdd.classList.add("openAddPopup");
}

function closeAddPopup(){
    popupAdd.classList.remove("openAddPopup");
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

function openPopup(id){
    this.selectedId = id
    popup.classList.add("open_popup");
}

function closePopup(){
    popup.classList.remove("open_popup");  
}

function openEditPopup(id){
    this.selectedId = id
    popupEdit.classList.add("popupEditOpen");
    console.log('Id ',id)
    let aluno = this.statusList.find(statusA=>{
        return statusA.id === id
    })

    console.log('Status de aluno achado ', aluno)
    
    document.getElementById('Nomeedit').value = aluno.nome
    document.getElementById('Descricaoedit').value = aluno.descricao

}

var tablee = document.getElementById("itens-table");

function closeEditPopup(){
    popupEdit.classList.remove("popupEditOpen");
}

function adicionar(){

    this.statusA.nome = document.getElementById('Nomeadd').value;
    this.statusA.descricao = document.getElementById('Descricaoadd').value;


    if(verificaCampo()){
        return exibirPopUpErro("Não foi possível atualizar o status do aluno, há algum campo vazio.");
    }

    //se os campos de nome ou de cpf estiverem vazios, não serão salvos 
    if(this.statusA.nome != "" && this.statusA.descricao != ""){
    post('salvarStatus', this.statusA).then(result=>{
        console.log('result', result)
        atualizarTabela()
        }).catch(error=>{
            console.log('error', error)
        })
    }else{}
    
    this.statusA = {}

    document.getElementById('Nomeadd').value = '';
    document.getElementById('Descricaoadd').value = '';
}

function remover(){
    console.log('Deletar ' + this.selectedId)

    get_params('deletarStatus', {id:this.selectedId}).then(result=>{
        atualizarTabela();
    }).catch(error=>{
        error.text()
        .then(mensagem => exibirPopUpErro("Status não pode ser excluído, pois existe Aluno cadastrado"));
    });
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

    if (statusA.nome.trim().length <= 0) {
        return true;
    }
    if (statusA.descricao.trim().length <= 0){
        return true;
    }
    
    return false;
}

function editar(){//Editar aqui

    let nome = document.getElementById('Nomeedit').value;
    let descricao = document.getElementById('Descricaoedit').value;


    this.statusA = this.statusList.find(statusA=>{
        return statusA.id === this.selectedId
    })

    this.statusA.nome = nome
    this.statusA.descricao = descricao
    

    if(verificaCampo()){
        return exibirPopUpErro("Não foi possível atualizar o status do aluno, há algum campo vazio.");
    }
    console.log('Novo user ', this.statusA)

    post('salvarStatus', this.statusA).then(result=>{
        console.log('Result ', result)
        this.atualizarTabela()
    }).catch(error=>{
        console.log('Error ', error)
    })
    this.statusA = {}
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

function openVerAlunos(statusAluno) {
    document.getElementById("popup-alunos").classList.add("show-popup");
    let alunosStatus = [];

    get_params('statusAlunos', {id: statusAluno.id})
    .then(data => {
        alunosStatus = data;
        console.log("DATA: ", data);

        data.forEach(aluno => {
            var row = document.createElement("tr");
    
            var colStatus = document.createElement("td")
            colStatus.appendChild(document.createTextNode(statusAluno.nome))
            row.appendChild(colStatus)
    
            var colNome = document.createElement("td")
            colNome.appendChild(document.createTextNode(aluno.nome))
            row.appendChild(colNome)
    
            var colMatricula = document.createElement("td")
            colMatricula.appendChild(document.createTextNode(aluno.matricula))
            row.appendChild(colMatricula)
    
            console.log("ROW:", row);
            tableAlunosBody.appendChild(row)
        });

    }).catch(error => {
            console.log('Error ', error)
    });

    const tableAlunosBody = document.getElementById('table-alunos-body');
    tableAlunosBody.innerHTML = '';

    
}

function fecharAlunos() {
    document.getElementById("popup-alunos").classList.remove("show-popup");
}