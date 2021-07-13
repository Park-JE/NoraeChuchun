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

  const addBtn = document.createElement("button");
  addBtn.setAttribute("class", "add");
  const addIcon = document.createElement("i");
  addIcon.setAttribute("class", "fas fa-list fa-lg");

  addBtn.append(addIcon);
  coverAndName.append(img);
  coverAndName.append(name);
  music.append(coverAndName);
  music.append(artist);
  music.append(album);
  music.append(addBtn);

  return music;
}

const displayPlaylistCookies = () => {
  const cookieArray = getCookieArray("playlist");
  const music = cookieArray[1].map(createSong);
  const contentWrap = document.querySelector(".playlist-main .content-wrap");
  const descripWrap = document.querySelector(
    ".playlist-main .description-wrap"
  );

  contentWrap.append(...music);
  const addMusicBtn = document.querySelectorAll(
    ".playlist-main .content-wrap .music .add"
  );

  descripWrap.innerHTML = `<img
    src="img/playlistCovers/${cookieArray[3]}"
    alt="platlist-cover"
    class="cover"
  />
  <div class="info">
    <span class="title">${cookieArray[0]}</span>
    <div class="tags">
      <span class="filter">#${cookieArray[2][0]}</span>
      <span class="filter">#${cookieArray[2][1]}</span>
    </div>
    <div class="songs">
      <i class="fas fa-compact-disc"></i>
      <span class="count">${cookieArray[1].length}곡</span>
    </div>
  </div>`;

  addMusicBtn.forEach((addBtn) => {
    addBtn.addEventListener("click", () => {
      if (addBtn.nextSibling && addBtn.nextSibling.className === "addModal") {
        addBtn.nextSibling.remove();
        return;
      }

      addModal = document.createElement("div");
      addModal.setAttribute("class", "addModal");
      addModal.innerHTML = `<div class="myPlaylist">내 플레이리스트</div>
      <div class="myPlaylist">운동할 때 들어야지</div>
      <div class="myPlaylist">집갈 때 들어야지</div>`;
      addBtn.after(addModal);

      document.addEventListener("click", (e) => {
        if (
          e.target.className !== "addModal" &&
          e.target.className !== "myPlaylist" &&
          e.target.className !== "addMusicBtn" &&
          e.target.className !== "fas fa-list fa-lg"
        ) {
          e.preventDefault();
          addModal.remove();
        }
      });

      const modalPlaylist = addModal.querySelectorAll(
        ".playlist-main .content-wrap .music .addModal .myPlaylist"
      );
      modalPlaylist.forEach((playlist) => {
        playlist.addEventListener("click", () => {
          alertAdd = document.createElement("div");
          alertAdd.setAttribute("class", "alertAdd");
          alertAdd.innerHTML = `<i class="fas fa-exclamation-circle"></i>
          <span>"${playlist.innerText}"에 추가되었습니다.</span>`;
          contentWrap.append(alertAdd);
          setTimeout(() => {
            alertAdd.remove();
          }, 2000);
        });
      });
    });
  });
};

displayPlaylistCookies();
