const fromCurrencySelect = document.getElementById("fromCurrency");
const toCurrencySelect = document.getElementById("toCurrency");
const form = document.getElementById("converter-form");
const resultDiv = document.getElementById("result");
const themeChanger = document.querySelector('.theme-changer')
const icon = document.querySelector("#icon");
const label = document.querySelector(".theme-label");

// Load available currencies
async function loadCurrencies() {
  const url = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json";
  const json = await fetchJSON(url);
  if (!json) return;

  const currencies = Object.keys(json);
  currencies.forEach(code => {
    const optionFrom = document.createElement("option");
    optionFrom.value = code;
    optionFrom.textContent = code.toUpperCase();

    const optionTo = optionFrom.cloneNode(true);

    fromCurrencySelect.appendChild(optionFrom);
    toCurrencySelect.appendChild(optionTo);
  });

  fromCurrencySelect.value = "usd";
  toCurrencySelect.value = "inr";
}

async function fetchJSON(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}

async function convertCurrency(fromCurrency, toCurrency, amount) {
  const url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCurrency}.json`;
  const json = await fetchJSON(url);

  if (!json || !json[fromCurrency] || !json[fromCurrency][toCurrency]) {
    resultDiv.textContent = "Conversion failed. Try again later.";
    return;
  }

  const rate = json[fromCurrency][toCurrency];
  const converted = amount * rate;
  resultDiv.textContent = `${amount} ${fromCurrency.toUpperCase()} = ${converted.toFixed(2)} ${toCurrency.toUpperCase()}`;
}

// Form event
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const fromCurrency = fromCurrencySelect.value;
  const toCurrency = toCurrencySelect.value;
  const amount = parseFloat(document.getElementById("amount").value);
  if (!amount || amount <= 0) {
    resultDiv.textContent = "Please enter a valid amount.";
    return;
  }
  convertCurrency(fromCurrency, toCurrency, amount);
});

loadCurrencies();

// Load saved theme on page load
window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    icon.classList.replace("fa-moon", "fa-sun");
    label.textContent = "Light Mode";
  } else {
    document.body.classList.remove("dark");
    icon.classList.replace("fa-sun", "fa-moon");
    label.textContent = "Dark Mode";
  }
});

// Toggle theme on click
themeChanger.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark");

  if (isDark) {
    icon.classList.replace("fa-moon", "fa-sun");
    label.textContent = "Light Mode";
    localStorage.setItem("theme", "dark");
  } else {
    icon.classList.replace("fa-sun", "fa-moon");
    label.textContent = "Dark Mode";
    localStorage.setItem("theme", "light");
  }
});
