var selectedId
var disciplinaList = []
var disciplinasValidos = []
var disciplina = {}
var ItemList = [] 

//testando adicionar os itens no disciplina
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
    get('disciplina').then(data=>{
    console.log('Data ', data)
    this.disciplinaList = data
    this.tableCreate(this.disciplinaList)
    }).catch(error=>{
        console.log('Error ', error)
    })
    this.disciplinaList = []
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
//     document.getElementById("infoItensdisciplina").style.display = "block";
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
    document.getElementById("infoItensdisciplina").style.display = "none";
}

function openEditPopup(id){
    teladisabled()
    this.selectedId = id
    popupEdit.classList.add("popupEditOpen");
    console.log('Id ',id)
    let dcpn = this.disciplinaList.find(disciplina=>{
        return disciplina.id === id
    })

    console.log('disciplina achado ', dcpn)
    
    document.getElementById('notadisciplinaEditar').value = dcpn.nota
    // document.getElementById('validadedisciplinaEditar').value = dcpn.validade
    // document.getElementById('valordisciplinaEditar').value = dcpn.valor
    // document.getElementById('itensdisciplinaEditar').value = dcpn.itens
}

function closeEditPopup(){
    popupEdit.classList.remove("popupEditOpen");
}

function adicionar(){
    this.disciplina.nome = document.getElementById('nomedisciplina').value
    this.disciplina.nota = document.getElementById('notadisciplina').value
    this.disciplina.codigo = document.getElementById('codigodisciplina').value
    this.disciplina.cargaHoraria = document.getElementById('cargaHorariadisciplina').value
    // this.disciplina.validade = document.getElementById('validadedisciplinaAdd').value;
    // this.disciplina.valor = parseFloat(document.getElementById('valordisciplinaAdd').value);
    // this.disciplina.itens = ItemList;

    //se os campos de nome, valor(valores negativos não serão aceitos) e itens(quando estiver sendo salvo na tela) estiverem vazios, não serão salvos
    //naturalmente sem a validade não salva, então não colocarei no if 
    if(this.disciplina == null){
        post('salvarDisciplina', this.disciplina).then(result=>{
            console.log('result', result)
            atualizarTabela()   
        }).catch(error=>{
            console.log('error', error)
        })
    }else{console.log('error')}

    this.disciplina = {}
    // document.getElementById('validadedisciplinaAdd').value = '';
    // document.getElementById('valordisciplinaAdd').value = '';
    // document.getElementById('itensdisciplinaAdd').value = '';
}

function remover(){
    console.log('Deletar ' + this.selectedId)

    get_params('deletarDisciplina', {id:this.selectedId}).then(result=>{
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
    let newNome = document.getElementById('nomedisciplinaEditar').value 
    let newDescricao = document.getElementById('descricaodisciplinaEditar').value
    let newCodigo = document.getElementById('codigodisciplinaEditar').value
    let newCargaHoraria = document.getElementById('cargaHorariadisciplinaEditar').value

    // let newValidade = document.getElementById('validadedisciplinaEditar').value
    // let newValor = document.getElementById('valordisciplinaEditar').value
    //let newItens = document.getElementById('itensdisciplinaEditar').value

    this.disciplina = this.disciplinaList.find(dcpn=>{
        return dcpn.id === this.selectedId
    })
    
    this.disciplina.nome = newNome
    this.disciplina.descricao = newDescricao
    this.disciplina.codigo = newCodigo
    this.disciplina.cargaHoraria = newCargaHoraria
    // this.disciplina.validade = newValidade
    // this.disciplina.valor = newValor
   // this.disciplina.itens = newItens

    console.log('Novo disciplina ', this.disciplina)
    post('salvardisciplina', this.disciplina).then(result=>{
        console.log('Result ', result)
        this.atualizarTabela()
    }).catch(error=>{
        console.log('Error ', error)
    })
    this.disciplina = {}
}

// function gerarRelatorio(){
//     get('disciplinasValidos').then(data=>{
//         this.disciplinasValidos = data
//         console.log('disciplinas validos: ', this.disciplinasValidos)
//         }).catch(error=>{
//             console.log('Error ', error)
//         })
//     _gerarCsv();
// }
  
// var _gerarCsv = function(){
//     var csv = 'id, nota, validade, valorTotal\n';
//     this.disciplinasValidos.forEach(function(row) {
//             csv += row.id;
//             csv += ','+ row.nota;
//             csv += ','+ row.validade;
//             csv += ','+ row.valor;
//             csv += '\n';        
//     });
   
//     var hiddenElement = document.createElement('a');
//     hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
//     hiddenElement.target = '_blank';
//     hiddenElement.download = 'disciplinas Validos.csv';
//     hiddenElement.click();
//     //window.location.reload(true);
// };

let popup = document.getElementById("popupRemove");
let telaDesativada = document.getElementById("tela");
let backdrop = document.getElementById("backdrop");
let popupEdit = document.getElementById("popupEdit");
let popupAdd = document.getElementById("popupAdd");
var tableInteract = document.getElementById("itens-table");
