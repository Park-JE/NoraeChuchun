const searchBtn = navBar.querySelector(".searchAndLogin .search");
const cancelBtn = navBar.querySelector(".searchAndLogin .close");
const inputBox = navBar.querySelector(".searchAndLogin input");

const outputSearchHtml = (matches, searchText) => {
  const searchWrap = document.querySelector(".search-wrap");
  const searchValue = searchWrap.querySelector(".value");
  searchValue.innerText = `" ${searchText} "에 해당하는 검색결과`;
  const sortTable = searchWrap.querySelector(".sort");
  const musicTable = searchWrap.querySelector(".musicList");
  const noResult = searchWrap.querySelector(".noResult");

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
        <button class="add"><i class="fas fa-list fa-lg"></i></button >
        </div>`
      )
      .join("");
    musicTable.innerHTML = html;

    const addMusicBtn = document.querySelectorAll(
      ".search-wrap .musicList .music .add"
    );

    addMusicBtn.forEach((addBtn) => {
      addBtn.addEventListener("click", () => {
        if (addBtn.nextSibling.className === "addModal") {
          addBtn.nextSibling.remove();
          return;
        }

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
            e.preventDefault();
            addModal.remove();
          }
        });

        const modalPlaylist = addModal.querySelectorAll(
          ".search-wrap .musicList .music .addModal .myPlaylist"
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
  } else if (matches.length === 0) {
    sortTable.classList.add("deactive");
    musicTable.classList.add("deactive");
    noResult.classList.add("active");
  }
};

const setSearchAni = () => {
  searchBtn.classList.add("active");
  cancelBtn.classList.add("active");
  inputBox.classList.add("active");
  inputBox.value = getCookie("value");
};

const handleSearch = () => {
  const cookieValue = getCookie("value");
  loadItems().then((data) => {
    const wholeMusicList = data.music;
    let matches = wholeMusicList.filter((music) => {
      const regEx = new RegExp(`${cookieValue}`, "gi");
      return (
        music.title.match(regEx) ||
        music.artist.match(regEx) ||
        music.album.match(regEx)
      );
    });

    if (cookieValue.length === 0) {
      matches = [];
    }

    outputSearchHtml(matches, cookieValue);
    setSearchAni();
  });
};

function getCookie(cname) {
  const cookie = document.cookie;
  let value;

  if (cookie.length > 0) {
    startIndex = cookie.indexOf(cname);
    if (startIndex != -1) {
      startIndex += cname.length;
      endIndex = cookie.indexOf(";", startIndex);
      if (endIndex == -1) endIndex = cookie.length;
      value = unescape(cookie.substring(startIndex + 1, endIndex));
    } else {
      return false;
    }
  } else {
    return false;
  }
  return value;
}

function setCookie(name, value, expiredays) {
  const todayDate = new Date();
  todayDate.setDate(todayDate.getDate() + expiredays);
  document.cookie = `${name}=${escape(
    value
  )};path=/;expires=${todayDate.toGMTString()};`;
}

searchBtn.addEventListener("click", () => {
  if (inputBox.classList.contains("active")) {
    setCookie("value", inputBox.value, 1);
    setCookie("inputId", inputBox.id, 1);
    if (getCookie("value") !== "search") {
      window.location.href = "search.html";
    }
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
    if (getCookie("value") !== "search") {
      window.location.href = "search.html";
    }
  }
});

handleSearch();
