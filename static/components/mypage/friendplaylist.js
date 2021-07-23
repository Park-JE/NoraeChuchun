var getCookie = function (name) {
  var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
  return value ? value[2] : null;
};
var deleteCookie = function (name) {
  document.cookie = name + '=; expires=Thu, 01 Jan 1999 00:00:10 GMT;';
}

const friend_name = getCookie("friend_name");
title = document.querySelector(".friend_name");
title.innerText = friend_name + "님의 플레이리스트"

function loadData() {
  //회원 정보에 따라 user이랑 title 변경 해야함 
  return fetch(`https://nochu.pw/playlist_api/playlist/?uid=${friend_name}`)
    .then(res => {
      console.log(res);
      return res.json();
    })
}
function displayItems(items) {
  console.log(items)
  let str = `<li class="list-group-play">
  <img class="myplaylist__thumnail" onclick="pageChange(this);" src="${items.tracks[0].track_image}"
  alt="플레이리스트 이미지" />
  <div class="myplaylist__title">${items.title}</div>
  <span class="myplaylist__count">노래 ${items.tracks.length}곡</span>
  </li>`;
  $(".myplaylist__list").append(str);
};


loadData()
  .then(items => {
    items.forEach((playlist) => displayItems(playlist))
  })

function pageChange(obj) {
  const title = obj.parentNode.children[1].innerHTML;
  document.cookie = "playlist" + "=" + title;
  window.location.href = "friendplaylist-list.html"
}




