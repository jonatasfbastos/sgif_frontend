//Selecionar o arquivo e enviar para ler
function submit(){
    var files = document.querySelector('#file').files;

    if(files.length > 0 ){
         var file = files[0];
         readCSVFile(file);
    }else{
          popupArquivoVazioExibir();
          importarPopupOcultar();
    }

}

//Lendo o arquivo
function readCSVFile(file){

    var reader = new FileReader();

    reader.readAsText(file);
    importarPopupOcultar();
    reader.onload = function(event) {
         var csvdata = event.target.result;
         var rowData = csvdata.split('\n');
         var header = rowData[0].replace('\r', "").split(",");

         for (var row = 1; row < rowData.length; row++) {

              var obj = {}

              var linhaData = rowData[row].replace('\r', '').split(",")

              //pegando os dados e atribuindo...
              obj.nome = linhaData[1];
              obj.descricao = linhaData[3];
              obj.codigo = linhaData[0];
              //obj.cargahoraria = linhaData[3];
              //obj.professor = linhaData[4];
              //obj.etapaCurso = linhaData[5];
              //obj.avaliacao = linhaData[6];

              
               if(obj.nome != "" && obj.codigo != "" && obj.descricao != ""){
                    post('salvarDisciplina', obj).then(result=>{
                    }).catch(error=>{
                         error.text().then(errorExibir=>popupErroExibir(`${errorExibir} \n\n Nome da Disciplina duplicada: ${obj.nome} \n Descrição duplicada: ${obj.descricao} `))
                         })
                    }else{
                         popupErroExibir("Por favor, preencha todos os campus!");
                    }  
            
         }

    };

}

function importarPopupExibir(){
     document.getElementById("popupImportar").classList.add("exibirImportar");
}

function importarPopupOcultar(){
     document.getElementById("popupImportar").classList.remove("exibirImportar");
}
 
function popupArquivoVazioExibir(){
     document.getElementById("popupArquivoVazio").classList.add("exibirVazio");
}

function popupArquivoVazioOcultar(){
     document.getElementById("popupArquivoVazio").classList.remove("exibirVazio");
}

function popupErroExibir(mensagem){
     document.getElementById("popupErro").classList.add("exibirErro");
     document.getElementById("erro").innerText = mensagem;
}

function popupErroOcultar(){
     document.getElementById("popupErro").classList.remove("exibirErro");
}