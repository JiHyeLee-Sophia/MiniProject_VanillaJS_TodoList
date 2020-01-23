
function getNumber(){
    const randomNum = Math.floor(Math.random()*77);
    return randomNum;
}
function init(){
    const number = getNumber();
    const backG = document.querySelector('body');
    backG.style.background = `#333 url('img/${number}.jpg') no-repeat center center / cover`;
    backG.style.backgroundAttachment='fixed'
}
function rightClickHandler(event){
    event.preventDefault();
}
document.addEventListener('contextmenu', rightClickHandler)
init();
setInterval(() =>init(), 300000);
