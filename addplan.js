let newTODOS='';
let newLiEle_LS=[];
const plusIcon = document.querySelector('#plusIcon');
const newAddedList = document.querySelector('.newAddedList');

function titleNListHandler(event) {
    event.preventDefault()
    if (event.keyCode == 13) {
        const ET= event.target; 
        if(ET.classList.contains('titleInput')){ //title input
            const ETV = ET.value;
            newTODOS=ETV;
            ET.previousElementSibling.innerText = ETV; //h2
            ET.previousElementSibling.classList.remove('dis-non')
            ET.classList.add('dis-non') //input display none
            saveLS(newTODOS,newLiEle_LS);
        }else if(ET.classList.contains('input')){
            const ETV = ET.value;
            const getnew_LS = document.querySelector(newTODOS)
            const allUl = document.querySelectorAll('main ul');
            let thisUl='';
            allUl.forEach(ul=>{
                if(ul.id===ET.parentElement.previousElementSibling.firstElementChild.id){
                    thisUl = ul;
                }
            });
            createNewList(newLiEle_LS,ETV,getnew_LS,newTODOS,thisUl)
        }
    }
}
function newBtnsHandler(event){
    event.preventDefault();
    const ET = event.target;
    if(ET.classList.contains('editBtn')){
        ET.previousElementSibling.classList.remove('dis-non');
        ET.previousElementSibling.focus();
        ET.previousElementSibling.previousElementSibling.classList.add('dis-non');
    }else if(ET.classList.contains('delBtn')){
        ET.parentElement.parentElement.remove();
    }
}
function iconEventHandler(event) {
    event.preventDefault();
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
    <input type="text" class='input' placeholder="add to-do here" />
    </footer>`;
    div.addEventListener('click', newBtnsHandler)
    newAddedList.appendChild(div);
}
function addIconEvent() {
    plusIcon.addEventListener('click', iconEventHandler)
    document.addEventListener('keyup', titleNListHandler)
}
addIconEvent();

