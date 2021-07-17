const newplayBtn = document.querySelector(".myplaylist__add");
let modal = document.querySelector(".newplaylist");
const cover = document.querySelector(".cover");
const closeBtn = document.querySelector(".closeBtn");
const saveBtn = document.querySelector(".saveBtn");
const myplaylist_list = document.querySelector(".myplaylist__list");
const myplaylist__list = document.querySelector(".myplaylist__list");
let title = document.querySelector(".title");
let desc = document.querySelector(".desc");
const list_group_play = document.querySelector(".list-group-play");

console.log(list_group_play);
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
    let str =
      `<li class="list-group-play" onclick="pageChange(this);">
    <img class="myplaylist__thumnail" src="img/albumCovers/22.jpg" alt="플레이리스트 이미지" />
    <div class="myplaylist__title">` +
      title.value +
      `</div>
    <span class="myplaylist__count">노래 0곡</span>
    <span title="공유하기" class="material-icons-outlined myplaylist__shareBtn">ios_share</span>
  </li>`;
    $(".myplaylist__list").append(str);

    cover.classList.remove("active");
    modal.classList.remove("active");
    title.value = "";
    desc.value = "";
  }
}

function pageChange(obj) {
  console.log($($(obj).children()[1]).html());
  var form = document.getElementById("playlist_title");
  form.title.value = $($(obj).children()[1]).html();
  form.submit();
}
