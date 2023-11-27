var selectedId
var EtapaCursoList = [] 
var etapacurso = {}
var disciplinasList = []
var disciplinasListEdit = []
var etapasList = []
var disciplinaCadastradas = []

mostrarDisciplina()
mostrarDisciplinaEdit()
atualizarTabela()
setMatrizCurricular()

function atualizarTabela(){
    
    get('etapascurso').then(data=>{
        console.log('Data', data)
        this.EtapaCursoList = data
        
        data.forEach(item => {
            console.log("DISC:" + JSON.stringify(item.disciplinas));
            tableCreateDisciplina(item.disciplinas)
            
        });
        this.tableCreate(this.EtapaCursoList)
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

        var colNome = document.createElement("td")
        colNome.appendChild(document.createTextNode(element.nome))
        row.appendChild(colNome)

        var colPeriodo = document.createElement("td")
        colPeriodo.appendChild(document.createTextNode(element.periodo))
        row.appendChild(colPeriodo)


        var colCargaHoraria = document.createElement("td")
        colCargaHoraria.appendChild(document.createTextNode(element.cargaHoraria))
        row.appendChild(colCargaHoraria)

        //matriz curricular
        var colMatriz = document.createElement("td")
        colMatriz.appendChild(document.createTextNode(element.matrizCurricular ? element.matrizCurricular.nome : ''))
        row.appendChild(colMatriz)
        
    //disciplina
        var colEtapa = document.createElement("td")
        colEtapa.setAttribute("onclick", "openPopupView("+JSON.stringify(element)+")")
        var etapaLink = document.createElement("a")
        var imgEye = document.createElement("img")
        imgEye.setAttribute("src", "../images/botao_ver.png")
        etapaLink.appendChild(imgEye)
        
        colEtapa.appendChild(etapaLink)
        row.appendChild(colEtapa)

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

    });
    }
}


//tabela de etapa cursos
function tableCreateDisciplina(data){
    var tableBodyEta = document.getElementById('table-body-etapa');
    let disciplinasDaEtapa = data.disciplinas;

    if(tableBodyEta){
        tableBodyEta.innerHTML = ''

        for (const chave in disciplinasDaEtapa) {
            var row = document.createElement("tr");
            disciplinaCadastradas.push({id: Number(disciplinasDaEtapa[chave].id)});

            var colNomeDisciplina = document.createElement("td")
            colNomeDisciplina.appendChild(document.createTextNode(disciplinasDaEtapa[chave].nome))
            row.appendChild(colNomeDisciplina)
            tableBodyEta.appendChild(row)
        }
    }
}

//matriz curricular
function setMatrizCurricular() {
    
    get('matrizesCurriculares').then(matrizCurriculares=>{
        console.log('Matriz curriculares ', matrizCurriculares)
        
        var multiCombo = document.getElementById('matrizCurricular')
        var multiComboEdit = document.getElementById('matrizCurricularEdit')
        matrizCurriculares.forEach(tipo=>{
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


var expanded =false;
function showCheckboxes() {
    let checkboxes = document.getElementById("checkboxes");
    if(!expanded){
        checkboxes.style.display = "block";
        expanded = true;
    }else{
     checkboxes.style.display = "none";   
     expanded = false;
    }
}


var expandedEdit =false;
function showCheckboxesEdit() {
    let checkboxes = document.getElementById("checkboxesEdit");
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


            function openPopupView(etapaCurso){
                teladisabled()
                tableCreateDisciplina(etapaCurso)
                popupEye.classList.add("popupEditView")
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

            var tablee = document.getElementById("itens-table");

            function closePopup(){
                popup.classList.remove("open_popup");
            }

            function openEditPopup(id){
                teladisabled()
                this.selectedId = id
                popupEdit.classList.add("popupEditOpen");
                console.log('Id ',id)
                let etapa = this.EtapaCursoList.find(user=>{
                    return user.id === id
                })

                console.log('Tipo de etapa de curso achado ', etapa)
                
                document.getElementById('etapaCursoName').value = etapa.nome
                document.getElementById('etapaCursoPeriodo').value = etapa.periodo
                document.getElementById('etapaCursoCargaHoraria').value = etapa.cargaHoraria

            }

            function closeEditPopup(){
                popupEdit.classList.remove("popupEditOpen");
            }

            function adicionar(){

                this.etapacurso.nome = document.getElementById('etapaCursoNameAdd').value;               
                this.etapacurso.periodo = Number(document.getElementById('etapaCursoPeriodoAdd').value);
                this.etapacurso.cargaHoraria = Number(document.getElementById('etapaCursoCargaHorariaAdd').value);
                //parte de matriz curricular
                this.etapacurso.matrizCurricular = {id: Number(document.getElementById('matrizCurricular').value)};
                       
                this.etapacurso.disciplinas = disciplinasList;

                console.log("FINAL: ", JSON.stringify(etapacurso));

               if(verificaCampo()){
                    return exibirPopUpErro("Não foi possível cadastrar etapa, há algum campo vazio ou disciplina selecionada ja esta cadastrada em outra etapa.");
                }

                post('salvarEtapaCurso', etapacurso).then(result=>{
                    console.log('result', result)
                    atualizarTabela()
                }).catch(error=>{
                    console.log('error', error)
                })
               

                document.getElementById('etapaCursoNameAdd').value = '';
                document.getElementById('etapaCursoPeriodoAdd').value = '';
                document.getElementById('etapaCursoCargaHorariaAdd').value = '';
            }


            function mostrarDisciplina(){

                get('disciplinas').then(data=>{
                    console.log(data);
                   // if(data.map(item=> item.id) != disciplinaCadastradas.id){
                        document.getElementById('checkboxes').innerHTML=data.map(item=>`<label><input type="checkbox" value="${item.id}" class="disciplinas" name="disciplinas" id="disciplinas"/>${item.nome}</label>`).join('');
                  //  }
                    }).catch(error=>{
                    console.log('Error ', error)
                })

            }


            function adicionarDisciplina(){
                let disciplinas = document.getElementsByName("disciplinas")

                for(var i=0; i<disciplinas.length; i++){
                    if(disciplinas[i].checked){
                        console.log("as disciplinas selecionadas são: "+ disciplinas[i].value);
                        disciplinasList.push({id: Number(disciplinas[i].value)});
                    }
                }

                console.log(disciplinasList)
            }


            function mostrarDisciplinaEdit(){

                get('disciplinas').then(data=>{
                document.getElementById('checkboxesEdit').innerHTML=data.map(item=>`<label><input type="checkbox" value="${item.id}" class="disciplinasEdit" name="disciplinasEdit" id="disciplinasEdit"/>${item.nome}</label>`).join('');
                    }).catch(error=>{
                    console.log('Error ', error)
                })

            }


            function adicionarDisciplinaEdit(){
                let disciplinasEdit = document.getElementsByName("disciplinasEdit")

                for(var i=0; i<disciplinasEdit.length; i++){
                    if(disciplinasEdit[i].checked){
                        console.log("as disciplinas selecionadas são: "+ disciplinasEdit[i].value);
                        disciplinasListEdit.push({id: Number(disciplinasEdit[i].value)});
                    }
                }

                console.log(disciplinasListEdit)
            }

            
            function remover(){
                console.log('Deletar ' + this.selectedId)

                fetchDelete('deletarEtapaCurso/' + this.selectedId)
                .then(result=>{
                    atualizarTabela();
                }).catch(error=>{
                    error.text()
                   .then(mensagem => {
                        exibirPopUpErro(mensagem)
                        console.log(mensagem)
                    });
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

                var nome = document.getElementById("etapaCursoName").value;
                var periodo = document.getElementById("etapaCursoPeriodo").value;
                var cargaHoraria = document.getElementById("etapaCursoCargaHoraria").value;

                var newMatrizId = {id:document.getElementById('matrizCurricularEdit').value}
                console.log(newMatrizId)
                
                this.etapacurso = this.EtapaCursoList.find(user=>{
                    return user.id === this.selectedId
                })

                this.etapacurso.nome = nome;
                this.etapacurso.periodo = periodo;
                this.etapacurso.cargaHoraria = cargaHoraria;
                
                this.etapacurso.matrizCurricular = newMatrizId;

                this.etapacurso.disciplinas = disciplinasListEdit;

                if(verificaCampo()){
                    return exibirPopUpErro("Não foi possível atualizar etapa, há algum campo vazio ou disciplina selecionada ja esta cadastrada em outra etapa.");
                }


                console.log('Novo Etapa user ', this.etapacurso)
                post('salvarEtapaCurso', this.etapacurso).then(result=>{
                    console.log('Result ', result)
                    this.atualizarTabela()
                }).catch(error=>{
                    console.log('Error ', error)
                })
                this.etapacurso = {}
            }


            
function verificaCampo(){

    if (etapacurso.nome.trim().length <= 0) {
        return true;
    }
  /*  if (etapacurso.periodo.trim().length <= 0){
        return true;
    }
    if (etapacurso.cargaHoraria.trim().length <= 0){
        return true;
    }
    */
    return false;
}
        
        let popup = document.getElementById("popupRemove");
        let telaDesativada = document.getElementById("tela");
        let backdrop = document.getElementById("backdrop");
        let popupEdit = document.getElementById("popupEdit");
        let popupAdd = document.getElementById("popupAdd");
        var tableInteract = document.getElementById("itens-table");
        let popupEye = document.getElementById("popupView");
        
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