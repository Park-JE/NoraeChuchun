const API_KEY = "1f8df0d58280f08cfe4b490e40aceb02";

function loadWeatherInKo() {
  const config = {
    headers: { Accept: "application/json" },
  };
  return fetch("data/ko.json", config)
    .then((response) => response.json())
    .catch((error) => console.log("error", error));
}

const weatherWrap = document.querySelector(".recommendation .weather");

let currentDescrip;

const onGeoOk = (position) => {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  if (!navigator.geolocation) {
    alert("위치 정보를 찾을 수 없습니다 🧐");
  } else {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const weather = document.querySelector(".recommendation .weather");
        const icon = weather.querySelector(".icon");
        const temp = weather.querySelector(".temperature");
        const loc = weather.querySelector(".location");
        const state = weather.querySelector(".state");
        icon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        temp.textContent = `${Math.round(data.main.temp)}°C`;
        loc.textContent = data.name;
        const weatherCode = data.weather[0].id;

        loadWeatherInKo().then((data) => {
          const koWeatherKey = data.openweathermap.weather_code;
          for (let key in koWeatherKey) {
            if (key === String(weatherCode)) {
              currentDescrip = koWeatherKey[key];
              break;
            }
          }
          state.textContent = currentDescrip;
        });

        currentTemp = `${Math.round(data.main.temp)}`;
        currentWeather = data.weather[0].main;

        const loading = document.querySelector(".recommendation .loading");
        loading.classList.add("deactive");
        weather.classList.add("active");

        return [currentTemp, currentWeather, weatherCode];
      })
      .then((weather) => {
        const weatherParm = () => {
          const conditions = [
            matchSeason(),
            matchTime(),
            matchTemp(weather[0]),
            matchWeather(weather[1], weather[2]),
          ];
          const random = Math.floor(Math.random() * conditions.length);
          return conditions[random];
        };

        const weatherParmValue = weatherParm();

        const filterSongByWeather = (data) => {
          let result = [];
          data.filter((song) => {
            song.mood.forEach(function (item) {
              if (item === weatherParmValue) {
                result.push(song);
              }
            });
          });
          return result;
        };

        loadItems()
          .then((data) => {
            const result = filterSongByWeather(data.music);
            let newResult = [];
            for (i = 0; i < 8; i++) {
              const randomSong = result.splice(
                Math.floor(Math.random() * result.length),
                1
              )[0];
              newResult.push(randomSong);
            }

            const music = newResult.map(createElement);
            const container = document.querySelector(
              ".recommendation .currentWeather-playlist"
            );
            container.classList.add("active");
            container.append(...music);
          })
          .catch(console.log);
      })
      .catch((error) => console.log("error", error));
  }
};

const onGeoError = () => {
  alert("위치 정보 수집에 동의해 주세요 😭");
};

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);

const matchTemp = (temp) => {
  if (temp <= 4) {
    return "눈오는 날";
  } else if (5 <= temp && temp <= 10) {
    return "환절기";
  } else if (11 <= temp && temp <= 16) {
    return "쌀쌀한 날";
  } else if (17 <= temp && temp <= 22) {
    return "선선한 날";
  } else if (23 <= temp) {
    return "폭염/ 더위";
  }
};

const matchWeather = (weather1, weather2) => {
  if (weather1 === "Clear") {
    return "화창한 날";
  } else if (weather1 === "Clouds" && (weather2 === 801 || weather2 === 803)) {
    return "비온 후/ 맑게 갠";
  } else if (weather1 === "Snow") {
    return "눈오는 날";
  } else {
    return "비/ 흐림";
  }
};
