const playlistWrap = document.querySelector(".playlist-wrap");

function loadPlaylists() {
  const config = {
    headers: { Accept: "application/json" },
  };
  return fetch(`https://nochu.pw/api/playlist/ `, config)
    .then((response) => response.json())
    .catch((error) => console.log("error", error));
}

function showNewPlaylist(list) {
  while (playlistWrap.firstChild) {
    playlistWrap.removeChild(playlistWrap.firstChild);
  }
  playlistWrap.append(...list[0]);
}

function createPlaylist(playlist) {
  const playlistCard = document.createElement("div");
  playlistCard.setAttribute("class", "playlist");
  playlistCard.setAttribute("data-id", `${playlist.id}`);
  playlistCard.setAttribute("data-user", `${playlist.user_id}`);

  const img = document.createElement("div");
  img.setAttribute("class", "cover");

  const title = document.createElement("span");
  title.setAttribute("class", "title");
  title.innerText = `${playlist.title}`;

  const info = document.createElement("div");
  info.setAttribute("class", "info");

  const tags = document.createElement("div");
  tags.setAttribute("class", "tags");

  const filter1 = document.createElement("span");
  filter1.setAttribute("class", "filter");
  if (playlist.category[0] !== undefined) {
    filter1.innerText = `#${playlist.category[0].tag}`;
  }

  const filter2 = document.createElement("span");
  filter2.setAttribute("class", "filter");
  if (playlist.category[1] !== undefined) {
    filter2.innerText = `#${playlist.category[1].tag}`;
  }

  const songs = document.createElement("div");
  songs.setAttribute("class", "songs");

  const icon = document.createElement("i");
  icon.setAttribute("class", "fas fa-compact-disc");

  const count = document.createElement("span");
  count.setAttribute("class", "count");
  count.innerText = `${playlist.tracks.length}곡`;

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
    const mood = item.childNodes[2].firstChild.textContent.split("#");
    mood.shift();
    for (let i = 0; i < mood.length; i++) {
      if (mood[i] === value) {
        item.classList.remove("invisible");
        newPlaylist.push(item);
        return;
      } else {
        item.classList.add("invisible");
      }
    }
    return;
  });

  showNewPlaylist([newPlaylist]);
}

playlistWrap.addEventListener("click", (e) => {
  if (e.target.parentNode.classList.contains("playlist")) {
    document.cookie = `playlist=${e.target.parentNode.childNodes[1].textContent}`;
    document.cookie = `friend_name=${e.target.parentNode.dataset.user}`;
  }
  window.location.href = "friendplaylist-list ";
});
