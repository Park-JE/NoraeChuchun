const circleBtn = document.querySelector(".circleBtn");
const checkBtn = document.querySelector(".checkBtn");
const okayBtn = document.querySelector(".okayBtn");
circleBtn.addEventListener("click", () => {
  circleBtn.classList.remove("active");
  checkBtn.classList.add("active");
});

checkBtn.addEventListener("click", () => {
  checkBtn.classList.remove("active");
  circleBtn.classList.add("active");
});

okayBtn.addEventListener("click", () => {
  if (checkBtn.classList.contains("active")) {
    alert("이용해주셔서 감사합니다.😊 탈퇴처리 되었습니다.");
  } else {
    alert("안내사항 체크여부를 확인해주세요.");
  }
  window.location.href = "./index.html"
});
