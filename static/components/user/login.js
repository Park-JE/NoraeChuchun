let id = document.querySelector(".id");
let loginBtn = document.querySelector(".loginBtn");
loginBtn.addEventListener("click", () => {
  document.cookie = "user" + "=" + id.value;
});

// function setCookie() {
//   console("눌리?")
//   document.cookie = "user" + "=" + id;
// }
