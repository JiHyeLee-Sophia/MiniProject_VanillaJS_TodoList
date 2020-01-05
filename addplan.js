
const plusIcon = document.querySelector('#plusIcon'),
    newAddedList = document.querySelector('.newAddedList');

function iconEventHandler(event) {
    event.preventDefault();
    const div = document.createElement('div');
    div.classList.add('container');
    div.innerHTML = `<header>
                        <h2 class="title">
                        <input type='text' class='titleInput' placeholder='type title here'>
                        <i class="fa fa-pencil-square-o editBtn" aria-hidden="true"></i>
                        <i class="fa fa-minus-square-o delBtn" aria-hidden="true"></i>
                        </h2>
                    </header>
                    <main>
                        <ul class="todoList"></ul>
                    </main>
                    <footer>
                        <i class="fa fa-plus" aria-hidden="true"></i>
                        <input type="text" class='input' placeholder="add to-do here" />
                    </footer>`;
    
    newAddedList.appendChild(div);
}
function addIconEvent() {
    plusIcon.addEventListener('click', iconEventHandler)
}
addIconEvent();

