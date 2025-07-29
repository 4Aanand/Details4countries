const Params = new URLSearchParams(window.location.search).get("name");
const flageImage = document.querySelector(".countries-details img");
const CountryName = document.querySelector(".countries-details h1");
const nativeName = document.querySelector(".native-name");
const population = document.querySelector(".population");
const region = document.querySelector(".region");
const subRegion = document.querySelector(".sub-region");
const capital = document.querySelector(".capital");
const topLevelDomain = document.querySelector(".top-level-domain");
const currencies = document.querySelector(".currencies");
const languages = document.querySelector(".languages");
const borderCountries = document.querySelector(".border-countries");
const themeChanger = document.querySelector('.theme-changer')
const icon = document.querySelector("#icon");
const label = document.querySelector(".theme-label");

fetch(`https://restcountries.com/v3.1/name/${Params}?fullText=true`)
  .then((res) => res.json())
  .then(([country]) => {
    console.log(country);
    flageImage.src = country.flags.svg;
    CountryName.innerText = country.name.common;
    population.innerText = country.population.toLocaleString("en-IN");
    region.innerText = country.region;
    topLevelDomain.innerText = country.tld.join(", ");

    if (country.capital) {
      capital.innerText = country.capital?.[0];
    }

    if (country.subregion) {
      subRegion.innerText = country.subregion;
    }

    if (country.name.nativeName) {
      nativeName.innerText = Object.values(country.name.nativeName)[0].common;
    } else {
      nativeName.innerText = country.name.common;
    }

    if (country.currencies) {
      currencies.innerText = Object.values(country.currencies)
        .map((currency) => currency.name)
        .join(", ");
    }

    if (country.languages) {
      languages.innerText = Object.values(country.languages).join(", ");
    }

    console.log(country);
    if (country.borders) {
      country.borders.forEach((border) => {
        fetch(`https://restcountries.com/v3.1/alpha/${border}`)
          .then((res) => res.json())
          .then(([borderCountry]) => {
            // console.log(borderCountry)
            const borderCountryTag = document.createElement("a");
            borderCountryTag.innerText = borderCountry.name.common;
            borderCountryTag.href = `country.html?name=${borderCountry.name.common}`;
            borderCountries.append(borderCountryTag);
          });
      });
    }
  });
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
