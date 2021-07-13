const filterBtn = document.querySelector(".titleAndFilters .filter-btn");
const filterBar = document.querySelector(".titleAndFilters .filter-bar");
const closeBtn = filterBar.querySelector(".btn-box .close");
const resetBtn = filterBar.querySelector(".filter-wrap .btn-box .reset");
const applyBtn = filterBar.querySelector(".apply-btn");
const optionBtns = filterBar.querySelectorAll(".option");
const filters = filterBar.querySelector(".filters");

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

filterBtn.addEventListener("click", () => {
  filterBar.classList.toggle("active");
});

document.addEventListener("click", (e) => {
  if (
    (e.target.className !== "filter-btn" &&
      e.target.className !== "filter-bar active" &&
      e.target.className !== "filters" &&
      e.target.className !== "btn-box" &&
      e.target.className !== "btn reset" &&
      e.target.parentNode.className !== "filters" &&
      e.target.className !== "mypage" &&
      e.target.className !== "login") ||
    e.target.className === "btn close" ||
    e.target.className === "fas fa-times fa-lg"
  ) {
    e.preventDefault();
    filterBar.classList.remove("active");
  }
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

const scrollHeight = document.documentElement.clientHeight;
const filterWrap = document.querySelector(".filter-wrap");
filterWrap.addEventListener("resize", () => {
  filterWrap.style.height = `${scrollHeight}px`;
});
