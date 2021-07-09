function loadPlaylists() {
  const config = {
    headers: { Accept: "application/json" },
  };
  return fetch("data/playlist.json", config)
    .then((response) => response.json())
    .catch((error) => console.log("error", error));
}

function createPlaylist(playlist) {
  const aTag = document.createElement("a");
  aTag.setAttribute("href", "playlist.html");

  const playlistCard = document.createElement("div");
  playlistCard.setAttribute("class", "playlist");

  const img = document.createElement("img");
  img.setAttribute("src", playlist.playlistCover);
  img.setAttribute("alt", "platlist-cover");
  img.setAttribute("class", "cover");

  const title = document.createElement("span");
  title.setAttribute("class", "title");
  title.innerText = `${playlist.playlistTitle}`;

  const info = document.createElement("div");
  info.setAttribute("class", "info");

  const tags = document.createElement("div");
  tags.setAttribute("class", "tags");

  const filter1 = document.createElement("span");
  filter1.setAttribute("class", "filter");
  filter1.innerText = `#${playlist.playlistCategory[0]}`;

  const filter2 = document.createElement("span");
  filter2.setAttribute("class", "filter");
  filter2.innerText = `#${playlist.playlistCategory[1]}`;

  const songs = document.createElement("div");
  songs.setAttribute("class", "songs");

  const icon = document.createElement("i");
  icon.setAttribute("class", "fas fa-compact-disc");

  const count = document.createElement("span");
  count.setAttribute("class", "count");
  count.innerText = `${playlist.playlistMusic.length}곡`;

  songs.append(icon);
  songs.append(count);
  tags.append(filter1);
  tags.append(filter2);
  info.append(tags);
  info.append(songs);
  playlistCard.append(img);
  playlistCard.append(title);
  playlistCard.append(info);
  aTag.append(playlistCard);

  return aTag;
}

function onButtonClick(event, playlistData, playlistEle) {
  const target = event.target;
  const value = target.innerText;
  if (value == null) {
    return;
  } else {
    playlistData.map((playlist) => updateItems(value, playlist, playlistEle));
  }
}

function updateItems(value, playlist, playlistEle) {
  playlistEle.forEach((item) => {
    if (
      playlist.playlistCategory[0] === value ||
      playlist.playlistCategory[1] === value
    ) {
      item.classList.remove("invisible");
      // console.log("맞대");
    } else {
      item.classList.add("invisible");
      // console.log("틀리대");
    }
  });
}

loadPlaylists()
  .then((data) => {
    const playlist = data.playlists.map(createPlaylist);
    const playlistWrap = document.querySelector(".playlist-wrap");
    playlistWrap.append(...playlist);

    const optionBtns = filterBar.querySelectorAll(
      ".titleAndFilters .filter-bar .option"
    );

    const playlistData = data.playlists;
    const playlistEle = playlist.map((item) => item.firstChild);
    // console.log(playlistEle);

    optionBtns.forEach((optionBtn) => {
      optionBtn.addEventListener("click", (event) => {
        onButtonClick(event, playlistData, playlistEle);
      });
    });
  })
  .catch(console.log);
