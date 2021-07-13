const searchBtn = navBar.querySelector(".searchAndLogin .search");
const cancelBtn = navBar.querySelector(".searchAndLogin .close");
const inputBox = navBar.querySelector(".searchAndLogin input");

searchBtn.addEventListener("click", () => {
  if (inputBox.classList.contains("active")) {
    setCookie("value", inputBox.value, 1);
    setCookie("inputId", inputBox.id, 1);
    handleSearch();
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
    setCookie("inputId", inputBox.id, 1);
    setCookie("value", inputBox.value, 1);
    handleSearch();
  }
});

function setCookie(name, value, expiredays) {
  const todayDate = new Date();
  todayDate.setDate(todayDate.getDate() + expiredays);
  document.cookie = `${name}=${escape(
    value
  )};path=/;expires=${todayDate.toGMTString()};`;
}

function getCookie(id, value) {
  const cookie = document.cookie;
  let idCookie;
  let valueCookie;

  if (cookie.length > 0) {
    startIndex = cookie.indexOf(id);
    if (startIndex != -1) {
      startIndex += id.length;
      endIndex = cookie.indexOf(";", startIndex);
      if (endIndex == -1) endIndex = cookie.length;
      idCookie = unescape(cookie.substring(startIndex + 1, endIndex));
    } else {
      return false;
    }
  } else {
    return false;
  }

  if (cookie.length > 0) {
    startIndex = cookie.indexOf(value);
    if (startIndex != -1) {
      startIndex += value.length;
      endIndex = cookie.indexOf(";", startIndex);
      if (endIndex == -1) endIndex = cookie.length;
      valueCookie = unescape(cookie.substring(startIndex + 1, endIndex));
    } else {
      return false;
    }
  } else {
    return false;
  }

  return [idCookie, valueCookie];
}

const handleSearch = async () => {
  const cookieArray = getCookie("inputId", "value");
  const result = await fetch("data/music.json")
    .then((response) => response.json())
    .then((json) => json.music)
    .catch((error) => console.log("error", error));

  let matches = result.filter((music) => {
    const regEx = new RegExp(`${cookieArray[1]}`, "gi");
    return (
      music.title.match(regEx) ||
      music.artist.match(regEx) ||
      music.album.match(regEx)
    );
  });

  if (cookieArray[1].length === 0) {
    matches = [];
  }

  if (cookieArray[0] !== "search") {
    window.location.href = "search.html";
    outputSearchHtml(matches, cookieArray[1]);
  }

  outputSearchHtml(matches, cookieArray[1]);
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
