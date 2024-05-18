let leftInput = document.querySelector('.leftInput');
let rightInput = document.querySelector('.rightInput');
let RUBleft = document.querySelector('.RUBleft');
let USDleft = document.querySelector('.USDleft');
let EURleft = document.querySelector('.EURleft');
let GBPleft = document.querySelector('.GBPleft');
let RUBright = document.querySelector('.RUBright');
let USDright = document.querySelector('.USDright');
let EURright = document.querySelector('.EURright');
let GBPright = document.querySelector('.GBPright');
let leftInputDiv = document.querySelector('.leftInputDiv');
let rightInputDiv = document.querySelector('.rightInputDiv');

let rubL = '1 RUB =';
let rubR = 'RUB';
let usdL = '1 USD =';
let usdR = 'USD';
let eurL = '1 EUR =';
let eurR = 'EUR';
let gbpL = '1 GBP =';
let gbpR = 'GBP';

let leftCurrency = "RUB";
let rightCurrency = "USD";

if (leftInput.value !== '' && leftInput.value !== '0') {
    fetch('https://v6.exchangerate-api.com/v6/abdf2ec8b6f8016f26cd8071/pair/RUB/USD')
        .then(res => res.json())
        .then(data => {
            leftInputDiv.innerText = `${rubL} ${data.conversion_rate} ${usdR}`;
            rightInputDiv.innerText = `${usdL} ${(1 / data.conversion_rate).toFixed(4)} ${rubR}`;
            rightInput.value = (leftInput.value * data.conversion_rate).toFixed(4);
        });
}

function changeAUTO() {
    if (leftInput.value === '' || leftInput.value === '0') {
        rightInput.value = '';
        return;
    }

    let url = `https://api.exchangerate-api.com/v4/latest/${leftCurrency}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            let rate = data.rates[rightCurrency];
            rightInput.value = (leftInput.value * rate).toFixed(4);
            leftInputDiv.innerText = `1 ${leftCurrency} = ${rate} ${rightCurrency}`;
            rightInputDiv.innerText = `1 ${rightCurrency} = ${(1 / rate).toFixed(4)} ${leftCurrency}`;
        });
}

function changeAUTOTwo() {
    if (rightInput.value === '' || rightInput.value === '0') {
        leftInput.value = '';
        return;
    }

    let url = `https://api.exchangerate-api.com/v4/latest/${rightCurrency}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            let rate = data.rates[leftCurrency];
            leftInput.value = (rightInput.value * rate).toFixed(4);
        });
}

leftInput.addEventListener('keyup', changeAUTO);
rightInput.addEventListener('keyup', changeAUTOTwo);

function selectCurrencyLeft(currency) {
    leftCurrency = currency;
    RUBleft.style.background = currency === 'RUB' ? '#833AE0' : 'none';
    USDleft.style.background = currency === 'USD' ? '#833AE0' : 'none';
    EURleft.style.background = currency === 'EUR' ? '#833AE0' : 'none';
    GBPleft.style.background = currency === 'GBP' ? '#833AE0' : 'none';
    changeAUTO();
}

function selectCurrencyRight(currency) {
    rightCurrency = currency;
    RUBright.style.background = currency === 'RUB' ? '#833AE0' : 'none';
    USDright.style.background = currency === 'USD' ? '#833AE0' : 'none';
    EURright.style.background = currency === 'EUR' ? '#833AE0' : 'none';
    GBPright.style.background = currency === 'GBP' ? '#833AE0' : 'none';
    changeAUTO();
}


RUBleft.addEventListener('click', () => selectCurrencyLeft('RUB'));
USDleft.addEventListener('click', () => selectCurrencyLeft('USD'));
EURleft.addEventListener('click', () => selectCurrencyLeft('EUR'));
GBPleft.addEventListener('click', () => selectCurrencyLeft('GBP'));

RUBright.addEventListener('click', () => selectCurrencyRight('RUB'));
USDright.addEventListener('click', () => selectCurrencyRight('USD'));
EURright.addEventListener('click', () => selectCurrencyRight('EUR'));
GBPright.addEventListener('click', () => selectCurrencyRight('GBP'));

function handleOfflineStatus() {
    alert("You are offline. Please check your internet connection.");
}
window.addEventListener('offline', handleOfflineStatus);
window.addEventListener('online', () => {
    alert("You are back online.");
});

function validateAndReplaceInput(event) {
    let inputField = event.target;
    let inputCharacter = String.fromCharCode(event.charCode);

    if (inputCharacter === ',') {
        event.preventDefault();
        inputField.value += '.';
    } else if (!/[0-9.]/.test(inputCharacter)) {
        event.preventDefault();
    }
}
