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
})}