var selectedId
var EtapaCursoList = [] 
var etapacurso = {}

// function etapacursoNameAddChange(){
//     etapacurso.nome = document.getElementById('etapacursoNameAdd').value;
//     console.log(etapacurso);
// }

// function etapacursoDescricaoAddChange(){
//     etapacurso.descricao = document.getElementById('etapacursoDescricaoAdd').value;
//     console.log(etapacurso);
// }

atualizarTabela()
//setMatrizCurricular()
//setDisciplina()
function atualizarTabela(){
    
    get('etapaCurso').then(data=>{
    console.log('Data', data)
    this.EtapaCursoList = data
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

/*
        //matriz curricular
        var colMatriz = document.createElement("td")
        colMatriz.appendChild(document.createTextNode(element.matrizCurricular ? element.matrizCurricular.nome : ''))
        row.appendChild(colMatriz)

        //disciplina
        var colDisciplina = document.createElement("td")
        colDisciplina.appendChild(document.createTextNode(element.disciplina ? element.disciplina.nome : ''))
        row.appendChild(colDisciplina)
        */
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
/*
//matriz curricular
function setMatrizCurricular() {

    get('matrizCurricular').then(matrizCurriculares=>{
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


//disciplina
function setDisciplina() {

    get('disciplina').then(disciplinas=>{
        console.log('Disciplinas ', disciplinas)

        var multiCombo = document.getElementById('disciplina')
        var multiComboEdit = document.getElementById('disciplinaEdit')
        disciplinas.forEach(tipo=>{
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


            function openAddDisciplinaPopup(){
                popupAddDisciplina.classList.add("openAddDisciplinaPopup");
            }

            function closeAddDisciplinaPopup(){
                popupAddDisciplina.classList.remove("openAddDisciplinaPopup");
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
                this.etapacurso.periodo = document.getElementById('etapaCursoPeriodoAdd').value;
                this.etapacurso.cargaHoraria = document.getElementById('etapaCursoCargaHorariaAdd').value;

/*
              //parte de matriz curricular
              this.etapacurso.matrizCurricular = {id:document.getElementById('matrizCurricular').value};
              console.log(this.etapacurso)

              //disciplina
              this.etapacurso.disciplina = {id:document.getElementById('disciplina').value};
              console.log(this.etapacurso)
                */


                console.log(etapacurso)
                console.log(etapacurso.id)

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
            
            
            function remover(){
                console.log('Deletar ' + this.selectedId)

                get_params('deletarEtapaCurso', {id:this.selectedId, p2:'is'}).then(result=>{
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

                var nome = document.getElementById("etapaCursoName").value;
                var periodo = document.getElementById("etapaCursoPeriodo").value;
                var cargaHoraria = document.getElementById("etapaCursoCargaHoraria").value;

               /*
                var newMatrizId = {id:document.getElementById('matrizCurricularEdit').value}
                console.log(newMatrizId)

                var newDisciplinaId = {id:document.getElementById('disciplinaEdit').value}
                console.log(newDisciplinaId)
*/
                this.etapacurso = this.EtapaCursoList.find(user=>{
                    return user.id === this.selectedId
                })

                this.etapacurso.nome = nome;
                this.etapacurso.periodo = periodo;
                this.etapacurso.cargaHoraria = cargaHoraria;
  /*              
                this.etapacurso.matrizCurricular = newMatrizId;
                this.etapacurso.disciplina = newDisciplinaId;
*/
                console.log('Novo Etapa user ', this.etapacurso)
                post('salvarEtapaCurso', this.etapacurso).then(result=>{
                    console.log('Result ', result)
                    this.atualizarTabela()
                }).catch(error=>{
                    console.log('Error ', error)
                })
                this.etapacurso = {}
            }
        
        let popup = document.getElementById("popupRemove");
        let telaDesativada = document.getElementById("tela");
        let backdrop = document.getElementById("backdrop");
        let popupEdit = document.getElementById("popupEdit");
        let popupAdd = document.getElementById("popupAdd");
   //     let popupAddDisciplina = document.getElementById("popupAddDisciplina");
        var tableInteract = document.getElementById("itens-table");

        