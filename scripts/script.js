import { updateLocalStorage, trimAndLowerCase, resetInput, getIndex } from './utils.js';

const form = document.getElementById('todo-form');
const toDoInput = document.getElementById('todo-add-input');
const toDoList = document.getElementById('todo-list');

let toDoItems = JSON.parse(localStorage.getItem('todos')) || [];

/**
 * Immediately invoked function
 * that checks if toDoItems contains values from localStorage
 * then renders them
 */
(() => {
  if (toDoItems !== []) {
    for (const item of toDoItems) {
      addToDo(item.value, true);
    }
  }
})();

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  addToDo(toDoInput.value);
});

/**
 * Create Item
 * @desc Creates a new <li> element that represents a To-Do
 * @param {string} value from input field (by default) or localStorage
 * @returns {object} newListItem <li> to be appended to the To-Do list
 */
export function createItem(value = toDoInput.value) {
  // Create elements that all pertain to the To-Do item <li>
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

  editInput.classList.add('todo-edit-input');
  editInput.classList.add('hidden');
  editInput.type = 'text';
  editInput.value = value;

  buttonWrapper.classList.add('button-wrapper');

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

  // Append buttons to their own container
  buttonWrapper.append(editButton, saveButton, deleteButton, markAsDoneButton);

  // Add sub elements to new list item
  newListItem.append(toDoTitle, editInput, buttonWrapper);

  // Event listener for edit button
  editButton?.addEventListener('click', () => {
    buttonWrapper.removeChild(markAsDoneButton);
    toggleEdit(toDoTitle, editInput, editButton, saveButton);
    editInput.focus();
  });

  // Event listeners for save button
  saveButton?.addEventListener('click', () => {
    buttonWrapper?.appendChild(markAsDoneButton);
    const index = getIndex(toDoItems, toDoTitle.innerText);

    if (index > -1) {
      toDoItems[index].value = editInput.value;
      updateLocalStorage('todos', toDoItems);
    }

    toDoTitle.innerText = editInput.value;

    toggleEdit(toDoTitle, editInput, editButton, saveButton);
  });

  // Event listeners for delete button
  deleteButton?.addEventListener('click', () => deleteItem(newListItem, toDoTitle));

  // Event listener for done button
  markAsDoneButton?.addEventListener("click", (event) => {
    const targetElement = event.target.parentElement.parentElement.parentElement.firstChild;

    for (const item of toDoItems) {
      if (item.value === targetElement.innerText) {
        item.isDone = !item.isDone;
        if (item.isDone) targetElement.classList.add('todo--done');
        else targetElement.classList.remove('todo--done');
      }
    }

    updateLocalStorage('todos', toDoItems)
  });

  return newListItem;
};

/**
 * Add To-Do
 * @desc Appends new item to the To-Do list
 * @param {string} value to be used as the title of the To-Do
 * @param {boolean} comingFromLocalStorage flag that avoids other logic from being executed
 */
export function addToDo(value, comingFromLocalStorage = false) {
  if (comingFromLocalStorage) {
    const itemFromLocalStorage = createItem(value);
    toDoList?.appendChild(itemFromLocalStorage);
    return;
  }

  if (trimAndLowerCase(value) === '') {
    alert('Please enter a valid To-Do.');
    resetInput(toDoInput);
    return;
  }

  const uniqueID = Math.floor(Date.now() / 1000);

  toDoItems.push({
    id: uniqueID,
    value,
    isDone: false,
    createdAt: uniqueID
  });

  updateLocalStorage('todos', toDoItems);

  const newItem = createItem(value);
  toDoList?.appendChild(newItem);   

  resetInput(toDoInput);
};

/**
 * Toggle Edit
 * @desc Adds/removes 'hidden' class from sub elements that are appended to each To-Do <li>
 * @param {array} elements to have their 'hidden' class toggled. Uses rest paramaters
 */
export function toggleEdit(...elements) {
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.toggle('hidden');
    }
  }

/**
 * Delete Item
 * @desc Deletes element from To-Do list,
 * removes it from the toDoItems array,
 * then updates localStorage
 * @param {object} element to be removed from the To-Do list
 * @param {string} value to be removed from the toDoItems array
 */
export function deleteItem(element, value) {
  const index = getIndex(toDoItems, value.innerText);
  if (index > -1) toDoItems.splice(index, 1);

  toDoList.removeChild(element);

  updateLocalStorage('todos', toDoItems);
}