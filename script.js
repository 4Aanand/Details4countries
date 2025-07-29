 const countriesContainer=document.querySelector('.counteries-container')
 const filterByRegion = document.querySelector('.filter-by-region')
const searchInput = document.querySelector('.search-container input')
const themeChanger = document.querySelector('.theme-changer')
const icon = document.querySelector("#icon");
const label = document.querySelector(".theme-label");



 let allCountriesData
 fetch('https://restcountries.com/v3.1/all?fields=name,cca2,cca3,capital,currencies,flags,population,region')
.then((res)=> res.json())
  .then((data) => {
    renderCountries(data)
    allCountriesData = data
  })
//     data.forEach((country)=> {
//         console.dir(data)
// const countryCard =document.createElement('a')
// countryCard.classList.add('country-card')
// countryCard.href = `/country.html?name=${encodeURIComponent(country.name.common)}`
// const cardHTML=`
//     <img src="${country.flags.svg}" alt="flag">
//             <div class="country-text">
//                 <h3 class="country-name">${country.name.common}</h3>
//             <p><b>Population: </b>${country.population.toLocaleString('en-IN')}</p>
//             <p><b>Region: </b>${country.region}</p>
//             <p><b>Capital: </b>${country.capital}</p>
//             </div>
// `
// countryCard.innerHTML= cardHTML
// countriesContainer.append(countryCard)
//     });
// })

filterByRegion.addEventListener('change',(e)=>{
      fetch(`https://restcountries.com/v3.1/region/${filterByRegion.value}`)
    .then((res) => res.json())
    .then(renderCountries)
})
function renderCountries(data) {
  countriesContainer.innerHTML = ''
  data.forEach((country) => {
    const countryCard = document.createElement('a')
    countryCard.classList.add('country-card')
    countryCard.href = `/country.html?name=${country.name.common}`
    countryCard.innerHTML = `
          <img src="${country.flags.svg}" alt="${country.name.common} flag" />
          <div class="card-text">
              <h3 class="card-title">${country.name.common}</h3>
              <p><b>Population: </b>${country.population.toLocaleString(
                'en-IN'
              )}</p>
              <p><b>Region: </b>${country.region}</p>
              <p><b>Capital: </b>${country.capital?.[0]}</p>
              <p><b>Currency code: </b>${country.cca2},${country.cca3}</p>
              
          </div>
  `
    countriesContainer.append(countryCard)
  })
}

searchInput.addEventListener('input',  (e) => {
  const filteredCountries = allCountriesData.filter((country) => country.name.common.toLowerCase().includes(e.target.value.toLowerCase()))
  renderCountries(filteredCountries)
})
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




