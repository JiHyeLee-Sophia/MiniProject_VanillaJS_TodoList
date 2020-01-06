const TODOS = 'todos';
const container = document.querySelector('.container');
const today = container.querySelector('.date');
const btns = document.querySelectorAll('.btn');
const ul = document.querySelector('.todos')
const input = document.querySelector('.input')
let liEle_LS = [];

function getDate() {
    const currentDate = new Date();
    const options = { weekday: 'long', month: 'short', day: 'numeric' };
    today.innerHTML = currentDate.toLocaleDateString('en-US', options);
}
function checkByButtons(ET, ETC, ETspan, ETspanId, anArray) {
    const todoName = ET.parentElement.parentElement.classList[0];
    let itemLS = JSON.parse(localStorage.getItem(todoName));
    if (ETC.contains('emptyButton')) {
        const next = ET.nextElementSibling.classList;
        ETC.toggle('dis-non')
        next.toggle('dis-non')
        ETspan.style.textDecoration = 'line-through';
        itemLS[ETspanId - 1].isChecked = true;
    } else if (ETC.contains('checkedButton')) {
        const previous = ET.previousElementSibling.classList;
        ETC.toggle('dis-non')
        previous.toggle('dis-non')
        ETspan.style.textDecoration = 'none'
        itemLS[ETspanId - 1].isChecked = false;
    } else if (ETC.contains('removeButton')) {
        let newUl = ET.parentElement.parentElement;
        const clickedId = ET.previousElementSibling.id;
        ET.parentElement.remove();
        for (let i = 0; i < newUl.childElementCount; i++) {
            newUl.childNodes[i].children[2].id=i+1;
        }
        let newItemLS = itemLS.filter(item=>item.id!=clickedId);
        newItemLS.forEach((item,index)=>{
            item.id=index+1;
        })
        itemLS = newItemLS;
        anArray[clickedId-1];
    }else{
        return;
    }
    saveLS(todoName, itemLS);
}
function clickHandler(event) {
    event.preventDefault();
    const ET = event.target;
    const ETC = ET.classList;
    const ETspan = ET.parentElement.children[2];
    const ETspanId = ETspan.id;
    checkByButtons(ET, ETC, ETspan, ETspanId,liEle_LS);
}
function saveLS(listOfTodos, anArray) {
    localStorage.setItem(listOfTodos, JSON.stringify(anArray))
}
        // empty or filled array, inputV, checkForCheckedBox, ul to add class and list
function createElements(anArray, INPUTVALUE, getFromLS, listOfTodos, ulForList) {
    const li = document.createElement('li');
    li.innerHTML = `<i class="fa fa-square-o item btn emptyButton" aria-hidden="true"></i>
    <i class="fa fa-check-square-o item btn checkedButton dis-non" aria-hidden="true"></i>
    <span class='item' id = '${anArray.length + 1}'>${INPUTVALUE}</span>
    <i class="fa fa-trash-o btn removeButton item" aria-hidden="true"></i>`;
    li.addEventListener('click', clickHandler)
    ulForList.appendChild(li)
    ulForList.classList.add(listOfTodos);
    const liEle = {
        text: INPUTVALUE,
        id: anArray.length + 1,
        isChecked: false
    }
    //if localstorage has data, check if the check box checked
    if (getFromLS) {
        const newLS = JSON.parse(getFromLS);
        newLS.forEach(ls => {
            if (ls.id === liEle.id) {
                liEle.isChecked = ls.isChecked;
                if (ls.isChecked) {
                    li.children[2].style.textDecoration = 'line-through';
                    li.firstElementChild.classList.add('dis-non');
                    li.firstElementChild.nextElementSibling.classList.remove('dis-non')
                }
            }
        })
    }
    anArray.push(liEle);
}
function createNewList(anArray, INPUTVALUE, getFromLS, listOfTodos, ulForList) {
    createElements(anArray, INPUTVALUE, getFromLS, listOfTodos, ulForList);
    input.value = "";
    saveLS(listOfTodos, anArray);
}
function keyupHandler(event) {
    event.preventDefault()
    if (event.keyCode == 13) {
        const IV = input.value;
        if (IV) {
            const getLS = localStorage.getItem(TODOS);
            createNewList(liEle_LS, IV, getLS, TODOS, ul)
        }
    }
}
function init() {
    let keyName = '';
    getDate();
    btns.forEach(btn => btn.addEventListener('click', clickHandler));
    document.addEventListener('keyup', keyupHandler)
    if (localStorage.length > 0) {
        //make a list for original list
        const getListLS = localStorage.getItem(TODOS);
        const parsedLS = JSON.parse(getListLS);
        parsedLS.forEach(ls => createNewList(liEle_LS, ls.text, getListLS, TODOS, ul));
    }
}

init();