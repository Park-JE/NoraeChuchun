function loadItems() {
  const config = {
    headers: { Accept: "application/json" },
  };
  return fetch("static/data/music.json", config)
    .then((response) => response.json())
    .catch((error) => console.log("error", error));
}

function createElement(music) {
  const li = document.createElement("li");
  li.setAttribute("class", "music");

  const img = document.createElement("img");
  img.setAttribute("class", "album-cover");
  img.setAttribute("src", `static/img/albumCovers/${music.cover}`);
  img.setAttribute("alt", "album-cover");

  const songInfo = document.createElement("div");
  songInfo.setAttribute("class", "song-info");

  const name = document.createElement("span");
  name.setAttribute("class", "name");
  name.innerText = `${music.title}`;

  const artist = document.createElement("span");
  artist.setAttribute("class", "artist");
  artist.innerText = `${music.artist}`;

  songInfo.append(name);
  songInfo.append(artist);
  li.append(img);
  li.append(songInfo);

  return li;
}

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
