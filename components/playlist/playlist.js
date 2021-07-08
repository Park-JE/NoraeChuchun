const song = document.querySelector(".playlist-main .content-wrap .music");

function loadSongs() {
  const config = {
    headers: { Accept: "application/json" },
  };
  return fetch("data/playlist.json", config)
    .then((response) => response.json())
    .catch((error) => console.log("error", error));
}

function createSong(song) {
  const music = document.createElement("div");
  music.setAttribute("class", "music");

  const img = document.createElement("img");
  img.setAttribute("class", "cover");
  img.setAttribute("src", song.cover);
  img.setAttribute("alt", "img");

  const name = document.createElement("span");
  name.setAttribute("class", "name");
  name.innerText = `${song.title}`;

  const artist = document.createElement("span");
  artist.setAttribute("class", "artist");
  artist.innerText = `${song.artist}`;

  const tags = document.createElement("div");
  tags.setAttribute("class", "tags");

  const tag1 = document.createElement("span");
  tag1.setAttribute("class", "tag1");
  tag1.innerText = `#${song.category[0]}`;

  const tag2 = document.createElement("span");
  tag2.setAttribute("class", "tag2");
  tag2.innerText = `#${song.category[1]}`;

  tags.append(tag1);
  tags.append(tag2);
  music.append(img);
  music.append(name);
  music.append(artist);
  music.append(tags);

  return music;
}

loadSongs()
  .then((data) => {
    const music = data.playlists[0].playlistMusic.map(createSong);
    const contentWrap = document.querySelector(".playlist-main .content-wrap");
    contentWrap.append(...music);
  })
  .catch(console.log);
