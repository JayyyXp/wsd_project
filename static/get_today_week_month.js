
const today = new Date();
const year = today.getFullYear();

let onejan = new Date(today.getFullYear(), 0, 1);
let week = Math.ceil( (((today.getTime() - onejan.getTime()) / 86400000) + onejan.getDay() + 1) / 7 );
console.log(`${year}-W${week}`);
document.getElementById('week').value = `${year}-W${week}`;

let month = today.getMonth() + 1;
document.getElementById('month').value = `${year}-${month}`;