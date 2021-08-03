//유저 음악정보 가져오기,,
const createElement = (musicInfo) => {
  const music = document.createElement("div");
  music.setAttribute("class", "music");

  const content = document.createElement("div");
  content.setAttribute("class", "content");
  music.append(content);

  const img = document.createElement("img");
  img.setAttribute("class", "cover");
  img.setAttribute("src", `${musicInfo.track_image}`);
  img.setAttribute("alt", "img");
  content.append(img);

  const audio = document.createElement("audio");
  audio.setAttribute("class", "play-audio");
  audio.setAttribute("src", `${musicInfo.audio}`);
  content.append(audio);

  const play = document.createElement("div");
  play.setAttribute("class", "manipul play");
  const playIcon = document.createElement("i");
  playIcon.setAttribute("class", "fas fa-play");
  play.append(playIcon);
  content.append(play);

  const playing = document.createElement("div");
  playing.setAttribute("class", "manipul playing");
  const playingIcon = document.createElement("i");
  playingIcon.setAttribute("class", "fas fa-volume-up");
  playing.append(playingIcon);
  content.append(playing);

  const pause = document.createElement("button");
  pause.setAttribute("class", "manipul pause");
  const pauseIcon = document.createElement("i");
  pauseIcon.setAttribute("class", "fas fa-pause");
  pause.append(pauseIcon);
  content.append(pause);

  const info = document.createElement("div");
  info.setAttribute("class", "info");
  content.append(info);

  const name = document.createElement("span");
  name.setAttribute("class", "name");
  name.innerText = `${musicInfo.track_name}`;
  info.append(name);

  const descrip = document.createElement("div");
  descrip.setAttribute("class", "descrip");
  info.append(descrip);

  const artist = document.createElement("span");
  artist.setAttribute("class", "artist");
  artist.innerText = `${musicInfo.track_artist}`;
  descrip.append(artist);

  const dot = document.createElement("span");
  dot.setAttribute("class", "dot");
  dot.innerText = "∙";
  descrip.append(dot);

  const album = document.createElement("span");
  album.setAttribute("class", "album");
  album.innerText = `${musicInfo.track_album}`;
  descrip.append(album);

  const addBtn = document.createElement("button");
  addBtn.setAttribute("class", "add");
  const addIcon = document.createElement("i");
  addIcon.setAttribute("class", "fas fa-list fa-lg");
  addBtn.append(addIcon);
  music.append(addBtn);

  return music;
};

function displayItems(items) {
  console.log(items)
  const descriptionWrap = document.querySelector(
    ".playlist-main .description-wrap .info"
  );
  const title = descriptionWrap.querySelector(" .title");
  const tags = descriptionWrap.querySelectorAll(".tagAndSong .tags .filter");
  const songCount = descriptionWrap.querySelector(".tagAndSong .songs .count");
  title.textContent = `${items[0].title}`;
  for (let i = 0; i < items[0].category.length; i++) {
    if (i === 2) {
      break;
    } else {

      tags[i].textContent = `#${items[0].category[i].tag}`;
    }
  }
  songCount.innerHTML = `${items[0].tracks.length}곡`;
  const musicTable = document.querySelector(
    ".playlist-main .content-wrap .musicTable"
  );

  const music = items[0].tracks.map(createElement);
  musicTable.append(...music);
  playMusic(musicTable);
  addMusic(musicTable);
}
var getCookie = function (name) {
  var value = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
  return value ? value[2] : null;
};

function loadData() {
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
