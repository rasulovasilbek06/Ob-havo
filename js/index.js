const form = document.querySelector("form");
const input = document.querySelector("input");
const weatherIcon = document.querySelector(".card__icon");
const overlay = document.querySelector(".overlay");
const card = document.querySelector(".card");

const errorEl = document.querySelector(".error");

function loader(condition) {
  if (condition) {
    overlay.classList.remove("hidden");
  } else {
    overlay.classList.add("hidden");
  }
}

const localWeather = JSON.parse(localStorage.getItem("weather"));
if (localWeather) {
  updateUI(localWeather);
} else {
  getWeather("ferghana").then((data) => {
    updateUI(data);
  });
}

function updateUI(data) {
  console.log(data);
  card.innerHTML = `
    <h2 class="card__city">${data.name}, ${data.sys.country}</h2>
    <img class="card__icon" src="https://openweathermap.org/img/wn/${
      data.weather[0].icon
    }@2x.png" alt="weather icon" width="100" height="100">
    <h2 class="card__weather">${data.weather[0].main}</h2>
    <h3 class="card__temp"><span>${Math.trunc(
      data.main.temp - 273
    )}</span> °C</h3>`;
}

async function getWeather(city) {
  const data = await getData(city);

  return data;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let inputVal = input.value.trim();

  getWeather(inputVal)
    .then((data) => {
      updateUI(data);
      localStorage.setItem("weather", JSON.stringify(data));
    })
    .catch((err) => {
      if (err) {
        errorEl.classList.remove("hidden");
        const errFunc = function () {
          errorEl.classList.add("hidden");
        };
        const sss = setTimeout(errFunc, 4000);
      }
    });

  input.value = "";
});
