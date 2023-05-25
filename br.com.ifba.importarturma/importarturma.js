//função para selecionar o arquivo e enviar para ler
function submit(){
    var files = document.querySelector('#file').files;

    if(files.length > 0 ){
         var file = files[0];
         readCSVFile(file);
    }else{
         alert("Por favor, selecione o arquivo.");
    }

}

//função que lê o arquivo
function readCSVFile(file){

    var reader = new FileReader();

    reader.readAsText(file);

    reader.onload = function(event) {
         var csvdata = event.target.result;
         var rowData = csvdata.split('\n');
         var header = rowData[0].replace('\r', "").split(";");

         for (var row = 1; row < rowData.length; row++) {

              var obj = {}

              var linhaData = rowData[row].replace('\r', '').split(";")

              //pegando dado por dado posição por posição e atribuindo a seu respectivo atributo para enviar
              obj.nome = linhaData[1];
              obj.codigoTurma = linhaData[0];
              obj.sigla = linhaData[2];
              //obj.ativa = linhaData[3];

               //está comentado para futuros testes caso necessário
               /* for(var j = 0; j < header.length; j++){
                   obj[header[j].replace(" ", "")] = linhaData[j];
                   console.log("Header Row", header[j]);
              }  */

              //salvando o objeto caso o nome e o codigoTurma sejam diferentes de vazio
               if(obj.nome != "" && obj.codigoTurma != ""){
                    post('salvarTurma', obj).then(result=>{
                    }).catch(error=>{
                         console.log('error', error)
                    })
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
 