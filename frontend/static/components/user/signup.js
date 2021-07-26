let id = document.querySelector(".id");
let pw1 = document.querySelector(".pw");
let pw2 = document.querySelector(".pw_chck");
let id_error = document.querySelector(".id_error");
let pw_error = document.querySelector(".pw_error");
let pwchck_error = document.querySelector(".pwchck_error");
const signupBtn = document.querySelector(".signupBtn");

signupBtn.addEventListener("click", function () {
  if (id.value == '' || id.value.length < 4) {
    id_error.classList.add("active");
    id_error.innerHTML = "아이디를 4글자 이상 입력해주세요"
    //id포커스
    id.focus();
    // 비밀번호가 4자리 미만이거나 숫자가 아닐때
  } else if (pw1.value.length < 4) {
    pw_error.classList.add("active");
    pw_error.innerHTML = '비번 숫자로 4자이상쓰셈'
    //비밀번호 포커스
    pw1.focus();
    // 비밀번호가 처음입력한 값과 다를시
  } else if (pw1.value != pw2.value) {
    pwchck_error.classList.add("active");
    pwchck_error.innerHTML = '패스워드가 일치하지 않습니다.';
    pw2.focus();
  }
})

id.addEventListener("click", checkActive);
pw1.addEventListener("click", checkActive);
pw2.addEventListener("click", checkActive);
function checkActive() {
  if (id_error.classList.contains("active")) {
    id_error.classList.remove("active");
  } else if (pw_error.classList.contains("active")) {
    pw_error.classList.remove("active");
  } else if (pwchck_error.classList.contains("active")) {
    pwchck_error.classList.remove("active");
  }
}