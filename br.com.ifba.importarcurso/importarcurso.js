const modal = document.querySelector("dialog")

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
          var header = rowData[0].replace('\r', "").split(",");

          for (var row = 1; row < rowData.length; row++) {

               var obj = {}

               var linhaData = rowData[row].replace('\r', '').split(",")

               //pegando dado por dado posição por posição e atribuindo a seu respectivo atributo para enviar
               obj.id = linhaData[0];
               obj.nome = linhaData[1];
               obj.codigoCurso = linhaData[2]
               obj.sigla = linhaData[3];
               obj.descricao = linhaData[4];
               if(linhaData[5] == "True","TRUE","true","S","SIM","sim","Sim","ativa","Ativa","ATIVA" ){
                    obj.ativo = "TRUE";
               }else{
                    obj.ativo = "FALSE";
               }
               //está comentado para futuros testes caso necessário
               /* for(var j = 0; j < header.length; j++){
                   obj[header[j].replace(" ", "")] = linhaData[j];
                   console.log("Header Row", header[j]);
               }  */

              //salvando o objeto caso o nome e o cpf sejam diferentes de vazio
               if(obj.nome != "" && obj.cpf != ""){
                    
                    post('salvarCurso', obj).then(result=>{
                         importarPopupExibir()
                    }).catch(error=>{
                         console.log('error', error)
                    })
               }  
            
          }
         
     }

}

function importarPopupExibir(){
     document.getElementById("popupConfirmar").classList.add("exibirImportar");
}

 function importarPopupOcultar(){
     document.getElementById("popupConfirmar").classList.remove("exibirImportar");
}
 

 