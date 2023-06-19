//função para selecionar o arquivo e enviar para ler
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

//informando o arquivo selecionado
document.getElementById('file').addEventListener('change', function(e) {
    if (e.target.files[0]) {
         document.getElementById("arquivoSelecionado").innerText =  "Arquivo Selecionado: " + e.target.files[0].name;
    }
  });

//função que lê o arquivo .CSV
function readCSVFile(file){

    var reader = new FileReader();

    reader.readAsText(file);
    
    importarPopupOcultar();
    reader.onload = function(event) {
         var csvdata = event.target.result;
         var rowData = csvdata.split('\n');
         var header = rowData[0].replace('\r', "").split(";");
         
         for (var row = 1; row < rowData.length; row++) {

              var obj = {}

              var linhaData = rowData[row].replace('\r', '').split(";")

              //pegando dado por dado posição por posição e atribuindo a seu respectivo atributo para enviar
              //pegando dado por dado posição por posição e atribuindo a seu respectivo atributo para enviar
              obj.nome = linhaData[1];
              obj.codigoTurma = linhaData[0];
              obj.sigla = linhaData[2];
              //obj.ativa = linhaData[3];
              
              //salvando o objeto caso o nome e o codigo da turma sejam diferentes de vazio
              if(obj.nome != "" && obj.codigoTurma != ""){
                   post('salvarTurma', obj).then(result=>{
                   }).catch(error=>{
                        error.text().then(errorExibir=>{
                             popupErroExibir(errorExibir)
                             EnviarPopupOcultar()
                        })
                   })
                   }else{
                        popupErroExibir("Os campos Código da turma ou Nome estão vazios!");
                        EnviarPopupOcultar()
                   }          
         }
         EnviarPopupExibir();
         importarPopupOcultar();
    };

}

//função que lê o arquivo .XLS
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

              //pegando dado por dado posição por posição e atribuindo a seu respectivo atributo para enviar
              obj.nome = linhaData[1];
              obj.codigoTurma = linhaData[0];
              obj.sigla = linhaData[2];
              //obj.ativa = linhaData[3];

              if(obj.nome != "" && obj.codigoTurma != ""){
                   post('salvarTurma', obj).then(result=>{
                   }).catch(error=>{
                        error.text().then(errorExibir=>{
                             popupErroExibir(errorExibir)
                             EnviarPopupOcultar()
                        })
                   })
                   }else{
                        popupErroExibir("Os campos Código da turma ou Nome estão vazios!");
                        EnviarPopupOcultar()
                   }     
         } 
         EnviarPopupExibir();
         importarPopupOcultar();
    };

    reader.readAsArrayBuffer(file);
}

//Funções dos popups para a exibição e o ocultamento
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