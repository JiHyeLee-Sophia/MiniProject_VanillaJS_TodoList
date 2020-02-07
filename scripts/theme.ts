const themeIconId = document.querySelector("#themeIcon")! as HTMLDivElement;

function showColorOptions() {
  themeIconId.classList.toggle("themeExtend");
  if (themeIconId.classList.contains("themeExtend")) {
    themeIconId.style.height = "240px";
  } else {
    themeIconId.style.height = "80px";
  }
}
function saveColor(){
    const container = document.querySelector('.container')! as HTMLDivElement;
    const currentColor = container.style.backgroundColor;
    localStorage.setItem('color', currentColor);
}
function changeColor(color) {
  const con = [...document.querySelectorAll<HTMLDivElement>(".container")];
  con.forEach(each => (each.style.backgroundColor = color));
} 
function scaleSmallerHandler(event){
  event.preventDefault();
  const ET = event.target!;
    if (ET.classList.contains("themeIcon")) {
        themeIconId.style.transform = "scale(0.95)"
    }else if(ET.classList.contains("themeColor_color")){
      ET.style.transform = "scale(0.95)"
    }else {
      return null;
    }
}
function scaleBiggerHandler(event){
  event.preventDefault();
  const ET = event.target;
    if (ET.classList.contains("themeIcon")) {
        themeIconId.style.transform = "scale(1)"
    }else if(ET.classList.contains("themeColor_color")){
      ET.style.transform = "scale(1)"
    }else {
      return null;
    } 
}
function themeIconHandler(event) {
  event.preventDefault();
    const ET = event.target;
    if (ET.classList.contains("themeIcon")) {
        showColorOptions();
    } else if (ET.classList.contains("themeColor_color")) {
        const color = ET.style.backgroundColor;
        changeColor(color);
        saveColor();
  }
}
function getColor(){
    const currentColor = localStorage.getItem('color');
    changeColor(currentColor)
}
function themeIconEvent() {
  themeIconId.addEventListener("click", themeIconHandler);
  themeIconId.addEventListener('mousedown',scaleSmallerHandler);
  themeIconId.addEventListener('mouseup',scaleBiggerHandler);
  getColor();
}
themeIconEvent();
