const key = "79e2db13684550ffd06b754da686db94";

async function getData(city) {
  const apiAdress = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;
  loader(true);
  const res = await fetch(apiAdress);
  if (res.status !== 200) {
    loader(false);
    throw new Error("error")
  }
  const data = await res.json();
  loader(false);

  return data;
}
