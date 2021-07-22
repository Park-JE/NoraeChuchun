function loadUserInfo() {
  return fetch("https://nochu.pw/myplaylist")
    .then(res => {
      console.log(res)
      res.text()
    })
    .then(data => {
      console.log(data)
    })
    .catch(error => {
      console.log("error", error)
    });
}
function kakaoShare(obj) {
  loadUserInfo()
  const parent = obj.parentNode.parentNode.parentNode;
  let title = parent.children[2].innerHTML;
  //uid 정보 어케 불러오지 ?  
  let targetTitle = `https://nochu.pw/playlist_api/?uid=user&title=title`
  console.log(targetTitle)
  Kakao.Link.sendDefault({
    objectType: 'feed',
    content: {
      title: 'NOCHU',
      description: '날씨에 맞는 음악추천',
      imageUrl: 'http://127.0.0.1:5500/static/img/favicon.png',
      link: {
        mobileWebUrl: targetTitle,
        androidExecutionParams: 'test',
      },
    },

    buttons: [
      {
        title: '플레이리스트 확인하기',
        link: {
          mobileWebUrl: targetTitle,
          webUrl: targetTitle
        },
      }
    ]
  });
}
