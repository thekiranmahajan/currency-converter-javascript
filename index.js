const from = document.getElementById("from");
const to = document.getElementById("to");
const inputCurrency = document.getElementById("from-currency");
const outputCurrency = document.getElementById("to-currency");
const conversionInfo = document.getElementById("conversion-info");

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

const exchangeCurrency = async () => {
  try {
    const input = parseFloat(inputCurrency.value);
    if (!isNaN(input) && input !== 0) {
      const url = `https://v6.exchangerate-api.com/v6/4454f9cd9a5f86f42e1e0a43/latest/${from.value}`;
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          outputCurrency.value = (
            inputCurrency.value * data.conversion_rates[to.value]
          ).toFixed(2);
          conversionInfo.innerText = `1 ${from.value} = ${
            data.conversion_rates[to.value]
          } ${to.value}`;
          createOptions(data.conversion_rates, from, to);
        });
    } else {
      conversionInfo.innerText = `Please enter a valid amount to convert`;
      outputCurrency.value = "";
    }
  } catch (error) {
    conversionInfo.innerText = `Oops something went wrong...`;
  }
};
exchangeCurrency();

from.addEventListener("change", exchangeCurrency);
to.addEventListener("change", exchangeCurrency);
inputCurrency.addEventListener("input", exchangeCurrency);
