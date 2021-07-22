const displayPlaylist = () => {
  const url = `https://nochu.pw/playlist_api/?uid=${user}&title=${playlistName}`;
  fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => console.log("error", error));
};
