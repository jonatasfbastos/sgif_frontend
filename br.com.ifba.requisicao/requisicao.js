var selectedId
var selectedIdEdit
var requisicaoList = [] 
var requisicao = {}
var itensList = [] 
var itens = {}
var item = {}
var relatorios = {}
var relatorio = {}

const endpoints = {
    getAllRequests: "requisicoes",
    getAllItems: "itens",
    getAllSectors :"setores",
    getAllMonthlyReports: "relatorios-mensais",
    updateRequest: "requisicoes/requisicao",
    saveRequest: "requisicoes/requisicao",
    saveItem: "itens/item",
    saveMonthlyReport: "relatorios-mensais/relatorio-mensal",
    deleteRequestById: "requisicoes/requisicao/"
};


setItens()
setItensEdit()
setSetores()
atualizarTabela()
function atualizarTabela(){
    get(endpoints.getAllRequests).then(data=>{
    console.log('requisicoes', data)
    this.requisicaoList = data
    this.tableCreate(this.requisicaoList)
        }).catch(error=>{
        console.log('Error ', error)
    })
}

atualizarTabelaItens()
function atualizarTabelaItens(){
    get(endpoints.getAllItems).then(data=>{
    console.log('Data', data)
    this.itensList = data
    this.tableCreateItens(this.itensList)
        }).catch(error=>{
        console.log('Error ', error)
    })
}

atualizarTabelaItensEdit()
function atualizarTabelaItensEdit(){
    get(endpoints.getAllItems).then(data=>{
    console.log('Data', data)
    this.itensList = data
    this.tableCreateEdit(this.itensList)
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
        
        var colNumReq = document.createElement("td")
        colNumReq.appendChild(document.createTextNode(element.id))
        row.appendChild(colNumReq)

        var colUsuReq = document.createElement("td")
        colUsuReq.appendChild(document.createTextNode(element.requisitante))
        row.appendChild(colUsuReq)

        var colDescricao = document.createElement("td")
        colDescricao.appendChild(document.createTextNode(element.setor ? element.setor.nome : ''))
        row.appendChild(colDescricao)

        var colNomeITem = document.createElement("td")
        colNomeITem.appendChild(document.createTextNode(element.itens.nome))
        row.appendChild(colNomeITem)
        
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

function setItens() {

    get(endpoints.getAllItems).then(itens=>{
        console.log('Itens ', itens)

        var multiCombo = document.getElementById('Item')

        itens.forEach(tipo=>{
            let option = document.createElement('option')
            option.value = tipo.id
            option.innerHTML = tipo.nome

            multiCombo.appendChild(option)        
        })
    }).catch(error=>{
        console.log('Error ', error)
    })
}

function setItensEdit() {

    get(endpoints.getAllItems).then(itens=>{
        console.log('Itens ', itens)

        var multiComboEdit = document.getElementById('EditItem')

        itens.forEach(tipo=>{
            let option = document.createElement('option')
            option.value = tipo.id
            option.innerHTML = tipo.nome

            multiComboEdit.appendChild(option)        
        })
    }).catch(error=>{
        console.log('Error ', error)
    })
}


function setSetores() {

    get(endpoints.getAllSectors).then(setor=>{
        console.log('Setores ', setor)

        var multiCombo = document.getElementById('Setor')
        var multiComboEdit = document.getElementById('EditSetor')
        setor.forEach(tipo=>{
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

function tableCreateItens(data){
    var tableBody2 = document.getElementById('table-body2');
    if(tableBody2){
        tableBody2.innerHTML = ''
        data.forEach(element => {
        var row = document.createElement("tr");
        
        var colNome = document.createElement("td")
        colNome.appendChild(document.createTextNode(element.nome))
        row.appendChild(colNome)

        var colQuantidade = document.createElement("td")
        colQuantidade.appendChild(document.createTextNode(element.quantidade))
        row.appendChild(colQuantidade)

        var colFornecedor = document.createElement("td")
        colFornecedor.appendChild(document.createTextNode(element.fornecedor ? element.fornecedor.nome: ''))
        row.appendChild(colFornecedor)
        
        tableBody2.appendChild(row)
    });
    }
}

function tableCreateEdit(data){
    var tableBody3 = document.getElementById('table-body3');
    if(tableBody3){
        tableBody3.innerHTML = ''
        data.forEach(element => {
        var row = document.createElement("tr");
        
        var colNome = document.createElement("td")
        colNome.appendChild(document.createTextNode(element.nome))
        row.appendChild(colNome)

        var colQuantidade = document.createElement("td")
        colQuantidade.appendChild(document.createTextNode(element.quantidade))
        row.appendChild(colQuantidade)

        var colFornecedor = document.createElement("td")
        colFornecedor.appendChild(document.createTextNode(element.fornecedor ? element.fornecedor.nome: ''))
        row.appendChild(colFornecedor)
        
        tableBody3.appendChild(row)
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
    this.selectedIdEdit = id
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

function closeEditPopup(){
    popupEdit.classList.remove("popupEditOpen");
}

function openForm(id) {
    teladisabled()
    this.selectedId = id
    this.selectedIdEdit = id
    document.getElementById("myForm").style.display = "block";
    console.log('Id ',id)
    let usr = this.requisicaoList.find(requisicao=>{
        return requisicao.id === id
    })

    console.log('Requisicao achada ', usr)

    document.getElementById('itemDemonstration').innerHTML = usr.criador.login
    document.getElementById('itemQuantia').innerHTML = usr.quantidadeItensReq
    teladisabled();
    document.getElementById('itemCodSaida').innerHTML = usr.codigoSaida
}
  
  function closeForm() {
    document.getElementById("myForm").style.display = "none";
}

var quantidadeItens

function openEditPopup(id){
    teladisabled()
    atualizarTabelaItensEdit()
    this.selectedId = id
    this.selectedIdEdit = id
    popupEdit.classList.add("popupEditOpen");
    console.log('Id ',id)
    let usr = this.requisicaoList.find(requisicao=>{
        return requisicao.id === id
    })

    quantidadeItens = usr.quantidadeItensReq
    console.log('Requisicao achada ', usr)
    
    document.getElementById('EditqtdReq').value = usr.quantidadeItensReq
    document.getElementById('EditusuReq').value = usr.requisitante
    if(usr.setor){
        document.getElementById('EditSetor').value = usr.setor.id
    }
    if(usr.itens){
       document.getElementById('EditItem').value = usr.itens.id
    }
    teladisabled();
}

function editar(){

    let newRequisitante = document.getElementById('EditusuReq').value;
    let newSetor = document.getElementById('EditSetor').value
    let newitens = document.getElementById('EditItem').value

    this.requisicao = this.requisicaoList.find(req=>{
        return req.id === this.selectedIdEdit
    })

    let newQuantidadeItensReq = document.getElementById('EditqtdReq').value;

    this.requisicao.quantidadeItensReq = newQuantidadeItensReq
    this.requisicao.usuarioRequisitante = newRequisitante
    this.requisicao.setor = {id:newSetor}
    this.requisicao.itens = {id:newitens}
    
    get(endpoints.getAllItems).then(itens=>{
        console.log('Itens ', itens)
        var found = itens.find(element => element.id == document.getElementById('EditItem').value)
        console.log(found)
        let usr = this.requisicaoList.find(requisicao=>{
            return requisicao.id === this.selectedId
        })
        console.log(requisicaoList)
        this.item.id = found.id 
        this.item.nome = found.nome
        this.item.quantidade = found.quantidade + Number(quantidadeItens) - Number(document.getElementById('EditqtdReq').value)
        this.item.descricao = found.descricao
        this.item.fornecedor = found.fornecedor
        this.item.unidadeMedida = found.unidadeMedida
        this.item.alerta = found.alerta
        this.item.criador = found.criador
        this.item.valorItem = found.valorItem
        this.item.tipoDeItem = found.tipoDeItem
        this.item.codigoItem = found.codigoItem
        this.item.validade = found.validade
        this.item.perecivel = found.perecivel
        this.item.quantidadeMinima = found.quantidadeMinima

        post(endpoints.saveItem, this.item).then(result=>{
            console.log('Result ', result)
            atualizarTabelaItens()
        }).catch(error=>{
            console.log('Error ', error)
        })

        get(endpoints.getAllMonthlyReports).then(relatorios=>{
            var founder = relatorios.find(element => element.id == document.getElementById('EditItem').value)
            console.log(founder)
    
            var data = new Date();
            var dia = String(data.getDate()).padStart(2, '0');
            var mes = String(data.getMonth() + 1).padStart(2, '0');
            var ano = data.getFullYear();
            dataAtual = dia + '/' + mes + '/' + ano;
    
            this.relatorio.nome = founder.nome
            this.relatorio.qtdInicial = founder.qtdInicial
            this.relatorio.qtdEntrou = founder.qtdEntrou
            this.relatorio.qtdSaiu = Number(founder.qtdSaiu) + Number(document.getElementById('EditqtdReq').value - Number(quantidadeItens))
            this.relatorio.valorTotal = founder.valorTotal;
            this.relatorio.valorTotalSairam = (found.valorItem*(Number(this.relatorio.qtdSaiu)));
            this.relatorio.data = dataAtual;
            this.relatorio.id = founder.id
            this.relatorio.item = founder.item;
    
            post(endpoints.saveMonthlyReport, this.relatorio ).then(result=>{
                console.log('Result ', result)
            }).catch(error=>{
                console.log('Error ', error)
            })
        })
        

        post(endpoints.saveItem, this.item).then(result=>{
            console.log('Result ', result)
            atualizarTabelaItens()
        }).catch(error=>{
            console.log('Error ', error)
        })

    }).catch(error=>{
        console.log('Error ', error)
    })

    console.log('Nova Requisição ', this.requisicao)
    post(endpoints.saveRequest, this.requisicao).then(result=>{
        console.log('Result ', result)
        this.atualizarTabela()
    }).catch(error=>{
        console.log('Error ', error)
    })
    this.requisicao = {}
}

var codSaida;

function adicionar(){

    let characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMOPQRSTUVWXYZ0123456789!@#$&*"

    const gerarCodigoSaida = () =>{
        let novoCodigo = ""

        for(let i = 0; i < 6; i++){
            let charactersAleatorios = Math.floor(Math.random() * characters.length)
            novoCodigo += characters[charactersAleatorios]
        }
        codSaida = novoCodigo
        console.log(codSaida)
    }

    gerarCodigoSaida()

    get(endpoints.getAllItems).then(itens=>{
        console.log('Itens ', itens)
        var found = itens.find(element => element.id == document.getElementById('Item').value)
        console.log(found)
        this.item.id = found.id
        this.item.nome = found.nome
        this.item.unidadeMedida = found.unidadeMedida
        this.item.alerta = found.alerta
        this.item.criador = found.criador;
        this.item.quantidade = found.quantidade - document.getElementById('qtdReq').value;
        this.item.quantidadeMinima = found.quantidadeMinima
        this.item.descricao = found.descricao
        this.item.fornecedor = found.fornecedor
        this.item.validade = found.validade
        this.item.perecivel = found.perecivel
        this.item.valorItem = found.valorItem
        this.item.tipoDeItem = found.tipoDeItem
        this.item.codigoItem = found.codigoItem

        post(endpoints.saveItem, this.item).then(result=>{
            console.log('Result ', result)
            atualizarTabelaItens()
        }).catch(error=>{
            console.log('Error ', error)
        })

    }).catch(error=>{
        console.log('Error ', error)
    })


    get(endpoints.getAllRequests).then(relatorios=>{
        var founder = relatorios.find(element => element.id == document.getElementById('Item').value)
        console.log(founder)

        get('Item').then(itens=>{
            console.log('Itens ', itens)
            var found = itens.find(element => element.id == document.getElementById('Item').value)
            console.log(found)
            this.item.id = found.id
            this.item.nome = found.nome
            this.item.unidadeMedida = found.unidadeMedida
            this.item.alerta = found.alerta
            this.item.criador = found.criador;
            this.item.quantidade = found.quantidade - document.getElementById('qtdReq').value;
            this.item.quantidadeMinima = found.quantidadeMinima
            this.item.descricao = found.descricao
            this.item.fornecedor = found.fornecedor
            this.item.validade = found.validade
            this.item.perecivel = found.perecivel
            this.item.valorItem = found.valorItem
            this.item.tipoDeItem = found.tipoDeItem
            this.item.codigoItem = found.codigoItem

            var data = new Date();
        var dia = String(data.getDate()).padStart(2, '0');
        var mes = String(data.getMonth() + 1).padStart(2, '0');
        var ano = data.getFullYear();
        dataAtual = dia + '/' + mes + '/' + ano;

        var quantidadeSaiu = document.getElementById('qtdReq').value;
        var qtdSaiuRelatorio = founder.qtdSaiu;
        var nomeRelatorio = founder.nome;

        console.log(quantidadeSaiu)
        console.log(founder.qtdInicial)
        console.log(founder.nome)
        console.log(founder.valorTotal)
        console.log(found.valorItem)
        console.log(Number(quantidadeSaiu))

        this.relatorio.nome = nomeRelatorio
        this.relatorio.qtdInicial = founder.qtdInicial
        this.relatorio.qtdEntrou = founder.qtdEntrou
        this.relatorio.qtdSaiu = Number(quantidadeSaiu) + Number(qtdSaiuRelatorio);
        this.relatorio.valorTotal = founder.valorTotal;
        this.relatorio.valorTotalSairam = (found.valorItem*Number(quantidadeSaiu)) + founder.valorTotalSairam;
        this.relatorio.data = dataAtual;
        this.relatorio.id = founder.id
        this.relatorio.item = founder.item;
    
            post(endpoints.saveItem, this.item).then(result=>{
                console.log('Result ', result)
                atualizarTabelaItens()
            }).catch(error=>{
                console.log('Error ', error)
            })
            

        post(endpoints.saveMonthlyReport, this.relatorio ).then(result=>{
            console.log('Result ', result)
        }).catch(error=>{
            console.log('Error ', error)
        })
    })})  


    this.requisicao.quantidadeItensReq = document.getElementById('qtdReq').value;
    this.requisicao.requisitante = document.getElementById('usuReq').value;
    this.requisicao.setor = {id:document.getElementById('Setor').value};
    this.requisicao.itens = {id:document.getElementById('Item').value};
    this.requisicao.nome = "Req";
    this.requisicao.codigoSaida = codSaida;
    this.requisicao.criador = {id:getUser().id}

    post(endpoints.saveRequest, this.requisicao).then(result=>{
        console.log('result', result)
        atualizarTabela()
    }).catch(error=>{
        console.log('error', error)
    })
    
    this.requisicao = {}
}

function remover(){

    get(endpoints.getAllRequests).then(req=>{
        console.log('Find requisicao ', req)
        const found = req.find(element => element.id == this.selectedId)
        console.log(found)
        var returnValueQtd = found.quantidadeItensReq
        var returnValueId = found.itens.id

        get(endpoints.getAllItems).then(itens=>{
            console.log('Itens ', itens)
            const foundItens = itens.find(element => element.id == returnValueId)
            console.log(foundItens)
            this.item.id = foundItens.id
            this.item.nome = foundItens.nome
            this.item.quantidade = foundItens.quantidade + returnValueQtd
            this.item.descricao = foundItens.descricao
            this.item.fornecedor = foundItens.fornecedor
            this.item.validade = foundItens.validade
            this.item.perecivel = foundItens.perecivel
            this.item.valorItem = foundItens.valorItem
            this.item.tipoDeItem = foundItens.tipoDeItem
            this.item.codigoItem = foundItens.codigoItem
            this.item.unidadeMedida = foundItens.unidadeMedida
            this.item.alerta = foundItens.alerta
            this.item.criador = foundItens.criador;
            this.item.quantidadeMinima = foundItens.quantidadeMinima

    
            post(endpoints.saveItem, this.item).then(result=>{
                console.log('Result ', result)
                atualizarTabelaItens()
            }).catch(error=>{
                console.log('Error ', error)
            })

            get(endpoints.getAllMonthlyReports).then(relatorios=>{
                var founder = relatorios.find(element => element.id == returnValueId)
                console.log(founder)
        
                var data = new Date();
                var dia = String(data.getDate()).padStart(2, '0');
                var mes = String(data.getMonth() + 1).padStart(2, '0');
                var ano = data.getFullYear();
                dataAtual = dia + '/' + mes + '/' + ano;
        
                this.relatorio.nome = founder.nome
                this.relatorio.qtdInicial = founder.qtdInicial
                this.relatorio.qtdEntrou = founder.qtdEntrou
                this.relatorio.qtdSaiu = Number(founder.qtdSaiu) - Number(returnValueQtd)
                this.relatorio.valorTotal = founder.valorTotal;
                this.relatorio.valorTotalSairam = founder.valorTotalSairam - (found.valorItem*(Number(founder.qtdSaiu) - Number(returnValueQtd)));
                this.relatorio.data = dataAtual;
                this.relatorio.id = founder.id
                this.relatorio.item = founder.item;
        
                post(endpoints.saveMonthlyReport, this.relatorio ).then(result=>{
                    console.log('Result ', result)
                }).catch(error=>{
                    console.log('Error ', error)
                })
            })})  
    
        }).catch(error=>{
            console.log('Error ', error)
        })
        
    .catch(error=>{
        console.log('Error ', error)
    })

    console.log('Deletar ' + this.selectedId)

    fecthDelete(`${endpoints.deleteRequestById}${this.selectedId}`).then((result) => {
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
            td = tr[i].getElementsByTagName("td")[3];
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


let popup = document.getElementById("popupRemove");
let telaDesativada = document.getElementById("tela");
let backdrop = document.getElementById("backdrop");
let popupEdit = document.getElementById("popupEdit");
let popupAdd = document.getElementById("popupAdd");
var tableInteract = document.getElementById("itens-table");