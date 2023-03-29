var selectedId
var TipoDeUsuarioList = [] 
var tipodeusuario = {}

// function tipoDeUsuarioNameAddChange(){
//     tipodeusuario.nome = document.getElementById('tipoDeUsuarioNameAdd').value;
//     console.log(tipodeusuario);
// }

// function tipoDeUsuarioDescricaoAddChange(){
//     tipodeusuario.descricao = document.getElementById('tipoDeUsuarioDescricaoAdd').value;
//     console.log(tipodeusuario);
// }

atualizarTabela()
function atualizarTabela(){
    
    get('perfilusuario').then(data=>{
    console.log('Data', data)
    this.TipoDeUsuarioList = data
    this.tableCreate(this.TipoDeUsuarioList)
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

        var colDescricao = document.createElement("td")
        colDescricao.appendChild(document.createTextNode(element.descricao))
        row.appendChild(colDescricao)
        
        
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
            function stopPropagation(event){
                event.stopPropagation();
            }

            function openAddPopup(){
                popupAdd.classList.add("openAddPopup");
            }

            function closeAddPopup(){
                popupAdd.classList.remove("openAddPopup");
            }

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
                let usr = this.TipoDeUsuarioList.find(user=>{
                    return user.id === id
                })

                console.log('Tipo de Usuário achado ', usr)
                
                document.getElementById('tipoDeUsuarioName').value = usr.nome
                document.getElementById('tipoDeUsuarioDescricao').value = usr.descricao
            }

            function closeEditPopup(){
                popupEdit.classList.remove("popupEditOpen");
            }

            function adicionar(){

                this.tipodeusuario.nome = document.getElementById('tipoDeUsuarioNameAdd').value;
                this.tipodeusuario.descricao = document.getElementById('tipoDeUsuarioDescricaoAdd').value;
                

                console.log(tipodeusuario)
                console.log(tipodeusuario.id)

                ////se os campos de nome ou de descrição estiverem vazios, não serão salvos 
                if(this.tipodeusuario.nome != "" && this.tipodeusuario.descricao != ""){
                    post('salvarPerfilUsuario', tipodeusuario).then(result=>{
                        console.log('result', result)
                        atualizarTabela()
                    }).catch(error=>{
                        console.log('error', error)
                    })
                }else{console.log('error')}

                document.getElementById('tipoDeUsuarioNameAdd').value = '';
                document.getElementById('tipoDeUsuarioDescricaoAdd').value = '';
            }
            
            
            function remover(){
                console.log('Deletar ' + this.selectedId)

                get_params('deletarPerfilDeUsuario', {id:this.selectedId, p2:'is'}).then(result=>{
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

                var nome = document.getElementById("tipoDeUsuarioName").value;
                var descricao = document.getElementById("tipoDeUsuarioDescricao").value;

                this.tipodeusuario = this.TipoDeUsuarioList.find(user=>{
                    return user.id === this.selectedId
                })

                this.tipodeusuario.nome = nome
                this.tipodeusuario.descricao = descricao

                console.log('Novo tipo user ', this.tipodeusuario)
                post('salvarPerfilUsuario', this.tipodeusuario).then(result=>{
                    console.log('Result ', result)
                    this.atualizarTabela()
                }).catch(error=>{
                    console.log('Error ', error)
                })
                this.tipodeusuario = {}
            }
        
        let popup = document.getElementById("popupRemove");
        let telaDesativada = document.getElementById("tela");
        let backdrop = document.getElementById("backdrop");
        let popupEdit = document.getElementById("popupEdit");
        let popupAdd = document.getElementById("popupAdd");
        var tableInteract = document.getElementById("itens-table");

   