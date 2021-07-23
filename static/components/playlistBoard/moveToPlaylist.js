// playlistWrap.addEventListener("click", (e) => {
//   const info =
//     e.target.parentNode.childNodes[2].childNodes[0].textContent.split("#");
//   info.shift();
//   let targetListInfo;
//   if (e.target.parentNode.classList.contains("playlist")) {
//     targetListInfo = {
//       // id: e.target.parentNode.dataset.id,
//       title: e.target.parentNode.childNodes[1].textContent,
//       user: e.target.parentNode.dataset.user,
//       // category: info,
//     };
//   }
//   setCookie("playlist", JSON.stringify(targetListInfo), 1);
//   window.location.href = "playlist.html";
// });

function getCookieArray(playlist) {
  const cookie = document.cookie;
  let playlistCookie;

  if (cookie.length > 0) {
    startIndex = cookie.indexOf(playlist);
    if (startIndex != -1) {
      startIndex += playlist.length;
      endIndex = cookie.indexOf(";", startIndex);
      if (endIndex == -1) endIndex = cookie.length;
      playlistCookie = unescape(cookie.substring(startIndex + 1, endIndex));
    } else {
      return false;
    }
  } else {
    return false;
  }

  return JSON.parse(playlistCookie);
}
