var selectedId
var relatorioList = []


atualizarTabela()
function atualizarTabela(){
    get('relatorio').then(data=>{
    console.log('Data', data)
    this.relatorioList = data
    this.tableCreate(this.relatorioList)
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

        var colqtdInicial = document.createElement("td")
        colqtdInicial.appendChild(document.createTextNode(element.qtdInicial))
        row.appendChild(colqtdInicial)

        var colqtdEntrou = document.createElement("td")
        colqtdEntrou.appendChild(document.createTextNode(element.qtdEntrou))
        row.appendChild(colqtdEntrou)

        var colqtdSaiu = document.createElement("td")
        colqtdSaiu.appendChild(document.createTextNode(element.qtdSaiu))
        row.appendChild(colqtdSaiu)

        var colvalorTotal = document.createElement("td")
        colvalorTotal.appendChild(document.createTextNode(element.valorTotal))
        row.appendChild(colvalorTotal)

        var colvalorTotalSairam = document.createElement("td")
        colvalorTotalSairam.appendChild(document.createTextNode(element.valorTotalSairam))
        row.appendChild(colvalorTotalSairam)

        tableBody.appendChild(row)

    });
    }
}

function stopPropagation(event){
    event.stopPropagation();
}

function getindex(x){
    globalThis.Index = x.rowIndex;
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

let popup = document.getElementById("popupRemove");
let telaDesativada = document.getElementById("tela");
let backdrop = document.getElementById("backdrop");
let popupEdit = document.getElementById("popupEdit");
let popupAdd = document.getElementById("popupAdd");
var tableInteract = document.getElementById("itens-table");
