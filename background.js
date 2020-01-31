const body = document.querySelector("body");

class background {
  constructor(number) {
    this.number = number;
  }
  preventRightClick() {
    document.addEventListener("contextmenu", this.rightClickHandler);
  }
  rightClickHandler(event) {
    event.preventDefault();
  }
  setRandomNumber(){
    const random = Math.floor(Math.random() * 77);
    const bg = new background(random);
    bg.setBackground(); 
  }
  setBackground() {
    this.preventRightClick();
    body.style.background = `#333 url('img/${this.number}.jpg') no-repeat center center / cover`;
    body.style.backgroundAttachment = "fixed";
    setTimeout(()=>{
        this.setRandomNumber()
    },1000)
  }
}

const random = Math.floor(Math.random() * 77);
const bg = new background(random);
bg.setBackground();

