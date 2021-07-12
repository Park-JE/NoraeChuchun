let id = document.querySelector(".id");
let pw = document.querySelector(".pw");
const loginBtn = document.querySelector(".loginBtn");
const userID = "gajeong"
const userPW = "1234"

loginBtn.addEventListener("click", function () {
  if (id.value === userID) {
    alert("로그인 성공!")
  } else {
    alert("아이디 혹은 비밀번호가 잘못되었습니다")
  }
})
