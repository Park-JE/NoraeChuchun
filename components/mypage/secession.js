const circleBtn = document.querySelector(".circleBtn");
const checkBtn = document.querySelector(".checkBtn");

circleBtn.addEventListener("click", () => {

  circleBtn.classList.remove("active");
  checkBtn.classList.add("active");

})

checkBtn.addEventListener("click", () => {
  checkBtn.classList.remove("active")
  circleBtn.classList.add("active")

})