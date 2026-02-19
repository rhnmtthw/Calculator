const display = document.querySelector(".display");

const clearBtn = document.querySelector("#clearBtn");
const deleteBtn = document.querySelector("#deteBtn");

const allBtns = document.querySelectorAll("button");

let num1='';
let num2='';
let operator='';
let initialResult=0;

function addition (num1, num2){
    initialResult = (+num1)+(+num2);
    return showResult(initialResult);
}

function subtraction (num1, num2){
    initialResult = (+num1)-(+num2);
    return showResult(initialResult)
}

function multiplication (num1, num2){
   initialResult = (+num1)*(+num2);
    return showResult(initialResult);
}

function division (num1, num2){
   initialResult = (+num1)/(+num2);
    return showResult(initialResult);
}

function operate (num1, num2, operator, test) {
    if (userPressedOperator === 0 && test === '=') return;
    return (operator === '+') ? addition(num1, num2) : 
    (operator === '-') ? subtraction(num1, num2) :
    (operator === 'x') ? multiplication(num1, num2) : division(num1, num2);
}

function showResult(value) {
    value = Math.round(value * 10 ** 8) / 10 ** 8;
    return display.textContent = value;
}


allBtns.forEach(btn => {
    btn.addEventListener("click", (btns) => {
        getValue(btn.textContent);
    });
});

let userPressedOperator=0;
let acceptedValues = '0123456789.'
let operators = '+-÷x';

function getValue (value) {
    if(value === 'DELETE') return deleteDisplay(value);
    if(value === 'CLEAR') return clearDisplay(value);
    if (value === '=') return operate(num1, num2, operator, value);
    if (operators.includes(value)) {
       userPressedOperator = 1; 
       display.textContent = (operator = value);
       return;
    }
    if (acceptedValues.includes(value) && userPressedOperator === 0) {
       return display.textContent = (num1+=value);
        
    } else {
        return display.textContent = (num2+=value);
    }
}

function deleteDisplay(value){
    if (userPressedOperator === 0) {
        num1 = num1.slice(0, -1);
        display.textContent = num1;
        return;
    } else {
        num2 = num2.slice(0, -1);
        display.textContent = num2;
        return;
    }
}

function clearDisplay(value){
    display.textContent="";
    num1 = '';
    num2 = '';
    operator = '';
    userPressedOperator = 0;
    return;
}