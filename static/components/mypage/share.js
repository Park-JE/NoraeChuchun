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

function createHTMLString(user) {
  return `
  <div class="user-list">
    <span class="find-id">${user}</span>
    <span class="fas fa-user-plus addBtn" onclick="addFriend(this)"></span>
  </div>
  `;
}

async function loadUsers() {
  let res = await fetch(
    `https://nochu.pw/api/friend/`
  );
  return await res.json();
}
function displayUsers(users) {
  let user_name = users.user.username;
  const user = getCookie("user")
  if (user != user_name) {
    $(".allUser").append(createHTMLString(user_name));
  }
}
//친구목록 
function inqFriend(items) {
  let user_name = getCookie("user");
  items.forEach((users) => {
    if (users.user.username === user_name) {
      users.friends.forEach((friend) => {
        let str = `
        <div class="friend">
          <span onClick="hello(this);" class="id"><span class="fas fa-user">
          </span>${friend.username}</span>
          <span class="fas fa-trash-alt shareBtn" onclick="delFriend(this)">
        </span>
      </div>
      `;
        $(".friends").append(str);
      })
    }
  });
}


//친구 검색
function filter() {
  var id, i;
  let findInput = document.querySelector(".findInput").value.toUpperCase();
  userlist = document.getElementsByClassName("user-list");
  for (i = 0; i < userlist.length; i++) {
    id = userlist[i].getElementsByClassName("find-id");
    if (
      id[0].innerHTML.toUpperCase().indexOf(findInput) != -1
    ) {
      userlist[i].style.display = "grid";
    } else {
      userlist[i].style.display = "none";
    }
  }
}
//친구삭제
function delFriend(obj) {
  const parent = obj.parentNode;
  const deleteName = obj.parentNode.children[0].innerText;
  const friendsList = document.querySelector(".friends");
  var friends = new Array();
  var friend = new Object();
  friend.username = deleteName;
  friends.push(friend)
  console.log(csrftoken = getCookie('csrftoken'))
  fetch(`https://nochu.pw/api/friend/${getCookie("user")}/delete/`, {
    method: "PATCH",
    headers: {
      "X-CSRFToken": csrftoken = getCookie('csrftoken'),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      friends: friends,
    }),
  })
    .then((response) => response.json())
    .then((data) => console.log(data));
  friendsList.removeChild(obj.parentNode);
}

function hello(obj) {
  const id = obj.innerText;
  document.cookie = "friend_name" + "=" + id;
  location.href = "friendplaylist.html";
}

//친구 추가
function addFriend(obj) {
  let friendName = obj.parentNode.children[0].innerText;
  let str = `<div class="friend">
          <span onclick="hello(this);" class="id"><span class="fas fa-user" aria-hidden="true">
          </span>${friendName}</span>
          <span class="fas fa-trash-alt shareBtn" onclick="delFriend(this)" aria-hidden="true">
        </span>
      </div> `
  $(".friends").append(str)
  var friends = new Array();
  var friend = new Object();
  friend.username = friendName;
  friends.push(friend)
  fetch(`https://nochu.pw/api/friend/${getCookie("user")}/add/`, {
    method: "PATCH",
    headers: {
      "X-CSRFToken": csrftoken = getCookie('csrftoken'),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      friends: friends,
    }),
  })
    .then((response) => response.json())
    .then((data) => console.log(data));
  alert("친구추가 되었습니다😊")
}
//main
loadUsers().then((items) => {
  inqFriend(items)
  items.forEach((users) =>
    displayUsers(users)
  );
});
