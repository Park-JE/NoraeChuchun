//유저 음악정보 가져오기,,
function displayItems(items) {
  document.cookie = "playlist_id" + "=" + items[0].id;
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

var getCookie = function (name) {
  var value = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
  return value ? value[2] : null;
};

function loadData() {
  //회원 정보에 따라 user이랑 title 변경 해야함
  //cookie 값 활용해서 친구 playlist에 들어가는 거 까진 했는데,,
  const user = getCookie("user");
  const title = getCookie("playlist");
  return fetch(
    `https://nochu.pw/api/playlist/?uid=${user}&title=${title}`
  ).then((res) => {
    return res.json();
  });
}

// const data = loadData();
// // displayData(data);

loadData().then((items) => {
  displayItems(items);

});

const unlike = document.querySelector(".unlike");
const like = document.querySelector(".like");

//특정 음악 삭제
function onButton(obj) {
  const parent = obj.parentNode;
  let title = parent.children[1].innerText;
  let artist = parent.children[2].innerText;
  tracks = new Array();
  track = new Object();
  track.track_name = title;
  track.track_artist = artist;
  tracks.push(track)
  console.log(tracks)

  parent.parentNode.removeChild(parent);
  loadData().then((items) => {
    items[0].tracks.forEach((music) => {
      if (music.track_name === title && music.track_artist === artist) {
        fetch(`https://nochu.pw/api/playlist/${getCookie("playlist_id")}/delete/`, {
          method: "PATCH",
          headers: {
            "X-CSRFToken": csrftoken = getCookie('csrftoken'),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tracks: tracks
          }),
        })
          .then((response) => response.json())
          .then((data) => console.log(data));
      }
    })
  })


}

unlike.addEventListener("click", () => {
  unlike.classList.remove("active");
  like.classList.add("active");
});
like.addEventListener("click", () => {
  like.classList.remove("active");
  unlike.classList.add("active");
});
