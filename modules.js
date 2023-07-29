/*console.log(arguments);
console.log('--------------------------------');
console.log(require('module').wrapper);*/

//module.exports
const C = require('./test-module-1');
const calc1 = new C();
console.log(calc1.add(2, 5));

const C2 = require('./test-module-2');
const calc2 = new C2();
console.log(calc2.add(2, 5));

//exports
const { add, multiply, divide } = require('./test-module-3');
console.log(multiply(2, 5));
