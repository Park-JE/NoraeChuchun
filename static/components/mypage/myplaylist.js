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
  var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
  return value ? value[2] : null;
};

function addPlaylist() {
  if (title.value == "") {
    alert("제목을 입력해주세요😥");
  } else {
    let str = `<li class="list-group-play">
    <img class="myplaylist__thumnail" onclick="pageChange(this);" src="./static/img/albumCovers/92.jpg"
      alt="플레이리스트 이미지" />
    <div class="fas fa-caret-down myplaylist-menu" onclick="displayMenu(this);"></div>
    <div class="myplaylist__title">`+ title.value + `</div>
    <span class="myplaylist__count">노래 9곡</span>
    <div class="menu-list">
      <ul>
        <li class="list-open"><span class="fas fa-lock-open"></span>공개</li>
        <li class="list-close"><span class="fas fa-lock"></span>비공개</li>
        <li class="list-share" onClick="kakaoShare(this)"><span class="fas fa-share-alt"></span>재생목록 공유</li>
        <li class="list-modify"><span class="fas fa-edit"></span>재생목록 수정</li>
        <li class="list-remove"><span class="fas fa-trash"></span>재생목록 삭제</li>
      </ul>
    </div>
    <span class="fas fa-lock lock-state"></span>
  </li>`;
    $(".myplaylist__list").append(str);

    cover.classList.remove("active");
    modal.classList.remove("active");
    title.value = "";
  }
}

function loadData() {
  //회원 정보에 따라 user이랑 title 변경 해야함 
  //cookie 값 활용해서 친구 playlist에 들어가는 거 까진 했는데,, 
  const id = getCookie("user");
  return fetch(`https://nochu.pw/playlist_api/playlist/?uid=${id}`)
    .then(res => {
      console.log(res);
      return res.json();
    })
}

function displayItems(items) {
  let str = `<li class="list-group-play">
  <img class="myplaylist__thumnail" onclick="pageChange(this);" src="${items.tracks[0].track_image}"
    alt="플레이리스트 이미지" />
  <div class="fas fa-caret-down myplaylist-menu" onclick="displayMenu(this);"></div>
  <div class="myplaylist__title">${items.title}</div>
  <span class="myplaylist__count">노래 ${items.tracks.length}곡</span>
  <div class="menu-list">
    <ul>
      <li class="list-open"><span class="fas fa-lock-open"></span>공개</li>
      <li class="list-close"><span class="fas fa-lock"></span>비공개</li>
      <li class="list-share"><span class="fas fa-share-alt"></span>재생목록 공유</li>
      <li class="list-modify"><span class="fas fa-edit"></span>재생목록 수정</li>
      <li class="list-remove"><span class="fas fa-trash"></span>재생목록 삭제
      </li>
    </ul>
  </div>
  <span class="fas fa-lock lock-state"></span>
</li>`;
  $(".myplaylist__list").append(str);
};


function kakaoShare(obj) {
  loadUserInfo()
  const parent = obj.parentNode.parentNode.parentNode;
  let title = parent.children[2].innerHTML;
  //uid 정보 어케 불러오지 ?  
  let targetTitle = `https://nochu.pw/playlist_api/?uid=&title=title`
  console.log(targetTitle)
  Kakao.Link.sendDefault({
    objectType: 'feed',
    content: {
      title: 'NOCHU',
      description: '날씨에 맞는 음악추천',
      imageUrl: 'http://127.0.0.1:5500/static/img/favicon.png',
      link: {
        mobileWebUrl: targetTitle,
        androidExecutionParams: 'test',
      },
    },

    buttons: [
      {
        title: '플레이리스트 확인하기',
        link: {
          mobileWebUrl: targetTitle,
          webUrl: targetTitle
        },
      }
    ]
  });
}
function pageChange(obj) {
  const title = obj.parentNode.children[2].innerHTML;
  document.cookie = "playlist" + "=" + title;
  window.location.href = "myplaylist-list.html"
}


function displayMenu(obj) {
  const menu = obj.parentNode.children[4];
  const lock_state = obj.parentNode.children[5];
  const cover = document.querySelector(".cover2");
  const open = menu.children[0].children[0];
  const close = menu.children[0].children[1];
  const share = menu.children[0].children[2];
  const modify = menu.children[0].children[3];
  const remove = menu.children[0].children[4];
  obj.addEventListener("click", () => {
    menu.classList.add("active");
    cover.classList.add("active");
  })
  cover.addEventListener("click", () => {
    menu.classList.remove("active");
    cover.classList.remove("active");
  })
  open.addEventListener("click", () => {
    lock_state.classList.remove("active");
  })
  close.addEventListener("click", () => {
    lock_state.classList.add("active");
  })
  remove.addEventListener("click", () => {
    myplaylist_list.removeChild(obj.parentNode);
  })
  //공유랑 수정,,, 해야함 

}

loadData()
  .then(items => {
    items.forEach((playlist) => displayItems(playlist))
  })

