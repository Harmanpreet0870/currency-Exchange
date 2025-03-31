const Base_URL = "https://v6.exchangerate-api.com/v6/750c9aabf664aed941034a29/latest/";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const message = document.querySelector(".msg");

for (let select of dropdowns) {
    for (let code in countryList) {
        let option = document.createElement("option");
        option.value = code;
        option.innerHTML = code;
        if (select.name === "from" && code === "USD") {
            option.selected = "selected";
        } else if (select.name === "to" && code === "INR") {
            
            option.selected = "selected";
        }
        select.append(option);
    }
    select.addEventListener("change", (evt) => {
        updateflag(evt.target);
    });
}

const updateflag = (Element) => {
    let code = Element.value;
    let countrycode = countryList[code];
    let newimg = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = Element.parentElement.querySelector("img");
    img.src = newimg;
};

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtval = amount.value;
    if (amtval === "" || amtval <= 0) {
        amtval = 1;
        amount.value = 1;
    }
    const URL = `${Base_URL}/${fromCurr.value.toUpperCase()}`;
    const country2 = toCurr.value.toUpperCase();
    console.log(country2);
    console.log("Fetching URL:", URL);
    let response = await fetch(URL);
    console.log("API Response:", response);
    let data = await response.json();
    console.log("API Response:", data);
    let rate = data.conversion_rates[country2];
    console.log("Conversion Rate:", rate);
    let finalamt = amtval * rate;

    console.log("Final Amount:", finalamt);
    message.innerHTML = ` ${amtval} ${fromCurr.value} = ${finalamt} ${toCurr.value}`;
    message.style.display = "block";
});
