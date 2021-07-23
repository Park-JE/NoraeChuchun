const displayPlaylist = () => {
  const url = `https://nochu.pw/playlist_api/?uid=${user}&title=${playlistName}`;
  fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => console.log("error", error));
};

const displayPlaylistCookies = () => {
  // const cookieArray = getCookieArray("playlist");
  const music = cookieArray[1].map(createSong);
  const contentWrap = document.querySelector(".playlist-main .content-wrap");
  const descripWrap = document.querySelector(
    ".playlist-main .description-wrap"
  );

  contentWrap.append(...music);
  const addMusicBtn = document.querySelectorAll(
    ".playlist-main .content-wrap .music .add"
  );

  descripWrap.innerHTML = `<div
    class="cover"></div>
  <div class="info">
    <span class="title">${cookieArray[0]}</span>
    <div class="tagAndSong">
       <div class="tags">
         <span class="filter">#${cookieArray[2][0]}</span>
         <span class="filter">#${cookieArray[2][1]}</span>
      </div>
      <div class="songs">
        <i class="fas fa-compact-disc"></i>
        <span class="count">${cookieArray[1].length}곡</span>
      </div>
    </div>
  </div>`;

  const playMusic = contentWrap.querySelectorAll(".music .content .play");
  const pauseMusic = contentWrap.querySelectorAll(".music .content .pause");

  playMusic.forEach((play) => {
    play.addEventListener("click", () => {
      pauseMusic.forEach((otherPlays) => {
        if (otherPlays.classList.contains("active")) {
          otherPlays.classList.toggle("active");
          return;
        }
      });
      playMusic.forEach((otherPlays) => {
        if (otherPlays.classList.contains("active")) {
          otherPlays.classList.toggle("active");
          return;
        }
      });
      play.nextElementSibling.classList.toggle("active");
      if (play.classList.contains("active")) {
        play.classList.toggle("active");
      }
    });
  });

  pauseMusic.forEach((pause) => {
    pause.addEventListener("click", () => {
      pause.classList.toggle("active");
      pause.previousElementSibling.classList.toggle("active");
    });
  });

  addMusicBtn.forEach((addBtn) => {
    addBtn.addEventListener("click", () => {
      if (addBtn.nextSibling && addBtn.nextSibling.className === "addModal") {
        addBtn.nextSibling.remove();
        return;
      }
      addMusicBtn.forEach((btn) => {
        if (btn.nextSibling && btn.nextSibling.className === "addModal") {
          btn.nextSibling.remove();
          return;
        }
      });

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
