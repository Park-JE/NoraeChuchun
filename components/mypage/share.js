title = document.querySelector(".title");
find = document.querySelector(".find")
title_wrap = document.querySelector(".title-wrap")
find_wrap = document.querySelector(".find-wrap");

find.addEventListener("click", () => {
  title.classList.remove("active")
  find.classList.add("active")
  title_wrap.classList.remove("active")
  find_wrap.classList.add("active");
});
title.addEventListener("click", () => {
  find.classList.remove("active")
  title.classList.add("active");
  title_wrap.classList.add("active")
  find_wrap.classList.remove("active");
});