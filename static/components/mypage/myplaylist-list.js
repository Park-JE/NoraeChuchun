//유저 음악정보 가져오기,,
function displayItems(items) {
  items[0].tracks.forEach((music) => {
    let str = `<div class="item">
    <div class="cover"><img src="${music.track_image}" alt="coverImg"></div>
    <div class="title">${music.track_name}</div>
    <div class="artist">${music.track_artist}</div>
    <div class="album">${music.track_album}</div>
    <div class="remove material-icons-outlined" onclick="onButton(this)">delete_outline</div>
    </div>`;
    $(".items").append(str);
  });

  $(".playlist-title").html(items[0].title);
  items[0].category.forEach((tag) => {
    $(".playlist-tags").append(`<span>#${tag.tag}</span>`);
  });
  $(".count").html(`노래 ${items[0].tracks.length} 곡`);
}

<<<<<<< HEAD
var getCookie = function (name) {
  var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
  return value ? value[2] : null;
};

function loadData() {
  //회원 정보에 따라 user이랑 title 변경 해야함 
  //cookie 값 활용해서 친구 playlist에 들어가는 거 까진 했는데,, 
  const user = getCookie("user");
  const title = getCookie("playlist");
  return fetch(`https://nochu.pw/playlist_api/playlist/?uid=${user}&title=${title}`)
    .then(res => {
      console.log(res);
      return res.json();
    })
=======
function loadData() {
  //회원 정보에 따라 user이랑 title 변경 해야함
  return fetch(
    "https://nochu.pw/playlist_api/playlist/?uid=user&title=title"
  ).then((res) => {
    console.log(res);
    return res.json();
  });
>>>>>>> b88e1368e94f647e997b25af283a116f6cc1105f
}

<<<<<<< HEAD
// const data = loadData();
// // displayData(data);

loadData().then((items) => {
  console.log(items);
  displayItems(items);
});
=======
loadData()
  .then(items => {
    console.log(items)
    displayItems(items);
  })

>>>>>>> 663a90de77235f53368a82839d4bf25d68c66c8a

const unlike = document.querySelector(".unlike");
const like = document.querySelector(".like");
function onButton(obj) {
  const parent = obj.parentNode;
  parent.parentNode.removeChild(parent);
}

unlike.addEventListener("click", () => {
  unlike.classList.remove("active");
  like.classList.add("active");
});
like.addEventListener("click", () => {
  like.classList.remove("active");
  unlike.classList.add("active");
});