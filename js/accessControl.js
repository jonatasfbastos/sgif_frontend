var userPermissions = ['read_user']; // Pode conter várias permissões.


// Função para verificar se o usuário tem uma permissão específica.
function hasPermission(permission) {
    return userPermissions.includes(permission);
}

// Verificar permissões e mostrar seções apropriadas.
if (hasPermission('admin_access')) {
    // Mostrar a seção de administrador.
    console.log("o usuario é admin")
    // document.getElementById('admin-section').style.display = 'block';
  }
  
  if (hasPermission('read_user')) {
  console.log("o usuario é user")
    // Mostrar a seção de usuário.
    // document.getElementById('user-section').style.display = 'block';
}
