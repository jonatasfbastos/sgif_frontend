var selectedId
var disciplinaList = []
var disciplinasValidos = []
var disciplina = {}
var ItemList = [] 

//testando adicionar os itens no disciplina
pegarItens()
function pegarItens(){
    
    get('disciplinas').then(data=>{
    console.log('Data', data)
    this.ItemList = data
    //this.tableCreate(this.ItemList)
    console.log(ItemList)
        }).catch(error=>{
        console.log('Error ', error);
        popupErroExibir(error);
    })
}

atualizarTabela()

function atualizarTabela(){
    get('disciplinas').then(data=>{
    console.log('Data ', data)
    this.disciplinaList = data
    this.tableCreate(this.disciplinaList)
    }).catch(error=>{
        console.log('Error ', error)
        popupErroExibir(error);
    })
    this.disciplinaList = []
}

setProfessor()

function setProfessor() {
    return new Promise((resolve, reject) => {
        get('professores')
            .then(professores => {
                console.log("Professores:", professores);
                var multiCombo = document.querySelector("#professorDisciplinaAdd");
                var multiComboEdit = document.querySelector("#professorDisciplinaEdit");
                multiCombo.innerHTML = '';
                multiComboEdit.innerHTML = '';
                professores.forEach(professor => {
                    let option = document.createElement('option');
                    option.value = professor.id;
                    option.innerHTML = professor.nome;
                    multiCombo.appendChild(option);

                    let optionEdit = document.createElement('option');
                    optionEdit.value = professor.id;
                    optionEdit.innerHTML = professor.nome;
                    multiComboEdit.appendChild(optionEdit);
                });

                resolve(); // Resolvendo a promise após obter os professores
            })
            .catch(error => {
                console.log('Error ', error);
                reject(error); // Rejeitando a promise em caso de erro
            });
    });
}




function tableCreate(data){
    var tableBody = document.getElementById('table-body');
    if(tableBody){
        tableBody.innerHTML = ''
        data.forEach(element => {
            var row = document.createElement("tr");
    
            var colNome = document.createElement("td")
            colNome.innerHTML = element.nome
            row.appendChild(colNome)

            var colDescricao = document.createElement("td")
            colDescricao.innerHTML = element.descricao
            row.appendChild(colDescricao)

            var colCodigo = document.createElement("td")
            colCodigo.innerHTML = element.codigo
            row.appendChild(colCodigo)

            var colCargaHoraria = document.createElement("td")
            colCargaHoraria.innerHTML = element.cargaHoraria
            row.appendChild(colCargaHoraria)

            var colProfessor = document.createElement("td");

            if (element.professor && element.professor.length > 0) {
            var professores = element.professor.map(function (professor) {
                return professor.nome;
            });

            colProfessor.innerHTML = professores.join(",<br>");
            } else {
            colProfessor.innerHTML = "";
            }

            row.appendChild(colProfessor);


            
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
    teladisabled();
    setProfessor();
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

async function openEditPopup(id) {
    teladisabled();
    await setProfessor(); // Aguarda a conclusão da chamada assíncrona para obter os professores
    this.selectedId = id;
    popupEdit.classList.add("popupEditOpen");
    console.log('Id ', id);
    let dcpn = this.disciplinaList.find(disciplina => {
        return disciplina.id === id;
    });

    console.log('disciplina achado ', dcpn);

    document.querySelector("#notaDisciplinaEdit").value = dcpn.nome;
    document.querySelector("#descricaoDisciplinaEdit").value = dcpn.descricao;
    document.querySelector("#codigoDisciplinaEdit").value = dcpn.codigo;
    document.querySelector("#cargaHorariaDisciplinaEdit").value = dcpn.cargaHoraria;

    var professores = Array.isArray(dcpn.professor) ? dcpn.professor.map(p => p.id.toString()) : [];

    $('#professorDisciplinaEdit').val(professores).trigger('change');

}


function closeEditPopup(){
    popupEdit.classList.remove("popupEditOpen");
}

function adicionar(){
    this.disciplina.nome = document.querySelector("#notaDisciplinaAdd").value
    this.disciplina.descricao = document.querySelector("#descricaoDisciplinaAdd").value
    this.disciplina.codigo = document.querySelector("#codigoDisciplinaAdd").value
    this.disciplina.cargaHoraria = document.querySelector("#cargaHorariaDisciplinaAdd").value
    var professoresSelect = document.querySelectorAll("#professorDisciplinaAdd option:checked");
    var professores = [];

    professoresSelect.forEach(function (option) {
    var professor = { id: option.value };
        professores.push(professor);
    });

    this.disciplina.professor = professores;

    

    console.log('disciplina', this.disciplina)
    // this.disciplina.validade = document.getElementById('validadedisciplinaAdd').value;
    // this.disciplina.valor = parseFloat(document.getElementById('valordisciplinaAdd').value);
    // this.disciplina.itens = ItemList;

    //se os campos de nome, valor(valores negativos não serão aceitos) e itens(quando estiver sendo salvo na tela) estiverem vazios, não serão salvos
    //naturalmente sem a validade não salva, então não colocarei no if 
    if(this.disciplina !== null){
        post('salvarDisciplina', this.disciplina).then(result=>{
            console.log('result', result)
            atualizarTabela()   
        }).catch(error=>{
            console.log('error', error);
            popupErroExibir(error);
        })
    }else{ 
        console.log('error');
        popupErroExibir(error);
    }

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
        console.log('error', error)
        popupErroExibir(error);
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
    let newNome = document.querySelector("#notaDisciplinaEdit").value
    let newDescricao = document.querySelector("#descricaoDisciplinaEdit").value
    let newCodigo = document.querySelector("#codigoDisciplinaEdit").value
    let newCargaHoraria = document.querySelector("#cargaHorariaDisciplinaEdit").value


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

   var professoresSelect = document.querySelectorAll("#professorDisciplinaEdit option:checked");
    var professores = [];

    professoresSelect.forEach(function (option) {
    var professor = { id: option.value };
        professores.push(professor);
    });

    this.disciplina.professor = professores;

    console.log('Novo disciplina ', this.disciplina)
    put('atualizarDisciplina', this.disciplina).then(result=>{
        console.log('Result ', result)
        this.atualizarTabela()
    }).catch(error=>{
        console.log('Error ', error);
        popupErroExibir(error);
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


function popupErroExibir(mensagem){
    document.getElementById("popupErro").classList.add("exibirErro");
    document.getElementById("erro").innerText = mensagem;
 }

 function popupErroOcultar(){
    document.getElementById("popupErro").classList.remove("exibirErro");
 }

// select2
jQuery(document).ready(function($) {
    $('.selectProfessorAdd').select2(
        {
            placeholder: "Selecione um professor",
            allowClear: true,
            language: {
                noResults: function() {
                    return "Nenhum resultado encontrado.";
                },
                searching: function() {
                    return "Buscando...";
                }
            },
            sorter: function(data) {
                return data.sort(function(a, b) {
                  return a.text.localeCompare(b.text);
                });
              }
        }
    );   
    $('.selectProfessorEdit').select2(
        {
            placeholder: "Selecione um professor",
            allowClear: true,
            language: {
                noResults: function() {
                    return "Nenhum resultado encontrado.";
                },
                searching: function() {
                    return "Buscando...";
                }
            },
            sorter: function(data) {
                return data.sort(function(a, b) {
                  return a.text.localeCompare(b.text);
                });
              }
        }
    );
});

