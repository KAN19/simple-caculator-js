let buffer = '0'; 
let runningTotal = 0; 
let previousOperator = null;    
const screen = document.querySelector('.screen'); 

document.querySelector('.buttonField').addEventListener('click', function(event) {
    buttonClick(event.target.innerText);
});

function buttonClick(value) {
    if (isNaN(parseInt(value))){
        handleSymbol(value); 
    } else {
        handleNumber(value); 
    }
    rerender(); 
}

function handleSymbol(value) {
    switch (value) {
        case 'C': 
            buffer = '0'; 
            runningTotal = 0; 
            previousOperator = null;
            break; 
        case '=':
            if (previousOperator === null) {
                return; 
            }
            flushOperation(parseInt(buffer)); 
            previousOperator = null;
            buffer = "" + runningTotal; 
            runningTotal = 0; 
            return; 
        case '←':
            buffer = buffer.substring(0, buffer.length-1); 
            if (buffer.length === 0) {
                buffer = "0";
            }
            return; 
        default: 
            handleMath(value); 
            break;
    }
}

function handleMath(value) {
    const intBuffer = parseInt(buffer); 
    if (runningTotal === 0) {
        runningTotal = intBuffer; 
    } else {
        flushOperation(intBuffer);
    }
    previousOperator = value; 
    buffer = "0";
}

function flushOperation(intBuffer) {
    if (previousOperator === '+') {
        runningTotal += intBuffer; 
    } else if (previousOperator === '-') {
        runningTotal -= intBuffer; 
    } else if (previousOperator === '*') { 
        runningTotal *= intBuffer; 
    } else {
        runningTotal /= intBuffer; 
    }
}

function handleNumber(value) {
    if (buffer === "0") {
        buffer = value; 
    } else { 
        buffer += value;
    }
}

function rerender() {
    screen.innerText = buffer; 
}