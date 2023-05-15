var selectedId
var formulariosList = []
var formulario = {}

atualizarTabela()

function atualizarTabela(){
    get('formularios').then(data=>{
    console.log('Data ', data)
    this.formulariosList = data
    this.tableCreate(this.formulariosList)
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
    
            var colTitulo = document.createElement("td")
            colTitulo.appendChild(document.createTextNode(element.titulo))
            row.appendChild(colTitulo)
            
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
    let formulario = this.formulariosList.find(formulario=>{
        return formulario.id === id
    })

    console.log('Formulário achado ', formulario)
    
    document.getElementById('tituloFormularioEditar').value = formulario.titulo;
    document.getElementById('descricaoFormularioEditar').value = formulario.descricao;
}

var tablee = document.getElementById("itens-table");

function closeEditPopup(){
    popupEdit.classList.remove("popupEditOpen");
}

function adicionar(){

    this.formulario.titulo = document.getElementById('tituloFormularioAdd').value;
    this.formulario.descricao = document.getElementById('descricaoFormularioAdd').value;

    this.formulario.pessoa = null;
    console.log(this.formulario)

    //se os campos de título ou de descrição estiverem vazios, não serão salvos
    if(this.formulario.titulo != "" && this.formulario.descricao != ""){
        post('salvarFormulario', this.formulario).then(result=>{
            console.log('result', result)
            atualizarTabela()
        }).catch(error=>{
            console.log('error', error)
        })
    }else{console.log('error')}
    this.formulario = {}

    document.getElementById('tituloFormularioAdd').value = '';
    document.getElementById('descricaoFormularioAdd').value = '';
}

function remover(){
    console.log('Deletar ' + this.selectedId)

    get_params('deletarFormulario', {id:this.selectedId}).then(result=>{
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
    let newTitulo = document.getElementById('tituloFormularioEditar').value
    let newDescricao = document.getElementById('descricaoFormularioEditar').value

    this.formulario = this.formulariosList.find(formulario=>{
        return formulario.id === this.selectedId
    })
    
    this.formulario.titulo = newTitulo;
    this.formulario.descricao = newDescricao;

    console.log('Novo formulario ', this.formulario)
    post('atualizarFormulario', this.formulario).then(result=>{
        console.log('Result ', result)
        this.atualizarTabela()
    }).catch(error=>{
        console.log('Error ', error)
    })
    this.formulario = {}
}

let popup = document.getElementById("popupRemove");
let telaDesativada = document.getElementById("tela");
let backdrop = document.getElementById("backdrop");
let popupEdit = document.getElementById("popupEdit");
let popupAdd = document.getElementById("popupAdd");
var tableInteract = document.getElementById("itens-table");
