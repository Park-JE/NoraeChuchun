const newplayBtn = document.querySelector(".myplaylist__add");
let modal = document.querySelector(".newplaylist");
const cover = document.querySelector(".cover");
const closeBtn = document.querySelector(".closeBtn");
const saveBtn = document.querySelector(".saveBtn");
const myplaylist_list = document.querySelector(".myplaylist__list");
let title = document.querySelector(".title");
let desc = document.querySelector(".desc");
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

function addPlaylist() {
  if (title.value == "") {
    alert("제목을 입력해주세요😥");
  } else {
    let str = `<li class="list-group-play">
    <img class="myplaylist__thumnail" onclick="pageChange(this);" src="./static/img/albumCovers/92.jpg"
      alt="플레이리스트 이미지" />
    <span class="material-icons myplaylist-menu" onclick="displayMenu(this);">more_vert</span>
    <div class="myplaylist__title">`+ title.value + `</div>
    <span class="myplaylist__count">노래 0곡</span>
    <div class="menu-list">
      <ul>
        <li class="list-open"><span class="material-icons">
            lock_open
          </span>공개</li>
        <li class="list-close"><span class="material-icons">
            lock
          </span>
          비공개</li>
        <li class="list-share"><span class="material-icons">
            share
          </span>재생목록 공유</li>
        <li class="list-modify">
          <span class="material-icons">
            border_color
          </span>재생목록 수정
        </li>
        <li class="list-remove">
          <span class="material-icons">
            delete
          </span>재생목록 삭제
        </li>
      </ul>
    </div>
    <span class="material-icons lock-state">lock</span>
  </li>`;
    $(".myplaylist__list").append(str);

    cover.classList.remove("active");
    modal.classList.remove("active");
    title.value = "";
    desc.value = "";
  }
}


function pageChange(obj) {
  var form = document.getElementById("playlist_title");
  form.title.value = $(obj.parentNode.children[2]).html();
  form.submit();
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
  console.log(open)
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