// music.json 불러오기
function loadItems() {
  const config = {
    headers: { Accept: "application/json" },
  };
  return fetch("data/music.json", config)
    .then((response) => response.json())
    .catch((error) => console.log("error", error));
}

// 날씨에 맞는 추천 음악 요소 생성
function createElement(music) {
  const li = document.createElement("li");
  li.setAttribute("class", "music");

  const img = document.createElement("img");
  img.setAttribute("class", "album-cover");
  img.setAttribute("src", `img/albumCovers/${music.cover}`);
  img.setAttribute("alt", "album-cover");

  const play = document.createElement("button");
  play.setAttribute("class", "manipul play");
  const playIcon = document.createElement("i");
  playIcon.setAttribute("class", "fas fa-play");
  play.append(playIcon);

  const pause = document.createElement("button");
  pause.setAttribute("class", "manipul pause");
  const pauseIcon = document.createElement("i");
  pauseIcon.setAttribute("class", "fas fa-pause");
  pause.append(pauseIcon);

  const songInfo = document.createElement("div");
  songInfo.setAttribute("class", "song-info");

  const name = document.createElement("span");
  name.setAttribute("class", "name");
  name.textContent = `${music.title}`;

  const artist = document.createElement("span");
  artist.setAttribute("class", "artist");
  artist.textContent = `${music.artist}`;

  songInfo.append(name);
  songInfo.append(artist);
  li.append(img);
  li.append(play);
  li.append(pause);
  li.append(songInfo);

  return li;
}

// 현재 날짜, 시간에 따라 카테고리 분류
let today = new Date();
let month = today.getMonth() + 1;
let date = today.getDate;
let hours = today.getHours();

const matchSeason = () => {
  if (3 <= month && month <= 5) {
    return "봄";
  } else if (6 <= month && month <= 8) {
    return "여름";
  } else if (9 <= month && month <= 11) {
    return "가을";
  } else if (month === 12 && date === 25) {
    return "크리스마스";
  } else if (1 <= month <= 2 && month === 12) {
    return "겨울";
  }
};

const matchTime = () => {
  if (5 <= hours && hours <= 11) {
    return "아침";
  } else if (12 <= hours && hours <= 17) {
    return "오후";
  } else if (18 <= hours && hours <= 20) {
    return "저녁";
  } else {
    return "밤/ 새벽";
  }
};

// 현재 온도와 날씨 상태에 따라 카테고리 분류
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
