var ItemList = [] 
var item = {}
var arrayItensSelect
var nameItem
var qtdItem
var itemGraf = new Object()

atualizarTabelaItens()
function atualizarTabelaItens(){
    get('Item').then(dataa=>{
        console.log('Data', dataa)

        this.arrayItens = [
            itemGraf.nome = dataa.map(value => value.nome),
            itemGraf.quantidade = dataa.map(value => value.quantidade)
    ];

    const ctx = document.getElementById('myChart');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: itemGraf.nome,
            datasets: [{
              label: 'Quantidade',
              data: itemGraf.quantidade,
              backgroundColor:[
                '#13293D',
                '#006494',
                '#247BA0',
                '#E8F1F8',
                '#165b79',
                '#0e6cc4',
                '#0af'
              ],
              borderColor: [
                '#13293D',
                '#006494',
                '#247BA0',
                '#E8F1F8',
                '#165b79',
                '#0e6cc4',
                '#0af'
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
})}