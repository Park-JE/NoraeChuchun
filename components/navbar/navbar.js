const body = document.querySelector("body");
const navBar = document.querySelector("nav");
const navMain = navBar.querySelectorAll(".navMain");
const toLogin = navBar.querySelector(".searchAndLogin .toLogin");

let prevScrollPos = window.pageYOffset;

window.addEventListener("scroll", () => {
  let currentScrollPos = window.pageYOffset;
  if (prevScrollPos > currentScrollPos) {
    navBar.style.top = "0";
  } else {
    navBar.style.top = "-70px";
  }
  prevScrollPos = currentScrollPos;
});

navMain.forEach((mainBtn) => {
  mainBtn.addEventListener("click", () => {
    window.location.href = "index.html";
  });
});

toLogin.addEventListener("click", () => {
  window.location.href = "login.html";
});
