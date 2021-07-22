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
}
function loadData() {
  //회원 정보에 따라 user이랑 title 변경 해야함 
  return fetch("https://nochu.pw/playlist_api/playlist/?uid=user&title=title")
    .then(res => {
      console.log(res);
      return res.json();
    })
}

// const data = loadData();
// // displayData(data);

loadData()
  .then(items => {
    console.log(items)
    displayItems(items);
  })


const unlike = document.querySelector(".unlike");
const like = document.querySelector(".like");
function onButton(obj) {
  const parent = obj.parentNode;
  parent.parentNode.removeChild(parent)
}

unlike.addEventListener("click", () => {
  unlike.classList.remove("active");
  like.classList.add("active")
})
like.addEventListener("click", () => {
  like.classList.remove("active");
  unlike.classList.add("active");
})

