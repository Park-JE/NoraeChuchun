const playlistWrap = document.querySelector(".playlist-wrap");

function loadPlaylists() {
  const config = {
    headers: { Accept: "application/json" },
  };
  return fetch(`https://nochu.pw/playlist_api/playlist`, config)
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

  const img = document.createElement("div");
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

loadPlaylists()
  .then((data) => {
    const playlists = data.map(createPlaylist);
    playlistWrap.append(...playlists);
    const playlistDiv = playlists.map((item) => item);
    optionBtns.forEach((optionBtn) => {
      optionBtn.addEventListener("click", (event) => {
        onButtonClick(event, [playlistDiv]);
      });
    });
  })
  .catch(console.log);

//move to playlist
const pageChange = (target) => {
  const form = document.getElementById("playlist_form");
  form.title.value = target.parentNode.childNodes[1].textContent;
  form.submit();
};

playlistWrap.addEventListener("click", (e) => {
  pageChange(e.target);
});
