function onButton(obj) {
  const parent = obj.parentNode;
  console.log(parent)
  parent.parentNode.removeChild(parent)
}