const TODOS: string = "todos";
const ul = document.querySelector(".todos")! as HTMLUListElement;
const input = document.querySelector(".input")! as HTMLInputElement;
const getLS: string = localStorage.getItem(TODOS);
let liEle_LS: object[] = [];
interface localStorageForm {
  text: string;
  id: number;
  isChecked: boolean;
}
//get current date for main todolist title
function getDate() {
  const currentDate = new Date();
  const options = { weekday: "long", month: "short", day: "numeric" };
  const container = document.querySelector(".container")! as HTMLDivElement;
  const today = container.querySelector(".date")! as HTMLHeadingElement;
  today.innerHTML = currentDate.toLocaleDateString("en-US", options);
}

function checkByButtons(
  ET: HTMLButtonElement,
  ETC: DOMTokenList,
  ETspan: HTMLSpanElement,
  ETspanId: number,
  anArray: object[]
) {
  let todoName: string = "";
  const code: string = ET.parentElement.className;
  if (code === "code0") {
    todoName = TODOS;
  } else {
    var todoHead = document.querySelector(
      `div.${code} h2`
    )! as HTMLHeadingElement;
    todoName = todoHead.innerText;
  }

  let itemLS: localStorageForm[] = JSON.parse(localStorage.getItem(todoName));
  //if user click emptybox button
  if (ETC.contains("emptyButton")) {
    const next = ET.nextElementSibling.classList;
    ETC.toggle("dis-non");
    next.toggle("dis-non");
    ETspan.setAttribute(
      "style",
      "text-decoration : line-through; text-decoration-thickness:2px;"
    );

    itemLS[ETspanId - 1].isChecked = true;
    //if user click checkedbox button
  } else if (ETC.contains("checkedButton")) {
    const previous = ET.previousElementSibling.classList;
    ETC.toggle("dis-non");
    previous.toggle("dis-non");
    ETspan.style.textDecoration = "none";
    itemLS[ETspanId - 1].isChecked = false;
    //if user click removebox button
  } else if (ETC.contains("removeButton")) {
    let buttonsUl = ET.parentElement.parentElement! as HTMLUListElement;
    const clickedId: number = +ET.previousElementSibling.id;
    ET.parentElement.remove();
    //set id again for whole ul
    const ulChilds = buttonsUl.childNodes;
    ulChilds.forEach((each: HTMLLIElement, index: number) => {
      let span = each.querySelector("span");
      let id: number = index + 1;
      span.id = `${id}`;
    });

    let newItemLS: localStorageForm[] = itemLS.filter(
      item => item.id != clickedId
    );
    newItemLS.forEach((item: localStorageForm, index: number) => {
      item.id = index + 1;
    });
    itemLS = newItemLS;
    anArray[clickedId - 1];
  } else {
    return;
  }
  saveLS(todoName, itemLS);
}
function clickHandler(event) {
  event.preventDefault();
  const ET = event.target! as HTMLButtonElement;
  const ETC = ET.classList! as DOMTokenList;
  const ETspan = ET.parentElement.children[2]! as HTMLSpanElement;
  if (ETspan) {
    const ETspanId: number = +ETspan.id;
    checkByButtons(ET, ETC, ETspan, ETspanId, liEle_LS);
  }
}
function saveLS(listOfTodos, anArray) {
  localStorage.setItem(listOfTodos, JSON.stringify(anArray));
}
// (empty or filled array, inputValue, checkForCheckedBox, ul to add class and list)
class CreateNewList {
  public anArray: object[];
  public INPUTVALUE: string;
  public getFromLS: string;
  public listOfTodos: string;
  public ulForList: HTMLUListElement;
  constructor(
    anArray: object[],
    INPUTVALUE: string,
    getFromLS: string,
    listOfTodos: string,
    ulForList: HTMLUListElement
  ) {
    this.anArray = anArray;
    this.INPUTVALUE = INPUTVALUE;
    this.getFromLS = getFromLS;
    this.listOfTodos = listOfTodos;
    this.ulForList = ulForList;
  }
  public emptyInputValue() {
    input.value = "";
    saveLS(this.listOfTodos, this.anArray);
  }
  public createElements() {
    const li = document.createElement("li")! as HTMLLIElement;
    li.classList.add(`code${this.ulForList.id}`);
    li.innerHTML = `<i class="fa fa-square-o item btn emptyButton" aria-hidden="true"></i>
    <i class="fa fa-check-square-o item btn checkedButton dis-non" aria-hidden="true"></i>
    <span class='item' id = '${this.anArray.length + 1}'>${
      this.INPUTVALUE
    }</span>
    <i class="fa fa-trash-o btn removeButton item" aria-hidden="true"></i>`;
    li.addEventListener("click", clickHandler);
    this.ulForList.appendChild(li);

    const liEle: localStorageForm = {
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
            li.children[2].setAttribute(
              "style",
              "text-decoration : line-through; text-decoration-thickness:2px;"
            );
            li.firstElementChild.classList.add("dis-non");
            li.firstElementChild.nextElementSibling.classList.remove("dis-non");
          }
        }
      });
    }
    this.anArray.push(liEle);
    this.emptyInputValue();
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
  getDate();
  document.addEventListener("keyup", keyupHandler);
  if (getLS) {
    //make a list for original list
    const parsedLS:localStorageForm[] = JSON.parse(getLS);
    parsedLS.forEach(ls => {
      const create = new CreateNewList(liEle_LS, ls.text, getLS, TODOS, ul);
      create.createElements();
    });
  }
}

init();
