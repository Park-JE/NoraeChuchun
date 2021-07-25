let id = document.querySelector(".id");
let loginBtn = document.querySelector(".loginBtn");
loginBtn.addEventListener("click", () => {
  document.cookie = "user" + "=" + id.value;
});
