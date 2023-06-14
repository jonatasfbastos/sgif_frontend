//Selecionar o arquivo e enviar para ler
function submit(){
    var files = document.querySelector('#file').files;

    if(files.length > 0 ){
         var file = files[0];
         let verificaArquivo = file.name.slice(file.name.lastIndexOf(".") + 1)

          var combobox = document.getElementById("comboBox");
          var opcaoSelecionada = combobox.value;

          if(opcaoSelecionada == "valor1" && verificaArquivo == "csv"){
               readCSVFile(file)
          }else{
               if(opcaoSelecionada == "valor2" && verificaArquivo == "xls"){
                    handleFile(file)
               }else{
                    popupErroExibir("O arquivo selecionado não corresponde ao tipo escolhido!")
                    importarPopupOcultar();
               }
          }
    }else{
          popupArquivoVazioExibir();
          importarPopupOcultar();
    }

}

// informando o tipo de arquivo
document.getElementById('file').addEventListener('change', function(e) {
     if (e.target.files[0]) {
          document.getElementById("arquivoSelecionado").innerText =  "Arquivo Selecionado: " + e.target.files[0].name;
     }
   });


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

              //pegando os dados e atribuindo
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
                         error.text().then(errorExibir=>{
                              popupErroExibir(errorExibir)
                              EnviarPopupOcultar()
                         })
                    })
                    }else{
                         popupErroExibir("Por favor, preencha todos os campus!");
                         EnviarPopupOcultar()
                    }  
            
         }
          EnviarPopupExibir();
          importarPopupOcultar();
    };

}

//função ler xls
function handleFile(file) {

     const reader = new FileReader();

     reader.onload = function(e){
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: 'array' });

          // Seleciona a primeira planilha
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
     
          // Converte a planilha em um objeto JSON
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });


          let resultado = jsonData.filter(data => data.length > 0)

          let flag = 0;

          for (var row = 1; row < resultado.length; row++) {

               var obj = {}
               
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
                         error.text().then(errorExibir=>{
                              popupErroExibir(errorExibir)
                              EnviarPopupOcultar()
                         })
                    })
                    }else{
                         popupErroExibir("Por favor, preencha todos os campus!");
                         EnviarPopupOcultar()
                    }     
          } 
          EnviarPopupExibir();
          importarPopupOcultar();
     };

     reader.readAsArrayBuffer(file);
}

// funções dos popups
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

function EnviarPopupExibir(){
     document.getElementById("popupEnviar").classList.add("exibirEnviar");
 }

function EnviarPopupOcultar(){
     document.getElementById("popupEnviar").classList.remove("exibirEnviar");
 }