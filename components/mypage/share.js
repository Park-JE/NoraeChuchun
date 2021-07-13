title = document.querySelector(".title");
find = document.querySelector(".find");
title_wrap = document.querySelector(".title-wrap");
find_wrap = document.querySelector(".find-wrap");

find.addEventListener("click", () => {
  title.classList.remove("active");
  find.classList.add("active");
  title_wrap.classList.remove("active");
  find_wrap.classList.add("active");
});
title.addEventListener("click", () => {
  find.classList.remove("active");
  title.classList.add("active");
  title_wrap.classList.add("active");
  find_wrap.classList.remove("active");
});

function loadUsers() {
  return fetch("data/user.json")
    .then((response) => response.json())
    .then((json) => json.users);
}
function displayUsers(users) {
  const friends = document.querySelector(".allUser");
  friends.innerHTML = users.map((user) => createHTMLString(user)).join("");
}

function createHTMLString(user) {
  return `
  <div class="user-list">
    <span class="id"><span class="material-icons-outlined">person</span>${user.id}</span>
    <span class="name">${user.name}</span>
    <span class="material-icons-outlined">person_add_alt</span>
  </div>
  `;
}

// function setEventListeners(users){}
loadUsers().then((users) => {
  displayUsers(users);
  // setEventListeners(items)
});
