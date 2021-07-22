//유저 음악정보 가져오기,, 
function displayData() {

}
function loadData() {
  return fetch("https://nochu.pw/playlist_api/?uid=user&title=title")
    .then(res => {
      console.log(res);
      return res.json();
    })
    .then(data => {
      console.log(data)
    })
    .catch(error => {
      console.log("error", error)
    });
}



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

