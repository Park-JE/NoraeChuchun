const title = document.querySelector(".title");
const find = document.querySelector(".find");
const title_wrap = document.querySelector(".title-wrap");
const find_wrap = document.querySelector(".find-wrap");



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

find = document.querySelector(".find")
title_wrap = document.querySelector(".title-wrap")
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
    <span class="find-id">${user.id}</span>
    <span class="find-name">${user.name}</span>
    <span class="material-icons-outlined addBtn" onClick="addFriend(this)">person_add_alt</span>
  </div>
  `;
}
//친구 검색
function filter() {
  var name, id, i;
  let findInput = document.querySelector(".findInput").value.toUpperCase();
  userlist = document.getElementsByClassName("user-list");

  for (i = 0; i < userlist.length; i++) {
    id = userlist[i].getElementsByClassName("find-id");
    name = userlist[i].getElementsByClassName("find-name");
    if (id[0].innerHTML.toUpperCase().indexOf(findInput) != -1 ||
      name[0].innerHTML.toUpperCase().indexOf(findInput) != -1) {
      userlist[i].style.display = "grid";
    } else {
      userlist[i].style.display = "none";
    }
  }
}
loadUsers().then((users) => {
  displayUsers(users);
});

//친구 추가 
function addFriend(obj) {
  const parent = obj.parentNode;
  const id = parent.querySelector(".find-id").innerText;
  const name = parent.querySelector(".find-name").innerText;

  let str = `
  <div class="friend">
    <span class="id"><span class="material-icons-outlined">
      person
    </span>${id}</span>
    <span class="name">${name}</span>
    <span class="material-icons-outlined shareBtn">
      send_to_mobile
    </span>
  </div>
  `
  $(".friends").append(str);
  alert("친구추가 되었습니다😃")

}
