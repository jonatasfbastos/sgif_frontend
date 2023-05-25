var selectedId
var cursoList = [] 
var curso = {}
var matrizesList = []
var matriz = {}
var modalidadeList = []
var modalidade = {}

atualizarTabela()
setModalidade()
setMatrizCurricular()

function atualizarTabela(){
    get('curso').then(data=>{
    console.log('Data', data)
    this.cursoList = data
    this.matrizesList = data
    this.tableCreate(this.cursoList)
    this.tableCreateMatriz(this.matrizesList)
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
      
        var colCodigo = document.createElement("td")
        colCodigo.appendChild(document.createTextNode(element.codigo))
        row.appendChild(colCodigo)

        var colSigla = document.createElement("td")
        colSigla.appendChild(document.createTextNode(element.sigla))
        row.appendChild(colSigla)

        var colAtivo = document.createElement("td")
        colAtivo.appendChild(document.createTextNode(element.ativo))
        row.appendChild(colAtivo)

        tableBody.appendChild(row)

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

        
        
        //botão para exibir lista de matriz curricular
        var colMatriz = document.createElement("td")
        colMatriz.setAttribute("onclick", "openPopupView("+element.id+")")
        var matrizLink = document.createElement("a")
        var imgEye = document.createElement("img")
        imgEye.setAttribute("src", "../images/botao_ver.png")
        matrizLink.appendChild(imgEye)
                
        colMatriz.appendChild(matrizLink)
        row.appendChild(colMatriz)
        
        tableBody.appendChild(row)
        console.log(element)

    });
    }
}

//tabela de matrizes curriculares
function tableCreateMatriz(data){
    var tableBodyMatriz = document.getElementById('table-body-matriz');
    if(tableBodyMatriz){
        tableBodyMatriz.innerHTML = ''
        data.forEach(element => {
            var row = document.createElement("tr");

            var colID = document.createElement("td")
            colID.appendChild(document.createTextNode(element.id))
            row.appendChild(colID)
    
            //setando o nome da matriz curricular na tabela das matrizes
            get('matrizCurricular').then(matrizcurricular=>{
                console.log('Matrizes curriculares', matrizcurricular)

                var colNomeMatriz = document.createElement("td")
                matrizcurricular.forEach(tipo=>{
                let option = document.createElement('option')
                option.value = tipo.id
                option.innerHTML = tipo.nome

                colNomeMatriz.appendChild(option)
                row.appendChild(colNomeMatriz)
            
            })
            }).catch(error=>{
                console.log('Error ', error)
            })
    
            tableBodyMatriz.appendChild(row)
            console.log(element)
            
        });
    }
}

let matrizesSelecionadas = []

function getMatrizes(){
    let matriz = document.getElementsByName("matriz")

    for(var i=0; i<matriz.length; i++){
        if(matriz[i].checked){
            console.log("matrizes: " + matriz[i].value);
            matrizesSelecionadas.push(matriz[i].value);
        }
    }

    console.log(matrizesSelecionadas)
}

function setModalidade() {

    get('modalidade').then(modalidade=>{
        console.log('Modalidade', modalidade)

        var multiCombo = document.getElementById('modalidadeAdd')
        var multiComboEdit = document.getElementById('modalidadeEdit')
        modalidade.forEach(tipo=>{
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

function setMatrizes() {
    get('matrizCurricular').then(matrizcurricular=>{
        console.log('Matrizes curriculares', matrizcurricular)

        var multiCombo = document.getElementById('matrizes')
        var multiComboEdit = document.getElementById('matrizesEdit')
        matrizcurricular.forEach(tipo=>{
            //setando as matrizes no checkbox
            var option = document.createElement("LABEL")
            var broke = document.createElement("BR")
            var check = document.createElement("INPUT")
            check.setAttribute("type", "checkbox");
            option.value = tipo.id
            option.innerHTML = tipo.nome
            check.value = tipo.id
            check.innerHTML = tipo.nome

            multiCombo.appendChild(check)
            multiCombo.appendChild(option)
            multiCombo.appendChild(broke)
            

            let optionEdit = document.createElement('LABEL')
            var broke = document.createElement("BR")
            var check = document.createElement("INPUT")
            check.setAttribute("type", "checkbox");
            optionEdit.value = tipo.id
            optionEdit.innerHTML = tipo.nome
            check.value = tipo.id
            check.innerHTML = tipo.nome

            multiComboEdit.appendChild(check)
            multiComboEdit.appendChild(optionEdit)
            multiComboEdit.appendChild(broke)
            
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
/*
function openPopupAdd(){
    popupAdd.classList.add("openAddPopup");
}

function openPopupAdd() {
    const popupAdd = document.getElementById("popupAdd");
    popupAdd.classList.add("popupView");

}
*/
function closeAddPopup(){
    popupAdd.classList.remove("openAddPopup");
}

function openPopup(id){
    teladisabled()
    this.selectedId = id
    popup.classList.add("open_popup");
}

function openPopupView(id){
    teladisabled()
    this.selectedId = id
    popupEye.classList.add("popupEditView");
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

function closePopupView(){
    popupEye.classList.remove("popupEditView");
}


function openPopupEdit(id){
    teladisabled()
    this.selectedId = id
    popupEdit.classList.add("popupEditOpen");
    console.log('Id ',id)
    let cursoEditando = this.cursoList.find(user=>{
        return user.id === id
    })

    console.log('Curso encontrado ', cursoEditando)
                
    document.getElementById('cursoNomeedit').value = cursoEditando.nome
    document.getElementById('cursoCodigoedit').value = cursoEditando.codigo
    document.getElementById('cursoSiglaedit').value = cursoEditando.sigla
    document.getElementById('cursoAtivoedit').value = cursoEditando.ativo

    if(cursoEditando.curso){
        document.getElementById('cursoedit').value = cursoEditando.curso ?cursoEditando.curso.id : '';
    }
}

function closeEditPopup(){
    popupEdit.classList.remove("popupEditOpen");
}

function adicionar(){
    this.curso.nome = document.getElementById('cursoNomeadd').value;
    this.curso.codigo = document.getElementById('cursoCodigoadd').value;
    this.curso.sigla = document.getElementById('cursoSiglaadd').value;
    this.curso.ativo = document.getElementById('cursoAtivoadd').value;

    this.curso.modalidade = {id:document.getElementById('modalidadeadd').value}
    this.matriz.matrizcurricular = {id:document.getElementById('matrizCurricularadd').value}

    if(verificaCampo()){
        return exibirPopUpErro("Não foi possível atualizar o curso, há algum campo vazio.");
    }

    //se os campos de nome ou de codigo estiverem vazios, não serão salvos 
    if(this.curso.nome != "" && this.curso.codigo != ""){
        post('salvarCurso', this.curso).then(result=>{
            console.log('result', result)
            atualizarTabela()
        }).catch(error=>{
            console.log('error', error)
        })
    }else{console.log('error')}
    this.curso = {}
    this.matriz = {}

    document.getElementById('cursoNomeadd').value = '';
    document.getElementById('cursoCodigoadd').value = '';
    document.getElementById('cursoSiglaadd').value = '';
    document.getElementById('cursoAtivoadd').value = '';
    document.getElementById('matrizCurricularadd').value = '';
    document.getElementById('modalidadeadd').value = '';
}

function remover(){
    console.log('Deletar ' + this.selectedId)

    get_params('deletarCurso', {id:this.selectedId}).then(result=>{
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


function verificaCampo(){

    if (curso.nome.trim().length <= 0) {
        return true;
    }
    if (curso.codigo.trim().length <= 0){
        return true;
    }
    if (curso.sigla.trim().length <= 0){
        return true;
    }
    
    

    return false;
}

function editar(){

    var nome = document.getElementById("cursoNomeedit").value;
    var codigo = document.getElementById("cursoCodigoedit").value;
    var sigla = document.getElementById("cursoSiglaedit").value;
    var ativo = document.getElementById("cursoAtivoedit").value;

    this.curso = this.cursoList.find(user=>{
        return user.id === this.selectedId
    })

    this.curso.nome = nome
    this.curso.codigo = codigo
    this.curso.sigla = sigla
    this.curso.ativo = ativo

    if(verificaCampo()){
        return exibirPopUpErro("Não foi possível atualizar o curso, há algum campo vazio.");
    }

    console.log('Novo curso', this.curso)
    post('salvarCurso', this.curso).then(result=>{
        console.log('Result ', result)
        this.atualizarTabela()
    }).catch(error=>{
        console.log('Error ', error)
    })

    this.curso = {}

}

let popup = document.getElementById("popupRemove");
let telaDesativada = document.getElementById("tela");
let backdrop = document.getElementById("backdrop");
let popupEdit = document.getElementById("popupEdit");
let popupAdd = document.getElementById("popupAdd");
var tableInteract = document.getElementById("itens-table");

/*document.getElementById("btn-erro-fechar")
    .addEventListener("click", ocultarPopUpErro);

function exibirPopUpErro(mensagem) {
    const popupErro = document.getElementById("popup-erro");
    popupErro.classList.add("mostrar-popup");
    document.getElementById("erro-mensagem").innerText = mensagem;
}

function ocultarPopUpErro() {
    const popupErro = document.getElementById("popup-erro");
    popupErro.classList.remove("mostrar-popup");
    document.getElementById("erro-mensagem").innerText = "";
}*/