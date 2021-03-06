class Background {
    constructor() {
        this.number = Math.floor(Math.random() * 77);
    }
    preventRightClick() {
        document.addEventListener("contextmenu", this.rightClickHandler);
    }
    rightClickHandler(event) {
        event.preventDefault();
    }
    setBackground() {
        const body = document.querySelector("body");
        this.preventRightClick();
        body.style.background = `#333 url('img/${this.number}.jpg') no-repeat center center / cover`;
        body.style.backgroundAttachment = "fixed";
        setTimeout(() => {
            const bg = new Background();
            bg.setBackground();
        }, 300000);
    }
}
const bg = new Background();
bg.setBackground();
//# sourceMappingURL=background.js.map