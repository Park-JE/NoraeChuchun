const newplayBtn = document.querySelector(".myplaylist__add");
let modal = document.querySelector(".newplaylist");
const cover = document.querySelector(".cover");
const closeBtn = document.querySelector(".closeBtn");
const saveBtn = document.querySelector(".saveBtn");
const myplaylist_list = document.querySelector(".myplaylist__list");
const myplaylist__list = document.querySelector(".myplaylist__list");
let title = document.querySelector(".title");
let desc = document.querySelector(".desc");

console.log(modal);
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
    alert("제목을 입력해주세요😥")
  } else {
    let li = document.createElement("li")
    li.className = "list-group-play"
    let img = document.createElement("img")
    img.className = "myplaylist__thumnail"
    img.src = "./img/나랑아니면.jpeg"
    img.alt = "플레이리스트 이미지"
    let div = document.createElement("div")
    div.className = "myplaylist__title"
    div.innerHTML = title.value
    let span = document.createElement("span")
    span.className = "myplaylist__count"
    span.innerHTML = "노래 0곡"
    let span2 = document.createElement("span")
    span2.title = "공유하기"
    span2.className = "material-icons-outlined myplaylist__shareBtn"
    span2.innerHTML = "ios_share"

    li.appendChild(img)
    li.appendChild(div)
    console.log(li)
    li.appendChild(span)
    li.appendChild(span2)

    myplaylist__list.appendChild(li)
    cover.classList.remove("active");
    modal.classList.remove("active");
    title.value = "";
    desc.value = "";

  }

}