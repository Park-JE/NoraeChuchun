const titleAndFilters = document.querySelector(".titleAndFilters");
const filterBtn = titleAndFilters.querySelector(".filter-btn");
const filterBar = titleAndFilters.querySelector(".filter-bar");
const blankBar = titleAndFilters.querySelector(".blank-bar");
const closeBtn = filterBar.querySelector(".btn-box .close");
const resetBtn = filterBar.querySelector(".filter-wrap .btn-box .reset");
const applyBtn = filterBar.querySelector(".apply-btn");
const optionBtns = filterBar.querySelectorAll(".option");
const filters = filterBar.querySelector(".filters");

filterBtn.addEventListener("click", () => {
  filterBar.classList.add("active");
  blankBar.classList.add("active");
});

blankBar.addEventListener("click", () => {
  filterBar.classList.remove("active");
  blankBar.classList.remove("active");
});

closeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  filterBar.classList.remove("active");
  blankBar.classList.remove("active");
});

resetBtn.addEventListener("click", (e) => {
  e.preventDefault();
  optionBtns.forEach((btn) => {
    if (btn.classList.contains("active")) {
      btn.classList.remove("active");
    }
  });

  loadPlaylists()
    .then((data) => {
      const playlist = data.playlists.map(createPlaylist);
      const playlistWrap = document.querySelector(".playlist-wrap");
      while (playlistWrap.firstChild) {
        playlistWrap.removeChild(playlistWrap.firstChild);
      }
      playlistWrap.append(...playlist);
    })
    .catch(console.log);
});

const checkBtn = (clickedBtn) => {
  optionBtns.forEach((btn) => {
    if (btn.classList.contains("active")) {
      btn.classList.remove("active");
    }
  });
  clickedBtn.classList.add("active");
};

optionBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    checkBtn(btn);
  });
});
