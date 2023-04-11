setInterval(initNot, 10000)

function initNot() {
    get_no_load('notificationsUnread').then(not=>{

        setNotificationQuantity(not)
        
    }).catch(error=>{
        console.log('Erro ao buscar notificações ', error)
    })

}

function setNotificationQuantity(not){
    let elQty = document.getElementById('not-qty')
    if(not.length > 0) {
        //tem notificações
        elQty.classList.remove('no-not')
        elQty.classList.add('has-not')

        elQty.innerHTML = not.length

        //Getting notifications
        console.log('Notifications ', not)

        fillNotifications(not)
        
    }else{
        //nao tem
        elQty.classList.add('no-not')
        elQty.classList.remove('has-not')
        
        let pop = document.getElementById('notification-popup');
        pop.innerHTML=''
    }
}

function fillNotifications(notList){
    let pop = document.getElementById('notification-popup');
    pop.innerHTML=''
    notList.forEach(not=>{
        let a = document.createElement('a')
        a.setAttribute('class', 'notification-not')
        a.setAttribute('onclick', 'notClick('+not.id+')')

        let title = document.createElement('h1')
        title.innerHTML = not.title
        a.appendChild(title)

        let div = document.createElement('div')
        div.setAttribute('class', 'notification-message')

        let img = document.createElement('img')
        img.setAttribute('src', '../images/icons8-relógio-despertador-48.png')
        div.appendChild(img)
        
        let p = document.createElement('p')
        p.innerHTML = not.body
        div.appendChild(p)

        a.appendChild(div)

        let h = document.createElement('p')
        h.innerHTML = 'Em ' + new Date(not.sendDateTime).toLocaleDateString() + ' às ' + new Date(not.sendDateTime).toLocaleTimeString()
        a.appendChild(h)
        a.appendChild(document.createElement('hr'))

        pop.appendChild(a)
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

function notClick(id){
    console.log('Id-> ', id)
    
    // get_params_no_load('setReadNotification', {id:id}).then(result=>{
    //     initNot()
        
    // }).catch(error=>{
    // })
    window.open('../br.com.ifba.notificationcenter/notificationcenter.html', '_blank').focus();
}