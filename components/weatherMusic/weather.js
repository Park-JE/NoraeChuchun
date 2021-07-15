// 날씨 코드에 맞는 한국어 json 파일 불러오기
function loadWeatherInKo() {
  const config = {
    headers: { Accept: "application/json" },
  };
  return fetch("data/ko.json", config)
    .then((response) => response.json())
    .catch((error) => console.log("error", error));
}

// 날씨 정보가 불러와졌을 때
const onGeoOk = (position) => {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const API_KEY = "1f8df0d58280f08cfe4b490e40aceb02";
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const recommendation = document.querySelector(".recommendation");
      const weather = recommendation.querySelector(".weather");
      const icon = weather.querySelector(".icon");
      const temp = weather.querySelector(".temperature");
      const loc = weather.querySelector(".location");
      const state = weather.querySelector(".state");
      icon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      const currentWeather = data.weather[0].main;
      const currentTemp = `${Math.round(data.main.temp)}`;
      temp.textContent = `${currentTemp}°C`;
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

      const loading = recommendation.querySelector(".loading");
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
};

// 날씨 정보가 불러와지지 않았을 때
const onGeoError = () => {
  alert("위치 정보 수집에 동의해 주세요 🥺");
};

// 현재 위치 정보 불러오기
navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
