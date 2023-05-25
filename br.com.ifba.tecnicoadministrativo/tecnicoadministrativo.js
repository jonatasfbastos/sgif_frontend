var selectedId
var tecnicoAdministrativoList = [] 
var tecnicoAdministrativo = {}


atualizarTabela()
setFuncao()

function atualizarTabela(){
    get('listarTecnicoAdministrativo').then(data=>{
    console.log('Data', data)
    this.tecnicoAdministrativoList = data
    this.tableCreate(this.tecnicoAdministrativoList)
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

        var colCpf = document.createElement("td")
        colCpf.appendChild(document.createTextNode(element.cpf))
        row.appendChild(colCpf)

        var colDataDeNascimento = document.createElement("td")
        colDataDeNascimento.appendChild(document.createTextNode(element.dataDeNascimento))
        row.appendChild(colDataDeNascimento)
        
        var colsiape = document.createElement("td")
        colsiape.appendChild(document.createTextNode(element.siape))
        row.appendChild(colsiape)

        var colFuncao = document.createElement("td")
        colFuncao.appendChild(document.createTextNode(element.funcao ? element.funcao.nome : ''))
        row.appendChild(colFuncao)
        
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

function setFuncao() {

    get('listarFuncaoServidor').then(funcoes=>{
        console.log('Funcoes ', funcoes)

        var multiCombo = document.getElementById('funcaoadd')
        var multiComboEdit = document.getElementById('funcaoedit')
        funcoes.forEach(fun=>{
            let option = document.createElement('option')
            option.value = fun.id
            option.innerHTML = fun.nome

            multiCombo.appendChild(option)

            let optionEdit = document.createElement('option')
            optionEdit.value = fun.id
            optionEdit.innerHTML = fun.nome

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

var tablee = document.getElementById("itens-table");

function closePopup(){
    popup.classList.remove("open_popup");
}

function openEditPopup(id){
    teladisabled()
    this.selectedId = id
    popupEdit.classList.add("popupEditOpen");
    console.log('Id ',id)
    let tecnicoEditando = this.tecnicoAdministrativoList.find(user=>{
        return user.id === id
    })

    console.log('Técnico achado ', tecnicoEditando)
                
    document.getElementById('tecnicoNomeedit').value = tecnicoEditando.nome
    document.getElementById('tecnicoEmailedit').value = tecnicoEditando.email
    document.getElementById('tecnicoTelefoneedit').value = tecnicoEditando.telefone
    document.getElementById('tecnicoCPFedit').value = tecnicoEditando.cpf
    document.getElementById('tecnicoDataDeNascimentoedit').value = tecnicoEditando.dataDeNascimento
    document.getElementById('tecnicoSiapeedit').value = tecnicoEditando.siape

    if(tecnicoEditando.funcao){
        document.getElementById('funcaoedit').value = tecnicoEditando.funcao ? tecnicoEditando.funcao.id : '';
    }
}

function closeEditPopup(){
    popupEdit.classList.remove("popupEditOpen");
}

function adicionar(){
    this.tecnicoAdministrativo.nome = document.getElementById('tecnicoNomeadd').value;
    this.tecnicoAdministrativo.email = document.getElementById('tecnicoEmailadd').value;
    this.tecnicoAdministrativo.telefone = document.getElementById('tecnicoTelefoneadd').value;
    this.tecnicoAdministrativo.cpf = document.getElementById('tecnicoCPFadd').value;
    this.tecnicoAdministrativo.dataDeNascimento = document.getElementById('tecnicoDataDeNascimentoadd').value;
    this.tecnicoAdministrativo.siape = document.getElementById('tecnicoSiapeadd').value;

    this.tecnicoAdministrativo.funcao = {id:document.getElementById('funcaoadd').value};

    if(verificaCampo()){
        return exibirPopUpErro("Não foi possível atualizar o técnico, há algum campo vazio.");
    }

    //se os campos de nome ou de cpf estiverem vazios, não serão salvos 
    if(this.tecnicoAdministrativo.nome != "" && this.tecnicoAdministrativo.cpf != ""){
        post('salvarTecnicoAdministrativo', this.tecnicoAdministrativo).then(result=>{
            console.log('result', result)
            atualizarTabela()
        }).catch(error=>{
            console.log('error', error)
        })
    }else{}

    this.tecnicoAdministrativo = {}

    document.getElementById('tecnicoNomeadd').value = '';
    document.getElementById('tecnicoEmailadd').value = '';
    document.getElementById('tecnicoTelefoneadd').value = '';
    document.getElementById('tecnicoCPFadd').value = '';
    document.getElementById('tecnicoDataDeNascimentoadd').value = '';
    document.getElementById('tecnicoSiapeadd').value = '';

}

function remover(){
    console.log('Deletar ' + this.selectedId)

    get_params('deletarTecnicoAdministrativo', {id:this.selectedId}).then(result=>{
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

    if (tecnicoAdministrativo.nome.trim().length <= 0) {
        return true;
    }
    if (tecnicoAdministrativo.email.trim().length <= 0){
        return true;
    }
    if (tecnicoAdministrativo.telefone.trim().length <= 0){
        return true;
    }
    if (tecnicoAdministrativo.cpf.trim().length <= 0){
        return true;
    }
    if (tecnicoAdministrativo.siape.trim().length <= 0){
        return true;
    }

    return false;
}

function editar(){

    var nome = document.getElementById("tecnicoNomeedit").value;
    var email = document.getElementById("tecnicoEmailedit").value;
    var telefone = document.getElementById("tecnicoTelefoneedit").value;
    var cpf = document.getElementById("tecnicoCPFedit").value
    var dataDeNascimento = document.getElementById("tecnicoDataDeNascimentoedit").value
    var siape = document.getElementById("tecnicoSiapeedit").value;

    var newTipoId = {id:document.getElementById('funcaoedit').value}

    this.tecnicoAdministrativo = this.tecnicoAdministrativoList.find(user=>{
        return user.id === this.selectedId
    })

    this.tecnicoAdministrativo.nome = nome
    this.tecnicoAdministrativo.email = email
    this.tecnicoAdministrativo.telefone = telefone
    this.tecnicoAdministrativo.cpf = cpf
    this.tecnicoAdministrativo.dataDeNascimento = dataDeNascimento
    this.tecnicoAdministrativo.siape = siape
    this.tecnicoAdministrativo.funcao = newTipoId;

    if(verificaCampo()){
        return exibirPopUpErro("Não foi possível atualizar o técnico, há algum campo vazio.");
    }

    console.log('Novo técnico ', this.tecnicoAdministrativo)
    post('salvarTecnicoAdministrativo', this.tecnicoAdministrativo).then(result=>{
        console.log('Result ', result)
        this.atualizarTabela()
    }).catch(error=>{
        console.log('Error ', error)
    })

    this.tecnicoAdministrativo = {}

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