/* 1. Создать функцию, генерирующую шахматную доску.
 При этом можно использовать любые html-теги по своему желанию. 
 Доска должна быть разлинована соответствующим образом,
  т.е. чередовать черные и белые ячейки. Строки должны нумероваться числами от 1 до 8, 
  столбцы – латинскими буквами A, B, C, D, E, F, G, H. (использовать createElement / appendChild)
*/

// прошу вас, я до часа ночи сидел разбирался 
// уже не могу видеть js
// буковки и циферки не додумался сделать, ночью голова уже совсем отключается


var i = 0;

var div1 = document.createElement("div");
div1.className = 'ww'
div1.style = "display: flex; flex-wrap: wrap ;color:black; border: 1px solid black; height: 640px; width: 648.5px; margin:20px"

m.appendChild(div1);

while (i < 16) {

    var cell = document.createElement("div");
    cell.className = 'ww'
    cell.style = "display: flex; flex-wrap: wrap ;color:black; border: 1px solid black; height: 160px; width: 160px;"

    div1.appendChild(cell)

    var aa = document.createElement("div");
    aa.className = "www2";
    aa.style = "background-color:white; height: 80px; width: 80px; color: black;"
    cell.appendChild(aa);

    var ss = document.createElement("div");
    ss.className = "www1";
    ss.style = "background-color:black; height: 80px; width: 80px; color: white;"
    cell.appendChild(ss);

    var dd = document.createElement("div");
    dd.className = "www1";
    dd.style = "background-color:black; height: 80px; width: 80px; color: white;"
    cell.appendChild(dd);

    var ff = document.createElement("div");
    ff.className = "www2";
    ff.style = "background-color:white; height: 80px; width: 80px; color: black;"
    cell.appendChild(ff);
    i++
}



/*  
2. Сделать генерацию корзины динамической:
 верстка корзины не должна находиться в HTML-структуре. 
 Там должен быть только div, в который будет вставляться корзина,
 сгенерированная на базе JS:
2.1. Пустая корзина должна выводить строку «Корзина пуста»;
2.2. Наполненная должна выводить «В корзине: n товаров на сумму m рублей».
*/

const Bag = {

    products:
        [
            {
                title: 'яблоко',
                price: 100
            }, {
                title: 'банан',
                price: 200
            }, {
                title: 'авокадо',
                price: 399
            }
        ],

    SummBag(products) {
        var summ = 0;
        var n = 0;
        for (var p in products) {
            summ += Bag.products[p].price;
            n++
        }
        if (summ > 0) {
            var t = 'В корзине: ' + n + ' товаров на сумму ' + summ + ' рублей'
            return t;
        }
        return 'корзина пуста';
    }

}


var bag = Bag.products;
console.log(bag);

var div_bag = document.createElement("div");
div_bag.className = 'ww';
div_bag.style = "display: flex; flex-wrap: wrap ;color:black; border: 10px solid black; color:black;"
div_bag.innerHTML = Bag.SummBag(bag);

m.appendChild(div_bag);



