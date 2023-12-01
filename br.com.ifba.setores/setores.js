var selectedId;
var setorList = [];
var setor = {};

const endpoints = {
  getAllSectors: "setores",
  updateSector: "setores/setor",
  saveSector: "setores/setor",
  deleteSectorById: "setores/setor/",
};

console.log(typeof getUser().login);
console.log({ id: getUser().login });

function setorNameAddChange() {
  setor.nome = document.getElementById("setorNameAdd").value;
  console.log(setor);
}

function setorDescricaoAddChange() {
  setor.descrição = document.getElementById("setorDescricaoAdd").value;
  console.log(setor);
}

atualizarTabela();
function atualizarTabela() {
  get(endpoints.getAllSectors)
    .then((data) => {
      console.log("Data", data);
      this.setorList = data;
      this.tableCreate(this.setorList);
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

      var colId = document.createElement("td");
      colId.appendChild(document.createTextNode(element.id));
      row.appendChild(colId);

      var colNome = document.createElement("td");
      colNome.appendChild(document.createTextNode(element.nome));
      row.appendChild(colNome);

      var colDescricao = document.createElement("td");
      colDescricao.appendChild(document.createTextNode(element.descricao));
      row.appendChild(colDescricao);

      var colCriador = document.createElement("td");
      colCriador.appendChild(
        document.createTextNode(element.criador ? element.criador.login : "")
      );
      row.appendChild(colCriador);

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
  let usr = this.setorList.find((user) => {
    return user.id === id;
  });

  console.log("Tipo de Usuário achado ", usr);

  document.getElementById("setorName").value = usr.nome;
  document.getElementById("setorDescricao").value = usr.descricao;
}

function closeEditPopup() {
  popupEdit.classList.remove("popupEditOpen");
}

function adicionar() {
  this.setor.nome = document.getElementById("setorNameAdd").value;
  this.setor.descricao = document.getElementById("setorDescricaoAdd").value;
  console.log(setor);
  this.setor.criador = { id: getUser().id };

  //se os campos de nome ou de descricao estiverem vazios, não serão salvos
  if (this.setor.nome != "" && this.setor.descricao != "") {
    post(endpoints.saveSector, this.setor)
      .then((result) => {
        console.log("result", result);
        atualizarTabela();
      })
      .catch((error) => {
        console.log(setor);
        console.log("error", error);
      });
  } else {
    console.log("error");
  }

  this.setor = {};

  document.getElementById("setorNameAdd").value = "";
  document.getElementById("setorDescricaoAdd").value = "";
}

function remover() {
  console.log("Deletar " + this.selectedId);

  fetchDelete(`${endpoints.deleteSectorById}${this.selectedId}`).then((result) => {
    atualizarTabela();
}).catch((error)=>{
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

function editar() {
  var nome = document.getElementById("setorName").value;
  var descricao = document.getElementById("setorDescricao").value;

  this.setor = this.setorList.find((user) => {
    return user.id === this.selectedId;
  });

  this.setor.nome = nome;
  this.setor.descricao = descricao;

  console.log("Novo setor ", this.setor);
  post(endpoints.saveSector, this.setor)
    .then((result) => {
      console.log("Result ", result);
      this.atualizarTabela();
    })
    .catch((error) => {
      console.log("Error ", error);
    });
  this.setor = {};
}

let popup = document.getElementById("popupRemove");
let telaDesativada = document.getElementById("tela");
let backdrop = document.getElementById("backdrop");
let popupEdit = document.getElementById("popupEdit");
let popupAdd = document.getElementById("popupAdd");
var tableInteract = document.getElementById("itens-table");
