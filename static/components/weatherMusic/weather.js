// 날씨 코드에 맞는 한국어 json 파일 불러오기
let koWeatherKey;
function loadWeatherInKo() {
  const config = {
    headers: { Accept: "application/json" },
  };
  return fetch("static/data/ko.json", config)
    .then((response) => response.json())
    .then((data) => {
      koWeatherKey = data.openweathermap.weather_code;
      return koWeatherKey;
    })
    .catch((error) => console.log("error", error));
}
loadWeatherInKo();

// 날씨 정보가 불러와졌을 때
const onGeoOk = (position) => {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const API_KEY = "1f8df0d58280f08cfe4b490e40aceb02";
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  const recommendation = document.querySelector(".recommendation");
  const weatherMAIN = recommendation.querySelector(".weather");

  const loading = recommendation.querySelector(".loading");
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const cityWeather = {
        cityName: data.name,
        cityTemp: Math.round(data.main.temp),
        cityCondID: data.weather[0].id,
        cityCond: data.weather[0].main,
        cityWind: data.wind.speed,
        weatherIcon: data.weather[0].icon,
      };
      for (let key in koWeatherKey) {
        if (key === String(cityWeather.cityCondID)) {
          cityWeather.cityCondDescription = koWeatherKey[key];
          break;
        }
      }
      return cityWeather;
    })
    .then((cityWeather) => {
      const icon = weatherMAIN.querySelector(".icon");
      const temp = weatherMAIN.querySelector(".temperature");
      const loc = weatherMAIN.querySelector(".location");
      const state = weatherMAIN.querySelector(".state");
      icon.src = `http://openweathermap.org/img/wn/${cityWeather.weatherIcon}@2x.png`;
      temp.textContent = `${cityWeather.cityTemp}°C`;
      loc.textContent = cityWeather.cityName;
      state.textContent = cityWeather.cityCondDescription;
      return [
        cityWeather.cityTemp,
        cityWeather.cityCond,
        cityWeather.cityCondID,
      ];
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

      const filterSongByWeather = (eachInfo, result) => {
        matchSeasonWithSong(eachInfo);
        matchTimeWithSong(eachInfo);
        matchWeatherWithSong(eachInfo);

        if (eachInfo.mood.length === 0) {
          eachInfo.mood.push("쌀쌀한 날");
          eachInfo.mood.push("환절기");
          eachInfo.mood.push("비/ 흐림");
        }
        eachInfo.mood.forEach(function (eachMood) {
          if (eachMood === weatherParmValue) {
            result.push(eachInfo);
          }
        });
        return result;
      };

      loadMusic()
        .then((musicInfo) => {
          let result = [];
          musicInfo.forEach((eachInfo) => {
            filterSongByWeather(eachInfo, result);
          });
          const removeDuplication = result.filter((song1, idx1) => {
            return (
              result.findIndex((song2, idx2) => {
                return song1.id == song2.id;
              }) == idx1
            );
          });
          let newResult = [];
          if (result.length > 7) {
            for (i = 0; i < 8; i++) {
              const randomSong = removeDuplication.splice(
                Math.floor(Math.random() * removeDuplication.length),
                1
              )[0];
              newResult.push(randomSong);
            }
          } else {
            newResult = result;
          }
          const music = newResult.map(createSong);
          const container = document.querySelector(
            ".recommendation .currentWeather-playlist"
          );

          loading.classList.add("deactive");
          weatherMAIN.classList.add("active");
          container.classList.add("active");
          container.append(...music);
          playMusic(container);
          addMusic(container);
        })
        .catch(console.log);

      loadPlaylists()
        .then((data) => {
          playlistResult = [];
          data.map((playlist) => {
            playlist.category.forEach((mood) => {
              if (mood.tag && mood.tag === weatherParmValue) {
                playlistResult.push(playlist);
              }
            });
          });
          const playlists = playlistResult.map(createPlaylist);
          playlistWrap.append(...playlists);
          optionBtns.forEach((optionBtn) => {
            optionBtn.addEventListener("click", (event) => {
              const allPlaylists = data.map(createPlaylist);
              const allPlaylistDiv = allPlaylists.map((item) => item);
              onButtonClick(event, [allPlaylistDiv]);
            });
          });
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
