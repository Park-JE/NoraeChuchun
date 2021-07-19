playlistWrap.addEventListener("click", (e) => {
  const clickedTarget = e.target.offsetParent;
  if (clickedTarget.className === "playlist") {
    const clickedList = newList.filter((list) => {
      if (list.title === clickedTarget.innerText.split("\n")[0]) {
        return list;
      }
    });
    const targetListInfo = [
      clickedList[0].title,
      clickedList[0].musicList,
      clickedList[0].mood,
      clickedList[0].cover,
    ];

    setCookie("playlist", JSON.stringify(targetListInfo), 1);
    window.location.href = "playlist.html";
    displayPlaylistCookies();
  }
});

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
