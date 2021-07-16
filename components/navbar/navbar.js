const body = document.querySelector("body");
const navBar = body.querySelector("nav");
let prevScrollPos = window.pageYOffset;
const userAndDarkMode = navBar.querySelector(".userAndDarkMode ");
const logout = userAndDarkMode.querySelector(".logout");
const darkMode = userAndDarkMode.querySelector(".dark-mode");
const lightBtn = darkMode.querySelector(".light");
const darkBtn = darkMode.querySelector(".dark");
const ellipsisBtn = navBar.querySelector(".ellipsis");

window.addEventListener("scroll", () => {
  let currentScrollPos = window.pageYOffset;
  if (prevScrollPos > currentScrollPos) {
    navBar.style.top = "0";
  } else {
    navBar.style.top = "-70px";
  }
  prevScrollPos = currentScrollPos;
});

lightBtn.addEventListener("click", () => {
  lightBtn.classList.toggle("deactive");
  darkBtn.classList.toggle("active");
});

darkBtn.addEventListener("click", () => {
  darkBtn.classList.toggle("active");
  lightBtn.classList.toggle("deactive");
});

ellipsisBtn.addEventListener("click", () => {
  userAndDarkMode.classList.toggle("active");
});
