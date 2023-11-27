var selectedId;
var alunoList = [];
var aluno = {};

atualizarTabela();
setTurma();
setStatus();

function atualizarTabela() {
  get("alunos")
    .then((data) => {
      console.log("Data", data);
      this.alunoList = data;
      this.tableCreate(this.alunoList);
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

      var colEmail = document.createElement("td");
      colEmail.appendChild(document.createTextNode(element.email));
      row.appendChild(colEmail);

      var colTelefone = document.createElement("td");
      colTelefone.appendChild(document.createTextNode(element.telefone));
      row.appendChild(colTelefone);

      var colCpf = document.createElement("td");
      colCpf.appendChild(document.createTextNode(element.cpf));
      row.appendChild(colCpf);

      var colDataDeNascimento = document.createElement("td");
      colDataDeNascimento.appendChild(
        document.createTextNode(element.dataDeNascimento)
      );
      row.appendChild(colDataDeNascimento);

      var colMatricula = document.createElement("td");
      colMatricula.appendChild(document.createTextNode(element.matricula));
      row.appendChild(colMatricula);

      var colTurma = document.createElement("td");
      colTurma.appendChild(
        document.createTextNode(element.turma ? element.turma.nome : "")
      );
      row.appendChild(colTurma);

      var colStatus = document.createElement("td");
      colStatus.appendChild(
        document.createTextNode(
          element.statusAluno ? element.statusAluno.nome : ""
        )
      );
      row.appendChild(colStatus);

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
    });
  }
}

function setTurma() {
  get("turmas")
    .then((turmas) => {
      console.log("Turmas ", turmas);

      var multiCombo = document.getElementById("turmaadd");
      var multiComboEdit = document.getElementById("turmaedit");
      turmas.forEach((turm) => {
        let option = document.createElement("option");
        option.value = turm.id;
        option.innerHTML = turm.nome;

        multiCombo.appendChild(option);

        let optionEdit = document.createElement("option");
        optionEdit.value = turm.id;
        optionEdit.innerHTML = turm.nome;

        multiComboEdit.appendChild(optionEdit);
      });
    })
    .catch((error) => {
      console.log("Error ", error);
    });
}

function setStatus() {
  get("statusAlunos")
    .then((status) => {
      console.log("Status ", status);

      var multiCombo = document.getElementById("statusadd");
      var multiComboEdit = document.getElementById("statusedit");
      status.forEach((statu) => {
        let option = document.createElement("option");
        option.value = statu.id;
        option.innerHTML = statu.nome;

        multiCombo.appendChild(option);

        let optionEdit = document.createElement("option");
        optionEdit.value = statu.id;
        optionEdit.innerHTML = statu.nome;

        multiComboEdit.appendChild(optionEdit);
      });
    })
    .catch((error) => {
      console.log("Error ", error);
    });
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

var tablee = document.getElementById("itens-table");

function closePopup() {
  popup.classList.remove("open_popup");
}

function openEditPopup(id) {
  teladisabled();
  this.selectedId = id;
  popupEdit.classList.add("popupEditOpen");
  console.log("Id ", id);
  let alunoEditando = this.alunoList.find((user) => {
    return user.id === id;
  });

  console.log("Aluno achado ", alunoEditando);

  document.getElementById("alunoNomeedit").value = alunoEditando.nome;
  document.getElementById("alunoEmailedit").value = alunoEditando.email;
  document.getElementById("alunoTelefoneedit").value = alunoEditando.telefone;
  document.getElementById("alunoCPFedit").value = alunoEditando.cpf;
  document.getElementById("alunoDataDeNascimentoedit").value =
    alunoEditando.dataDeNascimento;
  document.getElementById("alunoMatriculaedit").value = alunoEditando.matricula;

  if (alunoEditando.turma) {
    document.getElementById("turmaedit").value = alunoEditando.turma
      ? alunoEditando.turma.id
      : "";
  }
  if (alunoEditando.statusAluno) {
    document.getElementById("statusedit").value = alunoEditando.statusAluno
      ? alunoEditando.statusAluno.id
      : "";
  }
}

function closeEditPopup() {
  popupEdit.classList.remove("popupEditOpen");
}

function adicionar() {
  this.aluno.nome = document.getElementById("alunoNomeadd").value;
  this.aluno.email = document.getElementById("alunoEmailadd").value;
  this.aluno.telefone = document.getElementById("alunoTelefoneadd").value;
  this.aluno.cpf = document.getElementById("alunoCPFadd").value;
  this.aluno.dataDeNascimento = document.getElementById(
    "alunoDataDeNascimentoadd"
  ).value;
  this.aluno.matricula = document.getElementById("alunoMatriculaadd").value;

  this.aluno.turma = { id: document.getElementById("turmaadd").value };
  this.aluno.statusAluno = { id: document.getElementById("statusadd").value };

  if (verificaCampo()) {
    return exibirPopUpErro(
      "Não foi possível atualizar o aluno, há algum campo vazio."
    );
  }

  //se os campos de nome ou de cpf estiverem vazios, não serão salvos
  if (this.aluno.nome != "" && this.aluno.cpf != "") {
    post("alunos/aluno", this.aluno)
      .then((result) => {
        console.log("result", result);
        atualizarTabela();
      })
      .catch((error) => {
        console.log("error", error);
      });
  } else {
  }

  this.aluno = {};

  document.getElementById("alunoNomeadd").value = "";
  document.getElementById("alunoEmailadd").value = "";
  document.getElementById("alunoTelefoneadd").value = "";
  document.getElementById("alunoCPFadd").value = "";
  document.getElementById("alunoDataDeNascimentoadd").value = "";
  document.getElementById("alunoMatriculaadd").value = "";
}

function remover() {
  console.log("Deletar " + this.selectedId);

  fetchDelete(`alunos/aluno/${this.selectedId}`)
    .then((result) => {
      atualizarTabela();
    })
    .catch((e) => {});
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

var table = document.getElementById("itens-table");

function verificaCampo() {
  if (aluno.nome.trim().length <= 0) {
    return true;
  }
  if (aluno.email.trim().length <= 0) {
    return true;
  }
  if (aluno.telefone.trim().length <= 0) {
    return true;
  }
  if (aluno.cpf.trim().length <= 0) {
    return true;
  }
  if (aluno.matricula.trim().length <= 0) {
    return true;
  }

  return false;
}

function editar() {
  var nome = document.getElementById("alunoNomeedit").value;
  var email = document.getElementById("alunoEmailedit").value;
  var telefone = document.getElementById("alunoTelefoneedit").value;
  var cpf = document.getElementById("alunoCPFedit").value;
  var dataDeNascimento = document.getElementById(
    "alunoDataDeNascimentoedit"
  ).value;
  var matricula = document.getElementById("alunoMatriculaedit").value;

  var newTipoId = { id: document.getElementById("turmaedit").value };
  var newId = { id: document.getElementById("statusedit").value };

  this.aluno = this.alunoList.find((user) => {
    return user.id === this.selectedId;
  });

  this.aluno.nome = nome;
  this.aluno.email = email;
  this.aluno.telefone = telefone;
  this.aluno.cpf = cpf;
  this.aluno.dataDeNascimento = dataDeNascimento;
  this.aluno.matricula = matricula;
  this.aluno.turma = newTipoId;
  this.aluno.statusAluno = newId;

  if (verificaCampo()) {
    return exibirPopUpErro(
      "Não foi possível atualizar o aluno, há algum campo vazio."
    );
  }

  console.log("Novo aluno ", this.aluno);
  post("alunos/aluno", this.aluno)
    .then((result) => {
      console.log("Result ", result);
      this.atualizarTabela();
    })
    .catch((error) => {
      console.log("Error ", error);
    });

  this.aluno = {};
}

let popup = document.getElementById("popupRemove");
let telaDesativada = document.getElementById("tela");
let backdrop = document.getElementById("backdrop");
let popupEdit = document.getElementById("popupEdit");
let popupAdd = document.getElementById("popupAdd");
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
