
function initNot() {
    get_no_load('notifications').then(not=>{
        fillNotifications(not)
        
    }).catch(error=>{
        console.log('Erro ao buscar notificações ', error)
    })

}


function fillNotifications(notList){
    notList = orderNotList(notList)
    let tbody = document.getElementById('notification-table-body');
    tbody.innerHTML=''
    // <tr class="notification-unread">
        // <td>
        //     <h1>Título Notificação</h1>
        //     <div class="notification-message">
        //         <p class="message">
        //             Mensagem da notificação
        //         </p>
        //     </div>
        //     <div class="message-info">
        //         <p>
        //             data message
        //         </p>
        //         <p>
        //             <img class="nao-lido" src="images/icons8-mensagem-24.png" alt="Marcar Como Lida">
        //             data message
        //         </p>
        //     </div>

        //     <hr class="separation">
        // </td>   
    // </tr>   
    notList.forEach(not=>{
        let tr = document.createElement('tr')
        tr.setAttribute('onclick', 'readNot('+not.id+')')
        tr.setAttribute('class', not.readed ? 'notification-read' : 'notification-unread')
        let td = document.createElement('td')
        let h1 = document.createElement('h1')
        h1.innerHTML = not.title + ' | ' + not.whatObjectName
        td.appendChild(h1)

        let divmes = document.createElement('div')
        divmes.setAttribute('class', 'notification-message')
        let pdivmes = document.createElement('p')
        pdivmes.setAttribute('class', 'message')
        pdivmes.innerHTML = not.body
        divmes.appendChild(pdivmes)
        td.appendChild(divmes)

        let divmesinfo = document.createElement('div')
        divmesinfo.setAttribute('class', 'message-info')
        let pdata = document.createElement('p')
        pdata.innerHTML = 'Em ' + new Date(not.sendDateTime).toLocaleDateString() + ' às ' + new Date(not.sendDateTime).toLocaleTimeString()
        divmesinfo.appendChild(pdata)
        let pinfo = document.createElement('p')
        let imgread = document.createElement('img')
        imgread.setAttribute('src', not.readed ? '../images/icons8-ler-mensagem-24.png':'../images/icons8-mensagem-24.png')
        pinfo.appendChild(imgread)
        pinfo.innerHTML += not.readed ? ('Lido| Em ' + not.whatObjectName) : ('Não Lido, clique para marcar como lido | Em ' + not.whatObjectName)
        divmesinfo.appendChild(pinfo)

        td.appendChild(divmesinfo)
        let hr = document.createElement('hr')
        hr.setAttribute('class', 'separation')
        td.appendChild(hr)
        tr.appendChild(td)        
        tbody.appendChild(tr)
    })

    console.log(pop)
}

function showNotifications(){
    initNot();
    let pop = document.getElementById('notification-popup')
    console.log('Cass', pop.className)

    if(pop.className == 'notification-popup-hide'){
        pop.className = 'notification-popup'
    }else{
        pop.className = 'notification-popup-hide'
    }
}

function readNot(id){
    console.log('Id-> ', id)
    
    get_params_no_load('setReadNotification', {id:id}).then(result=>{
        initNot()
        
    }).catch(error=>{
    })
}

function orderNotList(list){
    return list.sort(function(x, y) {
        // true values first
        return (x === y)? 0 : x? -1 : 1;
        // false values first
        // return (x === y)? 0 : x? 1 : -1;
    });
}