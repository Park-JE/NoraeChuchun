function loadItems() {
  const config = {
    headers: { Accept: "application/json" },
  };
  return fetch("data/playlist.json", config)
    .then((response) => response.json())
    .catch((error) => console.log("error", error));
}

function createElement(song) {
  const li = document.createElement("li");
  li.setAttribute("class", "music");

  const img = document.createElement("img");
  img.setAttribute("class", "album-cover");
  img.setAttribute("src", song.cover);
  img.setAttribute("alt", "album-cover");

  const songInfo = document.createElement("div");
  songInfo.setAttribute("class", "song-info");

  const name = document.createElement("span");
  name.setAttribute("class", "name");
  name.innerText = `${song.title}`;

  const artist = document.createElement("span");
  artist.setAttribute("class", "artist");
  artist.innerText = `${song.artist}`;

  songInfo.append(name);
  songInfo.append(artist);
  li.append(img);
  li.append(songInfo);

  return li;
}

loadItems()
  .then((data) => {
    const music = data.playlists[0].playlistMusic.map(createElement);
    const container = document.querySelector(
      ".recommendation .currentWeather-playlist"
    );
    container.append(...music);
  })
  .catch(console.log);
