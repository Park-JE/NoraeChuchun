function loadItems() {
  return fetch("data/playlist.json")
    .then((response) => response.json())
    .then((data) => data.playlist[0].list1.playlistMusic)
    .catch((error) => console.log("error", error));
}

function displayItems(songs) {
  const container = document.querySelector(
    ".recommendation .currentWeather-playlist"
  );
  container.innerHTML = songs.map((song) => createHTMLString(song)).join("");
}

function createHTMLString(song) {
  return `<li class="music">
    <img
      src=${song.cover}
      alt="album-cover"
      class="album-cover"
    />
    <div class="song-info">
      <span class="name">${song.title}</span>
      <span class="artist">${song.artist}</span>
    </div>
  </li>`;
}

loadItems()
  .then((data) => {
    displayItems(data);
  })
  .catch(console.log);
