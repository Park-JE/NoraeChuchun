const filterMusic = (features) => {};

const loadMusic = () => {
  const url = "https://nochu.pw/spotify/featured";
  fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      const musicInfo = data.map((song) => {
        const musicDescription = {
          songName: song.track.name,
          artist: song.track.artists[0].name,
          album: song.track.album.name,
          albumCover: song.track.album.images[2].url,
          audio: song.track.preview_url,
        };
        const musicFeatures = {
          danceability: song.danceability,
          energy: song.energy,
          tempo: song.tempo,
          valence: song.valence,
        };
        return { musicDescription, musicFeatures };
      });
      return musicInfo;
    })
    .then((musicInfo) => {
      musicInfo.forEach((info) => {
        // console.log(info);
        filterMusic(info.musicFeatures);
      });
    })
    .catch((error) => console.log("error", error));
};
loadMusic();
