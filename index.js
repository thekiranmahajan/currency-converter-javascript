const from = document.getElementById("from");
const to = document.getElementById("to");
const inputCurrency = document.getElementById("from-currency");
const outputCurrency = document.getElementById("to-currency");
const conversionInfo = document.getElementById("conversion-info");
let data = null;
const createOptions = (currencyObj, from, to) => {
  from.innerHTML = "";
  to.innerHTML = "";
  for (const currency in currencyObj) {
    const optionFrom = document.createElement("option");
    optionFrom.value = currency;
    optionFrom.text = currency;
    from.appendChild(optionFrom);

    const optionTo = document.createElement("option");
    optionTo.value = currency;
    optionTo.text = currency;
    to.appendChild(optionTo);
  }
};

const exchangeCurrency = (data) => {
  const input = parseFloat(inputCurrency.value);
  if (!isNaN(input) && input !== 0) {
    outputCurrency.value = (
      inputCurrency.value * data.conversion_rates[to.value]
    ).toFixed(2);
    console.log(outputCurrency.value);
    conversionInfo.innerText = `1 ${from.value} = ${
      data.conversion_rates[to.value]
    } ${to.value}`;
  } else {
    conversionInfo.innerText = `Please enter a valid amount to convert`;
    outputCurrency.value = "";
  }
};

const fetchAndPopulateAPI = async () => {
  try {
    const url = `https://v6.exchangerate-api.com/v6/4454f9cd9a5f86f42e1e0a43/latest/${from.value}`;
    const response = await fetch(url);
    data = await response.json();
    createOptions(data.conversion_rates, from, to);
    exchangeCurrency(data);
    from.selectedIndex = [...from.options].findIndex(
      (option) => option.value === "USD"
    );
    to.selectedIndex = [...to.options].findIndex(
      (option) => option.value === "INR"
    );
    exchangeCurrency(data);
  } catch (error) {
    conversionInfo.innerText = `Something went wrong...`;
  }
};

document.addEventListener("DOMContentLoaded", fetchAndPopulateAPI);
from.addEventListener("change", async () => {
  const url = `https://v6.exchangerate-api.com/v6/4454f9cd9a5f86f42e1e0a43/latest/${from.value}`;
  try {
    const response = await fetch(url);
    data = await response.json();

    exchangeCurrency(data);
  } catch (error) {
    conversionInfo.innerText = `Something went wrong...`;
  }
});
to.addEventListener("change", () => exchangeCurrency(data));
inputCurrency.addEventListener("input", () => exchangeCurrency(data));
