const TODOS = "todos";
const ul = document.querySelector(".todos");
const input = document.querySelector(".input");
const getLS = localStorage.getItem(TODOS);
let liEle_LS = [];
//get current date for main todolist title
function getDate() {
    const currentDate = new Date();
    const options = { weekday: "long", month: "short", day: "numeric" };
    const container = document.querySelector(".container");
    const today = container.querySelector(".date");
    today.innerHTML = currentDate.toLocaleDateString("en-US", options);
}
function checkByButtons(ET, ETC, ETspan, ETspanId, anArray) {
    let todoName = "";
    const code = ET.parentElement.className;
    if (code === "code0") {
        todoName = TODOS;
    }
    else {
        var todoHead = document.querySelector(`div.${code} h2`);
        todoName = todoHead.innerText;
    }
    let itemLS = JSON.parse(localStorage.getItem(todoName));
    //if user click emptybox button
    if (ETC.contains("emptyButton")) {
        const next = ET.nextElementSibling.classList;
        ETC.toggle("dis-non");
        next.toggle("dis-non");
        ETspan.setAttribute("style", "text-decoration : line-through; text-decoration-thickness:2px;");
        itemLS[ETspanId - 1].isChecked = true;
        //if user click checkedbox button
    }
    else if (ETC.contains("checkedButton")) {
        const previous = ET.previousElementSibling.classList;
        ETC.toggle("dis-non");
        previous.toggle("dis-non");
        ETspan.style.textDecoration = "none";
        itemLS[ETspanId - 1].isChecked = false;
        //if user click removebox button
    }
    else if (ETC.contains("removeButton")) {
        let buttonsUl = ET.parentElement.parentElement;
        const clickedId = +ET.previousElementSibling.id;
        ET.parentElement.remove();
        //set id again for whole ul
        for (let i = 0; i < buttonsUl.childElementCount; i++) {
            let li = buttonsUl.childNodes[i];
            let liClassName = li.className;
            let thisSpan = document.querySelector(`li.${liClassName} span`);
            let id = i + 1;
            thisSpan.id = JSON.stringify(id);
        }
        let newItemLS = itemLS.filter(item => item.id != clickedId);
        console.log(newItemLS);
        newItemLS.forEach((item, index) => (item.id = index + 1));
        itemLS = newItemLS;
        anArray[clickedId - 1];
    }
    else {
        return;
    }
    saveLS(todoName, itemLS);
}
function clickHandler(event) {
    event.preventDefault();
    const ET = event.target;
    const ETC = ET.classList;
    const ETspan = ET.parentElement.children[2];
    if (ETspan) {
        const ETspanId = +ETspan.id;
        checkByButtons(ET, ETC, ETspan, ETspanId, liEle_LS);
    }
}
function saveLS(listOfTodos, anArray) {
    localStorage.setItem(listOfTodos, JSON.stringify(anArray));
}
// (empty or filled array, inputValue, checkForCheckedBox, ul to add class and list)
class CreateNewList {
    constructor(anArray, INPUTVALUE, getFromLS, listOfTodos, ulForList) {
        this.anArray = anArray;
        this.INPUTVALUE = INPUTVALUE;
        this.getFromLS = getFromLS;
        this.listOfTodos = listOfTodos;
        this.ulForList = ulForList;
    }
    createElements() {
        const li = document.createElement("li");
        li.classList.add(`code${this.ulForList.id}`);
        li.innerHTML = `<i class="fa fa-square-o item btn emptyButton" aria-hidden="true"></i>
    <i class="fa fa-check-square-o item btn checkedButton dis-non" aria-hidden="true"></i>
    <span class='item' id = '${this.anArray.length + 1}'>${this.INPUTVALUE}</span>
    <i class="fa fa-trash-o btn removeButton item" aria-hidden="true"></i>`;
        li.addEventListener("click", clickHandler);
        this.ulForList.appendChild(li);
        const liEle = {
            text: this.INPUTVALUE,
            id: this.anArray.length + 1,
            isChecked: false
        };
        //if localstorage has data, check if the check box is checked
        if (this.getFromLS) {
            const newLS = JSON.parse(this.getFromLS);
            newLS.forEach(ls => {
                if (ls.id === liEle.id) {
                    liEle.isChecked = ls.isChecked;
                    if (ls.isChecked) {
                        li.children[2].setAttribute("style", "text-decoration : line-through; text-decoration-thickness:2px;");
                        li.firstElementChild.classList.add("dis-non");
                        li.firstElementChild.nextElementSibling.classList.remove("dis-non");
                    }
                }
            });
        }
        this.anArray.push(liEle);
        this.emptyInputValue();
    }
    emptyInputValue() {
        input.value = "";
        saveLS(this.listOfTodos, this.anArray);
    }
}
function keyupHandler(event) {
    event.preventDefault();
    //'enter' event for original list
    if (event.keyCode == 13) {
        const IV = input.value;
        if (IV) {
            // createNewList(liEle_LS, IV, getLS, TODOS, ul);
            const create = new CreateNewList(liEle_LS, IV, getLS, TODOS, ul);
            create.createElements();
        }
    }
}
function init() {
    const btns = document.querySelectorAll(".btn");
    getDate();
    btns.forEach(btn => btn.addEventListener("click", clickHandler));
    document.addEventListener("keyup", keyupHandler);
    if (getLS) {
        //make a list for original list
        const parsedLS = JSON.parse(getLS);
        parsedLS.forEach(ls => {
            const create = new CreateNewList(liEle_LS, ls.text, getLS, TODOS, ul);
            create.createElements();
        });
    }
}
init();
//# sourceMappingURL=main.js.map