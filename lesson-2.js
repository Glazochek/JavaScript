
// 1. Дан код:

// var a = 1, b = 1, c, d;
// c & d = undefined
// c = ++a; alert(c);           // 2
// d = b++; alert(d);           // 1
// c = (2+ ++a); alert(c);      // 5
// d = (2+ b++); alert(d);      // 4
// alert(a);                    // 3
// alert(b);                    // 3
// b++ отменяет увелечение на 1
// ++b прибавляет 1


// 2. Чему будет равен x в примере ниже?

var a = 2;
var x = 1 + (a *= 2);
// x = 5

// 3. Объявить две целочисленные переменные a и b и задать им произвольные начальные значения. Затем написать скрипт, который работает по следующему принципу:
// если a и b положительные, вывести их разность;
// если а и b отрицательные, вывести их произведение;
// если а и b разных знаков, вывести их сумму; ноль можно считать положительным числом.

var a = 1;
var b = 2;

if (a > 0 && b > 0) console.log(1, a - b);
if (a < 0 && b < 0) console.log(2, a * b);
if ((a >= 0 && b < 0) || (a < 0 && b >= 0)) console.log(3, a + b);


// 4. Присвоить переменной а значение в промежутке [0..15]. С помощью оператора switch организовать вывод чисел от a до 15.

function getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var a = getRandomInRange(1, 15)
console.log(a)

switch (a) {
    case a: console.log(getRandomInRange(a, 15))
}

// 5. Реализовать основные 4 арифметические операции в виде функций с двумя параметрами. Обязательно использовать оператор return.

function summ(a, b) {
    return (a + b);
}

function subtraction(a, b) {
    return (a - b);
}

function division(a, b) {
    if (b != 0) return (a / b);
}

function multiplication(a, b) {
    return (a * b);
}

// 6. Реализовать функцию с тремя параметрами: function mathOperation(arg1, arg2, operation), где arg1, arg2 – значения аргументов, operation – строка с названием операции. В зависимости от переданного значения операции выполнить одну из арифметических операций (использовать функции из пункта 5) и вернуть полученное значение (использовать switch).

function mathOperation(arg1, arg2, operation) {
    switch (operation) {
        case summ: return summ(arg1, arg2);
        case subtraction: return subtraction(arg1, arg2);
        case division: return division(arg1, arg2);
        case multiplication: return multiplication(arg1, arg2);
    }
}

console.log(mathOperation(1, 2, summ))
console.log(mathOperation(1, 2, subtraction))
console.log(mathOperation(1, 2, division))
console.log(mathOperation(1, 2, multiplication))