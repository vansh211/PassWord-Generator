const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copybtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generate-password");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");

let password = "";
let passwordLength = 10;
let checkCount = 1;
const symbols = ["vansh", "keshvi"] ;


//set strangth clr grey
handleSlider();


//password ki length set krne ke liye
function handleSlider() {
    inputSlider.value = passwordLength;
    lengthDisplay.textContent = passwordLength;
}

function setIndicator(color) {
   indicator.style.backgroundColor = color;
   
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function generateRandomNumber() {
    return getRndInteger(0, 9);
}

function generateLowerCase() {
    return String.fromCharCode(getRndInteger(97, 123));
}

function generateUpperCase() {
    return String.fromCharCode(getRndInteger(65, 91));
}

function generateSymbol() {
    let randInd = Math.floor(Math.random() * symbols.length);
    return symbols[randInd];
}

function calcStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if (uppercaseCheck.checked) hasUpper = true;
    if (lowercaseCheck.checked) hasLower = true;
    if (numbersCheck.checked) hasNum = true;
    if (symbolsCheck.checked) hasSym = true;

    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
        setIndicator("#0f0");
    } else if ((hasLower || hasUpper) && (hasNum || hasSym) && passwordLength >= 6) {
        setIndicator("#ff0");
    } else {
        setIndicator("#f00");
    }

}


async function copyContent() {
    try{
        await navigator.clipboard.writeText(passwordDisplay.value)
        copyMsg.innerText = "copied";
    }
    catch(e){
        copyMsg.innerText = "failed";
    }

    copyMsg.classList.add("active"); //to show the span

    setTimeout( () => {
        copyMsg.classList.remove("active");
    }, 2000)
}


inputSlider.addEventListener('input', (e) => {
    passwordLength = e.target.value;
    handleSlider();
})


copybtn.addEventListener('click', () => {
    if(passwordDisplay.value) {
        copyContent();
    }
})

function shufflePassword() {
    let arr = password.split("");
    for(let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        //swap
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr.join("");
 }

function handleCheckBox() {
 checkCount = 0;
 allCheckBox.forEach( (checkbox) => {
    if(checkbox.checked){
        checkCount++;
    }
 })

 if(passwordLength < checkCount) {
    passwordLength = checkCount;
    handleSlider();
 }
}

allCheckBox.forEach( (checkbox) => {
    checkbox.addEventListener('change', handleCheckBox)
})

generateBtn.addEventListener('click', () => {
    console.log("clicked");
    // if no checkbox in ticket
    if(checkCount == 0) return;

    if(passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }

    //remove old password
    password = "";

    //lets put the stuff mentioned by checkboxes
    // if(uppercaseCheck.checked) {
    //     password += generateUpperCase();
    // }

    // if(lowercaseCheck.checked) {
    //     password += generateLowerCase();
    // }

    // if(symbolsCheck.checked) {
    //     password += generateSymbol();
    // }

    // if(numbersCheck.checked) {
    //     password += generateRandomNumber();
    // }

    let funcArr = [];

    if(uppercaseCheck.checked) {
        funcArr.push(generateUpperCase);
    }
    if(lowercaseCheck.checked) {
        funcArr.push(generateLowerCase);
    }
    if(symbolsCheck.checked) {
        funcArr.push(generateSymbol);
    }
    if(numbersCheck.checked) {
        funcArr.push(generateRandomNumber);
    }

    // compulsory addition
    for(let i = 0; i < funcArr.length; i++) {
        password += funcArr[i]();
    }

    // remaining addition
    for(let i = 0; i < passwordLength - funcArr.length; i++) {
        let randIndex = getRndInteger(0, funcArr.length);
        password += funcArr[randIndex]();
    }

    //shuffle the password TAKI KISI KO PAT na chle
    // password = shufflePassword();

    //show in UI
    passwordDisplay.value = password;

    //calculate strength
    calcStrength(); 

})

