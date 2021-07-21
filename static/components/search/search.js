const searchBtn = navBar.querySelector(".searchAndLogin .search");
const cancelBtn = navBar.querySelector(".searchAndLogin .close");
const inputBox = navBar.querySelector(".searchAndLogin input");

const addMusic = (musicTable) => {
  const addMusicBtn = musicTable.querySelectorAll(".music .add");
  addMusicBtn.forEach((addBtn) => {
    addBtn.addEventListener("click", () => {
      if (addBtn.nextSibling != null) {
        addBtn.nextSibling.remove();
        console.log("1");
        return;
      } else {
        addMusicBtn.forEach((btn) => {
          if (btn.nextSibling) {
            btn.nextSibling.remove();
            console.log("2");
          }
        });
        addModal = document.createElement("div");
        addModal.setAttribute("class", "addModal");
        addModal.innerHTML = `<div class="myPlaylist">내 플레이리스트</div>
        <div class="myPlaylist">운동할 때 들어야지</div>
        <div class="myPlaylist">집갈 때 들어야지</div>`;
        addBtn.after(addModal);
        console.log("3");
      }

      document.addEventListener("click", (e) => {
        if (
          e.target.className !== "addModal" &&
          e.target.className !== "myPlaylist" &&
          e.target.className !== "addMusicBtn" &&
          e.target.className !== "fas fa-list fa-lg"
        ) {
          addModal.remove();
        }
      });

      const modalPlaylist = addModal.querySelectorAll(
        ".music .addModal .myPlaylist"
      );
      modalPlaylist.forEach((playlist) => {
        playlist.addEventListener("click", () => {
          alertAdd = document.createElement("div");
          alertAdd.setAttribute("class", "alertAdd");
          alertAdd.innerHTML = `<i class="fas fa-exclamation-circle"></i>
          <span>"${playlist.innerText}"에 추가되었습니다.</span>`;
          searchWrap.append(alertAdd);
          setTimeout(() => {
            alertAdd.remove();
          }, 2000);
        });
      });
    });
  });
};

const playMusic = (musicTable) => {
  const playMusic = musicTable.querySelectorAll(".music .content .play");
  const pauseMusic = musicTable.querySelectorAll(".music .content .pause");
  const playingMusic = musicTable.querySelectorAll(".music .content .playing");
  const musicAudio = musicTable.querySelectorAll(".music .content .play-audio");

  playMusic.forEach((play) => {
    play.addEventListener("click", () => {
      pauseMusic.forEach((otherPlays) => {
        if (otherPlays.classList.contains("active")) {
          otherPlays.classList.toggle("active");
          return;
        }
      });
      playingMusic.forEach((otherPlays) => {
        if (otherPlays.classList.contains("active")) {
          otherPlays.classList.toggle("active");
          return;
        }
      });
      musicAudio.forEach((audio) => {
        audio.pause();
      });
      play.nextSibling.classList.toggle("active");
      play.previousElementSibling.play();
    });
  });

  playingMusic.forEach((playing) => {
    playing.addEventListener("click", () => {
      playing.previousElementSibling.previousElementSibling.pause();
      playing.classList.remove("active");
      playing.nextSibling.classList.add("active");
    });
  });

  pauseMusic.forEach((pause) => {
    pause.addEventListener("click", () => {
      pause.previousElementSibling.previousElementSibling.previousElementSibling.play();
      pause.classList.remove("active");
      pause.previousElementSibling.classList.add("active");
    });
  });
};

const createSong = (musicInfo) => {
  const music = document.createElement("div");
  music.setAttribute("class", "music");

  const content = document.createElement("div");
  content.setAttribute("class", "content");
  music.append(content);

  const img = document.createElement("img");
  img.setAttribute("class", "cover");
  img.setAttribute("src", `${musicInfo[3]}`);
  img.setAttribute("alt", "img");
  content.append(img);

  const audio = document.createElement("audio");
  audio.setAttribute("class", "play-audio");
  audio.setAttribute("src", `${musicInfo[4]}`);
  content.append(audio);

  const play = document.createElement("div");
  play.setAttribute("class", "manipul play");
  const playIcon = document.createElement("i");
  playIcon.setAttribute("class", "fas fa-play");
  play.append(playIcon);
  content.append(play);

  const playing = document.createElement("div");
  playing.setAttribute("class", "manipul playing");
  const playingIcon = document.createElement("i");
  playingIcon.setAttribute("class", "fas fa-volume-up");
  playing.append(playingIcon);
  content.append(playing);

  const pause = document.createElement("button");
  pause.setAttribute("class", "manipul pause");
  const pauseIcon = document.createElement("i");
  pauseIcon.setAttribute("class", "fas fa-pause");
  pause.append(pauseIcon);
  content.append(pause);

  const info = document.createElement("div");
  info.setAttribute("class", "info");
  content.append(info);

  const name = document.createElement("span");
  name.setAttribute("class", "name");
  name.innerText = `${musicInfo[0]}`;
  info.append(name);

  const descrip = document.createElement("div");
  descrip.setAttribute("class", "descrip");
  info.append(descrip);

  const artist = document.createElement("span");
  artist.setAttribute("class", "artist");
  artist.innerText = `${musicInfo[1]}`;
  descrip.append(artist);

  const dot = document.createElement("span");
  dot.setAttribute("class", "dot");
  dot.innerText = "∙";
  descrip.append(dot);

  const album = document.createElement("span");
  album.setAttribute("class", "album");
  album.innerText = `${musicInfo[2]}`;
  descrip.append(album);

  const addBtn = document.createElement("button");
  addBtn.setAttribute("class", "add");
  const addIcon = document.createElement("i");
  addIcon.setAttribute("class", "fas fa-list fa-lg");
  addBtn.append(addIcon);
  music.append(addBtn);

  return music;
};

const outputSearchHtml = (song, searchText) => {
  const searchWrap = document.querySelector(".search-wrap");
  const searchValue = searchWrap.querySelector(".value");
  searchValue.innerText = `" ${searchText} "에 해당하는 검색결과`;
  const sortTable = searchWrap.querySelector(".sort");
  const musicTable = searchWrap.querySelector(".musicList");
  const noResult = searchWrap.querySelector(".noResult");

  if (song != null) {
    sortTable.classList.remove("deactive");
    musicTable.classList.remove("deactive");
    noResult.classList.remove("active");
    searchResult = [...song].map(createSong);
    musicTable.append(...searchResult);
    playMusic(musicTable);
    addMusic(musicTable);
  } else if (song == null) {
    sortTable.classList.add("deactive");
    musicTable.classList.add("deactive");
    noResult.classList.add("active");
  }
};

const setSearchAni = () => {
  searchBtn.classList.add("active");
  cancelBtn.classList.add("active");
  inputBox.classList.add("active");
};

const handleSearch = (inputValue) => {
  const url = `https://nochu.pw/spotify?q=${inputValue}`;
  fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      {
        const songInfo = data.tracks.items;
        songInfo.map((song) => {
          // const musicInfo = {
          //   songName: song.name,
          //   artist: song.artists[0].name,
          //   album: song.album.name,
          //   albumCover: song.album.images[2].url,
          //   playMusic: song.preview_url,
          // };
          const songName = song.name;
          const artist = song.artists[0].name;
          const album = song.album.name;
          const albumCover = song.album.images[2].url;
          const playMusic = song.preview_url;
          const musicInfo = [songName, artist, album, albumCover, playMusic];
          outputSearchHtml([musicInfo], inputValue);
          setSearchAni();
        });
      }
    })
    .catch((error) => console.log("error", error));
};

searchBtn.addEventListener("click", () => {
  if (inputBox.classList.contains("active")) {
    // window.location.href = "search.html";
    handleSearch(inputBox.value);
  } else {
    inputBox.classList.add("active");
    searchBtn.classList.add("active");
    cancelBtn.classList.add("active");
    inputBox.focus();
  }
});

cancelBtn.addEventListener("click", () => {
  if (inputBox.value.length == 0) {
    inputBox.classList.remove("active");
    searchBtn.classList.remove("active");
    cancelBtn.classList.remove("active");
  } else {
    inputBox.value = "";
    inputBox.focus();
  }
});

inputBox.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    // window.location.href = "search.html";
    handleSearch(inputBox.value);
  }
});

// handleSearch();
