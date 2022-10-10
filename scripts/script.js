const form = document.getElementById('todo-form');
const input = document.getElementById('todo-add-input');
const addButton = document.getElementById('todo-add-button');
const toDoList = document.getElementById('todo-list');
let toDoItems;

https://codesandbox.io/s/l6q8z?file=/app.js

/** 
 * checks localStorage for existing todo items when page loads
 * then renders them
 */
window.onload = () => {
  getToDosFromLocalStorage();
};

function getToDosFromLocalStorage () {
  toDoItems = JSON.parse(localStorage.getItem('todos')) || [];
  return toDoItems;
}

/**
 * Create To-Do
 * @param {string} Value of To-Do
 * @desc Creates a To-Do element,
 * appends it to the list
 * and adds it to the
 * @returns {object} item (<li>)
 */
function createItem (value) {
  const newItem = document.createElement('li');
  const editButton = document.createElement('button');
  const deleteButton = document.createElement('button');

  newItem.classList.add('todo');
  editButton.classList.add('edit');
  deleteButton.classList.add('delete');

  newItem.innerHTML = value;
  editButton.innerHTML = '<i class="fa fa-pencil" aria-hidden="true"></i>';
  deleteButton.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';

  deleteButton.addEventListener('click', deleteItem);
  
  newItem.append(editButton, deleteButton);

  return newItem;
};

/**
 * Update Local Storage
 * @desc Updates localStorage when an item
 * is created, edited, or deleted
 * @param {array} toDos
 */
function updatelocalStorage (value = toDoItems) {
  localStorage.setItem('todos', JSON.stringify(value));
};


/**
 * Add Item
 * @desc Creates and appends a new item to the list,
 * adds new value to the array,
 * then updates localStorage with updated array
 * @param {string} value
 */
function addItem (value) {
  // check if input has a value
  if (value.trim() === '') {
    alert('Please enter a valid ToDo.')
    input.value = '';
    return;
  } else {
    for (const toDo of toDoItems) {
      if (toDo.toLowerCase() === value.toLowerCase().trim()) {
        alert('To-Do already exists.');
        input.value = '';
        return;
      }
    }
  }

  // add todo to array and update localStorage
  toDoItems.push(value);
  updatelocalStorage(toDoItems);

  // create todo item
  const newItem = createItem(value);  

  // add new todo item to list
  toDoList.appendChild(newItem);

  // clear input value
  input.value = '';
};

/**
 * Delete Item
 * @desc Deletes element from todo list
 * and removes it from the array
 * @param {object} event
 */
function deleteItem (event) {
  const item = event.target.parentElement.parentElement;
  console.log(item.innerHTML);
  toDoList.removeChild(item);
  const index = toDoItems.indexOf(item.innerHTML);
  if (index > -1) toDoItems.splice(index, 1);
  updatelocalStorage();
};

function editItem (value) {};

addButton.addEventListener('click', () => addItem(input.value));