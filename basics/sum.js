console.log(process.argv);

const sum = (a, b) => a + b;

//const num1 = +process.argv[2];
//const num2 = +process.argv[3];

//console.log(sum(num1, num2));

const [, , num1, num2] = process.argv;
//console.log(sum(num1, num2));
console.log(sum(+num1, +num2));

