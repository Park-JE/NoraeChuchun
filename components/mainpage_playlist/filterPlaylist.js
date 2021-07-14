let musicList = [];
let newList = [];
const playlistWrap = document.querySelector(".playlist-wrap");

loadItems()
  .then((data) => {
    musicList = data.music;
  })
  .catch(console.log);

loadPlaylists()
  .then((data) => {
    newList = data.playlists.map((playlist) => {
      let playlistMood = playlist.mood;
      musicList.forEach((music) => {
        let musicMood = music.mood;
        const checkArray = playlistMood.filter((category) =>
          musicMood.includes(category)
        );
        if (JSON.stringify(playlistMood) === JSON.stringify(checkArray)) {
          playlist.musicList.push(music);
          return musicList;
        }
      });
      return playlist;
    });

    const playlist = newList.map(createPlaylist);
    playlistWrap.append(...playlist);

    const optionBtns = filterBar.querySelectorAll(
      ".titleAndFilters .filter-bar .option"
    );
    const playlistDiv = playlist.map((item) => item);

    optionBtns.forEach((optionBtn) => {
      optionBtn.addEventListener("click", (event) => {
        onButtonClick(event, [playlistDiv]);
      });
    });
  })
  .catch(console.log);

playlistWrap.addEventListener("click", (e) => {
  const clickedTarget = e.target.offsetParent;
  if (clickedTarget.className === "playlist") {
    const clickedList = newList.filter((list) => {
      if (list.title === clickedTarget.innerText.split("\n")[0]) {
        return list;
      }
    });
    const targetListInfo = [
      clickedList[0].title,
      clickedList[0].musicList,
      clickedList[0].mood,
      clickedList[0].cover,
    ];

    setCookie("playlist", JSON.stringify(targetListInfo), 1);
    window.location.href = "playlist.html";
    displayPlaylistCookies();
  }
});

function getCookieArray(playlist) {
  const cookie = document.cookie;
  let playlistCookie;

  if (cookie.length > 0) {
    startIndex = cookie.indexOf(playlist);
    if (startIndex != -1) {
      startIndex += playlist.length;
      endIndex = cookie.indexOf(";", startIndex);
      if (endIndex == -1) endIndex = cookie.length;
      playlistCookie = unescape(cookie.substring(startIndex + 1, endIndex));
    } else {
      return false;
    }
  } else {
    return false;
  }

  return JSON.parse(playlistCookie);
}
