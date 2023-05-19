var selectedId
var formulariosList = []
var formulario = {}

atualizarTabela()
setAvaliacoes()

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

            var colAvaliacao = document.createElement("td")
            colAvaliacao.appendChild(document.createTextNode(element.avaliacao ? element.avaliacao.id : ''))
            row.appendChild(colAvaliacao)
            
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

function setAvaliacoes() {

    get('avaliacao').then(avaliacoes=>{
        console.log('Avaliações ', avaliacoes)

        var multiCombo = document.getElementById('avaliacao')
        var multiComboEdit = document.getElementById('avaliacaoEdit')
        avaliacoes.forEach(avaliacao=>{
            let option = document.createElement('option')
            option.value = avaliacao.id
            option.innerHTML = avaliacao.id

            multiCombo.appendChild(option)

            let optionEdit = document.createElement('option')
            optionEdit.value = avaliacao.id
            optionEdit.innerHTML = avaliacao.id

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
    let formulario = this.formulariosList.find(formulario=>{
        return formulario.id === id
    })

    console.log('Formulário achado ', formulario)
    
    document.getElementById('tituloFormularioEditar').value = formulario.titulo;
    document.getElementById('descricaoFormularioEditar').value = formulario.descricao;
    if(formulario.avaliacao){
        document.getElementById('avaliacaoEdit').value = formulario.avaliacao ? formulario.avaliacao.id : '';
    }
}

function openErroPopup(titulo, motivo){
    teladisabled()
    popupErro.classList.add("popupErroOpen");
    document.getElementById('tituloErro').innerText = titulo;
    document.getElementById('infoErro').innerText = motivo;
}

var tablee = document.getElementById("itens-table");

function closeEditPopup(){
    popupEdit.classList.remove("popupEditOpen");
}

function closeErroPopup(){
    popupErro.classList.remove("popupErroOpen");
}

function adicionar(){

    this.formulario.titulo = document.getElementById('tituloFormularioAdd').value;
    this.formulario.descricao = document.getElementById('descricaoFormularioAdd').value;

    this.formulario.avaliacao = {id:document.getElementById('avaliacao').value};

    console.log(this.formulario)

    //se os campos de título ou de descrição estiverem vazios, não serão salvos
    if(this.formulario.titulo != "" && this.formulario.descricao != ""){
        post('salvarFormulario', this.formulario).then(result=>{
            console.log('result', result)
            atualizarTabela()
        }).catch(error=>{
            console.log('error', error)
            openErroPopup('Impossível salvar formulário', 'Erro ao adicionar no banco de dados')
        })
    }else{
        console.log('error')
        openErroPopup('Impossível salvar formulário', 'Preencha os campos')
    }
    this.formulario = {}

    document.getElementById('tituloFormularioAdd').value = '';
    document.getElementById('descricaoFormularioAdd').value = '';
}

function remover(){
    console.log('Deletar ' + this.selectedId)

    get_params('deletarFormulario', {id:this.selectedId}).then(result=>{
        atualizarTabela()
    }).catch(error=>{
        console.log('error', error)
        openErroPopup('Impossível remover formulário', 'Erro ao excluir no banco de dados');
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
    let newTitulo = document.getElementById('tituloFormularioEditar').value
    let newDescricao = document.getElementById('descricaoFormularioEditar').value
    var newAvaliacaoId = {id:document.getElementById('avaliacaoEdit').value}

    console.log(newAvaliacaoId)

    this.formulario = this.formulariosList.find(formulario=>{
        return formulario.id === this.selectedId
    })
    
    this.formulario.titulo = newTitulo;
    this.formulario.descricao = newDescricao;
    this.formulario.avaliacao = newAvaliacaoId;

    console.log('Editar formulario ', this.formulario)
    post('atualizarFormulario', this.formulario).then(result=>{
        console.log('Result ', result)
        this.atualizarTabela()
    }).catch(error=>{
        console.log('Error ', error)
        openErroPopup('Impossível atualizar formulário', 'Erro ao editar no banco de dados');
    })
    this.formulario = {}
}

let popup = document.getElementById("popupRemove");
let telaDesativada = document.getElementById("tela");
let backdrop = document.getElementById("backdrop");
let popupEdit = document.getElementById("popupEdit");
let popupAdd = document.getElementById("popupAdd");
let popupErro = document.getElementById("popupErro");
var tableInteract = document.getElementById("itens-table");
