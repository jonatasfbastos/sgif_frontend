//função para selecionar o arquivo e enviar para ler
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
 
 //função que lê o arquivo
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
               obj.nome = linhaData[1];
               obj.siape = linhaData[2];
               //obj.setor = linhaData[3]
               obj.email = linhaData[4];
               obj.telefone = linhaData[5];
               //obj.cpf = linhaData[6];
               //obj.dataDeNascimento = new Date(linhaData[7].replace("/", "-"));
               
 
                //está comentado para futuros testes caso necessário
                /* for(var j = 0; j < header.length; j++){
                    obj[header[j].replace(" ", "")] = linhaData[j];
                    console.log("Header Row", header[j]);
               }  */
 
               //salvando o objeto caso o nome e o cpf sejam diferentes de vazio
               if(obj.nome != "" && obj.cpf != ""){
                    post('salvarProfessor', obj).then(result=>{
                    }).catch(error=>{
                         error.text().then(errorExibir=>popupErroExibir(`${errorExibir} \n\n Nome do professor duplicado: ${obj.nome} \n Siape do Professor duplicado: ${obj.siape} `))
                         })
                    }else{
                         popupErroExibir("Os campos CPF ou Nome estão vazios!");
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