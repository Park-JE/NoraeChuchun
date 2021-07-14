function loadPlaylists() {
  const config = {
    headers: { Accept: "application/json" },
  };
  return fetch("data/playlist.json", config)
    .then((response) => response.json())
    .catch((error) => console.log("error", error));
}

function showNewPlaylist(list) {
  const playlistWrap = document.querySelector(".playlist-wrap");
  while (playlistWrap.firstChild) {
    playlistWrap.removeChild(playlistWrap.firstChild);
  }
  playlistWrap.append(...list[0]);
}

function createPlaylist(playlist) {
  const playlistCard = document.createElement("div");
  playlistCard.setAttribute("class", "playlist");

  const img = document.createElement("img");
  img.setAttribute("src", `img/playlistCovers/${playlist.cover}`);
  img.setAttribute("alt", "platlist-cover");
  img.setAttribute("class", "cover");
  img.setAttribute("data-mood", playlist.mood);

  const title = document.createElement("span");
  title.setAttribute("class", "title");
  title.innerText = `${playlist.title}`;

  const info = document.createElement("div");
  info.setAttribute("class", "info");

  const tags = document.createElement("div");
  tags.setAttribute("class", "tags");

  const filter1 = document.createElement("span");
  filter1.setAttribute("class", "filter");
  filter1.innerText = `#${playlist.mood[0]}`;

  const filter2 = document.createElement("span");
  filter2.setAttribute("class", "filter");
  if (playlist.mood[1] !== undefined) {
    filter2.innerText = `#${playlist.mood[1]}`;
  }

  const songs = document.createElement("div");
  songs.setAttribute("class", "songs");

  const icon = document.createElement("i");
  icon.setAttribute("class", "fas fa-compact-disc");

  const count = document.createElement("span");
  count.setAttribute("class", "count");
  count.innerText = `${playlist.musicList.length}곡`;

  songs.append(icon);
  songs.append(count);
  tags.append(filter1);
  tags.append(filter2);
  info.append(tags);
  info.append(songs);
  playlistCard.append(img);
  playlistCard.append(title);
  playlistCard.append(info);

  return playlistCard;
}

function onButtonClick(event, playlist) {
  const target = event.target;
  const value = target.innerText;
  if (value == null) {
    return;
  } else {
    updateItems(value, playlist);
  }
}

function updateItems(value, playlist) {
  newPlaylist = [];
  playlist[0].forEach((item) => {
    const mood = item.firstChild.dataset.mood.split(",");
    for (let i = 0; i < mood.length; i++) {
      if (mood[i] === value) {
        item.classList.remove("invisible");
        newPlaylist.push(item);
        return;
      } else {
        item.classList.add("invisible");
      }
    }
  });

  showNewPlaylist([newPlaylist]);
}
