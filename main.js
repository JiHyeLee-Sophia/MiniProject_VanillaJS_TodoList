const TODOS = 'todos';
const container = document.querySelector('.container');
const today = container.querySelector('.date');
const getLS = localStorage.getItem(TODOS);
const btns = document.querySelectorAll('.btn');
const ul = document.querySelector('.todoList')
const input = document.querySelector('.input')
let liEle_LS = [];

function getDate() {
    const currentDate = new Date();
    const options = { weekday: 'long', month: 'short', day: 'numeric' };
    today.innerHTML = currentDate.toLocaleDateString('en-US', options);
}

function clickHandler(event) {
    event.preventDefault();
    const ET = event.target;
    const ETC = ET.classList;
    const ETspan=ET.parentElement.children[2];
    const ETspanId = ETspan.id;
    if(ETC.contains('emptyButton')){
        const next = ET.nextElementSibling.classList;
        ETC.toggle('dis-show')
        ETC.toggle('dis-non')
        next.toggle('dis-show')
        next.toggle('dis-non')
        ETspan.style.textDecoration='line-through'
        liEle_LS[ETspanId-1].isChecked=true;
        saveLS();
    }else if(ETC.contains('checkedButton')){
        const previous = ET.previousElementSibling.classList;
        ETC.toggle('dis-show')
        ETC.toggle('dis-non')
        previous.toggle('dis-show')
        previous.toggle('dis-non')
        ETspan.style.textDecoration='none'
        liEle_LS[ETspanId-1].isChecked=false;
        saveLS();
    }else if(ETC.contains('removeButton')){
        ET.parentElement.remove();
        liEle_LS.splice(ETspanId-1,1);
        liEle_LS.forEach((li,index)=>li.id=index+1);
        saveLS();
    }
}
function saveLS() {
    localStorage.setItem(TODOS, JSON.stringify(liEle_LS))
}
function createNewList(IV){
    const li = document.createElement('li');
    li.innerHTML =`<i class="fa fa-square-o item btn emptyButton dis-show" aria-hidden="true"></i>
    <i class="fa fa-check-square-o item btn checkedButton dis-non" aria-hidden="true"></i>
    <span class='item' id = '${liEle_LS.length+1}'>${IV}</span>
    <i class="fa fa-trash-o btn removeButton item" aria-hidden="true"></i>`;
    li.addEventListener('click',clickHandler)
    ul.appendChild(li)
    input.value="";
    const liEle = {
        text: IV,
        id: liEle_LS.length + 1,
        isChecked: false
    }
    liEle_LS.push(liEle);
    saveLS();
}
function keyupHandler(event) {
    event.preventDefault()
    if (event.keyCode == 13) {
        const IV = input.value;
        createNewList(IV);
        
    }
}
function init() {
    getDate();
    btns.forEach(btn => btn.addEventListener('click', clickHandler));
    document.addEventListener('keyup', keyupHandler)

    if (getLS) {
        const parsedLS = JSON.parse(getLS);
        parsedLS.forEach(ls=>createNewList(ls.text));
    }
}
init();