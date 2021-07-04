const body = document.querySelector("body");
const navBar = document.querySelector("nav");
const searchBtn = navBar.querySelector(".searchAndLogin .search");
const cancelBtn = navBar.querySelector(".searchAndLogin .close");
const inputBox = navBar.querySelector(".searchAndLogin input");

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

searchBtn.addEventListener("click", () => {
  if (inputBox.classList.contains("active")) {
    handleSearch();
  } else {
    inputBox.classList.add("active");
    searchBtn.classList.add("active");
    cancelBtn.classList.add("active");
    inputBox.focus();
  }
});

cancelBtn.addEventListener("click", () => {
  if (inputBox.value.length == 0) {
    inputBox.classList.remove("active");
    searchBtn.classList.remove("active");
    cancelBtn.classList.remove("active");
  } else {
    inputBox.value = "";
    inputBox.focus();
  }
});

inputBox.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    handleSearch();
  }
});

const handleSearch = () => {
  console.log("enter");
};
