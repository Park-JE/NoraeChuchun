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

function loadUsers() {
  return fetch(
    `https://nochu.pw/api/friend/`
  ).then((res) => {
    return res.json();
  });
}
function displayUsers(users) {
  const user_name = users.user.username;
  $(".allUser").append(createHTMLString(user_name));
}
//친구목록 
function inqFriend(items) {
  const user_name = getCookie("user");
  console.log(user_name)
  items.forEach((users) => {
    console.log(users)
    if (users.user.username === user_name) {
      users.friends.forEach((friend)=>{
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
  console.log(findInput);
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
function delFriend(obj) {
  const friendlist = document.querySelector(".friends");
  friendlist.removeChild(obj.parentNode);
}

function hello(obj) {
  const id = obj.innerText;
  document.cookie = "friend_name" + "=" + id;
  location.href = "friendplaylist.html";
}

//친구 추가
// function addFriend(obj) {
//   const parent = obj.parentNode;
//   const id = parent.querySelector(".find-id").innerText;


//   alert("친구추가 되었습니다😃");
// }
//main
loadUsers().then((items) => {
  inqFriend(items)
  items.forEach((users) =>
    displayUsers(users)
  );
});
