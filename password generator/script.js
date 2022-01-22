const resultEl = document.querySelector(".result");
const lengthEl = document.querySelector(".length");
const uppercaseEl = document.querySelector(".uppercase");
const lowercaseEl = document.querySelector(".lowercase");
const numbersEl = document.querySelector(".numbers");
const symbolsEl = document.querySelector(".symbols");
const generateEl = document.querySelector("#generate");
const clipboard = document.querySelector("#clipboard");


const randomFunc = { ///create afn like object
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
}

clipboard.onclick = () => { //clipboard process that is copy the text onclick on it
    const textarea = document.createElement('textarea');
    const password = resultEl.innerText;//whatever the html tag is add in password

    if (!password) { //if it is false that means the fn is true
        return alert("No result to copy!");
    }
     //if password exist
    textarea.value = password;//set as password
    document.body.appendChild(textarea);//append textarea to body of the page
    textarea.select(); //its just the passw in textarea
    document.execCommand('copy');//copy the textarea
    textarea.remove();
    alert("Password copied to clipboard!");
}


generateEl.onclick = () => {
    const length = +lengthEl.value;
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;


    resultEl.innerHTML = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);//whatever generatepw fn return is stored in resultEL
}

function generatePassword(lower, upper, number, symbol, length) {
    let generatedPassword = ''; // initially its empty when user loads in first
    //its check the all the boxes are select,if one is select its ok to generate password otherwies 
    const typesCount = lower + upper + number + symbol; 
    //its return the first value of an array bcz object.values return the objects in array and 0 is first ele 
    const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter((item) => Object.values(item)[0]);

    if (typesCount == 0) { //users not select anything
        return alert(
            "No Selected Value"
        );
    }

    for (let i = 0; i < length; i += typesCount) { //i is increment by 1 everytime
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0]; //retrun the first key
            generatedPassword += randomFunc[funcName]();//its goes to randomfunc and slect the method
        })
    }

    const finalPassword = generatedPassword.slice(0, length);//generated pw was sliced

    return finalPassword;
}

function getRandomLower() {
    //generate a math random number and add with 97 and return some number then that is converted into alphabet by using the Charcode method
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)  //A = 65  a-97 
}

function getRandomUpper() {
    //same as above
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);

}

function getRandomNumber() {
    //same as above to creating a number
    return +String.fromCharCode(Math.floor(Math.random() * 10) + 48);  // 0 - 48
}

function getRandomSymbol() { //return random symbols
    const symbols = '!@#$%^&*(){}[]=<>,.';
    return symbols[Math.floor(Math.random() * symbols.length)];
}
