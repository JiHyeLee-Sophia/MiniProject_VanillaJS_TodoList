// rgba(70, 87, 90, 0.534);
const themeIconClass = document.querySelector("#themeIcon");

function showColorOptions() {
  const themeIconId = document.querySelector("#themeIcon");
  themeIconId.classList.toggle("themeExtend");
  if (themeIconId.classList.contains("themeExtend")) {
    themeIconId.style.height = "240px";
  } else {
    themeIconId.style.height = "80px";
  }
}
function saveColor(){
    const currentColor = container.style.backgroundColor;
    localStorage.setItem('color', currentColor);
}
function changeColor(color) {
  const con = document.querySelectorAll(".container");
  con.forEach(each => (each.style.backgroundColor = color));
}
function themeIconHandler(event) {
    const ET = event.target;
    if (ET.classList.contains("themeIcon")) {
        showColorOptions();
    } else if (ET.classList.contains("themeColor_color")) {
        const color = ET.style.backgroundColor
        changeColor(color);
        saveColor();
  }
}
function getColor(){
    const currentColor = localStorage.getItem('color');
    changeColor(currentColor)
}
function themeIconEvent() {
  themeIconClass.addEventListener("click", themeIconHandler);
  getColor();
}
themeIconEvent();
