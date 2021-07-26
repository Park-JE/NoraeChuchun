let new_pw1 = document.querySelector(".mypage_new_pw1");
let new_pw2 = document.querySelector(".mypage_new_pw2");
const chngBtn = document.querySelector(".change_pwBtn");
let pw1_error = document.querySelector(".pw1_error");
let pw2_error = document.querySelector(".pw2_error");

chngBtn.addEventListener("click", function () {
  if (new_pw1.value == "") {
    pw1_error.classList.add("active");
    pw1_error.innerHTML = "패스워드를 4글자 이상 입력해주세요";
    //new pw1 포커스
    new_pw1.focus();
    // 비밀번호가 4자리 미만이거나 숫자가 아닐때
  } else if (new_pw1.value.length < 4) {
    pw1_error.classList.add("active");
    pw1_error.innerHTML = "패스워드를 4글자 이상 입력해주세요";
    //비밀번호 포커스
    new_pw1.focus();
    // 새로운 비밀번호가 다를시
  } else if (new_pw1.value != new_pw2.value) {
    pw2_error.classList.add("active");
    pw2_error.innerHTML = "패스워드가 일치하지 않습니다.";
    new_pw2.focus();
  }
});
new_pw1.addEventListener("click", checkActive);
new_pw2.addEventListener("click", checkActive);
function checkActive() {
  if (pw1_error.classList.contains("active")) {
    pw1_error.classList.remove("active");
  } else if (pw2_error.classList.contains("active")) {
    pw2_error.classList.remove("active");
  }
}
