var selectedId
var professorList = [] 
var professor = {}


atualizarTabela()

function atualizarTabela(){
    get('professor').then(data=>{
    console.log('Data', data)
    this.professorList = data
    this.tableCreate(this.professorList)
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
    let professorEditando = this.professorList.find(user=>{
        return user.id === id
    })

    console.log('Professor achado ', professorEditando)
                
    document.getElementById('professorNomeedit').value = professorEditando.nome
    document.getElementById('professorEmailedit').value = professorEditando.email
    document.getElementById('professorTelefoneedit').value = professorEditando.telefone
    document.getElementById('professorCPFedit').value = professorEditando.cpf
    document.getElementById('professorDataDeNascimentoedit').value = professorEditando.dataDeNascimento
    document.getElementById('professorSiapeedit').value = professorEditando.siape
}

function closeEditPopup(){
    popupEdit.classList.remove("popupEditOpen");
}

function adicionar(){
    this.professor.nome = document.getElementById('professorNomeadd').value;
    this.professor.email = document.getElementById('professorEmailadd').value;
    this.professor.telefone = document.getElementById('professorTelefoneadd').value;
    this.professor.cpf = document.getElementById('professorCPFadd').value;
    this.professor.dataDeNascimento = document.getElementById('professorDataDeNascimentoadd').value;
    this.professor.siape = document.getElementById('professorSiapeadd').value;

    if(verificaCampo()){
        return exibirPopUpErro("Não foi possível atualizar o professor, há algum campo vazio.");
    }

    //se os campos de nome ou de cpf estiverem vazios, não serão salvos 
    if(this.professor.nome != "" && this.professor.cpf != ""){
        post('salvarProfessor', this.professor).then(result=>{
            console.log('result', result)
            atualizarTabela()
        }).catch(error=>{
            console.log('error', error)
        })
    }else{}

    this.professor = {}

    document.getElementById('professorNomeadd').value = '';
    document.getElementById('professorEmailadd').value = '';
    document.getElementById('professorTelefoneadd').value = '';
    document.getElementById('professorCPFadd').value = '';
    document.getElementById('professorDataDeNascimentoadd').value = '';
    document.getElementById('professorSiapeadd').value = '';

}

function remover(){
    console.log('Deletar ' + this.selectedId)

    get_params('deletarProfessor', {id:this.selectedId}).then(result=>{
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

    if (professor.nome.trim().length <= 0) {
        return true;
    }
    if (professor.email.trim().length <= 0){
        return true;
    }
    if (professor.telefone.trim().length <= 0){
        return true;
    }
    if (professor.cpf.trim().length <= 0){
        return true;
    }
    if (professor.siape.trim().length <= 0){
        return true;
    }

    return false;
}

function editar(){

    var nome = document.getElementById("professorNomeedit").value;
    var email = document.getElementById("professorEmailedit").value;
    var telefone = document.getElementById("professorTelefoneedit").value;
    var cpf = document.getElementById("professorCPFedit").value
    var dataDeNascimento = document.getElementById("professorDataDeNascimentoedit").value
    var siape = document.getElementById("professorSiapeedit").value;


    this.professor = this.professorList.find(user=>{
        return user.id === this.selectedId
    })

    this.professor.nome = nome
    this.professor.email = email
    this.professor.telefone = telefone
    this.professor.cpf = cpf
    this.professor.dataDeNascimento = dataDeNascimento
    this.professor.siape = siape

    if(verificaCampo()){
        return exibirPopUpErro("Não foi possível atualizar o professor, há algum campo vazio.");
    }

    console.log('Novo professor ', this.professor)
    put('atualizarProfessor', this.professor).then(result=>{
        console.log('Result ', result)
        this.atualizarTabela()
    }).catch(error=>{
        console.log('Error ', error)
    })

    this.professor = {}

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