let newTODOS = '';
let newLiEle_LS = [];
let emptyLi_LS = [];
let previousTitle ='';
const plusIcon = document.querySelector('#plusIcon');
const newAddedList = document.querySelector('.newAddedList');

function titleNListHandler(event) {
    event.preventDefault()
    if (event.keyCode == 13) {
        const ET = event.target;
        //set title by user
        if (ET.classList.contains('titleInput')) { //title input
            const ETP = ET.previousElementSibling;
            const ETV = ET.value;
            if(ETV===''){
                return;
            }
            newTODOS = ETV; //user new input
            //if previous title exists
            if(previousTitle){
                const listsLS = localStorage.getItem(previousTitle);
                localStorage.setItem(newTODOS,listsLS)
                localStorage.removeItem(previousTitle)
            }else{
                const anEmptyArray = '[]';
                localStorage.setItem(newTODOS,anEmptyArray)
            }
            ETP.innerText=newTODOS;
            ETP.classList.remove('dis-non')
            ET.classList.add('dis-non')

        //add list by user
        } else if (ET.classList.contains('userNewInput')) {
                const head = ET.parentElement.previousElementSibling.previousElementSibling.firstElementChild;
                const headTitle = head.innerText;
                const ETV = ET.value;
                const getnew_LS = localStorage.getItem(headTitle);
                let new_LS = [];
                //if previous list
                if (getnew_LS) {
                    new_LS = JSON.parse(getnew_LS);
                }
                //if title hasn't been typed
                if (headTitle === '') {
                    const headStyle = head.nextElementSibling.style;
                    headStyle.backgroundColor = 'rgba(255, 0, 0, 0.627)';
                    headStyle.borderRadius = '8px';
                    setTimeout(() => {
                        headStyle.backgroundColor = 'rgba(0,0,0,0)';
                        headStyle.borderRadius = '0';
                    }, 2000);
                } else {
                    const thisUl = ET.parentElement.previousElementSibling.firstElementChild;
                    createNewList(new_LS, ETV, getnew_LS, headTitle, thisUl);
                    ET.value = '';
                }
            }
    }
}
function newBtnsHandler(event) {
    event.preventDefault();
    const ET = event.target;
    //user click title edit button
    if (ET.classList.contains('editBtn')) {
        const ETP = ET.previousElementSibling;
        ETP.classList.remove('dis-non');
        ETP.focus();
        ETP.previousElementSibling.classList.add('dis-non');
        previousTitle= ETP.previousElementSibling.innerText;
        ETP.placeholder = previousTitle;
    //user click delete button
    } else if (ET.classList.contains('delBtn')) {
        const ETP = ET.parentElement;
        ETP.parentElement.remove();
        localStorage.removeItem(ETP.firstElementChild.innerText);
    } else {
        return;
    }
}
//create div to have list
function createDiv() {
    const div = document.createElement('div');
    const ulCnt = document.querySelectorAll('main ul').length;
    //set div id
    div.id = ulCnt;
    div.classList.add('container');
    div.innerHTML = `<header>
    <h2 class="title dis-non ${ulCnt}"></h2>
    <input type='text' class='titleInput ${ulCnt}' placeholder='Press enter after type title'>
    <i class="fa fa-pencil-square-o editBtn" aria-hidden="true"></i>
    <i class="fa fa-minus-square-o delBtn" aria-hidden="true"></i>
    </header>
    <main>
    <ul id='${ulCnt}'></ul>
    </main>
    <footer>
    <i class="fa fa-plus" aria-hidden="true"></i>
    <input type="text" class='userNewInput ${ulCnt}' placeholder="add to-do here" />
    </footer>`;
    div.classList.add('box-sha');
    div.addEventListener('click', newBtnsHandler)
    newAddedList.appendChild(div);
}
//if user click calendar button
function iconEventHandler(event) {
    event.preventDefault();
    createDiv();
}
function addIconEvent() {
    //calendar icon
    plusIcon.addEventListener('click', iconEventHandler)
    //event for 'enter'
    document.addEventListener('keyup', titleNListHandler)
}
function initContainers() {
    let keyNames = [];
    //if localStorage has data
    if (localStorage.length > 0) {
        //get key names && create Div except main todo list
        for (let i = 0; i < localStorage.length; i++) {
            if (localStorage.key(i) !== 'todos') {
                keyNames.push(localStorage.key(i));
                createDiv();
            }
        }
        //make lists for every key name
        keyNames.forEach((list, index) => {
            //additional list
            const getListLS = localStorage.getItem(list);
            const parsedLS = JSON.parse(getListLS);
            const newUl = document.querySelectorAll('ul');
            newUl.forEach(ul => {
                if (ul.id == index + 1) {
                    //set the title
                    const ulTitle = ul.parentElement.previousElementSibling.firstElementChild;
                    ulTitle.innerText = list;
                    newTODOS = list;
                    //change display for h2 && input
                    ulTitle.classList.remove('dis-non');
                    ulTitle.nextElementSibling.classList.add('dis-non');
                    let newListArray = [];
                    parsedLS.forEach(ls => {
                        createNewList(newListArray, ls.text, getListLS, list, ul)
                        // createNewList(anArray, INPUTVALUE, getFromLS, listOfTodos, ulForList)
                    });
                }
            })
        })
    }
}
initContainers();
addIconEvent();

