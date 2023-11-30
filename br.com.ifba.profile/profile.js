const endpoints = {
    getAllUserProfiles: "perfilUsuarios",
    getUserProfileByName: "perfilUsuarios/login",
    updateUserProfile: "perfilUsuarios/perfilUsuario",
    saveUserProfile: "perfilUsuarios/perfilUsuario",
    deleteUserProfileById: "perfilUsuarios/perfilUsuario/",
    getAllUsers: "usuarios",
    getUserById: "usuarios/usuario/",
    getUserByLoginAndSenha: "usuarios/login",
    saveUser: "usuarios/usuario",
    deleteUserById: "usuarios/usuario/"
};


var user = getUser()
setData()

var oldInputBorder = document.getElementById('senhanova').style.border

function setData(){
    document.getElementById('nome').value = user.nome
    document.getElementById('email').value = user.email
    document.getElementById('login').value = user.login
    // document.getElementById('senha').value = user.senha

    document.getElementById('nome-desc').innerHTML = user.nome
    document.getElementById('email-desc').innerHTML = user.email
    document.getElementById('tipo-desc').innerHTML = user.tipodeusuario.nome
}

function saveUser(){
    let nome = document.getElementById('nome').value
    let email = document.getElementById('email').value
    let login = document.getElementById('login').value

    user.nome = nome
    user.email = email
    user.login = login

    post(endpoints.saveUser, this.user).then(result=>{
        console.log('result', result)
        setUser(result)
        user = result
        setData()
        disableEdition()
    }).catch(error=>{
        console.log('error', error)
    })

}

function savePass(){
    let senha = document.getElementById('senhanova').value
    user.senha = senha

    post(endpoints.saveUser, this.user).then(result=>{
        console.log('result', result)
        setUser(result)
        user = result
        setData()
        disableEdition()
        showMessage({type:'success', message:"Senha atualizada"})
    }).catch(error=>{
        console.log('error', error)
        showMessage({type:'error', message:"Erro ao salvar senha, tente novamente"})
    })
}

function checkPass(){
    let senha = document.getElementById('senhanova')
    let senhaConfirm = document.getElementById('senhacheck')

    if(senha.value === senhaConfirm.value){
        console.log("Tudo certo")
        document.getElementById('confirm-pass').disabled = false
        senha.style.border = '2px solid green'
        senhaConfirm.style.border = '2px solid green'
    }else{
        console.log("senhas nao coincidem")
        senha.style.border = '2px solid red'
        senhaConfirm.style.border = '2px solid red'
    }
}

function cacelEdition(){
    console.log("Clicou cancelar")
    disableEdition()
}

function enableEdition(){
    var elements = document.getElementsByClassName('input-form')
    for (let el of elements) {
        el.setAttribute('class', 'input-edit input-form')
    }

    document.getElementById('submit-actions').style.visibility = 'visible'

}


function disableEdition(){
    let elements = document.getElementsByClassName('input-form')    
    for (let el of elements) {
        el.setAttribute('class', 'input-show input-form')
    }
    
    document.getElementById('submit-actions').style.visibility = 'hidden'
}

function openEditPopup(){
    popupEdit.classList.add("popupEditOpen");
    let senha = document.getElementById('senhanova')
    let senhaConfirm = document.getElementById('senhacheck')

    senha.value = '';
    senhaConfirm.value = '';
    senha.style.border = oldInputBorder
    senhaConfirm.style.border = oldInputBorder
    document.getElementById('confirm-pass').disabled = true
}


function closeEditPopup(){
    popupEdit.classList.remove("popupEditOpen");
}


function telaEnabled(){
    // backdrop.classList.remove("disabled_tela");
}