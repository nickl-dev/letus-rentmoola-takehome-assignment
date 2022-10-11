const form = document.getElementById('todo-form');
const input = document.getElementById('todo-add-input');
const addButton = document.getElementById('todo-add-button');
const toDoList = document.getElementById('todo-list');
let toDoItems = JSON.parse(localStorage.getItem('todos')) || [];

https://codesandbox.io/s/l6q8z?file=/app.js

window.onload = () => {
  if (toDoItems !== []) {
    for (const item in toDoItems) {
      console.log('item');
      addToList(item);
    }
  } 
};

/**
 * Update Local Storage
 * @desc Updates localStorage when an item
 * is created, edited, or deleted
 * @param {array} toDoItems
 */
 function updatelocalStorage (array = toDoItems) {
  localStorage.setItem('todos', JSON.stringify(array));
};

/**
 * Create Item
 * @param {string} Value of input
 * @desc Creates a To-Do item
 * @returns {object} newItem (<li>)
 */
function createItem (value) {
  const newItem = document.createElement('li');
  const title = document.createElement("span");
  const editInput = document.createElement("input");
  const editButton = document.createElement('button');
  const saveButton = document.createElement("button");
  const deleteButton = document.createElement('button');

  newItem.classList.add('todo');

  title.classList.add('todo__title');
  title.innerText = value;

  // editInput.classList.add("input");
  // editInput.classList.add("input--todo");
  editInput.classList.add("hidden");
  editInput.type = "text";
  editInput.value = value;

  editButton.classList.add('edit');
  editButton.classList.add("button");
  // editButton.classList.add("button--todo");
  // editButton.classList.add("button--edit");
  editButton.innerHTML = '<i class="fa fa-pencil" aria-hidden="true"></i>';

  saveButton.classList.add("save");
  // saveButton.classList.add("button--todo");
  // saveButton.classList.add("button--save");
  saveButton.classList.add("hidden");
  saveButton.innerHTML = '<i class="fa fa-save" aria-hidden="true"></i>';
  
  // deleteButton.classList.add("button");
  deleteButton.classList.add("button--todo");
  deleteButton.classList.add("button--delete");
  deleteButton.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';

  newItem.append(title, editInput, editButton, saveButton, deleteButton);
  // toDoList.appendChild(newItem);

  function toggleEdit() {
    title.classList.toggle("hidden");
    editInput.classList.toggle("hidden");
    editButton.classList.toggle("hidden");
    saveButton.classList.toggle("hidden");
  };

   // event listeners for edit, save, and delete buttons
   editButton.addEventListener("click", () => {
    toggleEdit();
    editInput.focus();
  });

  saveButton.addEventListener("click", () => {
    const index = toDoItems.indexOf(title.innerText);

    if (index > -1) {
      toDoItems[index] = editInput.value;
      updatelocalStorage();
    }

    title.innerText = editInput.value;

    toggleEdit();
  });

  deleteButton.addEventListener("click", () => {
    setTimeout(() => {
      deleteItem(title);
    }, 100);
  });
  
  return newItem;
};

/**
 * Add Item
 * @desc Creates and appends a new item to the list,
 * adds new value to the array,
 * then updates localStorage with updated array
 * @param {string} value
 */
function addToList (event, value = input.value) {
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
  updatelocalStorage();

  // create new todo item
  const newItem = createItem(value);  

  // add new todo item to list
  toDoList.appendChild(newItem);

  // clear input value
  input.value = '';

  event.preventDefault();
};

/**
 * Delete Item
 * @desc Deletes element from todo list
 * and removes it from the array
 * @param {object} event
 */
function deleteItem (element, value) {
  const index = toDoItems.indexOf(value.innerText);
  if (index > -1) toDoItems.splice(index, 1);
  toDoList.removeChild(element);
  updatelocalStorage();
};

form.addEventListener("submit", addToList(input.value));