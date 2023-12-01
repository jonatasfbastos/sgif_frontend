var selectedId
var selectedIdEdit
var ItemList = [] 
var item = {}
var relatorio = {}

const endpoints = {
    getAllItems: "itens",
    getItemById: "item/",
    getItemByName: "itens/item",
    getItemsNotBeforeDate: "itens/dataNotBefore",
    getItemsValidAfterDate: "itens/validadeAfter",
    getMonthlyReports: "relatorios-mensais",
    getItemType:"tiposdeitem",
    getAllCommitments: "empenhos",
    getAllSuppliers: "fornecedores",
    updateItem: "itens/item",
    saveItem: "itens/item",
    deleteItemById: "Itens/Item/",
    saveMonthlyReports: "relatorios-mensais/relatorio-mensal",
};


setFornecedor()
setTiposItem()
setEmpenhosItem()
atualizarTabela()
function atualizarTabela(){
    
    get(endpoints.getAllItems).then(data=>{
    console.log('Data', data)
    this.ItemList = data
    this.tableCreate(this.ItemList)
    console.log(ItemList)
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

        var colDescription = document.createElement("td")
        colDescription.appendChild(document.createTextNode(element.nome))
        row.appendChild(colDescription)

        var colCodItem = document.createElement("td")
        colCodItem.appendChild(document.createTextNode(element.codigoItem ? element.codigoItem.nota: ''))
        row.appendChild(colCodItem)
        
        console.log(element.fornecedor?.nome)
        var colFornecedor = document.createElement("td")
        colFornecedor.appendChild(document.createTextNode(element.fornecedor ? element.fornecedor.nome: ''))
        row.appendChild(colFornecedor)

        var colType = document.createElement("td")
        colType.appendChild(document.createTextNode(element.tipoDeItem ? element.tipoDeItem.nome : ''))
        row.appendChild(colType)

        var colCriador = document.createElement("td")
        colCriador.appendChild(document.createTextNode(element.criador ? element.criador.login : ''))
        row.appendChild(colCriador)
        
        tableBody.appendChild(row)

        var colInfo = document.createElement("td")
        colInfo.setAttribute("onclick", "openForm("+element.id+")")
        var infoLink = document.createElement("a")
        var imgInfo = document.createElement("img")
        imgInfo.setAttribute("src", "../images/simbolo-de-informacao.png")
        infoLink.appendChild(imgInfo)

        colInfo.appendChild(infoLink)
        row.appendChild(colInfo)

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

function openForm(id) {
    teladisabled()
    this.selectedId = id
    this.selectedIdEdit = id
    document.getElementById("myForm").style.display = "block";
    console.log('Id ',id)
    let usr = this.ItemList.find(Item=>{
        return Item.id === id
    })

    console.log('Item achado', usr)

    document.getElementById('nomeItem').innerHTML = usr.unidadeMedida;
    document.getElementById('QuantiaItem').innerHTML = usr.quantidade;
    document.getElementById('quantidadeMinimaItem').innerHTML = usr.quantidadeMinima;
    document.getElementById('ValidadeItem').innerHTML = usr.validade;
    document.getElementById('perecivelItem').innerHTML = usr.perecivel;
    document.getElementById('ValorItem').innerHTML = usr.valorItem;
    

    teladisabled();
}
  
  function closeForm() {
    document.getElementById("myForm").style.display = "none";
}

function openEditPopup(id){
    teladisabled()
    this.selectedId = id
    popupEdit.classList.add("popupEditOpen");
    console.log('Id ',id)
    let item = this.ItemList.find(user=>{
        return user.id === id
    })

    quantidadeDeItens = item.quantidade;
    valorDeItens = item.valorItem;

    console.log('Item achado ', item)
    console.log(item.tipoDeItem)
    
    document.getElementById('itemNameEd').value = item.nome;
    document.getElementById('itemDescricaoEd').value = item.unidadeMedida;
    document.getElementById('itemQuantidadeEd').value = item.quantidade;
    document.getElementById('itemQuantidadeMinimaEd').value = item.quantidadeMinima;
    document.getElementById('itemFornecedorEd').value = item.fornecedor ? item.fornecedor.id : '';

    document.getElementById('itemTypeEd').value = item.tipoDeItem ? item.tipoDeItem.id: '';
    document.getElementById('itemPerecivelEd').value = item.perecivel
    document.getElementById('itemValidadeEd').value = item.validade;
    document.getElementById('itemValorEd').value = item.valorItem;
    document.getElementById('itemEmpenhoEd').value = item.codigoItem ? item.codigoItem.id: '';
}

function closeEditPopup(){
    popupEdit.classList.remove("popupEditOpen");
}

function adicionar(){
    this.item.nome = document.getElementById("itemNameAdd").value;
    this.item.unidadeMedida = document.getElementById("itemDescricaoAdd").value;
    this.item.quantidade = document.getElementById("itemQuantidadeAdd").value;
    this.item.quantidadeMinima = document.getElementById("itemQuantidadeMinimaAdd").value;
    this.item.fornecedor = {id:document.getElementById('itemFornecedor').value}
    this.item.validade = document.getElementById('itemValidadeAdd').value;

    this.item.perecivel = document.getElementById('itemPerecivelAdd').value;
    this.item.codigoItem = {id:document.getElementById('itemEmpenho').value}
    this.item.valorItem = document.getElementById('itemValorAdd').value;
    this.item.alerta = document.getElementById('itemAlerta').value;

    this.item.tipoDeItem = {id:document.getElementById('itemType').value}


    this.item.criador = {id:getUser().id}
    
    console.log("item ", item)

    post(endpoints.saveItem, item ).then(result=>{

    var data = new Date();
    var dia = String(data.getDate()).padStart(2, '0');
    var mes = String(data.getMonth() + 1).padStart(2, '0');
    var ano = data.getFullYear();
    dataAtual = dia + '/' + mes + '/' + ano;

    quantidadeRelatorioTotal = document.getElementById('itemValorAdd').value;
    quantidadeRelatorioInicial = document.getElementById("itemQuantidadeAdd").value;

    this.relatorio.nome = document.getElementById("itemNameAdd").value;
    this.relatorio.qtdInicial = document.getElementById("itemQuantidadeAdd").value;
    this.relatorio.qtdEntrou = document.getElementById("itemQuantidadeAdd").value;
    this.relatorio.qtdSaiu = 0;
    this.relatorio.valorTotal = quantidadeRelatorioTotal*quantidadeRelatorioInicial;
    this.relatorio.valorTotalSairam = 0;
    this.relatorio.data = dataAtual;
    this.relatorio.item = {id:result.id};

    console.log("Item de Relatório: ", relatorio)

    post(endpoints.saveMonthlyReports, relatorio ).then(result=>{
        console.log('Result ', result)
        atualizarTabela()
    }).catch(error=>{
        console.log('Error ', error)
    })
        console.log('Result ', result)
        atualizarTabela()
    }).catch(error=>{
        console.log('Error ', error)
    })
}

function remover(){
    console.log('Deletar ' + this.selectedId)


    fetchDelete(`${endpoints.deleteItemById}${this.selectedId}`).then((result) => {
        atualizarTabela();
    }).catch((error)=>{
        console.log(error);
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

function editar(){

    var nome = document.getElementById('itemNameEd').value;
    var tipoDeItem = {id:document.getElementById('itemTypeEd').value}
    var quantidade = document.getElementById('itemQuantidadeEd').value;
    var fornecedor = {id:document.getElementById('itemFornecedorEd').value}
    var quantidadeMinima = document.getElementById('itemQuantidadeMinimaEd').value;
    var descricao = document.getElementById('itemDescricaoEd').value;
    var dataValidade = document.getElementById('itemValidadeEd').value;
    var perecivel = document.getElementById('itemPerecivelEd').value;
    var valorItem = document.getElementById('itemValorEd').value;
    var codigoItem ={id:document.getElementById('itemEmpenhoEd').value}

    console.log(fornecedor)
    
    this.item = this.ItemList.find(user=>{
        return user.id === this.selectedId
    })

    this.item.nome = nome;
    this.item.quantidade = quantidade;
    this.item.tipoDeItem = tipoDeItem;
    this.item.fornecedor = fornecedor;
    this.item.quantidadeMinima = quantidadeMinima;
    this.item.descricao = descricao;
    this.item.validade = dataValidade;
    this.item.perecivel = perecivel;
    this.item.valorItem = valorItem;
    this.item.codigoItem = codigoItem;

    get(endpoints.getMonthlyReports).then(relatorios=>{
        var founder = relatorios.find(element => element.id == this.selectedId)
        console.log(founder)

        var data = new Date();
        var dia = String(data.getDate()).padStart(2, '0');
        var mes = String(data.getMonth() + 1).padStart(2, '0');
        var ano = data.getFullYear();
        dataAtual = dia + '/' + mes + '/' + ano;

        this.relatorio.nome = founder.nome
        this.relatorio.qtdInicial = founder.qtdInicial
        this.relatorio.qtdEntrou = founder.qtdEntrou - Number(quantidadeDeItens) + Number(document.getElementById('itemQuantidadeEd').value)
        this.relatorio.qtdSaiu = founder.qtdSaiu;
        this.relatorio.valorTotal = Number(valorItem) * Number(this.relatorio.qtdEntrou);
        this.relatorio.valorTotalSairam = founder.valorTotalSairam;
        this.relatorio.data = dataAtual;
        this.relatorio.id = founder.id
        this.relatorio.item = founder.item;

        post(endpoints.saveMonthlyReports, this.relatorio ).then(result=>{
            console.log('Result ', result)
        }).catch(error=>{
            console.log('Error ', error)
        })
    })

    console.log('Novo Item user ', this.item)
    post(endpoints.saveItem, this.item).then(result=>{
        console.log('Result ', result)
        this.atualizarTabela()
    }).catch(error=>{
        console.log('Error ', error)
    })
    this.item = {}
}

function setTiposItem(){
    
    get(endpoints.getItemType).then(tipoitem=>{
        console.log('Tipos de item ', tipoitem)
        var multiCombo = document.getElementById('itemType')
        tipoitem.forEach(tipo=>{
            let option = document.createElement('option')
            option.value = tipo.id
            option.innerHTML = tipo.nome

            multiCombo.appendChild(option)
            
        })

        var multiCombo = document.getElementById('itemTypeEd')
        tipoitem.forEach(tipo=>{
            let option = document.createElement('option')
            option.value = tipo.id
            option.innerHTML = tipo.nome

            multiCombo.appendChild(option)
            
        })
    }).catch(error=>{
        console.log('Error ', error)
    })
}

function setEmpenhosItem(){
    
    get(endpoints.getAllCommitments).then(tipoitem=>{
        console.log('Códigos de empenho ', tipoitem)
        var multiCombo = document.getElementById('itemEmpenho')
        tipoitem.forEach(tipo=>{
            let option = document.createElement('option')
            option.value = tipo.id
            option.innerHTML = tipo.nota

            multiCombo.appendChild(option)
            
        })

        var multiCombo = document.getElementById('itemEmpenhoEd')
        tipoitem.forEach(tipo=>{
            let option = document.createElement('option')
            option.value = tipo.id
            option.innerHTML = tipo.nota

            multiCombo.appendChild(option)
            
        })
    }).catch(error=>{
        console.log('Error ', error)
    })
}

function setFornecedor(){
    get(endpoints.getAllSuppliers).then(fornecedores=>{
        console.log('Fornecedores ', fornecedores)
        var multiCombo = document.getElementById('itemFornecedor')
        fornecedores.forEach(forn=>{
            let option = document.createElement('option')
            option.value = forn.id
            option.innerHTML = forn.nome

            multiCombo.appendChild(option)
            
        })
           
        var multiCombo = document.getElementById('itemFornecedorEd')
        fornecedores.forEach(forn=>{
            let option = document.createElement('option')
            option.value = forn.id
            option.innerHTML = forn.nome

            multiCombo.appendChild(option)
            
        })
    }).catch(error=>{
        console.log('Error ', error)
    })
}

        let popup = document.getElementById("popupRemove");
        let telaDesativada = document.getElementById("tela");
        let backdrop = document.getElementById("backdrop");
        let popupEdit = document.getElementById("popupEdit");
        let popupAdd = document.getElementById("popupAdd");
        var tableInteract = document.getElementById("itens-table");