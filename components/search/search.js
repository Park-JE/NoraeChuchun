const searchBtn = navBar.querySelector(".searchAndLogin .search");
const cancelBtn = navBar.querySelector(".searchAndLogin .close");
const inputBox = navBar.querySelector(".searchAndLogin input");

searchBtn.addEventListener("click", () => {
  if (inputBox.classList.contains("active")) {
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
    handleSearch(inputBox.value);
  }
});

const handleSearch = async (searchText) => {
  const result = await fetch("data/music.json")
    .then((response) => response.json())
    .then((json) => json.music)
    .catch((error) => console.log("error", error));

  let matches = result.filter((music) => {
    const regEx = new RegExp(`${searchText}`, "gi");
    return (
      music.title.match(regEx) ||
      music.artist.match(regEx) ||
      music.album.match(regEx)
    );
  });

  if (searchText.length === 0) {
    matches = [];
  }

  outputSearchHtml(matches, searchText);
  // window.location.href = "search.html";
};

const outputSearchHtml = (matches, searchText) => {
  const searchValue = document.querySelector(".search-wrap .value");
  searchValue.innerText = `" ${searchText} "에 해당하는 검색결과`;
  const sortTable = document.querySelector(".search-wrap .sort");
  const musicTable = document.querySelector(".search-wrap .musicList");
  const noResult = document.querySelector(".search-wrap .noResult");

  if (matches.length > 0) {
    sortTable.classList.remove("deactive");
    musicTable.classList.remove("deactive");
    noResult.classList.remove("active");

    const html = matches
      .map(
        (match) =>
          `<div class="music">
          <div class="coverAndName">
          <img src=img/albumCovers/${match.cover} alt="img" class="cover" />
          <span class="name">${match.title}</span>
          </div>
          <span class="artist">${match.artist}</span>
          <span class="album">${match.album}</span>
          <button class="add"><i class="fas fa-list fa-lg"></i></button>
        </div>`
      )
      .join("");
    musicTable.innerHTML = html;
  } else if (matches.length === 0) {
    sortTable.classList.add("deactive");
    musicTable.classList.add("deactive");
    noResult.classList.add("active");
  }
};
