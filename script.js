const display = document.querySelector(".display");
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

let error=false;

function operate (num1, num2, operator, test) {
    if(!evaluateCounter) {
        evaluateCounter = true;
        if (userPressedOperator === 0 && test === '=') return;
        if (operator === '+') return addition(num1, num2);
        if (operator === '-') return subtraction(num1, num2);
        if (operator === 'x') return multiplication(num1, num2);
        if (operator === '÷') {
            if (num2 ==='0') {
                display.textContent = 'ERROR';
                error=true;
                return;
            }
            return division(num1, num2);
        }
        userPressedOperator = 0;
    } 
    if(evaluateCounter){
        (operator === '+') ? addition(finalResult, num2) : 
        (operator === '-') ? subtraction(finalResult, num2) :
        (operator === 'x') ? multiplication(finalResult, num2) : division(finalResult, num2);
    }
}

let finalResult=0;

function showResult(value) {
    finalResult = Math.round(value * 10 ** 8) / 10 ** 8;
    display.textContent = finalResult; 
    num2='';
    return;
}

allBtns.forEach(btn => {
    btn.addEventListener("click", () => getValue(btn.textContent));
});

const keyMap = {
        "Enter": "=",
        "=": "=",            
        "Backspace": "DELETE",  
        "Escape": "CLEAR",       
        "+": "+",
        "-": "-",
        "*": "x",            
        "/": "÷",            
        ".": ".",
    }

document.addEventListener("keydown", (e)=> {
    let key = e.key;
    if (key === 'Shift' || key === 'Control' || key === 'Alt' || key === 'Meta') return;
    if (key >= '0' && key <= '9') {
        e.preventDefault();
        return getValue(key);
    }
    const token = keyMap[key];
    if(!token) return;
    e.preventDefault();
    getValue(token);
})

let userPressedOperator=0;
let acceptedValues = '0123456789.'
let operators = '+-÷x';
let evaluateCounter = false;
let decimalEnterOnlyOnce = 0;

function getValue (value) {
    if(value === '.') decimalEnterOnlyOnce++;
    if(value === 'DELETE') return deleteDisplay();
    if(value === 'CLEAR' || error) return clearDisplay();
    if (value === '=' && !error) return operate(num1, num2, operator, value);
    if (operators.includes(value)) {
       if(num1=== '')return display.textContent = (num1+=value);
       userPressedOperator = 1; 
       decimalEnterOnlyOnce = 0;
       display.textContent = (operator = value);
       return;
    } 
    if (decimalEnterOnlyOnce === 1 || decimalEnterOnlyOnce === 0) {
        if (!evaluateCounter) {
            if (acceptedValues.includes(value) && userPressedOperator === 0) return display.textContent = (num1+=value);
            if (acceptedValues.includes(value) && userPressedOperator === 1) return display.textContent = (num2+=value);
        } else {
            num1 = finalResult;
            if (acceptedValues.includes(value)) return display.textContent = (num2+=value);
            return;
        }
    } else {
        return;
    }
}

function deleteDisplay(){
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

function clearDisplay(){
    display.textContent="";
    num1 = '';
    num2 = '';
    operator = '';
    userPressedOperator = 0;
    evaluateCounter = false;
    error=false;
    decimalEnterOnlyOnce = 0;
    return;
}