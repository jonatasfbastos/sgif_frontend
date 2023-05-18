var selectedId
var usuariosList = []
var usuario = {}

atualizarTabela()
setTiposDeUsuario()

function atualizarTabela(){
    get('usuarios').then(data=>{
    console.log('Data ', data)
    this.usuariosList = data
    this.tableCreate(this.usuariosList)
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
    
            var colLogin = document.createElement("td")
            colLogin.appendChild(document.createTextNode(element.login))
            row.appendChild(colLogin)
            
            var colTipo = document.createElement("td")
            colTipo.appendChild(document.createTextNode(element.perfilUsuario ? element.perfilUsuario.nome : ''))
            row.appendChild(colTipo)
            
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
          
function setTiposDeUsuario() {

    get('perfilusuario').then(tiposdeusuarios=>{
        console.log('Perfis de usuario ', tiposdeusuarios)

        var multiCombo = document.getElementById('tipoUsuario')
        var multiComboEdit = document.getElementById('tipoUsuarioEdit')
        tiposdeusuarios.forEach(tipo=>{
            let option = document.createElement('option')
            option.value = tipo.id
            option.innerHTML = tipo.nome

            multiCombo.appendChild(option)

            let optionEdit = document.createElement('option')
            optionEdit.value = tipo.id
            optionEdit.innerHTML = tipo.nome

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

function closePopup(){
    popup.classList.remove("open_popup");
    
}

function openEditPopup(id){
    teladisabled()
    this.selectedId = id
    popupEdit.classList.add("popupEditOpen");
    console.log('Id ',id)
    let usr = this.usuariosList.find(user=>{
        return user.id === id
    })

    console.log('Usuario achado ', usr)
    
    document.getElementById('loginUsuarioEditar').value = usr.login
    if(usr.tipodeusuario){
        document.getElementById('tipoUsuarioEdit').value = usr.tipodeusuario ? usr.tipodeusuario.id : '';
    }
}

var tablee = document.getElementById("itens-table");

function closeEditPopup(){
    popupEdit.classList.remove("popupEditOpen");
}

function adicionar(){

    this.usuario.login = document.getElementById('loginUsuarioAdd').value;
    this.usuario.senha = document.getElementById('senhaUsuarioAdd').value;

    this.usuario.perfilUsuario = {id:document.getElementById('tipoUsuario').value};
    console.log(this.usuario)

    this.usuario.pessoa = null;
    console.log(this.usuario)


    //se os campos de login ou de senha estiverem vazios, não serão salvos
    if(this.usuario.login != "" && this.usuario.senha != ""){
        post('salvarUsuario', this.usuario).then(result=>{
            console.log('result', result)
            atualizarTabela()
        }).catch(error=>{
            console.log('error', error)
        })
    }else{console.log('error')}
    this.usuario = {}

    document.getElementById('loginUsuarioAdd').value = '';
    document.getElementById('senhaUsuarioAdd').value = '';
}

function remover(){
    console.log('Deletar ' + this.selectedId)

    get_params('deletarUsuario', {id:this.selectedId}).then(result=>{
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

function editar(){
    let newLogin = document.getElementById('loginUsuarioEditar').value
    var newTipoId = {id:document.getElementById('tipoUsuarioEdit').value}

    console.log(newTipoId)

    this.usuario = this.usuariosList.find(user=>{
        return user.id === this.selectedId
    })
    
    this.usuario.login = newLogin;
    this.usuario.perfilUsuario = newTipoId;

    console.log('Novo user ', this.usuario)
    post('atualizarUsuario', this.usuario).then(result=>{
        console.log('Result ', result)
        this.atualizarTabela()
    }).catch(error=>{
        console.log('Error ', error)
    })
    this.usuario = {}
}

let popup = document.getElementById("popupRemove");
let telaDesativada = document.getElementById("tela");
let backdrop = document.getElementById("backdrop");
let popupEdit = document.getElementById("popupEdit");
let popupAdd = document.getElementById("popupAdd");
var tableInteract = document.getElementById("itens-table");
