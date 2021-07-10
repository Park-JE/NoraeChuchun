function loadSongs() {
  const config = {
    headers: { Accept: "application/json" },
  };
  return fetch("data/music.json", config)
    .then((response) => response.json())
    .catch((error) => console.log("error", error));
}

function createSong(song) {
  const music = document.createElement("div");
  music.setAttribute("class", "music");

  const coverAndName = document.createElement("div");
  coverAndName.setAttribute("class", "coverAndName");

  const img = document.createElement("img");
  img.setAttribute("class", "cover");
  img.setAttribute("src", `img/albumCovers/${song.cover}`);
  img.setAttribute("alt", "img");

  const name = document.createElement("span");
  name.setAttribute("class", "name");
  name.innerText = `${song.title}`;

  const artist = document.createElement("span");
  artist.setAttribute("class", "artist");
  artist.innerText = `${song.artist}`;

  const album = document.createElement("span");
  album.setAttribute("class", "album");
  album.innerText = `#${song.album}`;

  const addIcon = document.createElement("i");
  addIcon.setAttribute("class", "fas fa-list fa-lg");

  coverAndName.append(img);
  coverAndName.append(name);
  music.append(coverAndName);
  music.append(artist);
  music.append(album);
  music.append(addIcon);

  return music;
}

loadSongs()
  .then((data) => {
    const music = data.music.map(createSong);
    const contentWrap = document.querySelector(".playlist-main .content-wrap");
    contentWrap.append(...music);
  })
  .catch(console.log);
