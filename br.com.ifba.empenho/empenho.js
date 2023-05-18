var selectedId
var empenhoList = []
var empenhosValidos = []
var empenho = {}
var ItemList = [] 

//testando adicionar os itens no empenho
pegarItens()
function pegarItens(){
    
    get('Item').then(data=>{
    console.log('Data', data)
    this.ItemList = data
    //this.tableCreate(this.ItemList)
    console.log(ItemList)
        }).catch(error=>{
        console.log('Error ', error)
    })
}

atualizarTabela()

function atualizarTabela(){
    get('empenho').then(data=>{
    console.log('Data ', data)
    this.empenhoList = data
    this.tableCreate(this.empenhoList)
    }).catch(error=>{
        console.log('Error ', error)
    })
    this.empenhoList = []
}

function tableCreate(data){
    var tableBody = document.getElementById('table-body');
    if(tableBody){
        tableBody.innerHTML = ''
        data.forEach(element => {
            var row = document.createElement("tr");
    
            var colNota = document.createElement("td")
            colNota.appendChild(document.createTextNode(element.nota))
            row.appendChild(colNota)

            var colCriador = document.createElement("td")
            colCriador.appendChild(document.createTextNode(element.criador ? element.criador.login : ''))
            row.appendChild(colCriador)
                    
            // var colValidade = document.createElement("td")
            // colValidade.appendChild(document.createTextNode(element.validade))
            // row.appendChild(colValidade)
            
            // var colValor = document.createElement("td")
            // colValor.appendChild(document.createTextNode(element.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })))
            // row.appendChild(colValor)
            
            // var colInfo = document.createElement("td")
            // colInfo.setAttribute("onclick", "openInfoItens("+element.id+")")
            // var infoLink = document.createElement("a")
            // var imgInfo = document.createElement("img")
            // imgInfo.setAttribute("src", "../images/simbolo-de-informacao.png")
            // infoLink.appendChild(imgInfo)
    
            // colInfo.appendChild(infoLink)
            // row.appendChild(colInfo)
            
            
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

// function openInfoItens(id) {
//     teladisabled()
//     this.selectedId = id
//     this.selectedIdEdit = id
//     document.getElementById("infoItensEmpenho").style.display = "block";
//     console.log('Id ',id)
//     let usr = this.ItemList.find(Item=>{
//         return Item.id === id
//     })

//     console.log('Item achado', usr)

//     document.getElementById('nomeItem').innerHTML = usr.nome;
//     document.getElementById('QuantiaItem').innerHTML = usr.quantidade;
//     document.getElementById('quantidadeMinimaItem').innerHTML = usr.quantidadeMinima;
//     document.getElementById('ValidadeItem').innerHTML = usr.dataValidade;
//     document.getElementById('perecivelItem').innerHTML = usr.perecivel;
//     document.getElementById('ValorItem').innerHTML = usr.valorItem;
    

//     teladisabled();
// }

function closeInfoItens() {
    document.getElementById("infoItensEmpenho").style.display = "none";
}

function openEditPopup(id){
    teladisabled()
    this.selectedId = id
    popupEdit.classList.add("popupEditOpen");
    console.log('Id ',id)
    let emp = this.empenhoList.find(empenho=>{
        return empenho.id === id
    })

    console.log('Empenho achado ', emp)
    
    document.getElementById('notaEmpenhoEditar').value = emp.nota
    // document.getElementById('validadeEmpenhoEditar').value = emp.validade
    // document.getElementById('valorEmpenhoEditar').value = emp.valor
    // document.getElementById('itensEmpenhoEditar').value = emp.itens
}

function closeEditPopup(){
    popupEdit.classList.remove("popupEditOpen");
}

function adicionar(){
    this.empenho.nota = document.getElementById('notaEmpenhoAdd').value;
    this.empenho.criador = {id:getUser().id}
    // this.empenho.validade = document.getElementById('validadeEmpenhoAdd').value;
    // this.empenho.valor = parseFloat(document.getElementById('valorEmpenhoAdd').value);
    // this.empenho.itens = ItemList;

    //se os campos de nome, valor(valores negativos não serão aceitos) e itens(quando estiver sendo salvo na tela) estiverem vazios, não serão salvos
    //naturalmente sem a validade não salva, então não colocarei no if 
    if(this.empenho.nota != ""){
        post('salvarEmpenho', this.empenho).then(result=>{
            console.log('result', result)
            atualizarTabela()   
        }).catch(error=>{
            console.log('error', error)
        })
    }else{console.log('error')}

    this.empenho = {}

    document.getElementById('notaEmpenhoAdd').value = '';
    // document.getElementById('validadeEmpenhoAdd').value = '';
    // document.getElementById('valorEmpenhoAdd').value = '';
    // document.getElementById('itensEmpenhoAdd').value = '';
}

function remover(){
    console.log('Deletar ' + this.selectedId)

    get_params('deletarEmpenho', {id:this.selectedId}).then(result=>{
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
    let newNota = document.getElementById('notaEmpenhoEditar').value

    this.empenho = this.empenhoList.find(emp=>{
        return emp.id === this.selectedId
    })
    
    this.empenho.nota = newNota

    console.log('Novo empenho ', this.empenho)
    post('salvarEmpenho', this.empenho).then(result=>{
        console.log('Result ', result)
        this.atualizarTabela()
    }).catch(error=>{
        console.log('Error ', error)
    })
    this.empenho = {}
}

let popup = document.getElementById("popupRemove");
let telaDesativada = document.getElementById("tela");
let backdrop = document.getElementById("backdrop");
let popupEdit = document.getElementById("popupEdit");
let popupAdd = document.getElementById("popupAdd");
var tableInteract = document.getElementById("itens-table");
