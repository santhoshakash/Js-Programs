const display1El = document.querySelector(".display-1");
const display2El = document.querySelector(".display-2");
const tempResultEl = document.querySelector(".temp-result");
const numbersEl = document.querySelectorAll(".number");
const operationEl = document.querySelectorAll('.operation');
const equalEl = document.querySelector(".equal");
const clearAllEl = document.querySelector('.all-clear');
const clearLastEl = document.querySelector(".last-entity-clear");
let dis1Num = ""; //first operand or input user provides
let dis2Num = ""; //second operand
let result = null; //operand peform is stire in results
let lastOperation = "";
let haveDot = false; //checks whether number is floating point means decimal num or not

//its for first time num enter
numbersEl.forEach((number) => {
    number.addEventListener("click", (e) => {//user click any num it call an event
        if (e.target.innerText === "." && !haveDot) { //if its true i.e decimal value is there its true
            haveDot = true;
        }
        else if (e.target.innerText === "." && haveDot) { // Check whether the number contains two decimals
            return;
        }
        dis2Num += e.target.innerText;//when user type a num simply add to disp2
        display2El.innerText = dis2Num;

    });
});
//operation section
operationEl.forEach((operation) => {
    operation.addEventListener("click", (e) => {
        if (!dis2Num) return; //sec num is not there return nothing
        haveDot = false;
        const operationName = e.target.innerText;
        if (dis1Num && dis2Num && lastOperation) {
            mathOperation();
        } else {
            result = parseFloat(dis2Num);
        }
        clearVar(operationName);     //45 + 45 + 67 * 9
        lastOperation = operationName;

    })
});
//its display the value above results
function clearVar(name = "") { //operation passed is set as a name
    dis1Num += dis2Num + " " + name + " ";
    display1El.innerText = dis1Num;
    display2El.innerText = "";
    dis2Num = "";
    tempResultEl.innerText = result;// final name 
}

function mathOperation() {
    if (lastOperation === 'x') {
        result = parseFloat(result) * parseFloat(dis2Num);
    }
    else if (lastOperation === "+") {
        result = parseFloat(result) + parseFloat(dis2Num);
    }
    else if (lastOperation === "-") {
        result = parseFloat(result) - parseFloat(dis2Num);
    }
    else if (lastOperation === "/") {
        result = parseFloat(result) / parseFloat(dis2Num);
    }
    else if (lastOperation === "%") {
        result = parseFloat(result) % parseFloat(dis2Num);
    }
}

equalEl.addEventListener("click", () => {
    if (!dis2Num || !dis1Num) return;
    haveDot = false;
    mathOperation();
    clearVar();
    display2El.innerText = result;
    tempResultEl.innerText = "";
    dis2Num = result;
    dis1Num = "";
});
//its clearing everything to empty
clearAllEl.addEventListener("click", () => {
    dis1Num = "";
    dis2Num = "";
    display1El.innerText = "";
    display2El.innerText = "";
    result = "";
    tempResultEl.innerText = "";
});
//its clear only last ele user type
clearLastEl.addEventListener("click", () => {
    display2El.innerText = "";
    dis2Num = "";
});
///keyboard section
window.addEventListener("keydown", (e) => { //its listen to wholewindow
    if (
        e.key === "0" ||
        e.key === "1" ||
        e.key === "2" ||
        e.key === "3" ||
        e.key === "4" ||
        e.key === "5" ||
        e.key === "6" ||
        e.key === "7" ||
        e.key === '8' ||
        e.key === "9" ||
        e.key === "."
    ) {
        clickButtonEl(e.key);
    }
    else if (e.key === "+" || e.key === "-" || e.key === "/" || e.key === "%") {
        clickOperation(e.key);
    }
    else if (e.key === "*") {
        clickOperation("x");
    }
    else if (e.key === "Enter" || e.key === "=") {
        clickEqual();
    }
});

function clickButtonEl(key) {
    numbersEl.forEach((button) => { //if user click any of button that is equal to key its call click fn
        if (button.innerText === key) {
            button.click();
        }
    })
}

function clickOperation(key) {
    operationEl.forEach((operation) => {
        if (operation.innerText === key) {
            operation.click();
        }
    })
}

function clickEqual() {
    equalEl.click();
}