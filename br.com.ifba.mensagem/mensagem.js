var selectedId
var mensagemList = []
var mensagem = {}
var descricaoCa = []
atualizarTabela()

function atualizarTabela(){
    get('mensagem').then(data=>{
    console.log('Data ', data)
    this.mensagemList = data
    this.tableCreate(this.mensagemList)
   // tableCreateDescricao(this.mensagemList.descricao)
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

            var colId = document.createElement("td")
            colId.appendChild(document.createTextNode(element.id))
            row.appendChild(colId)
    
            var colTitulo = document.createElement("td")
            colTitulo.appendChild(document.createTextNode(element.nome))
            row.appendChild(colTitulo)
            
            var colDescricao = document.createElement("td")
            colDescricao.appendChild(document.createTextNode(element.descricao))
            row.appendChild(colDescricao)
            
            /*
            
            
            var colDescricao = document.createElement("td")
            colDescricao.setAttribute("onclick", "openPopupView("+JSON.stringify(element)+")")
            var descricaoLink = document.createElement("a")
            var imgEye = document.createElement("img")
            imgEye.setAttribute("src", "../images/botao_ver.png")
            descricaoLink.appendChild(imgEye)
            
            colDescricao.appendChild(descricaoLink)
            row.appendChild(colDescricao)
            
            */

            var colDataInicio = document.createElement("td")
            colDataInicio.appendChild(document.createTextNode(element.dataInicio))
            row.appendChild(colDataInicio)

            var colDataFim = document.createElement("td")
            colDataFim.appendChild(document.createTextNode(element.dataFim))
            row.appendChild(colDataFim)

               
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
/*
function tableCreateDescricao(data){
    var tableBodyEta = document.getElementById('table-body-etapa');
    let descricaoa = data.descricao;

    if(tableBodyEta){
        tableBodyEta.innerHTML = ''
        for(const chave in descricao) {
            var row = document.createElement("tr");
            descricaoCa.push({id: Number(descricao[chave].id)});

            var colDescricao = document.createElement("td")
            colDescricao.appendChild(document.createTextNode(element.descricao))
            row.appendChild(colDescricao)

            


            tableBodyEta.appendChild(row)
            console.log(element)
        };
        }
}
*/
function stopPropagation(event){
    event.stopPropagation();
}

function openAddPopup(){
    popupAdd.classList.add("openAddPopup");
}

function closeAddPopup(){
    popupAdd.classList.remove("openAddPopup");

}

/*
function openPopupView(mensagem){
    teladisabled()
    tableCreateDescricao(mensagem)
    popupEye.classList.add("popupEditView")
}
*/
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
    let msg = this.mensagemList.find(mensagem=>{
        return mensagem.id === id
    })

    console.log('Mensagem achada ', msg)
    
    document.getElementById('tituloEdit').value = msg.nome
    document.getElementById('descricaoEdit').value = msg.descricao
    document.getElementById('dataInicioEdit').value = msg.dataInicio
    document.getElementById('dataFimEdit').value = msg.dataFim
   
}

var tablee = document.getElementById("itens-table");

function closeEditPopup(){
    popupEdit.classList.remove("popupEditOpen");
}

function adicionar(){

    this.mensagem.nome = document.getElementById('tituloAdd').value;
    this.mensagem.descricao = document.getElementById('descricaoAdd').value;
    this.mensagem.dataInicio = document.getElementById('dataInicioAdd').value;
    this.mensagem.dataFim = document.getElementById('dataFimAdd').value;

    console.log(this.mensagem)
    console.log(this.mensagem.nome)


    
        post('salvarMensagem', this.mensagem).then(result=>{
            console.log('result', result)
            atualizarTabela()
        }).catch(error=>{
            console.log('error', error)
        })

    this.mensagem = {}

    document.getElementById('tituloAdd').value = '';
    document.getElementById('descricaoAdd').value = '';
    document.getElementById('dataInicioAdd').value = '';
    document.getElementById('dataFimAdd').value ='';
}

function remover(){
    console.log('Deletar ' + this.selectedId)

    get_params('deletarMensagem', {id:this.selectedId}).then(result=>{
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
    let newTitulo = document.getElementById('tituloEdit').value
    let newDescricao = document.getElementById('descricaoEdit').value
    let newDataInicio = document.getElementById('dataInicioEdit').value
    let newDataFim = document.getElementById('dataFimEdit').value


    this.mensagem = this.mensagemList.find(user=>{
        return user.id === this.selectedId
    })
    
    this.mensagem.nome = newTitulo;
    this.mensagem.descricao = newDescricao;
    this.mensagem.dataInicio = newDataInicio;
    this.mensagem.dataFim = newDataFim;


    console.log('Nova mensagem ', this.mensagem)
    post('salvarMensagem', this.mensagem).then(result=>{
        console.log('Result ', result)
        this.atualizarTabela()
    }).catch(error=>{
        console.log('Error ', error)
    })
    this.mensagem = {}
}

let popup = document.getElementById("popupRemove");
let telaDesativada = document.getElementById("tela");
let backdrop = document.getElementById("backdrop");
let popupEdit = document.getElementById("popupEdit");
let popupAdd = document.getElementById("popupAdd");
var tableInteract = document.getElementById("itens-table");
