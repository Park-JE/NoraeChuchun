const body = document.querySelector("body");
const navBar = body.querySelector("nav");
let prevScrollPos = window.pageYOffset;
const userAndDarkMode = navBar.querySelector(".userAndDarkMode ");
const logout = userAndDarkMode.querySelector(".logout");
const darkMode = userAndDarkMode.querySelector(".dark-mode");
const lightBtn = darkMode.querySelector(".light");
const darkBtn = darkMode.querySelector(".dark");
const ellipsisBtn = navBar.querySelector(".ellipsis");
const isUserColorTheme = localStorage.getItem("color-theme");
let isOsColorTheme;
if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  isOsColorTheme = "dark";
} else {
  isOsColorTheme = "light";
}

window.addEventListener("scroll", () => {
  let currentScrollPos = window.pageYOffset;
  if (prevScrollPos > currentScrollPos) {
    navBar.classList.remove("scrollDown");
  } else {
    if (userAndDarkMode.classList.contains("active")) {
      navBar.classList.remove("scrollDown");
      return;
    }
    navBar.classList.add("scrollDown");
  }
  prevScrollPos = currentScrollPos;
});

window.onload = function () {
  if (isUserColorTheme === "dark") {
    document.documentElement.setAttribute("color-theme", "dark");
    localStorage.setItem("color-theme", "dark");
  } else if (isUserColorTheme === "light") {
    document.documentElement.setAttribute("color-theme", "light");
    localStorage.setItem("color-theme", "light");
  } else if (isOsColorTheme === "dark") {
    document.documentElement.setAttribute("color-theme", "dark");
    localStorage.setItem("color-theme", "dark");
  } else {
    document.documentElement.setAttribute("color-theme", "light");
    localStorage.setItem("color-theme", "light");
  }
};

lightBtn.addEventListener("click", () => {
  lightBtn.classList.toggle("active");
  darkBtn.classList.toggle("deactive");
  localStorage.setItem("color-theme", "light");
  document.documentElement.setAttribute("color-theme", "light");
});

darkBtn.addEventListener("click", () => {
  lightBtn.classList.toggle("active");
  darkBtn.classList.toggle("deactive");
  localStorage.setItem("color-theme", "dark");
  document.documentElement.setAttribute("color-theme", "dark");
});

ellipsisBtn.addEventListener("click", () => {
  userAndDarkMode.classList.toggle("active");

  if (userAndDarkMode.classList.contains("active")) {
    document.addEventListener("click", (e) => {
      if (
        e.target.className !== "userAndDarkMode" &&
        e.target.className !== "login logout" &&
        e.target.className !== "login" &&
        e.target.className !== "dark mode-btn deactive" &&
        e.target.className !== "dark mode-btn" &&
        e.target.className !== "light mode-btn deactive" &&
        e.target.className !== "light mode-btn" &&
        e.target.className !== "dark-mode" &&
        e.target.className !== "fas fa-sun fa-lg" &&
        e.target.className !== "fas fa-moon fa-lg" &&
        e.target.className !== "modeText" &&
        e.target.className !== "ellipsis" &&
        e.target.className !== "fas fa-bars fa-lg"
      ) {
        userAndDarkMode.classList.remove("active");
      }
    });
  }
});
