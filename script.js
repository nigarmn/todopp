// UI vars 

const form = document.querySelector('form');
const input = document.querySelector('#txtTaskName');
const btnDeleteAll = document.querySelector('#btnDeleteAll');
const taskList = document.querySelector('#task-list');
let items;

// load items
loadItems();

// call event listeners
eventListeners();

function eventListeners() {
    // submit event
    form.addEventListener('submit', addNewItem);

    // delete an item
    taskList.addEventListener('click', deleteItem);

    // delete all items
    btnDeleteAll.addEventListener('click', deleteAllItems);
}

function loadItems() {

    items = getItemsFromLS();


    items.forEach(function (item) {
        createItem(item);
    })
}

function getItemsFromLS(){

    if(localStorage.getItem('items')===null){
        items=[];
    }else{
        items=JSON.parse(localStorage.getItem('items'));
    }

    return items;

}

function deleteItemFromLS(text){
items=getItemsFromLS();
items.forEach(function (item,index){
    if(item===text){
    items.splice(index,1);
    }
});
localStorage.setItem('items',JSON.stringify(items));
}


function setItemToLS(text){
    items=getItemsFromLS();
    items.push(text);
    localStorage.setItem('items',JSON.stringify(items));

}

function createItem(text) {
    const li = document.createElement('li');
    li.className = "list-group-item list-group-item-secondary";
    li.appendChild(document.createTextNode(text));


    const a = document.createElement('a');
    a.setAttribute = ('href', '#');
    a.className = 'delete-item float-right';
    a.innerHTML = '<i class="fas fa-times"  ></i>';


    li.appendChild(a);

    taskList.appendChild(li);




}


function addNewItem(e) {


    if (input.value === '') {
        alert('heyy add item!');
    };

    createItem(input.value);

    setItemToLS(input.value);

    input.value = '';

    e.preventDefault();
}

function deleteItem(e) {

    if (e.target.className === 'fas fa-times') {
        if (confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove();
        };


        deleteItemFromLS
        (e.target.parentElement.parentElement.textContent);
    };

    e.preventDefault();
}

function deleteAllItems(e) {

    // taskList.innerHTML='';   
    if (confirm('are you sure ?')) {
        // taskList.innerHTML='';
       while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
       }
        localStorage.clear()
    }
    e.preventDefault();
}


