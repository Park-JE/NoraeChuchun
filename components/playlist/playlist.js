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
  album.innerText = `${song.album}`;

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

const displayPlaylistCookies = () => {
  getCookieArray("playlist")
    .then((data) => {
      const music = data[1].map(createSong);
      const contentWrap = document.querySelector(
        ".playlist-main .content-wrap"
      );
      const descripWrap = document.querySelector(
        ".playlist-main .description-wrap"
      );
      contentWrap.append(...music);

      descripWrap.innerHTML = `<img
    src="img/playlistCovers/${data[3]}"
    alt="platlist-cover"
    class="cover"
  />
  <div class="info">
    <span class="title">${data[0]}</span>
    <div class="tags">
      <span class="filter">#${data[2][0]}</span>
      <span class="filter">#${data[2][1]}</span>
    </div>
    <div class="songs">
      <i class="fas fa-compact-disc"></i>
      <span class="count">${data[1].length}곡</span>
    </div>
  </div>`;
    })
    .catch(console.log);
};
