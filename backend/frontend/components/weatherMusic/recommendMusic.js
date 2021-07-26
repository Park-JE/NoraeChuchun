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
  } else if (month === 12 && 18 <= date && date <= 25) {
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

const matchSeasonWithSong = (eachInfo) => {
  if (
    (eachInfo.energy > 0.6 && eachInfo.valence > 0.55) ||
    eachInfo.songName.indexOf("봄") !== -1 ||
    eachInfo.songName.toLowerCase().indexOf("spring") !== -1
  ) {
    eachInfo.mood.push("봄");
    return eachInfo;
  }
  if (
    (eachInfo.tempo > 95 && eachInfo.danceability > 0.6) ||
    (eachInfo.tempo > 95 && eachInfo.energy > 0.6) ||
    eachInfo.songName.indexOf("여름") !== -1 ||
    eachInfo.songName.toLowerCase().indexOf("summer") !== -1
  ) {
    eachInfo.mood.push("여름");
    return eachInfo;
  }
  if (
    eachInfo.danceability < 0.55 &&
    eachInfo.energy < 0.6 &&
    eachInfo.valence < 0.55
  ) {
    eachInfo.mood.push("가을");
    return eachInfo;
  }
  if (
    (eachInfo.energy < 0.3 && eachInfo.valence < 0.4) ||
    (eachInfo.energy > 0.6 && eachInfo.valence < 0.2) ||
    eachInfo.songName.indexOf("겨울") !== -1 ||
    eachInfo.songName.toLowerCase().indexOf("winter") !== -1
  ) {
    eachInfo.mood.push("겨울");
    return eachInfo;
  }
};

const matchTimeWithSong = (eachInfo) => {
  if (
    eachInfo.danceability > 0.55 &&
    eachInfo.energy > 0.6 &&
    eachInfo.valence > 0.55 &&
    eachInfo.tempo > 100
  ) {
    eachInfo.mood.push("아침");
    return eachInfo;
  }
  if (
    0.6 < eachInfo.danceability &&
    0.55 < eachInfo.energy &&
    90 < eachInfo.tempo &&
    eachInfo.tempo < 125
  ) {
    eachInfo.mood.push("오후");
    return eachInfo;
  }
  if (
    0.5 < eachInfo.danceability &&
    eachInfo.danceability < 0.75 &&
    0.6 < eachInfo.energy &&
    eachInfo.energy < 0.8 &&
    0.3 < eachInfo.valence &&
    eachInfo.valence < 0.7 &&
    eachInfo.tempo > 90
  ) {
    eachInfo.mood.push("저녁");
    return eachInfo;
  }
  if (eachInfo.energy <= 0.45 && eachInfo.valence < 0.3) {
    eachInfo.mood.push("밤/ 새벽");
    return eachInfo;
  }
};

const matchWeatherWithSong = (eachInfo) => {
  if (0.55 < eachInfo.valence && 70 < eachInfo.tempo && eachInfo.tempo < 130) {
    eachInfo.mood.push("화창한 날");
    return eachInfo;
  }
  if (
    0.5 <= eachInfo.danceability &&
    eachInfo.danceability < 0.72 &&
    0.3 <= eachInfo.valence &&
    eachInfo.valence < 0.75 &&
    65 <= eachInfo.tempo &&
    eachInfo.tempo < 110
  ) {
    eachInfo.mood.push("선선한 날");
    return eachInfo;
  }
  if (
    0.45 < eachInfo.danceability &&
    eachInfo.danceability < 0.55 &&
    0.3 < eachInfo.energy &&
    eachInfo.energy < 0.55
  ) {
    eachInfo.mood.push("쌀쌀한 날");
    return eachInfo;
  }
  if (
    (0.3 < eachInfo.energy &&
      eachInfo.energy < 0.5 &&
      0.3 < eachInfo.valence &&
      eachInfo.valence < 0.6 &&
      70 < eachInfo.tempo &&
      eachInfo.tempo < 110) ||
    (eachInfo.valence < 0.3 && eachInfo.tempo > 130)
  ) {
    eachInfo.mood.push("환절기");
    return eachInfo;
  }
  if (
    (eachInfo.danceability < 0.71 &&
      eachInfo.energy < 0.66 &&
      eachInfo.valence < 0.55 &&
      eachInfo.tempo < 100) ||
    eachInfo.songName.indexOf("비") !== -1 ||
    eachInfo.songName.indexOf("빗") !== -1 ||
    eachInfo.songName.indexOf("우산") !== -1 ||
    eachInfo.songName.indexOf("장마") !== -1 ||
    eachInfo.songName.toLowerCase().indexOf("rain") !== -1
  ) {
    eachInfo.mood.push("비/ 흐림");
    return eachInfo;
  }
  if (
    (0.7 < eachInfo.danceability &&
      eachInfo.danceability < 0.85 &&
      0.5 < eachInfo.energy &&
      eachInfo.energy < 0.7) ||
    (0.3 < eachInfo.valence && eachInfo.valence < 0.4 && eachInfo.tempo > 160)
  ) {
    eachInfo.mood.push("비온 후/ 맑게 갠");
    return eachInfo;
  }
  if (
    (eachInfo.songName.indexOf("눈") !== -1 ||
      eachInfo.songName.indexOf("겨울") !== -1 ||
      eachInfo.songName.toLowerCase().indexOf("snow") !== -1 ||
      eachInfo.songName.toLowerCase().indexOf("winter") !== -1) &&
    (parseInt(eachInfo.releaseDate.split("-")[1]) <= 2 ||
      parseInt(eachInfo.releaseDate.split("-")[1]) >= 11)
  ) {
    eachInfo.mood.push("눈오는 날");
    return eachInfo;
  }
  if (
    eachInfo.danceability > 0.5 &&
    eachInfo.energy > 0.7 &&
    eachInfo.tempo > 120
  ) {
    eachInfo.mood.push("폭염/ 더위");
    return eachInfo;
  }
};

const loadMusic = () => {
  const url = "https://nochu.pw/spotify/featured";
  return fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const musicInfo = data.map((song) => {
        let musicDescription = {
          id: song.id,
          releaseDate: song.track.album.release_date,
          songName: song.track.name,
          artist: song.track.artists[0].name,
          album: song.track.album.name,
          albumCover: song.track.album.images[2].url,
          playMusic: song.track.preview_url,
          danceability: song.danceability,
          energy: song.energy,
          tempo: song.tempo,
          valence: song.valence,
          mood: [],
        };
        return musicDescription;
      });
      return musicInfo;
    })
    .catch((error) => console.log("error", error));
};
