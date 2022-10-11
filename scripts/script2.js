// const form = document.getElementById('todo-form');
const toDoInput = document.getElementById('todo-add-input');
const addButton = document.getElementById('todo-add-button');
const toDoList = document.getElementById('todo-list');
let toDoItems = JSON.parse(localStorage.getItem('todos')) || [];

(() => {
  console.log(event)
  if (toDoItems !== []) {
    for(const item of toDoItems) {
      console.log(item)
      addToDo(item, true);
    }
  }
})();


function updateLocalStorage () {
  localStorage.setItem('todos', JSON.stringify(toDoItems));
};


function trimAndLowerCase (value) {
  return value.trim().toLowerCase()
};


addButton.addEventListener('click', () => addToDo(toDoInput.value));

function createItem (value = toDoInput.value) {
  // create elements
  const newListItem = document.createElement('li');
  const toDoTitle = document.createElement('span');
  const editInput = document.createElement('input');
  const editButton = document.createElement('button');
  const saveButton = document.createElement('button');
  const deleteButton = document.createElement('button');
  const markAsDoneButton = document.createElement('button');

  newListItem.classList.add('todo-collection__item');

  toDoTitle.classList.add('todo-collection__item__title');
  toDoTitle.innerText = value;

  // editInput.classList.add('input');
  editInput.classList.add('input--todo');
  editInput.classList.add('hidden');
  editInput.type = 'text';
  editInput.value = value;

  editButton.classList.add('button--todo');
  editButton.classList.add('button--edit');
  editButton.innerHTML = '<i class="fa fa-pencil" aria-hidden="true"></i>';

  saveButton.classList.add('button--todo');
  saveButton.classList.add('button--save');
  saveButton.classList.add('hidden');
  saveButton.innerHTML = '<i class="fa fa-save" aria-hidden="true"></i>';

  deleteButton.classList.add('button--todo');
  deleteButton.classList.add('button--delete');
  deleteButton.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';

  markAsDoneButton.classList.add('button--todo');
  markAsDoneButton.classList.add('button--done');
  markAsDoneButton.innerHTML = '<i class="fa fa-check" aria-hidden="true"></i>';


  // add sub elements to new list item
  newListItem.append(
    toDoTitle, 
    editInput, 
    editButton, 
    saveButton, 
    deleteButton, 
    markAsDoneButton
  )
 
  function toggleEdit() {
    toDoTitle.classList.toggle('hidden');
    editInput.classList.toggle('hidden');
    editButton.classList.toggle('hidden');
    saveButton.classList.toggle('hidden');
  }

  // button event listeners
  editButton.addEventListener('click', () => {
    toggleEdit();
    editInput.focus();
  });

  saveButton.addEventListener('click', () => {
    const index = toDoItems.indexOf(toDoTitle.innerText);

    if (index > -1) {
      toDoItems[index] = editInput.value;
      updateLocalStorage();
    }

    toDoTitle.innerText = editInput.value;

    toggleEdit();
  });

  deleteButton.addEventListener('click', () => {
    setTimeout(() => {
      deleteItem(newListItem, toDoTitle)
    }, 300);
  });

  markAsDoneButton.addEventListener('click', () => {
    setTimeout(() => {

    }, 300)
  })

  return newListItem;
}



function addToDo(value, comingFromLocalStorage = false) {
  if (comingFromLocalStorage) {
    const itemFromLocalStorage = createItem(value);
    toDoList.appendChild(itemFromLocalStorage);
    return;
  }

  if (toDoInput.value.trim() === '') {
    alert('Please enter a valid To-Do.');
    toDoInput.value = '';
    return;
  }
    
  for (const todo in toDoItems) {
    if (trimAndLowerCase(todo) === trimAndLowerCase(toDoInput.value)) {
      alert('To-Do already exists.');
      toDoInput.value = '';
      return;
    };
  }

  toDoItems.push(toDoInput.value);
  updateLocalStorage();

  const newItem = createItem(toDoInput.value)
  toDoList.appendChild(newItem);

  // clear input
  toDoInput.value = '';
}

function getTodosFromLocalStorage() {
  toDoItems = JSON.parse(localStorage.getItem('todos')) || [];
  return toDoItems;
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
  updateLocalStorage();
};