import { updateLocalStorage, trimAndLowerCase, resetInput } from './utils.js';

const toDoInput = document.getElementById('todo-add-input');
const addButton = document.getElementById('todo-add-button');
const toDoList = document.getElementById('todo-list');

let toDoItems = JSON.parse(localStorage.getItem('todos')) || [];

/**
 * Immediately invoked function
 * that checks if toDoItems contains values from localStorage
 * then renders them
 */
(() => {
  console.log(event)
  if (toDoItems !== []) {
    for(const item of toDoItems) {
      console.log(item)
      addToDo(item, true);
    }
  }
})();


addButton.addEventListener('click', () => addToDo(toDoInput.value));

/**
 * Create Item
 * @desc Creates a new <li> element that represents a To-Do
 * @param {string} value from input field (by default) or localStorage
 * @returns {object} newListItem <li> to be appended to the To-Do list
 */
function createItem (value = toDoInput.value) {
  // create elements
  const newListItem = document.createElement('li');
  const toDoTitle = document.createElement('span');
  const editInput = document.createElement('input');
  const buttonWrapper = document.createElement('div');
  const editButton = document.createElement('button');
  const saveButton = document.createElement('button');
  const deleteButton = document.createElement('button');
  const markAsDoneButton = document.createElement('button');

  newListItem.classList.add('todo-list__item');

  toDoTitle.classList.add('todo-list__item-title');
  toDoTitle.innerText = value;

  // editInput.classList.add('input');
  editInput.classList.add('todo-edit-input');
  editInput.classList.add('hidden');
  editInput.type = 'text';
  editInput.value = value;

  buttonWrapper.classList.add('button-wrapper')

  editButton.classList.add('button');
  editButton.classList.add('todo-button');
  editButton.classList.add('todo-button-edit');
  editButton.innerHTML = '<i class="fa fa-pencil" aria-hidden="true"></i>';

  saveButton.classList.add('button');
  saveButton.classList.add('todo-button');
  saveButton.classList.add('todo-button-save');
  saveButton.classList.add('hidden');
  saveButton.innerHTML = '<i class="fa fa-save" aria-hidden="true"></i>';

  deleteButton.classList.add('button');
  deleteButton.classList.add('todo-button');
  deleteButton.classList.add('todo-button-delete');
  deleteButton.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';

  markAsDoneButton.classList.add('button');
  markAsDoneButton.classList.add('todo-button');
  markAsDoneButton.classList.add('todo-button-done');
  markAsDoneButton.innerHTML = '<i class="fa fa-check" aria-hidden="true"></i>';

  // append buttons to it's own container
  buttonWrapper.append(
    editButton, 
    saveButton, 
    deleteButton, 
    markAsDoneButton
  );

  // add sub elements to new list item
  newListItem.append(
    toDoTitle, 
    editInput, 
    buttonWrapper
  )
 
  /**
   * Toggle Edit
   * @desc Adds/removes 'hidden' class from sub elements that are appended to each To-Do <li>
   */
  function toggleEdit() {
    toDoTitle.classList.toggle('hidden');
    editInput.classList.toggle('hidden');
    editButton.classList.toggle('hidden');
    saveButton.classList.toggle('hidden');
  }

  // event listener for edit button
  editButton.addEventListener('click', () => {
    buttonWrapper.removeChild(markAsDoneButton);
    toggleEdit();
    editInput.focus();
  });

  // event listeners for save button
  saveButton.addEventListener('click', () => {
    buttonWrapper.appendChild(markAsDoneButton);
    const index = toDoItems.indexOf(toDoTitle.innerText);

    if (index > -1) {
      toDoItems[index] = editInput.value;
      updateLocalStorage('todos', toDoItems);
    }

    toDoTitle.innerText = editInput.value;

    toggleEdit();
  });

  // event listeners for delete button
  deleteButton.addEventListener('click', () => {
    setTimeout(() => {
      deleteItem(newListItem, toDoTitle);
    }, 100);
  });

  // event listener for done button
  markAsDoneButton.addEventListener('click', (event) => {
    setTimeout(() => {
      event.target.parentElement.parentElement.parentElement.firstChild.classList.add('todo--done');
      event.target.parentElement.parentElement.parentElement.removeChild(buttonWrapper);
    }, 100)
  })

  return newListItem;
}


/**
 * Add To-Do
 * @desc Appends new item to the To-Do list
 * @param {string} value to be used as the title of the To-Do
 * @param {boolean} comingFromLocalStorage flag that avoids other logic from being executed
 */
function addToDo(value, comingFromLocalStorage = false) {
  if (comingFromLocalStorage) {
    const itemFromLocalStorage = createItem(value);
    toDoList.appendChild(itemFromLocalStorage);
    return;
  }

  if (trimAndLowerCase(toDoInput.value) === '') {
    alert('Please enter a valid To-Do.');
    resetInput(toDoInput);
    return;
  }

  const toDoAlreadyExists = toDoItems.indexOf(trimAndLowerCase(toDoInput.value)) > -1;

  if (toDoAlreadyExists) {
    alert('To-Do already exists.');
  } else {
    toDoItems.push(toDoInput.value);
    updateLocalStorage('todos', toDoItems);

    const newItem = createItem(toDoInput.value)
    toDoList.appendChild(newItem);  
  }

  resetInput(toDoInput);
}


/**
 * Delete Item
 * @desc Deletes element from To-Do list,
 * removes it from the toDoItems array,
 * then updates localStorage
 * @param {object} element to be removed from the To-Do list
 * @param {string} value to be removed from the toDoItems array
 */
 function deleteItem (element, value) {
  const index = toDoItems.indexOf(value.innerText);
  if (index > -1) toDoItems.splice(index, 1);
  toDoList.removeChild(element);
  updateLocalStorage('todos', toDoItems);
};