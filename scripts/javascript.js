const sidebar = document.getElementById('sidebar');
const closeopen = document.getElementById('closeopen');

closeopen.addEventListener('click', () => {
    sidebar.classList.toggle('active');
});
var user = getUser();

var val = document.getElementById('user_name')
val.innerHTML = user.login

function showUserOptions(){
    
}