const newplayBtn = document.querySelector(".myplaylist__add");
const modal = document.querySelector(".newplaylist");
const cover = document.querySelector(".cover");
const closeBtn = document.querySelector(".closeBtn");
const saveBtn = document.querySelector(".saveBtn");
let new_title = document.querySelector(".new__title");
let new_desc = document.querySelector(".new__desc");
const myplaylist_list = document.querySelector(".myplaylist__list");

console.log(modal)
newplayBtn.addEventListener("click", () => {
  cover.classList.add("active");
  modal.classList.add("active");
})

cover.addEventListener("click", () => {
  cover.classList.remove("active");
  modal.classList.remove("active");
})

closeBtn.addEventListener("click", () => {
  cover.classList.remove("active");
  modal.classList.remove("active");
})

//new_title.value 가 undefined 
saveBtn.addEventListener("click", () => {
  console.log('들옴')
  if (new_title.value != "") {
    console.log(new_title.value)
  }
});
