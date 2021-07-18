const unlike = document.querySelector(".unlike");
const like = document.querySelector(".like");
function onButton(obj) {
  const parent = obj.parentNode;
  console.log(parent)
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

