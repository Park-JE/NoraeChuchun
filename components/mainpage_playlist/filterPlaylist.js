let musicList = [];

loadItems()
  .then((data) => {
    musicList = data.music;
  })
  .catch(console.log);

loadPlaylists()
  .then((data) => {
    const newList = data.playlists.map((playlist) => {
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
    const playlistWrap = document.querySelector(".playlist-wrap");
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
