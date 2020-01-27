const TODOS = 'todos';
const container = document.querySelector('.container');
const today = container.querySelector('.date');
const btns = document.querySelectorAll('.btn');
const ul = document.querySelector('.todos');
const input = document.querySelector('.input');
const getLS = localStorage.getItem(TODOS);
let liEle_LS = [];

//get current date for main todolist title
function getDate() {
    const currentDate = new Date();
    const options = { weekday: 'long', month: 'short', day: 'numeric' };
    today.innerHTML = currentDate.toLocaleDateString('en-US', options);
}
//empty, checked, removebox button event for whole lists(not just original)
function checkByButtons(ET, ETC, ETspan, ETspanId, anArray) {
    let todoName = '';
    const code = ET.parentElement.className;
    if(code==='code0'){
        todoName='todos';
    }else{
        todoName=document.querySelector(`div.${code} h2`).innerText;
    };

    let itemLS = JSON.parse(localStorage.getItem(todoName));
    //if user click emptybox button
    if (ETC.contains('emptyButton')) {
        const next = ET.nextElementSibling.classList;
        ETC.toggle('dis-non')
        next.toggle('dis-non')
        ETspan.style.textDecoration = 'line-through';
        ETspan.style.textDecorationThickness = '2px';
        itemLS[ETspanId - 1].isChecked = true;
    //if user click checkedbox button
    } else if (ETC.contains('checkedButton')) {
        const previous = ET.previousElementSibling.classList;
        ETC.toggle('dis-non')
        previous.toggle('dis-non')
        ETspan.style.textDecoration = 'none'
        itemLS[ETspanId - 1].isChecked = false;
    //if user click removebox button
    } else if (ETC.contains('removeButton')) {
        let newUl = ET.parentElement.parentElement;
        const clickedId = ET.previousElementSibling.id;
        ET.parentElement.remove();
        //set id again for whole ul
        for (let i = 0; i < newUl.childElementCount; i++) {
            newUl.childNodes[i].children[2].id=i+1;
        }
        let newItemLS = itemLS.filter(item=>item.id!=clickedId);
        newItemLS.forEach((item,index)=>item.id=index+1)
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
// (empty or filled array, inputValue, checkForCheckedBox, ul to add class and list)
function createElements(anArray, INPUTVALUE, getFromLS, ulForList) {
    const li = document.createElement('li');
    li.classList.add(`code${ulForList.id}`)
    li.innerHTML = `<i class="fa fa-square-o item btn emptyButton" aria-hidden="true"></i>
    <i class="fa fa-check-square-o item btn checkedButton dis-non" aria-hidden="true"></i>
    <span class='item' id = '${anArray.length + 1}'>${INPUTVALUE}</span>
    <i class="fa fa-trash-o btn removeButton item" aria-hidden="true"></i>`;
    li.addEventListener('click', clickHandler)
    ulForList.appendChild(li)
    const liEle = {
        text: INPUTVALUE,
        id: anArray.length + 1,
        isChecked: false
    }
    //if localstorage has data, check if the check box is checked
    if (getFromLS) {
        const newLS = JSON.parse(getFromLS);
        newLS.forEach(ls => {
            if (ls.id === liEle.id) {
                liEle.isChecked = ls.isChecked;
                if (ls.isChecked) {
                    li.children[2].style.textDecoration = 'line-through';
                    li.children[2].style.textDecorationThickness = '2px';
                    li.firstElementChild.classList.add('dis-non');
                    li.firstElementChild.nextElementSibling.classList.remove('dis-non')
                }
            }
        })
    }
    anArray.push(liEle);
}
function createNewList(anArray, INPUTVALUE, getFromLS, listOfTodos, ulForList) {
    createElements(anArray, INPUTVALUE, getFromLS, ulForList);
    input.value = "";
    saveLS(listOfTodos, anArray);
}
function keyupHandler(event) {
    event.preventDefault()
    //'enter' event for original list
    if (event.keyCode == 13) {
        const IV = input.value;
        if (IV) {
            createNewList(liEle_LS, IV, getLS, TODOS, ul)
        }
    }
}
function init() {
    getDate();
    btns.forEach(btn => btn.addEventListener('click', clickHandler));
    document.addEventListener('keyup', keyupHandler)
    if (getLS) {
        //make a list for original list
        const parsedLS = JSON.parse(getLS);
        parsedLS.forEach(ls => createNewList(liEle_LS, ls.text, getLS, TODOS, ul));
    }
}

init();