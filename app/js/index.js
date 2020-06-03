let a = [1, 2, 3];
let b = [4, 5, 6];
let c = [...a, ...b];

const a1 = 3;
const a2 = 3;
console.log(a1)
console.log(c);

document.querySelector('h1').addEventListener('click', e => alert(e.target.textContent))