const API_KEY = "1f8df0d58280f08cfe4b490e40aceb02";

const onGeoOk = (position) => {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&lang=kr&units=metric`;
  if (!navigator.geolocation) {
    alert("위치 정보를 찾을 수 없습니다 🧐");
  } else {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const icon = document.querySelector(".recommendation .weather .icon");
        const temp = document.querySelector(
          ".recommendation .weather .temperature"
        );
        const loc = document.querySelector(
          ".recommendation .weather .location"
        );
        const state = document.querySelector(".recommendation .weather .state");
        icon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        temp.textContent = `${Math.round(data.main.temp)}°C`;
        loc.textContent = data.name;
        state.textContent = data.weather[0].description;
        const loading = document.querySelector(
          ".recommendation .weather .loading"
        );
        loading.classList.add("deactive");
      })
      .catch((error) => console.log("error", error));
  }
};

const onGeoError = () => {
  alert("위치 정보 수집에 동의해 주세요 😭");
};

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
