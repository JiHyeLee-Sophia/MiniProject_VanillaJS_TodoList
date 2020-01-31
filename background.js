
class Background {
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
    const bg = new Background(random);
    bg.setBackground(); 
  }
  setBackground() {
    const body = document.querySelector("body");
    this.preventRightClick();
    body.style.background = `#333 url('img/${this.number}.jpg') no-repeat center center / cover`;
    body.style.backgroundAttachment = "fixed";
    setTimeout(()=>{
        this.setRandomNumber()
    },300000)
  }
}

const random = Math.floor(Math.random() * 77);
const bg = new Background(random);
bg.setBackground();

