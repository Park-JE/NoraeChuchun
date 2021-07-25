const newplayBtn = document.querySelector(".myplaylist__add");
let modal = document.querySelector(".newplaylist");
const cover = document.querySelector(".cover");
const closeBtn = document.querySelector(".closeBtn");
const saveBtn = document.querySelector(".saveBtn");
const myplaylist_list = document.querySelector(".myplaylist__list");
let title = document.querySelector(".title");
let tags = document.querySelector(".tags");
const list_group_play = document.querySelector(".list-group-play");

newplayBtn.addEventListener("click", () => {
  cover.classList.add("active");
  modal.classList.add("active");
});

cover.addEventListener("click", () => {
  cover.classList.remove("active");
  modal.classList.remove("active");
});

closeBtn.addEventListener("click", () => {
  cover.classList.remove("active");
  modal.classList.remove("active");
});

var getCookie = function (name) {
  var value = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
  return value ? value[2] : null;
};


//플레이리스트 추가 
function addPlaylist() {
  if (title.value == "") {
    alert("제목을 입력해주세요😥");
  } else {
    let str =
      `<li class="list-group-play">
      <div class="myplaylist__thumnail" onclick="pageChange(this);"></div>
      <div class="fas fa-caret-down myplaylist-menu" onclick="displayMenu(this);" aria-hidden="true"></div>
      <div class="myplaylist__title">${title.value}</div>
      <span class="myplaylist__count">노래 0곡</span>
      <div class="menu-list">
        <ul>
          <li class="list-open"><span class="fas fa-lock-open" aria-hidden="true"></span>공개</li>
          <li class="list-close"><span class="fas fa-lock" aria-hidden="true"></span>비공개</li>
          <li class="list-share" onclick="kakaoShare(this)"><span class="fas fa-share-alt" aria-hidden="true"></span>재생목록 공유</li>
          <li class="list-modify"><span class="fas fa-edit" aria-hidden="true"></span>재생목록 수정</li>
          <li class="list-remove" onClick="delPlaylist(this)"><span class="fas fa-trash" aria-hidden="true"></span>재생목록 삭제</li>
        </ul>
      </div>
      <span class="fas fa-lock lock-state" aria-hidden="true"></span>
    </li>`;
    $(".myplaylist__list").append(str);
    let cate = new Array();
    let season_tag = new Object();
    let time_tag = new Object();
    let weather_tag = new Object();
    let seasonList = document.getElementsByName("season");
    for (let i = 0; i < seasonList.length; i++) {
      console.log(seasonList[i])
      if (seasonList[i].checked == true) {
        season_tag.tag = seasonList[i].value;
        cate.push(season_tag)
      }
    }
    let timeList = document.getElementsByName("time");
    for (let i = 0; i < timeList.length; i++) {
      console.log(timeList[i])
      if (timeList[i].checked == true) {
        time_tag.tag = timeList[i].value;
        cate.push(time_tag)
      }
    }
    let weatherList = document.getElementsByName("weather");
    for (let i = 0; i < weatherList.length; i++) {
      if (weatherList[i].checked == true) {
        weather_tag.tag = weatherList[i].value;
        cate.push(weather_tag)
      }
    }
    console.log(cate)
    //fetch 추가 플레이리스트 생성 
    fetch(`https://nochu.pw/api/playlist/`, {
      method: "POST",
      headers: {
        "X-CSRFToken": csrftoken = getCookie('csrftoken'),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: `${title.value}`, desc: "", user_id: `${getCookie("user")}`,
        category: cate, public: true

      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
    cover.classList.remove("active");
    modal.classList.remove("active");
    title.value = "";
  }
}

async function loadData() {
  const id = getCookie("user");
  const res = await fetch(`https://nochu.pw/api/playlist/?uid=${id}`);
  console.log(res);
  return await res.json();
}

function displayItems(items) {
  let str = `<li class="list-group-play">
  <div class="myplaylist__thumnail" onclick="pageChange(this);"></div>
  <div class="fas fa-caret-down myplaylist-menu" onclick="displayMenu(this);" aria-hidden="true"></div>
  <div class="myplaylist__title">${items.title}</div>
  <span class="myplaylist__count">노래 ${items.tracks.length}곡</span>
  <div class="menu-list">
    <ul>
      <li class="list-open"><span class="fas fa-lock-open" aria-hidden="true"></span>공개</li>
      <li class="list-close"><span class="fas fa-lock" aria-hidden="true"></span>비공개</li>
      <li class="list-share" onclick="kakaoShare(this)"><span class="fas fa-share-alt" aria-hidden="true"></span>재생목록 공유</li>
      <li class="list-modify"><span class="fas fa-edit" aria-hidden="true"></span>재생목록 수정</li>
      <li class="list-remove" onClick="delPlaylist(this)"><span class="fas fa-trash" aria-hidden="true"></span>재생목록 삭제</li>
    </ul>
  </div>
  <span class="fas fa-lock lock-state" aria-hidden="true"></span>
</li>`;
  $(".myplaylist__list").append(str);
}

var getFormUid = function (name) {
  var value = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
  return value ? value[2] : null;
};
function kakaoShare(obj) {
  //form 전송 까지는 완료 ,,,
  const form = document.getElementById("playlist_title");
  const form_uid = document.getElementById("form_uid");
  const form_playlist = document.getElementById("form_playlist");
  const title = obj.parentNode.parentNode.parentNode.children[2].innerHTML;
  const id = getFormUid("user");

  let targetTitle = `https://nochu.pw/friendplaylist-list?uid=${id}&playlist=${title}`;
  console.log(targetTitle);
  Kakao.Link.sendDefault({
    objectType: "feed",
    content: {
      title: "NOCHU",
      description: "날씨에 맞는 음악추천",
      imageUrl: "http://127.0.0.1:5500/static/img/favicon.png",
      link: {
        mobileWebUrl: targetTitle,
        androidExecutionParams: "test",
      },
    },

    buttons: [
      {
        title: "플레이리스트 확인하기",
        link: {
          mobileWebUrl: targetTitle,
          webUrl: targetTitle,
        },
      },
    ],
  });
  form_uid.value = user;
  form_playlist.value = title;
  form.submit();
}
function pageChange(obj) {
  const title = obj.parentNode.children[2].innerHTML;
  document.cookie = "playlist" + "=" + title;
  window.location.href = "myplaylist-list.html";
}

function displayMenu(obj) {
  const menu = obj.parentNode.children[4];
  const lock_state = obj.parentNode.children[5];
  const cover = document.querySelector(".cover2");
  const open = menu.children[0].children[0];
  const close = menu.children[0].children[1];
  const share = menu.children[0].children[2];
  obj.addEventListener("click", () => {
    menu.classList.add("active");
    cover.classList.add("active");
  });
  cover.addEventListener("click", () => {
    menu.classList.remove("active");
    cover.classList.remove("active");
  });
  open.addEventListener("click", () => {
    lock_state.classList.remove("active");
  });
  close.addEventListener("click", () => {
    lock_state.classList.add("active");
  });
}


//플레이리스트 삭제 
function delPlaylist(obj) {
  let parent = obj.parentNode.parentNode.parentNode;
  console.log(parent)
  let title = parent.children[2].innerText;

  fetch(
    `https://nochu.pw/api/playlist/?uid=${getCookie("user")}&title=${title}`
  )
    .then((response) => response.json())
    .then((data) => {
      data.forEach((ids) => {
        fetch(`https://nochu.pw/api/playlist/${ids.id}`, {
          method: "DELETE",
          headers: {
            "X-CSRFToken": csrftoken = getCookie('csrftoken'),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
          }),
        })
          .then((response) => response.json())
          .then((data) => console.log(data));
      })
    })
  const myplaylist__list = document.querySelector(".myplaylist__list")
  myplaylist__list.removeChild(parent);
}

loadData().then((items) => {
  items.forEach((playlist) => displayItems(playlist));
});
