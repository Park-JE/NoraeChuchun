// 스크롤 내릴 때 네비바 사라짐, 스크롤 올릴 때 네비바 등장
const body = document.querySelector("body");
const navBar = body.querySelector("nav");
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
