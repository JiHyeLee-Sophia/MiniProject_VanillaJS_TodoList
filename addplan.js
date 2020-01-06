let newTODOS = '';
let newLiEle_LS = [];
let emptyLi_LS=[];
const plusIcon = document.querySelector('#plusIcon');
const newAddedList = document.querySelector('.newAddedList');

function titleNListHandler(event) {
    event.preventDefault()
    if (event.keyCode == 13) {
        const ET = event.target;
        if (ET.classList.contains('titleInput')) { //title input
            const ETV = ET.value;
            newTODOS = ETV;
            ET.previousElementSibling.innerText = ETV; //h2
            ET.previousElementSibling.classList.remove('dis-non')
            ET.classList.add('dis-non') //input display none
            saveLS(newTODOS, newLiEle_LS);
            ET.parentElement.nextElementSibling.firstElementChild.classList.add('ETV');
            ET.parentElement.nextElementSibling.nextElementSibling.lastElementChild.focus();
        } else if (ET.classList.contains('userNewInput')) {
            const ETV = ET.value;
            const getnew_LS = localStorage.getItem(newTODOS);
            const allUl = document.querySelectorAll('main ul');
            let thisUl = '';
            allUl.forEach(ul => {
                if (ul.id === ET.parentElement.previousElementSibling.firstElementChild.id) {
                    thisUl = ul;
                }
            });
            createNewList(emptyLi_LS, ETV, getnew_LS, newTODOS, thisUl)
            ET.value = '';
        }
    }
}
function newBtnsHandler(event) {
    event.preventDefault();
    const ET = event.target;
    if (ET.classList.contains('editBtn')) {
        ET.previousElementSibling.classList.remove('dis-non');
        ET.previousElementSibling.focus();
        ET.previousElementSibling.previousElementSibling.classList.add('dis-non');
    } else if (ET.classList.contains('delBtn')) {
        const ETP= ET.parentElement;
        ETP.parentElement.remove();
        localStorage.removeItem(ETP.firstElementChild.innerText);
    }
}
function createDiv() {
    const div = document.createElement('div');
    const ulCnt = document.querySelectorAll('main ul').length;
    div.classList.add('container');
    div.innerHTML = `<header>
    <h2 class="title dis-non"></h2>
    <input type='text' class='titleInput' placeholder='type title here'>
    <i class="fa fa-pencil-square-o btn editBtn" aria-hidden="true"></i>
    <i class="fa fa-minus-square-o btn delBtn" aria-hidden="true"></i>
    </header>
    <main>
    <ul id='${ulCnt}'></ul>
    </main>
    <footer>
    <i class="fa fa-plus" aria-hidden="true"></i>
    <input type="text" class='userNewInput' placeholder="add to-do here" />
    </footer>`;
    div.addEventListener('click', newBtnsHandler)
    newAddedList.appendChild(div);
}
function iconEventHandler(event) {
    event.preventDefault();
    createDiv();
}
function addIconEvent() {
    plusIcon.addEventListener('click', iconEventHandler)
    document.addEventListener('keyup', titleNListHandler)
}
function initContainers() {
    let keyNames = [];
    if (localStorage.length > 1) {
        //get key names
        for (let i = 0; i < localStorage.length; i++) {
            if(localStorage.key(i)!=='todos'){
                keyNames.push(localStorage.key(i));
                createDiv();
            }
        }
        //make a list for every key name
        keyNames.forEach((list, index) => {
            //additional list
            const getListLS = localStorage.getItem(list);
            const parsedLS = JSON.parse(getListLS);
            const newListArray=[];
            const newUl = document.querySelectorAll('ul');
            // emptyLi_LS.push(parsedLS);
            newUl.forEach(ul => {
                if(ul.id==index+1){
                    const ulTitle = ul.parentElement.previousElementSibling.firstElementChild;
                    ulTitle.innerText=list;
                    newTODOS=list;
                    ulTitle.classList.remove('dis-non');
                    ulTitle.nextElementSibling.classList.add('dis-non');
                    parsedLS.forEach(ls => createNewList(newListArray,ls.text,getListLS,list, ul));
                }
            })
        })
    }
}
initContainers();
addIconEvent();

