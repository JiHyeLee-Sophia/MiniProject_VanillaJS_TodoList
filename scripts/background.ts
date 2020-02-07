
class Background {
    public number:number;
    constructor() {
      this.number = Math.floor(Math.random() * 77);
    }
    public preventRightClick() {
      document.addEventListener("contextmenu", this.rightClickHandler);
    }
    public rightClickHandler(event) {
      event.preventDefault();
    }
    public setBackground() {
      const body = document.querySelector("body")! as HTMLBodyElement;
      this.preventRightClick();
      body.style.background = `#333 url('img/${this.number}.jpg') no-repeat center center / cover`;
      body.style.backgroundAttachment = "fixed";
      setTimeout(()=>{
        const bg = new Background();
        bg.setBackground(); 
      },300000)
    }
  }
  
  const bg = new Background();
  bg.setBackground();
  
  