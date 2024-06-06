// https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur/jpy.json
const BASEUrl = 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies'
const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector('button');
const fromcurr = document.querySelector('.from select');
const tocurr = document.querySelector('.to select');
const msg = document.querySelector('.msg');

window.addEventListener('load', () => {
    updateMsg();
})

for (let select of dropdown) {
    for(code in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = code;
        newOption.value = code;
        if (select.name === 'from' && code === "USD") {
            newOption.selected = "selected";
        }
        else if (select.name === 'to' && code === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption)
    }
    select.addEventListener('change', (e) => {
        updateFlag(e.target);
    });
}

const updateFlag = (element) => {
    let currCode = element.value;
    let code = countryList[currCode];
    let newSrc = `https://flagsapi.com/${code}/flat/64.png`
    let img = element.parentElement.querySelector('img');
    img.src = newSrc;
}
btn.addEventListener('click', (e) => {
    e.preventDefault();
    updateMsg();
});

const updateMsg = async () => {
    let amount = document.querySelector('.amount input');
    let amtval = amount.value;
    if (amtval === '' || amtval < 1) {
        amtval = 1;
        amount.value=1
    }
    // console.log(fromcurr.value,tocurr.value)
    const URL = `${BASEUrl}/${fromcurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    // console.log(data);
    let rate = data[fromcurr.value.toLowerCase()][tocurr.value.toLowerCase()];
    // console.log(rate);
    let finalAmount = amtval * rate;

    msg.innerText = `${amtval} ${fromcurr.value} = ${finalAmount} ${tocurr.value}`;
}
