var selectedId;
var cursoList = [];
var curso = {};
var matrizesList = [];
var matriz = {};

const endpoints = {
  getAllCourses: "cursos",
  getAllCurriculumFrameworks: "matrizesCurriculares",
  postCourse: "cursos/curso",
  deleteCourse: "cursos/curso/",
};

/*var modalidadeList = []
var modalidade = {}
*/
atualizarTabela();
/*setModalidade()
setMatrizCurricular()
*/
function atualizarTabela() {
  get(endpoints.getAllCourses)
    .then((data) => {
      console.log("Data", data);
      this.cursoList = data;
      /*this.matrizesList = data*/
      this.tableCreate(this.cursoList);
      /*this.tableCreateMatriz(this.matrizesList)*/
    })
    .catch((error) => {
      console.log("Error ", error);
    });
}

function tableCreate(data) {
  var tableBody = document.getElementById("table-body");
  if (tableBody) {
    tableBody.innerHTML = "";
    data.forEach((element) => {
      var row = document.createElement("tr");

      var colNome = document.createElement("td");
      colNome.appendChild(document.createTextNode(element.nome));
      row.appendChild(colNome);

      var colCodigo = document.createElement("td");
      colCodigo.appendChild(document.createTextNode(element.codigo));
      row.appendChild(colCodigo);

      var colSigla = document.createElement("td");
      colSigla.appendChild(document.createTextNode(element.sigla));
      row.appendChild(colSigla);

      var colAtivo = document.createElement("td");
      colAtivo.appendChild(document.createTextNode(element.ativo));
      row.appendChild(colAtivo);

      tableBody.appendChild(row);

      var colRemover = document.createElement("td");
      colRemover.setAttribute("onclick", "openPopup(" + element.id + ")");
      var removerLink = document.createElement("a");
      var imgRemove = document.createElement("img");
      imgRemove.setAttribute("src", "../images/excluir2.png");
      removerLink.appendChild(imgRemove);

      colRemover.appendChild(removerLink);
      row.appendChild(colRemover);

      var colEditar = document.createElement("td");
      colEditar.setAttribute("onclick", "openEditPopup(" + element.id + ")");
      var editarLink = document.createElement("a");
      var imgEditar = document.createElement("img");
      imgEditar.setAttribute("src", "../images/botao-editar2.png");
      editarLink.appendChild(imgEditar);

      colEditar.appendChild(editarLink);
      row.appendChild(colEditar);

      //botão para exibir lista de matriz curricular
      var colMatriz = document.createElement("td");
      colMatriz.setAttribute(
        "onclick",
        "openPopupView(" + JSON.stringify(element) + ")"
      );
      var matrizLink = document.createElement("a");
      var imgEye = document.createElement("img");
      imgEye.setAttribute("src", "../images/botao_ver.png");
      matrizLink.appendChild(imgEye);

      colMatriz.appendChild(matrizLink);
      row.appendChild(colMatriz);

      tableBody.appendChild(row);
      console.log(element);
    });
  }
}

//tabela de matrizes curriculares
function tableCreateMatriz(data) {
  var tableBodyMatriz = document.getElementById("table-body-matriz");
  let matrizes_curso = data.matrizcurricular;

  if (tableBodyMatriz) {
    tableBodyMatriz.innerHTML = "";

    var row = document.createElement("tr");

    for (const chave in matrizes_curso) {
      var colNomeMatriz = document.createElement("td");
      colNomeMatriz.appendChild(
        document.createTextNode(matrizes_curso[chave].nome)
      );
      row.appendChild(colNomeMatriz);
    }

    get(endpoints.getAllCurriculumFrameworks)
      .then((matrizcurricular) => {
        console.log("Matrizes curriculares ", matrizcurricular);

        var colNomeMatriz = document.createElement("td");
        matrizcurricular.forEach((tipo) => {
          let option = document.createElement("option");
          option.value = tipo.id;
          option.innerHTML = tipo.nome;

          colNomeMatriz.appendChild(option);
          row.appendChild(colNomeMatriz);
        });
      })
      .catch((error) => {
        console.log("Error ", error);
      });

    tableBodyMatriz.appendChild(row);
  }
}

/*function setModalidade() {

    get('modalidade').then(modalidade=>{
        console.log('Modalidade ', modalidade)

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
}*/

function setMatrizCurricular() {
  get(endpoints.getAllCurriculumFrameworks)
    .then((matrizCurricular) => {
      console.log("Matrizes Curriculares", matrizCurricular);

      var multiCombo = document.getElementById("matrizAdd");
      var multiComboEdit = document.getElementById("matrizEdit");
      matrizCurricular.forEach((tipo) => {
        var option = document.createElement("option");
        option.value = tipo.id;
        option.innerHTML = tipo.nome;

        multiCombo.appendChild(option);

        let optionEdit = document.createElement("option");
        optionEdit.value = tipo.id;
        optionEdit.innerHTML = tipo.nome;

        multiComboEdit.appendChild(optionEdit);
      });
    })
    .catch((error) => {
      console.log("Error ", error);
    });
}

function mostrarMatrizes() {
  get(endpoints.getAllCurriculumFrameworks)
    .then((data) => {
      document.getElementById("checkboxes").innerHTML = data
        .map(
          (item) => `<label ><input type="checkbox" value="${item.id}"
        class="matrizcurricular" name="matrizcurricular" id="matrizcurricular"/>${item.nome}<label>`
        )
        .join("");
    })
    .catch((error) => {
      console.log("Error ", error);
    });
}

function mostrarMatrizesEdit() {
  get(endpoints.getAllCurriculumFrameworks)
    .then((data) => {
      document.getElementById("checkboxesEdit").innerHTML = data
        .map(
          (item) => `<label ><input type="checkbox" value="${item.id}"
        class="matrizcurricular" name="matrizcurricular" id="matrizcurricular"/>${item.nome}<label>`
        )
        .join("");
    })
    .catch((error) => {
      console.log("Error ", error);
    });
}

function adicionarMatrizes() {
  let matrizcurricular = document.getElementsByName("matrizcurricular");

  for (var i = 0; i < matrizcurricular.length; i++) {
    if (matrizcurricular[i].checked) {
      console.log(
        "As matrizes curriculares escolhidas são: " + matrizcurricular[i].value
      );
      matrizesList.push({ id: Number(matrizcurricular[i].value) });
    }
  }
  console.log(matrizesList);
}

/*

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
*/
var expandedAdd = false;
function showcheckboxesAdd() {
  var checkboxes = document.getElementById("checkboxesAdd");
  if (!expandedAdd) {
    checkboxes.style.display = "block";
    expandedAdd = true;
  } else {
    checkboxes.style.display = "none";
    expandedAdd = false;
  }
}

var expandedEdit = false;
function showcheckboxesEdit() {
  var checkboxes = document.getElementById("checkboxesEdit");
  if (!expandedEdit) {
    checkboxes.style.display = "block";
    expandedEdit = true;
  } else {
    checkboxes.style.display = "none";
    expandedEdit = false;
  }
}

function stopPropagation(event) {
  event.stopPropagation();
}

function openAddPopup() {
  popupAdd.classList.add("openAddPopup");
}

function closeAddPopup() {
  popupAdd.classList.remove("openAddPopup");
}

function openPopupView(matrizes) {
  teladisabled();
  //this.selectedId = id
  tableCreateMatriz(matrizes);
  popupEye.classList.add("popupEditView");
}

function openPopup(id) {
  teladisabled();
  this.selectedId = id;
  popup.classList.add("open_popup");
}

function teladisabled() {
  telaDesativada.classList.add("disabled_tela");
  backdrop.classList.add("disabled_tela");
}

function getindex(x) {
  globalThis.Index = x.rowIndex;
}

function telaEnabled() {
  telaDesativada.classList.remove("disabled_tela");
  backdrop.classList.remove("disabled_tela");
}

function closePopupView() {
  popupEye.classList.remove("popupEditView");
}

function closePopup() {
  popup.classList.remove("open_popup");
}
/*
function openEditPopup(id){
    teladisabled()
    this.selectedId = id
    popupEdit.classList.add("popupEditOpen");
    console.log('Id ',id)
    let usr = this.cursoList.find(user=>{
        return user.id === id
    })

    console.log('Curso encontrado', usr)
    
    document.getElementById('nomeCursoEditar').value = usr.nome
    if(usr.curso){
        document.getElementById('modalidadeEdit').value = usr.modalidade ? usr.modalidade.id : '';
    }
    if(usr.matrizcurricular){
        document.getElementById('matrizCurricularEdit').value = usr.matrizcurricular ? usr.matrizcurricular.id : '';
    }
}
*/
var table = document.getElementById("itens-table");

function openEditPopup(id) {
  teladisabled();
  this.selectedId = id;
  popupEdit.classList.add("popupEditOpen");
  console.log("Id ", id);
  let cursoEditando = this.cursoList.find((user) => {
    return user.id === id;
  });

  console.log("Curso encontrado ", cursoEditando);

  document.getElementById("cursoNomeedit").value = cursoEditando.nome;
  document.getElementById("cursoCodigoedit").value = cursoEditando.codigo;
  document.getElementById("cursoSiglaedit").value = cursoEditando.sigla;
  document.getElementById("cursoAtivoTrue").value = true;
  document.getElementById("cursoAtivoFalse").value = false;

  if (cursoEditando.curso) {
    document.getElementById("cursoedit").value = cursoEditando.curso
      ? cursoEditando.curso.id
      : "";
  }
}

function closeEditPopup() {
  popupEdit.classList.remove("popupEditOpen");
}

function adicionar() {
  this.curso.nome = document.getElementById("cursoNomeadd").value;
  this.curso.codigo = document.getElementById("cursoCodigoadd").value;
  this.curso.sigla = document.getElementById("cursoSiglaadd").value;
  this.curso.ativot = document.getElementById("cursoAtivoTrue").value = true;
  this.curso.ativot = document.getElementById("cursoAtivoFalse").value = false;

  console.log(this.curso);

  /*this.curso.modalidade = {id:document.getElementById('modalidadeadd').value}
    this.matriz.matrizcurricular = {id:document.getElementById('matrizCurricularadd').value}
*/
  if (verificaCampo()) {
    return exibirPopUpErro(
      "Não foi possível salvar o curso, há algum campo vazio."
    );
  }

  //se os campos de nome ou de codigo estiverem vazios, não serão salvos
  if (this.curso.nome != "" && this.curso.codigo != "") {
    post(endpoints.postCourse, this.curso)
      .then((result) => {
        console.log("result", result);
        atualizarTabela();
      })
      .catch((error) => {
        console.log("error", error);
      });
  } else {
    console.log("error");
  }

  this.curso = {};
  //this.matriz = {}

  document.getElementById("cursoNomeadd").value = "";
  document.getElementById("cursoCodigoadd").value = "";
  document.getElementById("cursoSiglaadd").value = "";
  document.getElementById("cursoAtivoTrue").value = true;
  document.getElementById("cursoAtivoFalse").value = false;
  /* document.getElementById('matrizCurricularadd').value = '';
    document.getElementById('modalidadeadd').value = '';*/
}

function remover() {
  console.log("Deletar " + this.selectedId);

  fetchDelete(`${endpoints.deleteCourse}${this.selectedId}`)
    .then((result) => {
      atualizarTabela();
    })
    .catch((error) => {
      console.log(error);
    });
}

function buscar() {
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

function verificaCampo() {
  if (curso.nome.trim().length <= 0) {
    return true;
  }
  if (curso.codigo.trim().length <= 0) {
    return true;
  }
  if (curso.sigla.trim().length <= 0) {
    return true;
  }

  return false;
}

function editar() {
  var nome = document.getElementById("cursoNomeedit").value;
  var codigo = document.getElementById("cursoCodigoedit").value;
  var sigla = document.getElementById("cursoSiglaedit").value;
  var ativot = (document.getElementById("cursoAtivoTrue").value = true);
  var ativof = (document.getElementById("cursoAtivoFalse").value = false);

  this.curso = this.cursoList.find((user) => {
    return user.id === this.selectedId;
  });

  this.curso.nome = nome;
  this.curso.codigo = codigo;
  this.curso.sigla = sigla;
  this.curso.ativot = ativot;
  this.curso.ativof = ativof;

  if (verificaCampo()) {
    return exibirPopUpErro(
      "Não foi possível atualizar o curso, há algum campo vazio."
    );
  }

  console.log("Novo curso", this.curso);
  post(endpoints.postCourse, this.curso)
    .then((result) => {
      console.log("Result ", result);
      this.atualizarTabela();
    })
    .catch((error) => {
      console.log("Error ", error);
    });

  this.curso = {};
}

let popup = document.getElementById("popupRemove");
let telaDesativada = document.getElementById("tela");
let backdrop = document.getElementById("backdrop");
let popupEdit = document.getElementById("popupEdit");
let popupAdd = document.getElementById("popupAdd");
let popupEye = document.getElementById("popupView");
var tableInteract = document.getElementById("itens-table");

document
  .getElementById("btn-erro-fechar")
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
