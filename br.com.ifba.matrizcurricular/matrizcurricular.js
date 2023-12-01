var selectedId
var matrizesList = []
var etapasList = []
var etapasListEdit = []
var mc = {}

const endpoints = {
    getAllCurricularMatrices: "matrizesCurriculares",
    getAllSubjects: "disciplinas",
    getAllCourses: "cursos",
    getAllCourseStages: "etapascurso",
    saveCurricularMatrix: "matrizCurricular",
    updateCurricularMatrix: "matrizesCurriculares/matrizCurricular",
    deleteCurricularMatrixById: "matrizesCurriculares/matrizCurricular/"
};


//showcheckboxes()
mostrarEtapas()
atualizarTabela()
mostrarEtapasEdit()
//setEtapasCurso()
//setDisciplinas()

function atualizarTabela(){
    get(endpoints.getAllCurricularMatrices).then(data=>{
        console.log('Data ', data)
        this.matrizesList = data
        
        data.forEach(item=> {
            console.log("DISC:" + JSON.stringify(item.etapacurso));
            tableCreateEtapa(item.etapacurso)
        })

        this.tableCreate(this.matrizesList)
        
    }).catch(error=>{
        console.log('Error ', error)
    })
}

//tabela de etapa cursos - CASO FOR PRECISO USAR, DESCOMENTE
function tableCreateEtapa(data){
    var tableBodyEta = document.getElementById('table-body-etapa');
    let etapasdaMatriz = data.etapacurso;

    if(tableBodyEta){
        tableBodyEta.innerHTML = ''

        var row = document.createElement("tr");

        for (const chave in etapasdaMatriz) {   
            var colNomeEtapa = document.createElement("td");
            colNomeEtapa.appendChild(document.createTextNode(etapasdaMatriz[chave].nome))
            row.appendChild(colNomeEtapa)

            //tableBodyEta.appendChild(row)
        }

        get(endpoints.getAllSubjects).then(disciplinas=>{
            console.log('Disciplinas ', disciplinas)

            var colNomeDisciplina = document.createElement("td")
            disciplinas.forEach(tipo=>{
                let option = document.createElement('option')
                option.value = tipo.id
                option.innerHTML = tipo.nome

                colNomeDisciplina.appendChild(option)
                row.appendChild(colNomeDisciplina)

            })
            }).catch(error=>{
                console.log('Error ', error)
        })

        tableBodyEta.appendChild(row)
        
    }
}

function tableCreate(data){
    var tableBody = document.getElementById('table-body');
    if(tableBody){
        tableBody.innerHTML = ''
        data.forEach(element => {
            var row = document.createElement("tr");

            var colID = document.createElement("td")
            colID.appendChild(document.createTextNode(element.id))
            row.appendChild(colID)
    
            var colNome = document.createElement("td")
            colNome.appendChild(document.createTextNode(element.nome))
            row.appendChild(colNome)

            var colDescricao = document.createElement("td")
            colDescricao.appendChild(document.createTextNode(element.descricao))
            row.appendChild(colDescricao)

            //botão para exibir lista de etapa curso
            var colEtapa = document.createElement("td")
            colEtapa.setAttribute("onclick", "openPopupView("+JSON.stringify(element)+")")
            var etapaLink = document.createElement("a")
            var imgEye = document.createElement("img")
            imgEye.setAttribute("src", "../images/botao_ver.png")
            etapaLink.appendChild(imgEye)
            
            colEtapa.appendChild(etapaLink)
            row.appendChild(colEtapa)

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

            get(endpoints.getAllCourses).then(cursos=>{
                console.log('Cursos ', cursos)
    
                var colCurso = document.createElement("td")
                cursos.forEach(tipo=>{
                    let option = document.createElement('option')
                    option.value = tipo.id
                    option.innerHTML = tipo.nome
    
                    colCurso.appendChild(option)
                    row.appendChild(colCurso)
    
                })
                }).catch(error=>{
                    console.log('Error ', error)
            })
            
    
            tableBody.appendChild(row)
            console.log(element)
        });
    }
}

function setCursos() {

    get(endpoints.getAllCourses).then(cursos=>{
        console.log('Cursos ', cursos)

        var multiCombo = document.getElementById('cursoAdd')
        var multiComboEdit = document.getElementById('cursoEdit')
        cursos.forEach(tipo=>{
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

function setEtapasCurso() {
    //console.log("Chamando etapa cursos")
    get(endpoints.getAllCourseStages).then(etapascursos=>{
        console.log('Etapas do curso ', etapascursos)

        var multiCombo = document.getElementById('etapasAdd')
        var multiComboEdit = document.getElementById('etapasEdit')
        etapascursos.forEach(tipo=>{
            //setando as etapa cursos no checkbox
            var option = document.createElement("option")
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

function mostrarEtapas(){
    get(endpoints.getAllCourseStages).then(data=>{
        document.getElementById('checkboxes').innerHTML=data.map(item=>`<label ><input type="checkbox" value="${item.id}" class="etapacurso" name="etapacurso" id="etapacurso"/>${item.nome}<label>`).join('');
    }).catch(error=>{
        console.log("Error ", error)
    })
    
}

function mostrarEtapasEdit(){
    get(endpoints.getAllCourseStages).then(data=>{
        document.getElementById('checkboxesEdit').innerHTML=data.map(item=>`<label ><input type="checkbox" value="${item.id}" class="etapacurso" name="etapacurso" id="etapacurso"/>${item.nome}<label>`).join('');
    }).catch(error=>{
        console.log("Error ", error)
    })
    
}

function adicionarEtapas(){
    let etapacurso = document.getElementsByName("etapacurso")

    for(var i=0; i<etapacurso.length; i++){
        if(etapacurso[i].checked){
            console.log("as etapas selecionadas sao: " + etapacurso[i].value);
            etapasList.push({id: Number(etapacurso[i].value)});
        }
    }

    console.log(etapasList)
}

function adicionarEtapasEdit(){
    let etapacursoEdit = document.getElementsByName("etapacurso")

    for(var i=0; i<etapacursoEdit.length; i++){
        if(etapacursoEdit[i].checked){
            console.log("as etapas selecionadas sao: " + etapacursoEdit[i].value);
            etapasListEdit.push({id: Number(etapacursoEdit[i].value)});
        }
    }

    console.log(etapasListEdit)
}

document.getElementById("btn-erro-fechar")
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
}

function verificaCampos(){

    if (mc.nome.trim().length <= 0) {
        return true;
    }
    if (mc.descricao.trim().length <= 0){
        return true;
    }
    
    return false;
}

var expanded = false;
function showcheckboxes(){
    var checkboxes = document.getElementById("checkboxes");
    if(!expanded){
        checkboxes.style.display = "block";
        expanded = true;
    }else{
        checkboxes.style.display = "none";
        expanded = false;
    }
}

var expandedEdit = false;
function showcheckboxesEdit(){
    var checkboxes = document.getElementById("checkboxesEdit");
    if(!expandedEdit){
        checkboxes.style.display = "block";
        expandedEdit = true;
    }else{
        checkboxes.style.display = "none";
        expandedEdit = false;
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

function openPopupView(matrizes){
    teladisabled()
    //this.selectedId = id
    tableCreateEtapa(matrizes)
    popupEye.classList.add("popupEditView");
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

function closePopupView(){
    popupEye.classList.remove("popupEditView");
}

function closePopup(){
    popup.classList.remove("open_popup");
    
}

function openEditPopup(id){
    teladisabled()
    this.selectedId = id
    popupEdit.classList.add("popupEditOpen");
    console.log('Id ',id)
    let usr = this.matrizesList.find(user=>{
        return user.id === id
    })

    console.log('Matriz encontrada', usr)
    
    document.getElementById('nomeMatrizEditar').value = usr.nome
    if(usr.curso){
        document.getElementById('cursoEdit').value = usr.curso ? usr.curso.id : '';
    }
    if(usr.etapacurso){
        document.getElementById('etapaCursoEdit').value = usr.etapacurso ? usr.etapacurso.id : '';
    }
}

var tablee = document.getElementById("itens-table");

function closeEditPopup(){
    popupEdit.classList.remove("popupEditOpen");
}

function adicionar(){

    this.mc.nome = document.getElementById('nomeMatrizAdd').value;
    this.mc.descricao = document.getElementById('descricaoMatrizAdd').value;
    
    //getValoresCheckbox()
    this.mc.etapacurso = etapasList;
    console.log(this.mc)

    if(verificaCampos()){
        return exibirPopUpErro("Não foi possível cadastrar a Matriz, há algum campo vazio.");
    }

    //se os campos de nome ou de descrição estiverem vazios, não serão salvos
    if(this.mc.nome != "" && this.mc.descricao != ""){
        post(endpoints.saveCurricularMatrix, this.mc).then(result=>{
            console.log('result', result)
            atualizarTabela()
        }).catch(error=>{
            console.log('error', error)
        })
    }else{console.log('error')}
    this.mc = {}

    document.getElementById('nomeMatrizAdd').value = '';
    document.getElementById('descricaoMatrizAdd').value = '';
}

function remover(){
    console.log('Deletar ' + this.selectedId)

    fetchDelete(`${endpoints.deleteCurricularMatrixById}${this.selectedId}`).then((result) => {
        atualizarTabela();
    }).catch((error)=>{
        error.text()
        .then(mensagem => exibirPopUpErro("Matriz Curricular não pode ser excluída com Etapa Curso"));
    });
    
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

    let newName = document.getElementById('nomeMatrizEditar').value
    var newDescricao = document.getElementById('descricaoMatrizEditar').value
    //var newEtapaCurso = {id:document.getElementById('etapaCursoEdit').value}

    console.log(newName)
    console.log(newDescricao)
    //console.log(newCurso)
    //console.log(newEtapaCurso)

    this.mc = this.matrizesList.find(user=>{
        return user.id === this.selectedId
    })
    
    this.mc.nome = newName;
    this.mc.descricao = newDescricao;
    //this.mc.curso = newCurso;
    this.mc.etapacurso = etapasListEdit;

    if(verificaCampos()){
        return exibirPopUpErro("Não foi possível atualizar a Matriz, há algum campo vazio.");
    }

    console.log('Nova Matriz Curricular ', this.mc)
    post(endpoints.updateCurricularMatrix, this.mc).then(result=>{
        console.log('Result ', result)
        this.atualizarTabela()
    }).catch(error=>{
        console.log('Error ', error)
    })
    this.mc = {}
}

let popupEye = document.getElementById("popupView");
let popup = document.getElementById("popupRemove");
let telaDesativada = document.getElementById("tela");
let backdrop = document.getElementById("backdrop");
let popupEdit = document.getElementById("popupEdit");
let popupAdd = document.getElementById("popupAdd");
var tableInteract = document.getElementById("itens-table");