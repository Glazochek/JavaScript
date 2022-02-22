

var div_bag = document.createElement("div");
div_bag.className = 'catalog'
div_bag.style = "font-size: 30px; text-align: center; margin: 5px; max-width: 620px; display: flex; flex-wrap: wrap; border-radius: 10px; background-color: rgb(110, 110, 110);"
game.appendChild(div_bag);

var bag = document.createElement("div");
bag.className = 'bag'
bag.style = "font-size: 30px; text-align: center; margin: 5px; max-width: 620px; display: flex; flex-wrap: wrap; border-radius: 10px; background-color: rgb(110, 110, 110);"
var n = 1;
bag.textContent = 'корзина: пуста'
game.appendChild(bag);

div_bag.id = 'aa'

'use strict';

const cart = {

    goods: [],

    addGood(good) {
        this.goods.push(good);
        console.log(this.goods)
        var summ = 0;
        for (var e in (this.goods)) {
            console.log(prod[e])
            summ += 100;
        }
        this.bagContent(summ);
    },

    bagContent(summ) {
        bag.textContent = 'корзина: ' + n++ + ' продуктов |' + ' summa: ' + summ;
    },
};

const Catalog = {

    goods: [],
    cart: null,

    gameTableElement: document.getElementById('game'),

    init(cart) {
        this.cart = cart;
    },

    start() {
        this.AddProducts();
        this.ClickCart();
    },

    AddProducts() {
        for (var i = 0; i < 12; i++) {
            var a = 0;
            var product_2 = document.createElement("div");
            product_2.className = 'product';
            var infoProduct = 'productpr-' + i;
            var costs = 100;
            product_2.textContent = 'цена: ' + costs;
            product_2.className += infoProduct;
            product_2.style = " font-size: 30px; text-align: center; margin: 10px; width: 100px; height: 100px; border-radius: 10px; background-color: rgb(250, 250, 250);"
            aa.appendChild(product_2)
            this.goods.push(prod = { infoProduct: costs })
        }
    },

    ClickCart() {
        this.gameTableElement
            .addEventListener('click', (event) => this.IsCorrect(event));
    },

    IsCorrect(event) {
        if (event.target.className !== 'catalog' && event.target.className !== 'bag') return this.addToCart(cart, event);
    },

    addToCart(cart, event) {
        cart.addGood(event.target.className);
        console.log(this.goods);
    }
};


Catalog.start();

