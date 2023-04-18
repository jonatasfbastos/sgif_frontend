var ItemList = [] 
var item = {}
var nameItem
var selectIn
var itemGraf = new Object()
let mygraphic = null;

setTiposItem()

function setTiposItem(){
  get('tipoDeItem').then(tipoitem=>{
    console.log('Tipos de item ', tipoitem)
    var multiCombo = document.getElementById('itemType')
    tipoitem.forEach(tipo=>{
        let option = document.createElement('option')
        option.value = tipo.id
        option.innerHTML = tipo.nome

        if(multiCombo.options.length >= tipoitem.length){
          console.log("Quantidade maxima")
        }else{
          multiCombo.appendChild(option)
        }
        
        
        selectIn = document.getElementById('itemType').value 
        
    })})
}

function atualizarTabelaItens(){


  if(mygraphic){
    mygraphic.destroy();
  }

  

  get('tipoDeItem').then(tipoitem=>{
    console.log('Tipos de item ', tipoitem)
    var multiCombo = document.getElementById('itemType')
    tipoitem.forEach(tipo=>{
        let option = document.createElement('option')
        option.value = tipo.id
        option.innerHTML = tipo.nome

        if(multiCombo.options.length >= tipoitem.length){
          console.log("Quantidade maxima")
        }else{
          multiCombo.appendChild(option)
        }
        
        
        selectIn = {id:document.getElementById('itemType').value} 
        
    })

  console.log(selectIn)
  get('Item').then(dataa=>{
    console.log('Data', dataa)
                 
  this.arrayItens = [
         
    itemGraf.nome = dataa.map(value => {
      if(value.tipoDeItem.id == selectIn.id){
          return value.nome
        }            
      }),
        itemGraf.quantidade = dataa.map(value => {
          if(value.tipoDeItem.id == selectIn.id){
            return value.quantidade
          }            
        })
    ];

    const ctx = document.getElementById('myChart');

    
    mygraphic = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: itemGraf.nome,
            datasets: [{
              label: 'Quantidade',
              data: itemGraf.quantidade,
              backgroundColor:[
                '#013b01',
                '#08d408',
                '#c90c0f',
                '#34972f',
                '#359830'
              ],
              borderColor: [
                '#013b01',
                '#08d408',
                '#c90c0f',
                '#34972f',
                '#359830'
              ],
              borderWidth: 2
            }]
        },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
          
        });
        
})})}